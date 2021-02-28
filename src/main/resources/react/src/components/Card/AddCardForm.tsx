import React, { useState, useContext } from "react";
import { Row, Col, message } from "antd";
import { cardApi } from "../../utils/api/api";
import { ICard } from "../../utils/interfaces/interfaces";
import { CardsContext } from "../../App";

export const AddCardForm: React.FC = () => {
  const { cards, setCards } = useContext(CardsContext);

  const [cardName, setCardName] = useState<string>("");

  const handleAddNewCardClick = () => {
    cardApi
      .createNewCard({ name: cardName, addedDate: new Date(Date.now()) })
      .then((response) => {
        if (response.status === 200) {
          const card: ICard = response.data;
          const copy = cards.slice();
          copy.push(card);
          setCards(copy);

          message.success("New card added successfully!");
          setCardName("");
        } else {
          message.error("Something went wrong while creating card!");
        }
      });
  };

  return (
    <Row className="mb-8">
      <Col span={12} offset={6}>
        <div className="shadow-lg px-8 py-8">
          <input
            type="text"
            className="w-full border-b-2 mb-4 focus:outline-none focus:border-green-500"
            placeholder="Create new card"
            value={cardName}
            onChange={(event) => setCardName(event.target.value)}
          />
          <button
            className="bg-green-500 hover:bg-green-400 focus:bg-green-400 focus:outline-none px-4 py-1 text-white rounded"
            onClick={handleAddNewCardClick}
          >
            Add New +
          </button>
        </div>
      </Col>
    </Row>
  );
};
