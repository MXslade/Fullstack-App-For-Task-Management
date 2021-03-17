import React, { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import { Card } from "./Card";
import { CardsContext } from "../../App";

export const CardList: React.FC = () => {
  const { cards, setCards, loadCards } = useContext(CardsContext);

  useEffect(() => {
    loadCards();
  }, []);

  if (cards.length === 0) {
    return (
      <div
        style={{
          height: "10rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "xx-large",
        }}
      >
        Results Not Found
      </div>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {cards.map((card) => (
        <Col key={card.id} span={8}>
          <Card card={card} />
        </Col>
      ))}
    </Row>
  );
};
