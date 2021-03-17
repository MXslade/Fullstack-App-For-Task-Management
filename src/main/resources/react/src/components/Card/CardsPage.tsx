import React from "react";
import { AddCardForm } from "./AddCardForm";
import { CardList } from "./CardList";
import { SearchCardForm } from "./SearchCardForm";

export const CardsPage: React.FC = () => {
  return (
    <div className="flex w-9/12 flex-col mx-auto mt-4">
      <SearchCardForm />
      <AddCardForm />
      <CardList />
    </div>
  );
};
