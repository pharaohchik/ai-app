import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
    try{
        const {userId } = auth();
        const body = await request.json();
        const promt = body;
        
        if(!userId){return new NextResponse('Unauthorized', { status: 401 });}
        if(!promt){return new NextResponse('Promt is required', { status: 400 });}

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: promt,
          });
            
        return new NextResponse(JSON.stringify(response.choices[0].message), { status: 200 });
    }
    catch(e){
        console.log('[CONVERSATION_ERROR: ', e);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}