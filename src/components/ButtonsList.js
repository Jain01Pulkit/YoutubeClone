import React from "react";
import Button from "./Button";
import { useSelector } from "react-redux";

const buttonsList = [
  "All",
  "Gaming",
  "Songs",
  "Live",
  "Soccer",
  "Cricket",
  "Cooking",
  "Valentines",
  "JavaScript",
  "React",
  "One Day International",
  "Data Structures",
  "Sport League",
  "Recently Uploaded",
  "Lo-fi",
];
const ButtonsList = () => {
  const toggleState = useSelector((state) => state.app.isMenuOpen);
  return (
    <div className={`flex w-[${toggleState ? "3px" : "10px"}]`}>
      {buttonsList.map((item, index) => (
        <Button type="normal" key={index} name={item} />
      ))}
    </div>
  );
};

export default ButtonsList;
