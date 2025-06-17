import { createClient } from "@deepgram/sdk";
import { inngest } from "./client";
import axios from "axios";
import { GenerateImageScript } from "@/configs/AiModel";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser";
import {getServices, renderMediaOnCloudrun} from '@remotion/cloudrun/client';

const ImagePromptScript = `Generate Image prompt of {style} style with all details for each scene for 30 seconds video : script: {script}
-Just Give specifing image prompt depends on the story line
- do not give camera angle image prompt
-Follow the Following schema and return JSON data (Max 4-5 Images)
- [
    {   imagePrompt:'',       
        sceneContent: ' <Script Content>'
    }
]`

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

const BASE_URL = "https://aigurulab.tech";
export const GenerateVideoData = inngest.createFunction(
  { id: "generate-video-data" },
  { event: "generate-video-data" },
  async ({ event, step }) => {
    const { script, topic, title, caption, videoStyle, voice, recordId} = event?.data;
    const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL)

    //Generate Audio File MP3
    const GenerateAudioFile = await step.run(
      "GennerateAudioFile", 
      async () => {
      const result = await axios.post(BASE_URL + "/api/text-to-speech",
        {
          input: script,
          voice: voice,
        },
        {
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY,
            "Content-Type": "application/json",
          },
        })
      return result.data.audio;
      // return "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/audio%2F1740311920126.mp3?alt=media&token=77ca0183-566c-43c1-a9df-7c4936440aff"
    }
  )

    //Generate Captions
    const GenerateCaptions = await step.run(
      "generateCaptions", 
      async () => {
      const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);
      // STEP 2: Call the transcribeUrl method with the audio payload and options
      const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
        {
          url: GenerateAudioFile,
        },
        // STEP 3: Configure Deepgram options for audio analysis
        {
          model: "nova-3",
        }
      );
      return result.results?.channels[0]?.alternatives[0]?.words;

    }
  )

    //Generate Image Prompt from Script 
    const GenerateImagePrompts = await step.run(
      "generateImagePrompt", 
      async () => {
        const FINAL_PROMPT = ImagePromptScript
        .replace('{style}',videoStyle).replace('{script}',script);
        const result  = await GenerateImageScript.sendMessage(FINAL_PROMPT);
        const resp = JSON.parse( result.response.text());

        return resp;
    }
  )
    //Generate Image using AI
    const GenerateImages = await step.run("generateImages", async () => {
      let images = [];
      images = await Promise.all(
        GenerateImagePrompts.map(async (element) => {
          const result = await axios.post(BASE_URL + "/api/generate-image",
            {
              width: 1024,
              height: 1024,
              input: element?.imagePrompt,
              model: "sdxl", //'flux'
              aspectRatio: "1:1", //Applicable to Flux model only
            },
            {
              headers: {
                "x-api-key": process.env.NEXT_PUBLIC_AIGURULAB_API_KEY, // Your API Key
                "Content-Type": "application/json", // Content Type
              },
            }
          );
          console.log(result.data.image) //Output Result: Base 64 Image
          return result.data.image;
        })
      )
      return images;
    });

    //Save All Data to DB
    const UpdateDB = await step.run(
      'UpdateDB',
      async() => {
        const result = await convex.mutation(api.videoData.UpdateVideoRecord,{
          recordId: recordId,
          audioUrl: GenerateAudioFile,
          captionJson: GenerateCaptions,
          images: GenerateImages
        });
        return result;
      }
    )


    const RenderVideo = await step.run(
      "renderVideo",
      async()=>{
        //Render Video
        const services = await getServices({
          region: 'us-east1',
          compatibleOnly: true,
        });
         
        const serviceName = services[0].serviceName;

        const result = await renderMediaOnCloudrun({
          serviceName,
          region: 'us-east1',
          serveUrl: process.env.GCP_SERVE_URL,
          composition: 'youtubeShort',
          inputProps: {
            videoData:{
              audioUrl: GenerateAudioFile,
              captionJson: GenerateCaptions,
              images: GenerateImages
          }
          },
          codec: 'h264',

        });
         
        if (result.type === 'success') {
          console.log(result.bucketName);
          console.log(result.renderId);
        }
        return result?.publicUrl;
      }
    )

    const UpdateDownloadUrl = await step.run(
      'UpadateDownloadUrl',
      async () => {
        const result = await convex.mutation(api.videoData.UpdateVideoRecord,{
          recordId: recordId,
          audioUrl: GenerateAudioFile,
          captionJson: GenerateCaptions,
          images: GenerateImages,
          downloadUrl: RenderVideo
        });
        return result;
      }
    )

    // return GenerateAudioFile;
    // return GenerateCaptions;
    // return GenerateImagePrompts;
    // return GenerateImages;
    // return "Executed Successfully"
    return RenderVideo;
  }
)
