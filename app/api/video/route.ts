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
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
              input: {
                prompt: prompt
              }
            }
          );
        return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (e) {
        console.log('[VIDEO_ERROR]: ', e);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
