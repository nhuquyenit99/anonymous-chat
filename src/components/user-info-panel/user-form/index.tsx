import React from "react";
import "./style.scss";

export function UserForm({ changeUsername, changeBio }: any) {
  return (
    <div className="user-form">
      <div className="field">
        <label className="label">User Name</label>
        <input
          className="text-input"
          type="text"
          placeholder="Input your name here"
          onChange={(e) => changeUsername(e)}
        />
      </div>
      <div className="field">
        <label className="label">User Bio</label>
        <textarea
          className="text-input textarea"
          placeholder="Input your bio here"
          onChange={(e) => changeBio(e)}
        />
      </div>
    </div>
  );
}
