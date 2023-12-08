'use client';

import Image from "next/image";
import Link from "next/link";
import {LayoutDashboard, MessageSquare, ImageIcon, VideoIcon, Music, Code, Settings} from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";


const Sidebar = () => {
    const pathname = usePathname();
    const routes = [
        {
            label: 'dashboard',
            href: '/dashboard',
            icon: LayoutDashboard,
            color: 'text-emerald-500'
        },
        {
            label: 'чат',
            href: '/conversation',
            icon: MessageSquare,
            color: 'text-violet-500'
        },
        {
            label: 'генерация изображений',
            href: '/image',
            icon: ImageIcon,
            color: 'text-pink-500'
        },
        {
            label: 'генерация видео',
            href: '/video',
            icon: VideoIcon,
            color: 'text-green-300'
        },
        {
            label: 'генерация музыки',
            href: '/music',
            icon: Music,
            color: 'text-sky-500'
        },
        {
            label: 'генерация кода',
            href: '/code',
            icon: Code,
            color: 'text-orange-500'
        },
        {
            label: 'settings',
            href: '/settings',
            icon: Settings,
        },
    ];

    return ( 
        <div className="space-y-4 py-4 flex flex-col h-full text-white bg-gray-800">
          <div className="px-3 py-2 flex-1">
            <Link href='/dashboard' className="flex items-center pl-3 mb-14">
              <div className="relative w-8 h-8 mr-4">
                <Image 
                  fill
                  alt='logo'
                  src="/logo.png"
                />
              </div>
              <h1 className="text-2xl font-mono">
                dron
              </h1>
            </Link>
            <div className="space-y-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition", pathname === route.href ? 'text-white bg-white/10': 'text-zinc-400' )}>
                  <div className="flex items-center flex-1">
                    <route.icon className={cn("w-6 h-6 mr-3", route.color)} />
                    {route.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
     );
}
 
export default Sidebar;