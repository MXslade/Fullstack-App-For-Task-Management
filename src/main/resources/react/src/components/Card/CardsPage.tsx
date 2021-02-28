import React from "react";
import { AddCardForm } from "./AddCardForm";
import { CardList } from "./CardList";

export const CardsPage: React.FC = () => {
  return (
    <div className="px-96 pt-4">
      <AddCardForm />
      <SearchCardForm />
      <CardList />
    </div>
  );
};
