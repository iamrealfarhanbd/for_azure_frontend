// global imports

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

// Local imports

import AuthLayout from "@/layouts/AuthLayout";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/auth-store";

function OtpVerification() {
  const userData = useLoaderData();
  // const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const { toast } = useToast();

  const navigate = useNavigate();
  interface UserData {
    email: string;
    id: string;
  }
  // console.log(userData.data.data as UserData);
  const FormSchema = z.object({
    otp: z.string().min(6, {
      message: "Your one-time password must be 6 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  // if (isLoggedIn) {
  //   window.history.back();
  // }

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const response = await axios
        .post(
          `https://authisazure-hzhsgpg8a5dja6gx.uksouth-01.azurewebsites.net/api/v1/user/${userData.data.data.id}/account-verification`,
          {
            id: userData.data.data.id as string,
            otp: data.otp,
          }
        )
        .then((data) => {
          toast({
            variant: "success",
            title: "OTP verification Successful!",
            description: data.data.message,
          });
          setTimeout(() => {
            navigate("/auth/login");
          }, 1500);
        });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "OTP verification unsuccessful!",
        description: error.message as string,
      });
    }
  };
  return (
    <AuthLayout>
      <div className="h-auto w-full max-w-md font-roboto flex flex-col bg-white bg-opacity-35 p-8 rounded-md border-2 border-slate-200">
        <h6 className="mb-5  text-sm text-center">Account Verification</h6>
        <h6 className="mb-5  text-2xl text-center">
          Enter the 6-Digit otp sent to you
        </h6>
        <h6 className="mb-5  text-sm text-center">
          otp was sent to {userData.data.data.email}
        </h6>
        <div className="w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full text-center flex flex-col justify-center items-center space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your phone.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </AuthLayout>
  );
}

export default OtpVerification;
