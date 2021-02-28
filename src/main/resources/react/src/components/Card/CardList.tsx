import React, { useEffect, useContext } from "react";
import { Row, Col } from "antd";
import { Card } from "./Card";
import { CardsContext } from "../../App";

export const CardList: React.FC = () => {
  const { cards, setCards, loadCards } = useContext(CardsContext);

  useEffect(() => {
    loadCards();
  }, []);

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
