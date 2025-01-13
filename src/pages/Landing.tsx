import DefaultLayout from "@/layouts/DefaultLayout";
import VideoBox from "../components/shared/VideoBox/VideoBox";
import React from "react";
import { useAuthStore } from "@/store/auth-store";

function Landing() {

  const feed = useAuthStore((state) => state.feed);
  const setFeed = useAuthStore((state) => state.setFeed);
  const setPageNumber = useAuthStore((state) => state.setPageNumber);
  const page = useAuthStore((state) => state.page);

  const loadMoreVideos = async () => {
    setPageNumber(page + 1); // Increment page number
    await setFeed(); // Fetch and append more videos
  };

  React.useEffect(() => {
    setFeed(); // Load default feed on component mount
  }, []);
  return (
    <DefaultLayout>
      <div>
        {feed.map((videoData) => (
          <VideoBox vidData={videoData}></VideoBox>
        ))}
      </div>

      {feed.length > 1 && (
        <button
          onClick={loadMoreVideos}
          className="mt-5 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Load More
        </button>
      )}
    </DefaultLayout>
  );
}

export default Landing;
