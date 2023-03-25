import spinner from "../assets/spinner.svg";

import React from "react";

const Spinner = () => {
  return (
    <div className="grid place-items-center fixed z-50 top-0 left-0 right-0 bottom-0">
      <div>
        <img
          height={100}
          width={100}
          className={"h-28 w-28"}
          src={spinner}
          alt="Loading..."
        />
      </div>
    </div>
  );
};

export default Spinner;
