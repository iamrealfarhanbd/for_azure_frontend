import ErrorLabel from "@/components/ErrorLabel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthLayout from "@/layouts/AuthLayout";
import { useAuthStore } from "@/store/auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useParams } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
function PasswordChange() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { id } = useParams();
  console.log(id);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  // const history = useHistory();
  const passwordFormSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .max(12, "Password can't be more than 12 characters")
      .min(6, "Password can't be less than 6 characters"),
  });
  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
  });

  if (isLoggedIn) {
    window.history.back();
  }

  const onSubmit = async (data: z.infer<typeof passwordFormSchema>) => {
    console.log(data);
    const result = await axios.post(
      "https://authisazure-hzhsgpg8a5dja6gx.uksouth-01.azurewebsites.net/api/v1/user/change-password",
      {
        email: data.email,
        password: data.password,
        token: id,
      }
    );
    if (result.data.success === true) {
      await login(data.email, data.password);
      navigate("/");
    }
    // console.log(result);
  };

  return (
    <AuthLayout>
      <div className="h-auto w-full max-w-md  flex flex-col bg-white bg-opacity-35 p-8 rounded-md border-2 border-slate-200">
        <h6 className="mb-5 font-pacifico text-3xl text-center">
          Set New Password
        </h6>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="exp@mail.com"
            {...form.register("email")}
            className=""
          />
          <ErrorLabel>
            {form.formState.errors.email?.message as string}
          </ErrorLabel>
          <Input
            type="password"
            placeholder="******"
            {...form.register("password")}
            className=""
          />
          <ErrorLabel>
            {form.formState.errors.password?.message as string}
          </ErrorLabel>
          <Button type="submit" className="w-full mt-2">
            Reset password
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default PasswordChange;
