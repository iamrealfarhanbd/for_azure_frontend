import VideoUploadBtn from "@/components/shared/VideoUploadBtn/VideoUploadBtn";
import Navbar from "@/components/ui/Navbar";
import React from "react";

type DefaultLayoutProps = {
  children: React.ReactNode;
};

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full h-[100vh] flex flex-col justify-center items-center">
      <div className="w-full max-w-[900px] bg-white shadow-xl rounded-lg overflow-hidden h-[95vh] flex flex-col">
        {/* Navbar */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <Navbar />
        </div>
        <VideoUploadBtn />
        <div className="relative overflow-y-scroll hidden-scrollbar h-full w-full bg-purple-300">
          <div className="w-full h-full px-5 font-roboto">{children}</div>
        </div>
        {/* footer position */}
        <div className=" w-full text-center py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-center py-3">
        Copyright © {new Date().getFullYear()}. Crafted with ❤️ by Farhan Ahmed
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
