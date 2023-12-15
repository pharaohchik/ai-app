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
        const url = body.fileUrl; 
        
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        if (!url) {
            return new NextResponse('Url is required', { status: 400 });
        }
        const response =  await replicate.run(
            "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
            {
              input: {
                image: url,
                scale: 2,
                face_enhance: false
              }
            });
        return new NextResponse(JSON.stringify(response), { status: 200 });
    } catch (e) {
        console.log('[UPSCALE_ERROR]: ', e);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
