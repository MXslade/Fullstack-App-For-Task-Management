import React from "react";
import { AddCardForm } from "./AddCardForm";
import { CardList } from "./CardList";
import { SearchCardForm } from "./SearchCardForm";

export const CardsPage: React.FC = () => {
  return (
    <div className="px-96 pt-4">
      <SearchCardForm />
      <AddCardForm />
      <CardList />
    </div>
  );
};
