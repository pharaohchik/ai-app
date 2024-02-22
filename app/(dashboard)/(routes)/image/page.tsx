"use client";
import axios from "axios";
import { Heading } from "@/components/heading";
import {Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { amountOptions, formSchema, resolutionOptions } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";

const ImagePage = () => {
    const router = useRouter();

    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
            amount: '1',
            resolution: '512x512',
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
          const res = values.resolution;
          const amount = parseInt(values.amount);
          if (res == '1024x1024') {
            
          }
          setImages([]);
          // console.log('[VALUES]: ' + JSON.stringify(values));
          const response = await axios.post('/api/image', JSON.stringify(values));
          const urls = response.data.map((image: { url: string }) => image.url);
          // console.log(urls)
          setImages(urls);
          form.reset();
        }catch(e){
            console.log('[IMAGE_ERROR]: ', e);
        }finally{
            router.refresh();
        }
    };

    return ( 
        <div>
          <Heading
            title="генерация изображений"
            description="генерируем изображения с помощью контролируемой диффузии"
            Icon={ImageIcon}
            iconColor="text-pink-500"
            bgColor="bg-pink-500/10"
          />
          <div className="px-4 lg:px-8">
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                >
                  <FormField name="prompt" render={({field}) => (
                    <FormItem className="col-span-12 lg:col-span-6">
                      <FormControl className="m-0 p-0">
                        <Input
                          disabled={isLoading}
                          placeholder="фото альпаки в горах в солнечных очках"
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({field}) => (
                      <FormItem className="col-span-12 lg:col-span-2">
                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value}/>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {amountOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="resolution"
                    render={({field}) => (
                      <FormItem className="col-span-12 lg:col-span-2">
                        <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue defaultValue={field.value}/>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {resolutionOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
                <div className="p-20 ">
                  <Loader/>
                </div>
              )}
              {images.length == 0 && !isLoading && (
                <Empty label="пока еще не сгенерировали"/>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                {images.map((src) => (
                  
                  <Card key={src} className="rounded-lg overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        alt='image'
                        fill
                        src={src}
                      />
                    </div>
                    <CardFooter className="p-2">
                      <Button 
                        variant="secondary" 
                        className="w-full"
                        onClick={() => window.open(src)}
                      >
                        <Download className="h-4 w-4 mr-2"/>
                        скачать
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default ImagePage;