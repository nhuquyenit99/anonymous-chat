import React from "react";
import { UserModel } from "models";
import avatar from "assets/images/avatar.svg";

export function UserItem({ data }: { data: UserModel }) {
  return (
    <div key={data.id}>
      <img src={avatar} />
      <p>{data.username}</p>
    </div>
  );
}
