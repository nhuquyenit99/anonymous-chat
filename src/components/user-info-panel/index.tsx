import React, { useEffect, useState } from "react";
import avatar from "assets/images/avatar-lighter.svg";
import { UserForm } from "./user-form";
import { AuthContext } from "context";
import "./style.scss";

export function UserInfoPanel() {
  const [username, setUsername] = useState("Username");
  const [userBio, setUserBio] = useState("Life as a beautiful flower.");
  const [editMode, setEditMode] = useState(false);
  const [auth, setAuth] = useState(false);

  const [inputUsername, setInputUserName] = useState("");
  const [inputUserBio, setInputUserBio] = useState("");

  const userInfoString = localStorage.getItem("user-info");

  useEffect(() => {
    if (userInfoString) {
      setAuth(true);
      const userInfo = JSON.parse(userInfoString);
      setUsername(userInfo.username);
      setUserBio(userInfo.userBio);
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
    setUsername(inputUsername);
    setUserBio(inputUserBio);
    setEditMode(false);
    if (auth === false) {
      setAuth(true);
    }
  };
  return (
    <div className="user-info-panel">
      <AuthContext.Provider value={auth} />
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
      ) : auth ? (
        <button className="btn-add-favorite">Favorite</button>
      ) : null}
    </div>
  );
}
