import React, { useEffect, useState, useContext } from "react";
import avatar from "assets/images/avatar-lighter.svg";
import { UserForm } from "./user-form";
import { UserContext } from "context";
import "./style.scss";

export function UserInfoPanel() {
  const user = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [userBio, setUserBio] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [inputUsername, setInputUserName] = useState("");
  const [inputUserBio, setInputUserBio] = useState("");

  useEffect(() => {
    const userInfoString = localStorage.getItem("user-info");
    if (userInfoString) {
      user.auth = true;
      const userInfo = JSON.parse(userInfoString);
      user.userId = userInfo.userId;
      setUsername(userInfo.username);
      setUserBio(userInfo.userBio);
    } else {
      setUsername("Username");
      setUserBio("Life as a beautiful flower.");
    }
    setInputUserName(username);
    setInputUserBio(userBio);
  }, []);

  const UsernameChangeHandler = (e: any) => {
    const text = e.target.value;
    if (text !== "") {
      setInputUserName(text);
    }
  };

  const UserBioChangeHandler = (e: any) => {
    const text = e.target.value;
    if (text !== "") {
      setInputUserBio(text);
    }
  };

  const EditedHandler = () => {
    if (inputUsername === "" || inputUserBio === "") {
      alert("Please input both of username and bio!");
    } else {
      setUsername(inputUsername);
      setUserBio(inputUserBio);
      setEditMode(false);
      if (user.auth === false) {
        user.auth = true;
      }
      const userInfo = {
        userId: user.userId,
        username: inputUsername,
        userBio: inputUserBio,
      };
      console.log(userInfo);
      const userInfoString = JSON.stringify(userInfo);
      localStorage.setItem("user-info", userInfoString);
    }
  };
  return (
    <div className="user-info-panel">
      <div className="user-info-body">
        <div className="user-info-content">
          <img className="avatar" src={avatar} />
          <p className="username">{username}</p>
          <p className="bio">{userBio}</p>
        </div>
        {editMode ? (
          <div>
            <button className="btn-left-top" onClick={() => setEditMode(false)}>
              Cancel
            </button>
            <button className="btn-right-top" onClick={EditedHandler}>
              OK
            </button>
          </div>
        ) : (
          <button className="btn-right-top" onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
      </div>
      {editMode ? (
        <UserForm
          changeUsername={UsernameChangeHandler}
          changeBio={UserBioChangeHandler}
        />
      ) : user.auth ? (
        <button className="btn-add-favorite">Favorite</button>
      ) : null}
    </div>
  );
}
