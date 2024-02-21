import { auth } from '@clerk/nextjs'; // импорт функции auth из библиотеки @clerk/nextjs которая используется для авторизации пользователей
import { NextResponse } from 'next/server'; 
import OpenAI from 'openai'; // импорт библиотеки OpenAI для генерации изображений

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
  }); // создание экземпляра OpenAI

/**
 * Handles a POST request and generates an image based on the provided prompt, amount, and resolution.
 *
 * @param {Request} request - The request object containing the necessary data.
 * @return {Promise<NextResponse>} - The response object containing the generated image or an error message.
 */
export async function POST(request: Request) {
    try {
        const { userId } = auth(); // деструктуризация  userId из функции auth
        const body = await request.json(); // получение тела запроса в формате JSON
        const prompt = body.prompt; // получение prompt из тела запроса
        const amount = parseInt(body.amount); // получение amount из тела запроса
        const res = body.resolution; // получение resolution из тела запроса

        if (!userId) {return new NextResponse('Unauthorized', { status: 401 });}
        if (!prompt) { return new NextResponse('Prompt is required', { status: 400 });}
        if (amount < 1 || amount > 5) {return new NextResponse('Amount must be between 1 and 5', { status: 400 });}
        if (!res) {return new NextResponse('Resolution is required', { status: 400 });}

        if (res == '1024x1024') {
            if (amount != 1){
                return new NextResponse('Amount must be 1 when resolution is 1024x1024', { status: 400 });
            }
            const response = await openai.images.generate({
                model: "dall-e-3", 
                prompt: prompt,
                n: amount,
                size: res,
              }); //  асинхронная генерация изображения
              console.log('[RESPONSE]: ' + JSON.stringify(response.data));

               return new NextResponse(JSON.stringify(response.data), { status: 200 });
        } else {
            const response = await openai.images.generate({
                model: "dall-e-2", 
                prompt: prompt,
                n: amount,
                size: res,
              });
              console.log('[RESPONSE]: ' + JSON.stringify(response.data));

              return new NextResponse(JSON.stringify(response.data), { status: 200 });
        }
        
        
        

    } catch (e) {console.log('[IMAGE_ERROR]: ', e);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
