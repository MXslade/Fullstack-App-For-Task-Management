import React from "react";
import { Divider, Switch } from "antd";
import { ICardTask } from "../../utils/interfaces/interfaces";
import { DeleteOutlined } from "@ant-design/icons";

interface Props {
  task: ICardTask;
  updateTask: (cardTask: ICardTask) => void;
  deleteTask: (cardTask: ICardTask) => void;
}

export const Task: React.FC<Props> = ({ task, updateTask, deleteTask }) => {
  return (
    <div className="w-full w-full shadow-lg px-8 py-8 mb-4">
      <div className="mb-4 flex justify-between align-center">
        <p className="mb-0">{task.description}</p>
        <DeleteOutlined onClick={() => deleteTask(task)} />
      </div>
      <p className="text-xs text-gray-400">{task.addedDate}</p>
      <Divider />
      <Switch
        checked={task.done}
        onChange={(event) => updateTask({ ...task, done: event })}
      />
    </div>
  );
};
