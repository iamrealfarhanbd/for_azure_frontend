/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { BiLike, BiSolidLike } from "react-icons/bi";

import { IoIosShareAlt } from "react-icons/io";

import { AiOutlineMessage } from "react-icons/ai";
// import { BiLike, BiSolidLike } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";

import { MdFileDownload } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/store/auth-store";
import axios from "axios";
import { Button } from "@/components/ui/button";
function CommentBox({ vidData }) {
  console.log(vidData);
  // const [totalComments, setTotalComments] = React.useState(0);

  const userEmail = useAuthStore((state) => state.email);
  console.log(userEmail);

  const [liked, setIsLiked] = React.useState(vidData.likes.includes(userEmail));
  const [totalLikes, setTotalLikes] = React.useState(vidData.likes.length);
  const [totalCommentsCount, setTotalCommentsCount] = React.useState(
    vidData.comments.length
  );

  // const [liked, setLiked] = React.useState(false);
  const [showComment, setShowComment] = React.useState(false);

  const handleLiker = async (userEmail: string, vidId: string, likedStatus) => {
    // setLiked(!liked);
    const result = await axios.post(
      "https://backserver-bnb5f3exhpa8gte6.uksouth-01.azurewebsites.net/api/v1/video/likes",
      {
        userEmail,
        vidId,
      }
    );
    const newLikes = result.data.data.liked;
    const updatedLikes = result.data.data.result.likes.length;
    // likeUpdater(vidData.id, newLikes);
    console.log(totalLikes);
    setIsLiked(newLikes);
    setTotalLikes(updatedLikes);
  };

  const handleCommentSubmit = async () =>{
    setTotalCommentsCount(0);
  }
  return (
    <>
      <div className=" w-full py-2 px-3 flex space-x-2 justify-between">
        <div>{totalLikes} likes</div>
        <div>{totalCommentsCount} Comments</div>
      </div>
      <Separator className="my-1" />

      <div className="w-full  flex flex-row justify-between px-3 py-2">
        <div className="flex space-x-2">
          <div
            className="cursor-pointer"
            // onClick={() => handleLiker(userEmail as string, vidData.id)}
          >
            {liked !== true && (
              <div
                onClick={() => handleLiker(userEmail, vidData.id, liked)}
                className="flex items-center"
              >
                <BiLike /> <p className="ml-2">Like</p>
              </div>
            )}
            {liked === true && (
              <div
                onClick={() => handleLiker(userEmail, vidData.id, liked)}
                className="flex items-center"
              >
                <BiSolidLike /> <p className="ml-2">Unlike</p>
              </div>
            )}
          </div>
          <div
            onClick={() => setShowComment(!showComment)}
            className="flex items-center cursor-pointer"
          >
            <AiOutlineMessage />
            <p className="ml-2">Comments</p>
          </div>
        </div>
        <div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <BsThreeDots />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                <DropdownMenuItem>
                  <a
                    href={vidData.videoUrl}
                    download
                    className="flex items-center text-center text-[14px] cursor-pointer w-full justify-between"
                  >
                    Download Video <MdFileDownload className="ml-5" />
                  </a>
                </DropdownMenuItem>
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem>
                  <div className="flex items-center text-center text-[14px] cursor-pointer w-full justify-between">
                    Share <IoIosShareAlt className="ml-5" />
                  </div>
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {showComment === true && (
        <div className="bg-slate-50 w-full px-3 py-2 text-[14px]">
          {totalCommentsCount === 0 && (
            <div>
              <div>There are no comments</div>
              <form
                onSubmit={handleCommentSubmit}
                className="w-full flex  items-center space-x-2 mt-2"
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Type Here"
                  className="outline-none w-full py-2 px-1.5 rounded-lg"
                />
                <Button type="submit">Submit</Button>
              </form>
            </div>
          )}

          {totalCommentsCount > 0 && (
            <>
              <div className="flex space-x-1">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="w-full  ">
                  <div className="w-full bg-zinc-50 rounded-md px-2.5 py-1.5 mb-2">
                    <h4 className="text-[12px] text-black font-semibold">
                      Person Name
                    </h4>
                    <p className="text-[12px] text-black font-thin tracking-wider">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Quaerat, velit!
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-between font-extralight tracking-wide">
                    <div className="flex items-center space-x-1">
                      <div>20h</div>
                      <div>.</div>
                      <div>Like</div>
                    </div>
                    <div className="flex items-center">
                      <BiSolidLike className="text-blue-600" />
                      <div className="">20000</div>
                    </div>
                  </div>
                </div>
              </div>
              <form className="w-full flex  items-center space-x-2 mt-2">
                <input
                  type="text"
                  placeholder="Type Here"
                  className="outline-none w-full py-2 px-1.5 rounded-lg"
                />
                <Button type="submit">Submit</Button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default CommentBox;
