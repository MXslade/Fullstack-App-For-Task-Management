import React, { useState, useContext } from "react";
import { message, Modal } from "antd";
import { ICard } from "../../utils/interfaces/interfaces";
import { cardApi } from "../../utils/api/api";

interface Props {
  card: ICard;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  update: () => void;
}

export const CardEditModal: React.FC<Props> = ({
  card,
  visible,
  setVisible,
  update,
}) => {
  const [newCardName, setNewCardName] = useState<string>(card.name);

  const handleCancelEditClick = () => {
    setNewCardName(card.name);
    setVisible(false);
  };

  const handleSaveEditClick = () => {
    const editedCard: ICard = { ...card, name: newCardName };
    cardApi.updateCard(editedCard).then((response) => {
      if (response.status === 200) {
        message.success("Card was successfully edited!");
        update();
      } else {
        message.error("Something went wrong while updating!");
      }
    });
  };

  return (
    <Modal
      visible={visible}
      onCancel={handleCancelEditClick}
      title={`Edit ${card.name}`}
      footer={
        <div>
          <button
            className="px-4 py-1 bg-red-500 text-white hover:bg-red-600 focus:bg-red-600 focus:outline-none"
            onClick={handleCancelEditClick}
          >
            Cancel
          </button>{" "}
          <button
            className="px-4 py-1 bg-green-500 text-white hover:bg-green-600 focus:bg-green-600 focus:outline-none"
            onClick={handleSaveEditClick}
          >
            Save
          </button>
        </div>
      }
    >
      <input
        type="text"
        placeholder="Input card name"
        value={newCardName}
        onChange={(event) => setNewCardName(event.target.value)}
        className="w-full border-b-2 mb-4 focus:outline-none focus:border-green-500"
      />
    </Modal>
  );
};
