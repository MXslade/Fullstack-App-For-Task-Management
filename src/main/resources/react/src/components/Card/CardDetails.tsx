import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Divider, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { cardApi } from "../../utils/api/api";
import { ICard, ICardTask } from "../../utils/interfaces/interfaces";
import { CardEditModal } from "./CardEditModal";
import { AddCardTaskForm } from "./AddCardTaskForm";
import { CardsContext } from "../../App";
import { Task } from "./Task";

export const CardDetails: React.FC<{ id: number }> = ({ id }) => {
  const history = useHistory();
  const { cards, setCards } = useContext(CardsContext);

  const [card, setCard] = useState<ICard | null>(null);
  const [tasks, setTasks] = useState<ICardTask[]>([]);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  const getTasks = () => {
    if (card && card.id) {
      cardApi.getAllCardTasks(card.id).then((response) => {
        if (response.status === 200) {
          setTasks(response.data);
        }
      });
    }
  };

  const getCardDetails = () => {
    cardApi.getCardById(id).then((response) => {
      if (response.status === 200) {
        setCard(response.data);
      }
    });
  };

  const handleDeleteCardClick = () => {
    if (card && card.id) {
      cardApi.deleteCard(card.id).then((response) => {
        if (response.status === 200) {
          message.success("Card was deleted successfully!");
          setCards([...cards.filter((item) => item.id !== card.id)]);
          history.push("/");
        } else {
          message.error("Something went wrong while deleting card!");
        }
      });
    }
  };

  const updateTask = (task: ICardTask) => {
    if (task.id) {
      cardApi.updateCardTask(task.id, task).then((response) => {
        if (response.status === 200) {
          message.success("Task updated successfully!");
          const copy = tasks.filter((item) => item.id !== task.id);
          copy.push(response.data);
          setTasks(copy);
        } else {
          message.error("Something went wrong while updating!");
        }
      });
    }
  };

  const deleteTask = (task: ICardTask) => {
    if (task.id) {
      cardApi.deleteTask(task.id).then((response) => {
        if (response.status === 200) {
          message.success("Task was successfully deleted!");
          setTasks(tasks.filter((item) => item.id !== task.id));
        } else {
          message.error("Something went wrong while deleting task!");
        }
      });
    }
  };

  useEffect(() => {
    if (card) {
      getTasks();
    }
  }, [card]);

  useEffect(() => {
    getCardDetails();
  }, []);

  if (!card) {
    return (
      <div className="h-96 flex items-end justify-center">
        <LoadingOutlined />
      </div>
    );
  }

  return (
    <>
      <div className="w-4/5 pl-96">
        <div className="w-full my-8 bg-gray-600 px-4 pt-4 pb-4 text-white">
          <p className="text-xl font-light mb-1">{card.name}</p>
          <p className="font-light">{card.addedDate}</p>
          <Divider className="bg-gray-500" />
          <div>
            <button
              className="uppercase mr-4 font-bold hover:text-gray-400 focus:outline-none"
              onClick={() => setEditModalVisible(true)}
            >
              edit
            </button>
            <button
              className="uppercase font-bold hover:text-gray-400 focus:outline-none"
              onClick={handleDeleteCardClick}
            >
              delete
            </button>
          </div>
        </div>
        <AddCardTaskForm update={getCardDetails} cardId={id} />
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
      <CardEditModal
        card={card}
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        update={getCardDetails}
      />
    </>
  );
};
