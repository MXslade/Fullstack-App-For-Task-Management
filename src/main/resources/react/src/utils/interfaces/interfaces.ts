export interface ICardTask {
  id?: number;
  description: string;
  addedDate: Date;
  done: boolean;
}

export interface ICard {
  id?: number;
  name: string;
  addedDate: Date;
  cardTasks?: ICardTask[];
}

export interface IRole {
  id: number;
  name: "admin" | "manager" | "user";
}

export interface IUser {
  id?: number;
  email: string;
  password?: string;
  fullName: string;
  roles: IRole[];
}
