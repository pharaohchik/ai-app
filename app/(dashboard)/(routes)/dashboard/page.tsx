'use client';

import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: 'чат',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    href: '/conversation'
  }, 
  {
    label: 'генерация музыки',
    href: '/music',
    icon: Music,
    bgColor: 'bg-sky-500/10',
    color: 'text-sky-500'
 },
 {
  label: 'генерация изображений',
  href: '/image',
  icon: ImageIcon,
  color: 'text-pink-500',
  bgColor: 'bg-pink-500/10'
 },
 {
  label: 'генерация видео',
  href: '/video',
  icon: VideoIcon,
  color: 'text-green-500',
  bgColor: 'bg-green-500/10'
 },
 {
  label: 'генерация кода',
  href: '/code',
  icon: Code,
  color: 'text-orange-500',
  bgColor: 'bg-orange-500/10',
 },
]
const DashboardPage = () => {

  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 text-center">
          Познай же силу искусственного интеллекта
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Поговорите с мощнейшим искусственным интеллектом и попробуй на себе всю мощь!       
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
      {tools.map((tool) => (
          <Card 
            onClick={() => router.push(tool.href)}
            key={tool.href} 
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                <tool.icon className={cn('w-8 h-8', tool.color)} />
              </div>
              <div className="font-semibold">
                {tool.label}
              </div>
            </div>
            <ArrowRight className="w-5 h-5"/>
          </Card>
        ))}
      </div>
    </div>
    );
}

export default DashboardPage;
