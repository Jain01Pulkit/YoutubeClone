import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../slices/AppSlice";
import { SEARCH_SUGGESTIONS } from "../constants";
import { cacheResults } from "../slices/searchCacheSlice";
import { setUserData, viewProfileModal } from "../slices/UserSlice";
import ProfileModal from "./ProfileModal";
import { GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const cachedResults = useSelector((state) => state.search);
  const userData = useSelector((state) => state.user.userData);
  const isOpen = useSelector((state) => state.user.isClicked);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (cachedResults[searchQuery])
        setSuggestions(cachedResults[searchQuery]);
      else getSearchSuggestions();
    }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(SEARCH_SUGGESTIONS + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const handleUserInfo = () => {
    dispatch(viewProfileModal(!isOpen));
  };

  const handleUserLogin = async (response) => {
    const decodedData = await jwtDecode(response.credential);
    dispatch(setUserData(decodedData));
  };

  return (
    <>
      <div className="grid grid-flow-col p-4 m-2 shadow-lg w-[97%]">
        <div className="flex">
          <img
            onClick={() => toggleMenuHandler()}
            className="h-8 col-span-1 cursor-pointer"
            src="https://icon-library.com/images/hamburger-menu-icon-png/hamburger-menu-icon-png-11.jpg   "
            alt="hamburger menu"
          />
          <a href="/">
            <img
              className="h-10 pl-1 mx-2"
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            />
          </a>
        </div>
        <div className="relative col-span-10 px-10">
          <div>
            <input
              className="px-5 w-1/2 border border-gray-400 p-2 rounded-l-full"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              onInput={() => setShowSuggestions(true)}
              onBlur={() => setShowSuggestions(false)}
            />
            <button className="px-5 py-2 border border-gray-400 rounded-r-full bg-gray-100">
              Search
            </button>
          </div>
          {showSuggestions ? (
            <div className="absolute bg-white py-2 px-2 w-[47rem] shadow-lg rounded-lg border border-gray-100">
              <ul>
                {suggestions.map((value) => (
                  <li
                    key={value}
                    className="py-2 px-3 shadow-sm hover:bg-gray-100"
                  >
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="relative col-span-1">
          <img
            className="h-8 cursor-pointer"
            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
            alt="user"
            onClick={() => handleUserInfo()}
          />
          {/* <span onClick={() => handleUserLogin()}>Sign In</span> */}

          {isOpen ? (
            <div className="flex p-2 m-2 absolute border border-white-200 bg-white w-[12rem]">
              <ProfileModal userData={userData} />
            </div>
          ) : null}
        </div>
        {Object.keys(userData).length == 0 ? (
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              handleUserLogin(credentialResponse);
            }}
            theme="filled_blue"
            type="icon"
            onError={() => {
              console.log("Login Failed");
            }}
          />
        ) : null}
      </div>
    </>
  );
};

export default Header;
