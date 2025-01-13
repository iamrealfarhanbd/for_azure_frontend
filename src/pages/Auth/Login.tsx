import AuthLayout from "@/layouts/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorLabel from "@/components/ErrorLabel";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth-store";

function Login() {
  const login = useAuthStore((state) => state.login);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const LoginSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .max(12, "Password can't be more than 12 characters")
      .min(6, "Password can't be less than 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  type LoginData = z.infer<typeof LoginSchema>;

  if (isLoggedIn) {
    window.history.back();
  }

  const onSubmit = async (data: LoginData) => {
    console.log(data);

    try {
      await login(data.email, data.password);

      const redirectTo = location.state?.from?.pathname === "" || "/";
      navigate(redirectTo, { replace: true });
      alert("Login successful!");
    } catch (error) {
      alert("Failed to log in. Check your email or password.");
    }
  };

  return (
    <AuthLayout>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white bg-opacity-35 p-5 rounded-md border-2 border-slate-200 text-lg"
      >
        <h2 className="font-pacifico text-center text-3xl">Sign In</h2>
        <div className="mt-5">
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="bg-white bg-opacity-70 focus:border-2 focus:border-slate-300"
          />
        </div>
        {errors.email && (
          <ErrorLabel>{errors.email?.message as string}</ErrorLabel>
        )}
        <div className="mt-2">
          <Input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="bg-white bg-opacity-70 focus:border-2 focus:border-slate-300"
          />
        </div>
        {errors.password && (
          <ErrorLabel>{errors.password?.message as string}</ErrorLabel>
        )}
        <Link
          to="/auth/recovery-mail-request"
          className="mt-2 text-xs hover:underline"
        >
          Forgot Password
        </Link>
        <div className="mt-2">
          <Button type="submit" className="w-full capitalize">
            Sign in
          </Button>
        </div>

        <div className="mt-2 text-sm">
          Don't have an account?{" "}
          <span className="hover:underline">
            <Link to="/auth/register">Sign Up</Link>
          </span>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
