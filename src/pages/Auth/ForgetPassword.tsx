import { Input } from "@/components/ui/input";
import AuthLayout from "@/layouts/AuthLayout";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorLabel from "@/components/ErrorLabel";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";
import axios from "axios";

function ForgetPassword() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const forgetPasswordSchema = z.object({
    email: z.string().email(),
  });

  const form = useForm<z.infer<typeof forgetPasswordSchema>>({
    resolver: zodResolver(forgetPasswordSchema),
  });
  if (isLoggedIn) {
    window.history.back();
  }
  const onSubmit = async (data: z.infer<typeof forgetPasswordSchema>) => {
    console.log(data);
    await axios.post("https://authisazure-hzhsgpg8a5dja6gx.uksouth-01.azurewebsites.net/api/v1/user/forget-password", {
      email: data.email,
    });
  };

  const navigate = useNavigate();
  return (
    <AuthLayout>
      <div className="h-auto w-full max-w-md  flex flex-col bg-white bg-opacity-35 p-8 rounded-md border-2 border-slate-200">
        <h6 className="mb-5 font-pacifico text-3xl text-center">
          Forget Password
        </h6>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Email"
            {...form.register("email")}
            className=""
          />
          <ErrorLabel>
            {form.formState.errors.email?.message as string}
          </ErrorLabel>
          <Button type="submit" className="w-full">
            Send recovery email
          </Button>
        </form>
        <Button
          type="button"
          onClick={() => {
            navigate("/auth/login");
          }}
          className="w-full mt-2"
        >
          Back to Login
        </Button>
      </div>
    </AuthLayout>
  );
}

export default ForgetPassword;
