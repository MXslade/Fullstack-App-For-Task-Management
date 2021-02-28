import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "antd/dist/antd.css";
import { Header } from "./components/shared/Header";
import { CardsPage } from "./components/Card/CardsPage";
import { ICard } from "./utils/interfaces/interfaces";
import { CardDetails } from "./components/Card/CardDetails";
import { cardApi } from "./utils/api/api";

interface CardsContextInterface {
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  loadCards: () => void;
}

export const CardsContext = React.createContext<CardsContextInterface>({
  cards: [],
  setCards: () => {},
  loadCards: () => {},
});

const App: React.FC = () => {
  const [cards, setCards] = useState<ICard[]>([]);

  const loadCards = () => {
    cardApi.getAllCards().then((response) => {
      if (response.status === 200) {
        setCards(response.data);
      }
    });
  };

  return (
    <CardsContext.Provider
      value={{ cards: cards, setCards: setCards, loadCards: loadCards }}
    >
      <Router>
        <Header />
        <Switch>
          <Route exact path={["/", "/all-cards"]}>
            <CardsPage />
          </Route>
          <Route
            exact
            path={"/details/:id(\\d+)"}
            render={({ match }) => <CardDetails id={match.params.id} />}
          />
        </Switch>
      </Router>
    </CardsContext.Provider>
  );
};

export default App;
