import React from "react";
import { ThreeDots } from "react-loader-spinner";
const ImageLoader = () => {
  return (
    <>
      <ThreeDots
        height="80"
        width="50"
        radius="9"
        color="red"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </>
  );
};

export default ImageLoader;
