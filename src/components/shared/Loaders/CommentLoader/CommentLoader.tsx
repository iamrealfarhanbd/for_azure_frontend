import { Comment } from "react-loader-spinner";
function CommentLoader() {
  return (
    <div className="inline-block">
      <Comment
        height="30"
        width="30"
        color="black"
        backgroundColor="silver"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
      />
    </div>
  );
}

export default CommentLoader;
