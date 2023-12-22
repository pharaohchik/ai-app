"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const recoms = [
    {
        name: "Алиса",
        avatar: "A",
        title: "Senior AI Developer",
        description: "Это лучшее приложение для использования нейросетей, что я когда либо видела"
    },
    {
        name: "Юля",
        avatar: "Ю",
        title: "Software Engineer",
        description: "Максимально просто, быстро, удобно, а главное - бесплатно"
    },
    {
        name: "Макс",
        avatar: "М",
        title: "человек экстремист",
        description: "я клоун"
    },
]
export const LandingContent = () => {
    return (
        <div className="px-10 pb-20"> 
          <h2 className="text-4xl font-extrabold text-white text-center mb-10" >
            Pекомендации
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recoms.map((recom) => (
               <Card key={recom.description} className="bg-zinc-800 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-x-2">
                      <div>
                        <p className="text-lg">{recom.name}</p> 
                        <p className="text-zinc-400 text-sm">{recom.title}</p> 
                      </div>
                    </CardTitle>
                    <CardContent className="pt-4 px-0">
                        {recom.description}
                    </CardContent>
                  </CardHeader>
               </Card>
            ))}
          </div>
        </div>
    )
}
