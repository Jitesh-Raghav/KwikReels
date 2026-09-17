import { generateScript } from "@/configs/AiModel";
import { NextResponse } from "next/server";

const SCRIPT_PROMPT=`write a two different script for 60 Seconds video on Topic:{topic},
Do not add Scene description
Do not Add Anything in Braces, Just return the plain story in text
Give me response in JSON format and follow the schema
-{
scripts:[
{
content:''
},
],
}`

export async function POST(req) {
    try {
        const {topic} = await req.json();

        if (!topic?.trim()) {
            return NextResponse.json({error: "A topic is required."}, {status: 400});
        }

        const PROMPT = SCRIPT_PROMPT.replace('{topic}', topic.trim());
        const result = await generateScript.sendMessage(PROMPT);
        const resp = result?.response?.text()?.trim();
        const jsonText = resp?.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');

        if (!jsonText) {
            throw new Error('Gemini returned an empty response.');
        }

        return NextResponse.json(JSON.parse(jsonText));
    } catch (error) {
        console.error('Script generation failed:', error);
        return NextResponse.json(
            {error: 'Unable to generate a script. Check the Gemini API configuration and try again.'},
            {status: 500}
        );
    }
}