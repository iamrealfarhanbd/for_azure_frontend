import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import React from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { Link } from "react-router-dom";
function VideoUploadBtn() {
  const currentPathname = window.location.pathname;
  const [inputValue, setInputValue] = React.useState(""); // Local state for search input
  const setSearchTerm = useAuthStore((state) => state.setSearchTerm);
  const userInfo = useAuthStore((state) => state.userInfo);
  console.log(userInfo);
  const setFeed = useAuthStore((state) => state.setFeed);
  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      setSearchTerm(inputValue); // Update Zustand store's searchTerm
      await setFeed(); // Fetch videos based on the updated searchTerm
    }
  };
  return (
    <div
      className={`w-full flex justify-between items-center space-x-2 px-5 py-2 ${
        currentPathname === "/video/create" && "hidden"
      }`}
    >
      <input
        className="w-full py-2 px-2 rounded-md outline-gray-500 text-[14px]"
        type="text"
        placeholder="Search"
        onChange={(e) => setInputValue(e.target.value)} // Update input value
        onKeyDown={handleKeyDown} // Trigger search on Enter
      />
      {userInfo.userType !== "VIEWER" && userInfo.userType !== undefined && (
        <Link
          to="/video/create"
          className="w-full flex justify-between items-center"
        >
          <Button className="w-full flex justify-center items-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-md py-2 px-4 hover:from-purple-600 hover:to-indigo-600">
            <span>Upload Video</span> <IoIosCloudUpload />
          </Button>
        </Link>
      )}
    </div>
  );
}

export default VideoUploadBtn;
