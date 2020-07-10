import React, { ComponentType } from "react";
import { MinimalItemData } from "models";
import avatar from "assets/images/avatar.svg";
import "./style.scss";

type BaseListProps<T extends MinimalItemData = MinimalItemData> = {
  data: Array<T>;
  Item: React.ComponentType<{ data: T }>;
  className?: string;
};

export function BaseList<T extends MinimalItemData = MinimalItemData>({
  data,
  Item,
  className,
}: BaseListProps<T>) {
  function renderItem() {
    return data.map((item) => <Item data={item} key={item.id} />);
  }
  return (
    <div className={["base-list", className].join(" ")}>{renderItem()}</div>
  );
}
