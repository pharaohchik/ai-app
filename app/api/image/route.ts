// TODO: добавить проверку я ли делаю запрос на сервер или нет 

import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI();

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
        const response = await openai.images.generate({
              model: "dall-e-3", 
              prompt: prompt,
            });

        return new NextResponse(JSON.stringify(response.data), { status: 200 });

    } catch (e) {
        console.log('[IMAGE_ERROR]: ', e);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
