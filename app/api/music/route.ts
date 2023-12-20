// TODO: добавить проверку я ли делаю запрос на сервер или нет 

import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import Replicate from 'replicate'

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY
})

export async function POST(request: Request) {
    try {
        const { userId } = auth();
        const body = await request.json();
        const prompt = body.prompt; 
        
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!prompt) {
            return new NextResponse('Prompt is required', { status: 400 });
        }
        const response =  await replicate.run(
            "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
            {
              input: {
                prompt_a: prompt, 
                denoising: 0.75,
              }
            }
          );
        return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (e) {
        console.log('[MUSIC_ERROR]: ', e);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
