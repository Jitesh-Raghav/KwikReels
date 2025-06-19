const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

export  const generateScript = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "write a two different script for 60 Seconds video on Topic:Kids Story,\n\n• Do not add Scene description\n• Do not Add Anything in Braces, Just return the plain story in text\n• Give me response in JSON format and follow the schema\n  -{\n  scripts:[\n  {\n  content:\"\n  },\n  ],\n  }"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"scripts\": [\n    {\n      \"content\": \"Once upon a time, there was a tiny seed. It was scared of the big world. But a friendly ladybug whispered, 'Don't worry, little seed, you're strong!' The sun warmed it, the rain watered it, and slowly, slowly, a beautiful flower bloomed. Even the smallest seed can grow into something amazing!\"\n    },\n    {\n      \"content\": \"Leo the lion was afraid of his own roar! He'd try to meow like a kitten, but *ROAR!* One day, a little mouse said, 'Your roar is powerful, Leo! Use it to help others.' So Leo roared at a scary storm, protecting his friends. He learned his roar wasn't scary, it was his superpower!\"\n    }\n  ]\n}\n```"},
          ],
        },
      ],
    });
  
// export const GenerateImageScript = model.startChat({
//       generationConfig,
//       history: [
//         {
//           role: "user",
//           parts: [
//             {text: "Generate Image prompt of Cinematic style with all details for each scene for 60 seconds video : script: Cleopatra, the last pharaoh of Egypt, was known for her intelligence and beauty. Facing Roman power, she allied with Julius Caesar, later Mark Antony. Their love and ambition clashed with Rome, leading to a final, tragic battle. Though defeated, her legacy as a strong, clever ruler lives on.\n\nJust Give specifying image prompt depends on the story line\n\ndo not give camera angle image prompt\n\nFollow the Following schema and return JSON data (Max 4-5 Images)\n\n[\n{ \nimagePrompt:'',       \nsceneContent: ' <Script Content>'\n}\n]"},
//           ],
//         },
//         {
//           role: "model",
//           parts: [
//             {text: "```json\n[\n  {\n    \"imagePrompt\": \"Epic, wide shot. Cleopatra, regal and intelligent, sits on her throne in a sun-drenched Egyptian palace. Rich fabrics, gold adornments, hieroglyphics in the background. Conveying both power and vulnerability.\",\n    \"sceneContent\": \"Cleopatra, the last pharaoh of Egypt, was known for her intelligence and beauty.\"\n  },\n  {\n    \"imagePrompt\": \"Tension-filled scene. Cleopatra meeting with Julius Caesar in a dimly lit chamber. Roman armor contrasts with Egyptian elegance. Intense negotiation, political intrigue, sense of impending conflict.\",\n    \"sceneContent\": \"Facing Roman power, she allied with Julius Caesar...\"\n  },\n  {\n    \"imagePrompt\": \"Romantic yet dangerous. Cleopatra and Mark Antony on a lavish barge sailing down the Nile. Lush scenery, passion in their eyes, but a storm of war brewing in the distance.\",\n    \"sceneContent\": \"...later Mark Antony. Their love and ambition clashed with Rome...\"\n  },\n  {\n    \"imagePrompt\": \"Desperate, tragic. Cleopatra in her royal chamber, facing defeat. A crown askew, a determined look, a hint of sadness. The end of an era.\",\n    \"sceneContent\": \"Though defeated, her legacy as a strong, clever ruler lives on.\"\n  }\n]\n```\n\nThese prompts are designed to evoke the key moments and emotions in your script. Good luck with your video!\n"},
//           ],
//         },
//       ],
//     });



export const GenerateImageScript = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate Image prompt of Cinematic style with all details for each scene for 60 seconds video : 
script: Cleopatra, the last pharaoh of Egypt, was known for her intelligence and beauty. Facing Roman power, she allied with Julius Caesar, later Mark Antony. Their love and ambition clashed with Rome, leading to a final, tragic battle. Though defeated, her legacy as a strong, clever ruler lives on.

Just give specifying image prompt depending on the story line

Do not give camera angle image prompt

Follow the following schema and return JSON data (6-7 Images)

[
{ 
  imagePrompt:'',       
  sceneContent: ' <Script Content>'
}
]`
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
[
  {
    "imagePrompt": "Grand Egyptian palace interior, golden sunlight filtering in. Cleopatra sits confidently on her throne, draped in traditional Egyptian attire with jeweled headpiece, scrolls beside her, aura of intelligence and power.",
    "sceneContent": "Cleopatra, the last pharaoh of Egypt, was known for her intelligence and beauty."
  },
  {
    "imagePrompt": "Cleopatra studying celestial maps and scrolls under torchlight. Shelves of ancient knowledge surround her. Eyes focused, hands tracing old symbols, establishing her as a strategist.",
    "sceneContent": "She was a woman of knowledge, ruling with both charm and intellect."
  },
  {
    "imagePrompt": "A tense meeting between Cleopatra and Julius Caesar in a luxurious yet guarded Egyptian hall. Egyptian guards stand at attention, Roman soldiers in the background, cultural clash evident.",
    "sceneContent": "Facing Roman power, she allied with Julius Caesar..."
  },
  {
    "imagePrompt": "A lavish celebration on the Nile. Cleopatra and Mark Antony dressed in fine garments on a decorated barge. Musicians play, fireworks in the distance, but a shadow of approaching war looms.",
    "sceneContent": "...later Mark Antony. Their love and ambition clashed with Rome..."
  },
  {
    "imagePrompt": "Dark skies over a battlefield. Roman and Egyptian forces face off. Mark Antony wounded, Cleopatra in the distance looking on with worry and resolve.",
    "sceneContent": "Leading to a final, tragic battle."
  },
  {
    "imagePrompt": "Cleopatra alone in her chamber, veiled in sorrow. Holding a small vial, gold adornments fallen to the floor. A symbol of dignity in downfall.",
    "sceneContent": "Though defeated, she chooses her fate rather than surrender."
  },
  {
    "imagePrompt": "Sun rising over the Nile. A statue of Cleopatra partially submerged in water, but glowing in golden morning light. Symbolizing eternal legacy.",
    "sceneContent": "Her legacy as a strong, clever ruler lives on."
  }
]
\`\`\``
        },
      ],
    },
  ],
});


    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
