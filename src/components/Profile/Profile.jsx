import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Link, NavLink } from "react-router-dom";
import Popup from "../Popup/Popup";
import arrow from "../../images/arrow_left.svg";
import Navigation from "../Navigation/Navigation";
import Hashtags from "../Hashtags/Hashtags";
import ProfilePosts from "./Posts/Profile/ProfilePosts";
import Media from "./Media/Media";
import profile from "../../images/profile_logo2.svg";
import geo from "../../images/geo.svg";
import age from "../../images/age.svg";
import edit from "../../images/edit.svg";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfileActionCreator } from "../../redux/profile-reducer";
import * as axios from "axios";
import Preloader from "../Preloader/Preloader";

function Profile(props) {
  const [post, setPost] = useState("ProfilePosts");

  const handleProfilePostsClick = () => {
    setPost("ProfilePosts");
  };

  const handleProfileMediaClick = () => {
    setPost("SocialMedia");
  };

  const [like, setLike] = useState(42),
    [isLike, setIsLike] = useState(false),
    onLikeButtonClick = () => {
      setLike(like + (isLike ? -1 : 1));
      setIsLike(!isLike);
    };

  const activeColorLike = "profile__button_logo-color";
  const inactiveColorLike = "profile__button_logo";
  const activeColorPost = "profile__button_post";
  const inactiveColorPost = "profile__button_post-color";

  const [isPopup, setIsPopup] = useState(false);

  const handlePopupClick = () => {
    setIsPopup("popupEdit");
  };

  const dispatch = useDispatch();

  const setUserProfile = (users) => {
    dispatch(setUserProfileActionCreator(users));
  };

  const profileUser = useSelector((state) => state.profilePage.profile);

  useEffect(() => {
    if (profileUser.length === 0) {
      axios
      .get("https://social-network.samuraijs.com/api/1.0/profile/2")
      .then((res) => {
        setUserProfile(res.data)
      })
    }
  })

  return (
    <div className="profile">
      <Navigation
        classHome={`${"navigation__button"}`}
        classTeams={`${"navigation__button"}`}
        classMessages={`${"navigation__button"}`}
        classProfile={`${"navigation__button_active"}`}

        classHomePath={`${"navigation__inactive"}`}
        classTeamsPath={`${"navigation__inactive"}`}
        classMessagesPath={`${"navigation__inactive"}`}
        classProfilePath={`${"navigation__active"}`}
      />
      <div className="profile__container">
        <div className="profile__wrap">
          <Link to="/" className="profile__wrapper">
            <img className="profile__arrow" src={arrow} alt="arrow" />
            <p className="profile__back">Home</p>
          </Link>
          <p className="profile__title">My profile</p>
        </div>
        <div className="profile__information_wrap">
          <div className="profile__information_wrapper">
            <img className="profile__logo" src={profileUser && profileUser.photos && profileUser.photos.small} alt="logo" />
            <div className="profile__wrap_name">
              <div className="profile__wrapper_name">
                <p className="profile__name_title">{profileUser.fullName}</p>
                <img
                  className="profile__name_logo"
                  src={edit}
                  alt="edit"
                  onClick={handlePopupClick}
                />
              </div>
              <p className="profile__name_subtitle">@{profileUser.userId}</p>
            </div>
          </div>
          <p className="profile__information_text">{profileUser.aboutMe}</p>
          <div className="profile__buttons_wrap">
            <button className="profile__button">
              <img className="profile__button_logo" src={geo} alt="geo" />
              <p className="profile__button_text">Karaganda, Kazakhstan</p>
            </button>
            <button className="profile__button">
              <img className="profile__button_logo" src={age} alt="age" />
              <p className="profile__button_text">18 yo</p>
            </button>
            <button className="profile__button" onClick={onLikeButtonClick}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={isLike ? activeColorLike : inactiveColorLike}
                  d="M20 8H14.388L15.511 4.633C15.713 4.025 15.611 3.351 15.236 2.831C14.861 2.311 14.253 2 13.612 2H12C11.703 2 11.422 2.132 11.231 2.36L6.531 8H4C2.897 8 2 8.897 2 10V19C2 20.103 2.897 21 4 21H17.307C17.7139 20.9986 18.1108 20.8738 18.4452 20.6421C18.7797 20.4103 19.0359 20.0825 19.18 19.702L21.937 12.351C21.9789 12.2387 22.0002 12.1198 22 12V10C22 8.897 21.103 8 20 8ZM4 10H6V19H4V10ZM20 11.819L17.307 19H8V9.362L12.468 4H13.614L12.052 8.683C12.0013 8.83332 11.9871 8.99355 12.0107 9.15043C12.0343 9.3073 12.095 9.45629 12.1877 9.58504C12.2803 9.71379 12.4024 9.8186 12.5436 9.89076C12.6849 9.96293 12.8414 10.0004 13 10H20V11.819Z"
                  fill="#000000"
                />
              </svg>
              <p className="profile__button_text">{like}</p>
            </button>
          </div>
        </div>
        <div className="profile__button_wrapper">
          <button
            className={post === "ProfilePosts" ? inactiveColorPost : activeColorPost}
            onClick={handleProfilePostsClick}
          >Page posts</button>
          <button
            className={post === "SocialMedia" ? inactiveColorPost : activeColorPost}
            onClick={handleProfileMediaClick}
          >Social Media</button>
        </div>
        {post === "ProfilePosts" && <ProfilePosts />}
        {post === "SocialMedia" && <Media 
        instagram={profileUser.contacts.instagram} 
        twitter={profileUser.contacts.twitter} 
        telegram={profileUser.contacts.telegram}/>}
        {isPopup === "popupEdit" && <Popup close={setIsPopup} />}
      </div>
      <Hashtags />
    </div>
  );
}

export default Profile;
