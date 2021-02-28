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
