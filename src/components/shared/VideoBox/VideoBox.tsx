import CommentBox from "../CommentBox/CommentBox";

function VideoBox({ vidData }) {
  return (
    <div className="w-full mb-5 pb-2 shadow-md  bg-purple-300 rounded-md overflow-hidden flex flex-wrap justify-between items-center">
      <div className="w-60 flex flex-col justify-center items-center  bg-purple-300 rounded-md m-3 border-2 border-pink-500">
        <p className="text-lg font-bold text-white">titile: {vidData.title}</p>
        <video
          className=" w-auto" // 300px for desktop, 260px for small screens
          autoPlay
          muted
          controls
          // src={demoVideo}
        >
          <source src={vidData.videoUrl} type="video/mp4" />
        </video>
        <div className="w-full">
          <CommentBox vidData={vidData}></CommentBox>
        </div>
      </div>
    </div>
  );
}

export default VideoBox;
