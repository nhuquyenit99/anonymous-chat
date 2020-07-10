import React, { Children } from "react";
import { BasePanel, UserItem, BaseList } from "components";
import { UserModel } from "models";

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
      <BasePanel title={`Favorite (${data.length})`}>
        <BaseList<UserModel> data={data} Item={UserItem} />
      </BasePanel>
    </div>
  );
}
