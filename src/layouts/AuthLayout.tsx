import { ReactNode } from "react";
interface AuthLayoutProps {
  children: ReactNode;
}
function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-[100vh] w-full fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
      {children}
      <div className="fixed bottom-5">        Copyright © {new Date().getFullYear()}. Crafted with ❤️ by Farhan Ahmed
</div>
    </div>
  );
}

export default AuthLayout;
