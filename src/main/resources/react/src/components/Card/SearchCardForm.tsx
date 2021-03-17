import React, { useState, useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { cardApi } from "../../utils/api/api";
import { CardsContext } from "../../App";

export const SearchCardForm: React.FC = () => {
  const { setCards } = useContext(CardsContext);

  const [searchText, setSearchText] = useState<string>("");

  const handleSearch = (event?: React.KeyboardEvent<HTMLInputElement>) => {
    if (event && event.key !== "Enter") {
      return;
    }
    if (searchText.length === 0) {
      cardApi.getAllCards().then((response) => {
        if (response.status === 200) {
          setCards(response.data);
        }
      });
    } else {
      cardApi.searchCards(searchText).then((response) => {
        if (response.status === 200) {
          setCards(response.data);
        }
      });
    }
  };

  return (
    <div className="w-full mb-8 bg-blue-600 p-4 text-white flex items-center text-base">
      <SearchOutlined className="-mr-4" onClick={() => handleSearch()} />
      <input
        className="w-full bg-transparent border-b-2 border-transparent focus:outline-none focus:border-white pl-6"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
        onKeyDown={handleSearch}
      />
    </div>
  );
};
