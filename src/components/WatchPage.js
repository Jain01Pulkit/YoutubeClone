import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeMenu } from "../slices/AppSlice";
import { useLocation, useSearchParams } from "react-router-dom";
import CommentsContainer from "./CommentsContainer";
import LiveChat from "./LiveChat";
import Button from "./Button";

const WatchPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [totalLikes, setLikes] = useState("");
  useEffect(() => {
    dispatch(closeMenu());
  }, []);
  const handleLikes = () => {
    setLikes(totalLikes + 1);
  };
  return (
    <div className="flex flex-col w-full">
      <div className="relative px-5 flex">
        <div>
          <iframe
            width="1200"
            height="600"
            src={"https://www.youtube.com/embed/" + searchParams.get("v")}
            title="abracadbra"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="absolute inset-x-[55rem] bottom-0 right-0 flex">
          <Button type="rounded" name={"Like"} onClick={() => handleLikes()} />
          <Button type="rounded" name={"Share"} />
          <Button type="rounded" name={"Subscribe"} />
        </div>
        <div className="w-full">
          <LiveChat />
        </div>
      </div>
      <CommentsContainer />
    </div>
  );
};

export default WatchPage;
