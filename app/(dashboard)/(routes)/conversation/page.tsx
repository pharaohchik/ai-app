"use client";
import axios from "axios";
import  OpenAI from "openai";
import { Heading } from "@/components/heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ConversationPage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<OpenAI.Chat.ChatCompletionMessage []>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            promt: '',
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
          const userMessage = {
            role: 'user',
            content: values.promt
          }
          const newMessages = [...messages, userMessage];
          console.log(newMessages)
          const response = await axios.post('/api/conversation', {
            messages: newMessages
          });

          setMessages((current) => [...current, userMessage, response.data]);
          form.reset();
        }catch(e){
            console.log('[CONVERSATION_ERROR: ', e);
        }finally{
            router.refresh();
        }
    };

    return ( 
        <div>
          <Heading
            title="чат"
            description="самая мощная генеративная нейросеть в мире "
            Icon={MessageSquare}
            iconColor="text-violet-500"
            bgColor="bg-violet-500/10"
          />
          <div className="px-4 lg:px-8">
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                >
                  <FormField name="promt" render={({field}) => (
                    <FormItem className="col-span-12 lg:col-span-10">
                      <FormControl className="m-0 p-0">
                        <Input
                          disabled={isLoading}
                          placeholder="Как посчитать площадь квадрата?"
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                    )}
                  />
                  <Button type="submit" className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                    сгенерировать  
                  </Button> 
                </form>
              </Form>
            </div>
            <div className="space-y-4 mt-4">
              <div className="flex flex-col-reverse gap-y-4">
                {messages.map((message) => (
                  <div>
                    {message.content}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default ConversationPage;