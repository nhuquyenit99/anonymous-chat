import React from "react";
import { BaseList, UserItem } from "components";
import { UserModel } from "models";
import { UserInfoPanel } from "components/user-info-panel";

export function ChatRoomPage() {
  const data = [
    {
      id: "adj",
      username: "username",
    },
    {
      id: "abc",
      username: "username",
    },
    {
      id: "ab",
      username: "username",
    },
  ];
  return (
    <div>
      <div>This is home page</div>
      <BaseList<UserModel> data={data} Item={UserItem} />
      <UserInfoPanel />
    </div>
  );
}
