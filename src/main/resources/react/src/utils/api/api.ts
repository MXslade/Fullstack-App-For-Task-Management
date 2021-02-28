import axios from "axios";
import { ICard, ICardTask } from "../interfaces/interfaces";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

export const cardApi = {
  getAllCards() {
    return instance.get("cards");
  },
  createNewCard(card: ICard) {
    return instance.post("cards", card);
  },
  deleteCard(cardId: number) {
    return instance.delete(`cards/${cardId}`);
  },
  updateCard(card: ICard) {
    return instance.put(`cards/${card.id}`, card);
  },
  getCardById(cardId: number) {
    return instance.get(`cards/${cardId}`);
  },
  getAllCardTasks(cardId: number) {
    return instance.get(`card-tasks/${cardId}`);
  },
  createNewCardTask(cardId: number, cardTask: ICardTask) {
    return instance.post(`card-tasks/${cardId}`, cardTask);
  },
  updateCardTask(cardTaskId: number, cardTask: ICardTask) {
    return instance.put(`card-tasks/${cardTaskId}`, cardTask);
  },
  deleteTask(cardTaskId: number) {
    return instance.delete(`card-tasks/${cardTaskId}`);
  },
};
