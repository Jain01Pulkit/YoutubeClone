import React, { useEffect, useState } from "react";
import { YOUTUBE_VIDEOS } from "../constants";
import VideoCard from "./VideoCard";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = async () => {
    const result = await fetch(YOUTUBE_VIDEOS);
    const videos = await result.json();
    setVideos(videos.items);
  };
  return (
    <div className="flex flex-wrap">
      {videos.map((video) => (
        <Link
          key={video.id}
          to={"/watch?v=" + video.id}
          state={{ videoData: video }}
        >
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;
