"use client";
import axios from "axios";
import { Heading } from "@/components/heading";
import {Download, ImagePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Card, CardFooter } from "@/components/ui/card";
import { UploadDropzone } from "@/components/uploadthing";
import "@uploadthing/react/styles.css";

const ImagePage = () => {
    const router = useRouter();
    const [fileUrl, setFileUrl] = useState<string>('');
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        fileUrl: '',
      }
  })
    const isLoading = form.formState.isSubmitting;
  

  
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      try {
        const response = await axios.post('/api/upscale', JSON.stringify(values));
        setFileUrl(response.data);
        form.reset();
      } catch (e) {
        console.log('[UPSCALE_ERROR]: ', e);
      } finally {
        router.refresh();
      }
    };
  
    return (
      <div>
        <Heading
          title="увеличение изображений"
          description="увеличь изображение используя нейросеть"
          Icon={ImagePlus}
          iconColor="text-fuchsia-500"
          bgColor="bg-fuchsia-500/10"
        />
        <div className="px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between ">
            <UploadDropzone
              className="ut-label:text-lg ut-allowed-content:ut-uploading:text-red-300"
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                onSubmit({ fileUrl: res[0].url });
              }}
              onUploadError={(error: Error) => {
                console.log('[UPLOAD_ERROR]: ', error);
              }}
            />
          </div>
          <div className="space-y-4 mt-4">
            {isLoading && (
              <div className="p-20 ">
                <Loader />
              </div>
            )}
            {fileUrl.length == 0 && !isLoading && (
                <Empty label="пока еще не увеличили"/>
              )}
            {fileUrl.length !== 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                <Card key={fileUrl} className="rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <img alt="image" src={fileUrl} />
                  </div>
                  <CardFooter className="p-2">
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={() => window.open(fileUrl)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      скачать
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};
 
export default ImagePage;