// TODO: добавить проверку я ли делаю запрос на сервер или нет 

import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage = {
    role: "system",
  content: "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations."
};


export async function POST(request: Request) {
    try {
        const { userId } = auth();
        const body = await request.json();
        const prompt = body.messages; 
        
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        if (!prompt || !Array.isArray(prompt)) {
            return new NextResponse('Prompt is required and should be an array of messages', { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...prompt],
        });
            
        return new NextResponse(JSON.stringify(response.choices[0].message), { status: 200 });
    } catch (e) {
        console.log('[CONVERSATION_ERROR]: ', e);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
