import React, { ComponentType } from "react";
// import { List, Avatar } from "antd";
import avatar from "assets/images/avatar.svg";
// import "./style.scss";

type MinimalItemData = { id: string };

type BaseListProps<T extends MinimalItemData = MinimalItemData> = {
  data: Array<T>;
  Item: React.ComponentType<{ data: T }>;
};

export function BaseList<T extends MinimalItemData = MinimalItemData>({
  data,
  Item,
}: BaseListProps<T>) {
  function renderItem() {
    return data.map((item) => <Item data={item} key={item.id} />);
  }
  return <div>{renderItem()}</div>;
}
