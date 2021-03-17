import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import "antd/dist/antd.css";
import { Header } from "./components/shared/Header";
import { CardsPage } from "./components/Card/CardsPage";
import { ICard, IUser } from "./utils/interfaces/interfaces";
import { CardDetails } from "./components/Card/CardDetails";
import { authApi, cardApi } from "./utils/api/api";
import { WelcomePage } from "./components/Welcome/WelcomePage";
import { RegisterPage } from "./components/RegisterLogin/RegisterPage";
import { LoginPage } from "./components/RegisterLogin/LoginPage";
import { ProfilePage } from "./components/Profile/ProfilePage";

interface CardsContextInterface {
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  loadCards: () => void;
}

interface AuthContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: IUser | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export const CardsContext = React.createContext<CardsContextInterface>({
  cards: [],
  setCards: () => {},
  loadCards: () => {},
});

export const AuthContext = React.createContext<AuthContextInterface>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  currentUser: null,
  setCurrentUser: () => {},
});

const App: React.FC = () => {
  const history = useHistory();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const [cards, setCards] = useState<ICard[]>([]);

  const loadCards = () => {
    cardApi.getAllCards().then((response) => {
      if (response.status === 200) {
        setCards(response.data);
      }
    });
  };

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwt_token");
    if (jwtToken !== null) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const jwtToken = window.localStorage.getItem("jwt_token");
    if (isAuthenticated && jwtToken) {
      authApi.getUserData().then((response) => {
        if (response.status === 200) {
          setCurrentUser(response.data);
        }
      });
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        currentUser: currentUser,
        setCurrentUser: setCurrentUser,
      }}
    >
      <CardsContext.Provider
        value={{ cards: cards, setCards: setCards, loadCards: loadCards }}
      >
        <Router>
          <Header />
          <Switch>
            <div className="flex w-full justify-center">
              <div className="flex w-9/12">
                <Route exact path={"/welcome-page"}>
                  <WelcomePage />
                </Route>
                <Route exact path={"/register"}>
                  <RegisterPage />
                </Route>
                <Route exaxt path={"/login"}>
                  <LoginPage />
                </Route>
                {isAuthenticated ? (
                  <>
                    <Route exact path={["/", "/all-cards"]}>
                      <CardsPage />
                    </Route>
                    <Route
                      exact
                      path={"/details/:id(\\d+)"}
                      render={({ match }) => (
                        <CardDetails id={match.params.id} />
                      )}
                    />
                    <Route exact path={"/profile"}>
                      <ProfilePage />
                    </Route>
                  </>
                ) : (
                  <Redirect to={{ pathname: "/welcome-page" }} />
                )}
              </div>
            </div>
          </Switch>
        </Router>
      </CardsContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
