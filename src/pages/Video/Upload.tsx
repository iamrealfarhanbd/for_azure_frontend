import DefaultLayout from "@/layouts/DefaultLayout";
import React, { useState } from "react";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const formSchema = z.object({
  videoTitle: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title cannot exceed 50 characters"),
  videoTags: z
    .string()
    .refine(
      (val) => val.split(",").every((tag) => tag.trim().length > 0),
      "Tags must be non-empty and comma-separated"
    ),
  videoAge: z.number().min(12, "Age must be 12 or older"),
  videoFile: z
    .any()
    .refine((file) => file instanceof File, "Please upload a valid video file"),
});

function Upload() {
  const [videoError, setVideoError] = useState("");

  const userData:unknown = useLoaderData();
  const userInformation = userData.data.data;
  console.log(userInformation);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoTitle: "",
      videoTags: "",
      videoAge: 12,
      videoFile: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const formData = new FormData();
    formData.append("title", values.videoTitle);
    formData.append("tags", values.videoTags);
    formData.append("file", values.videoFile);
    formData.append("uploaderData", JSON.stringify(userInformation));

    const response = await axios.post(
      "https://backserver-bnb5f3exhpa8gte6.uksouth-01.azurewebsites.net/api/v1/video/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("response from frontend", response);
  }

  return (
    <DefaultLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="videoTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Exp: A journey by boat" {...field} />
                </FormControl>
                <FormDescription>This is your video title.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoTags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input placeholder="Exp: Fantasy, Action" {...field} />
                </FormControl>
                <FormDescription>
                  Enter comma-separated values for video tags.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age Criteria</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Exp: 25" {...field} />
                </FormControl>
                <FormDescription>Age limit for videos.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="videoFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Video</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="video/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>
                  Upload a video file (max 15 seconds).
                </FormDescription>
                {videoError && (
                  <p className="text-red-500 text-sm">{videoError}</p>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={!!videoError}>
            Submit
          </Button>
        </form>
      </Form>
    </DefaultLayout>
  );
}

export default Upload;
