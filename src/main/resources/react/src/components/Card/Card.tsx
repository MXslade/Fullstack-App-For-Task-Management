import React, { ReactElement, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Popconfirm, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { CardEditModal } from "./CardEditModal";
import { ICard } from "../../utils/interfaces/interfaces";
import { cardApi } from "../../utils/api/api";
import { CardsContext } from "../../App";

export const Card: React.FC<{ card: ICard }> = ({ card }) => {
  const { cards, setCards, loadCards } = useContext(CardsContext);

  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  const handleDeleteCardClick = () => {
    if (card.id) {
      cardApi.deleteCard(card.id).then((response) => {
        if (response.status === 200) {
          message.success("Card was deleted successfully!");
          loadCards();
        } else {
          message.error("Something went wrong while deleting card!");
        }
      });
    }
  };

  const menu: ReactElement = (
    <Menu>
      <Menu.Item
        className="flex items-center"
        onClick={() => setEditModalVisible(true)}
      >
        <EditOutlined />
        Edit
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item className="flex items-center">
        <Popconfirm
          title="Are you sure to delete this card?"
          onConfirm={handleDeleteCardClick}
        >
          <DeleteOutlined /> Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="flex border-1 shadow-lg px-4 py-8 flex-col">
        <p className="text-lg mb-1">{card.name}</p>
        <div className="flex justify-between">
          <Link
            to={`/details/${card.id}`}
            className="uppercase text-blue-600 font-semibold hover:text-blue-800 text-base mb-1"
          >
            Details
          </Link>
          <Dropdown overlay={menu} trigger={["click"]}>
            <EllipsisOutlined rotate={90} className="text-lg" />
          </Dropdown>
        </div>
        <p className="mb-0 text-xs text-gray-800">{card.addedDate}</p>
      </div>
      <CardEditModal
        card={card}
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        update={loadCards}
      />
    </>
  );
};
