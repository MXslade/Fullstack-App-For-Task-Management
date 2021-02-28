import React, { useState } from "react";
import { message } from "antd";
import { cardApi } from "../../utils/api/api";

export const AddCardTaskForm: React.FC<{
  cardId: number;
  update: () => void;
}> = ({ cardId, update }) => {
  const [taskDescription, setTaskDescription] = useState<string>("");

  const handleAddNewTaskClick = () => {
    cardApi
      .createNewCardTask(cardId, {
        description: taskDescription,
        addedDate: new Date(Date.now()),
        done: false,
      })
      .then((response) => {
        if (response.status === 200) {
          message.success("New task was added successfully!");
          update();
        } else {
          message.error("Something went wrong while adding task!");
        }
      });
  };

  return (
    <div className="w-full shadow-lg px-8 py-8">
      <input
        type="text"
        className="w-full border-b-2 mb-4 focus:outline-none focus:border-green-500"
        placeholder="Create new task"
        value={taskDescription}
        onChange={(event) => setTaskDescription(event.target.value)}
      />
      <button
        className="bg-green-500 hover:bg-green-400 focus:bg-green-400 focus:outline-none px-4 py-1 text-white rounded"
        onClick={handleAddNewTaskClick}
      >
        Add New Task +
      </button>
    </div>
  );
};
