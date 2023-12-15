"use client";
import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import TypeWriterComponent from 'typewriter-effect'
import { Button } from "./ui/button";
export const LandingHero = () => {
    const isSignedIn = useAuth();
    return(
        <div className="text-white font-bold py-36 text-center space-y-5">
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
            <h1>Лучший <span className="text-emerald-500">AI</span> сервис для</h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
              <TypeWriterComponent 
                options={{
                    strings: [
                        "чат-ботов.",
                        "генерации изображений.",
                        "генерации кода.",
                        "генерации музыки.",
                        "генерации видео.",
                        "улучшения качества фото.",

                    ],
                    autoStart: true,
                    loop: true
                }}
              />
            </div>
            <div className="text-sm md:text-xl font-light text-zinc-400">
              Создавайте контент используя нейросети в 10 раз быстрее
            </div>
            <div>
              <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                <Button variant={'premium'} className="md:text-lg p-4 md:p-6 rounded-full font-semibold">
                    Творите бесплатно
                </Button>
              </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
              Абсолютно бесплатно для всех
            </div>
          </div>    
        </div>
    )
}