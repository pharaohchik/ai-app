"use client";
import axios from "axios";
import { Heading } from "@/components/heading";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

const VideoPage = () => {
    const router = useRouter();
    const [video, setVideo] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
          setVideo(undefined)
          const response = await axios.post('/api/video', values);
          setVideo(response.data[0]);
          form.reset();
        }catch(e){
            console.log('[VIDEO_ERROR]: ', e);
        }finally{
            router.refresh();
        }
    };

    return ( 
        <div>
          <Heading
            title="генерация видео"
            description="преврати свои желания в видео"
            Icon={VideoIcon}
            iconColor="text-green-500"
            bgColor="bg-sky-green/10"
          />
          <div className="px-4 lg:px-8">
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                >
                  <FormField name="prompt" render={({field}) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          disabled={isLoading}
                          placeholder="собака бегает по полю"
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                    )}
                  />
                  <Button type="submit" className="col-span-12 lg:col-span-2 w-full" disabled={isLoading} size={'icon'}>
                    сгенерировать  
                  </Button> 
                </form>
              </Form>
            </div>
            <div className="space-y-4 mt-4">
              {isLoading && (
                <div className="p-8 rounded-lg w-full flex items-center justify-between bg-muted">
                  <Loader/>
                </div>
              )}
              {!video && !isLoading && (
                <Empty label="Пока еще ничего не сгенерировали"/>
              )}
            {video && (
              <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
                <source src={video}/>
              </video>
            )}
            </div>
          </div>
        </div>
     );
}
 
export default VideoPage;