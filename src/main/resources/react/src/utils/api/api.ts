import axios from "axios";
import { ICard, ICardTask } from "../interfaces/interfaces";

const instance = axios.create({
  baseURL: "http://localhost:8080/api/",
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("jwt_token");
  if (token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
  searchCards(text: string) {
    return instance.get(`search-cards/${text}`);
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

export const authApi = {
  authenticate(email: string, password: string) {
    return axios.post("http://localhost:8080/auth", {
      email: email,
      password: password,
    });
  },
  register(fullName: string, email: string, password: string) {
    return instance.post("register", {
      fullName: fullName,
      email: email,
      password: password,
    });
  },
  getUserData() {
    return instance.get(`user-data`);
  },
  updateProfileData(email: string, fullName: string) {
    return instance.post("update-profile-data", {
      email: email,
      fullName: fullName,
    });
  },
  updatePassword(email: string, oldPassword: string, newPassword: string) {
    return instance.post("update-password", {
      email: email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    });
  },
};
