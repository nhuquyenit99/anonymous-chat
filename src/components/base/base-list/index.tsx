import React from "react";
import { List, Avatar } from "antd";
import avatar from "assets/images/avatar.svg";
import "./style.scss";

type dataItem = {
  id: string;
  username: string;
  message: string;
};

type BaseListProps = {
  data: Array<dataItem>;
  extra: any;
};

export function BaseList({ data, extra }: BaseListProps) {
  return (
    <div className="item">
      {data.map((item) => (
        <div className="item-left">
          <img className="avatar" src={avatar} />
          <article className="content">
            <h3>{item.username}</h3>
            <p>{item.message}</p>
          </article>
        </div>
      ))}
      {extra}
    </div>
    // <List
    //   dataSource={data}
    //   renderItem={(item: any) => (
    //     <List.Item key={item.id} extra={extra}>
    //       <List.Item.Meta
    //         avatar={<Avatar size="small" src={avatar} />}
    //         title={<h3>{item.username}</h3>}
    //         description={item.message}
    //       />
    //     </List.Item>
    //   )}
    // />
  );
}
