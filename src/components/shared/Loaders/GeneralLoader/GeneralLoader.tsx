import { Triangle } from "react-loader-spinner";
function GeneralLoader() {
  return (
    <div className="inline-flex flex-col justify-center items-center">
      <Triangle
        height="30"
        width="30"
        visible={true}
        color="silver"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
      <span className="text-[12px] font-semibold tracking-wider">Loading</span>
    </div>
  );
}

export default GeneralLoader;
