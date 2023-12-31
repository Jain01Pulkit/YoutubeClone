import React from "react";

const Button = ({ name, type }) => {
  return (
    <div>
      <button
        className={
          type == "rounded"
            ? "px-5 py-2 m-2 bg-gray-200 rounded-full"
            : "px-5 py-2 m-2 bg-gray-200 rounded-lg hover:bg-gray-100"
        }
      >
        {name}
      </button>
    </div>
  );
};

export default Button;
