import React from "react";
import { Banner } from "./Banner";
import { SellingPoints } from "./SellingPoints";

export const WelcomePage: React.FC = () => {
  return (
    <div className="mt-4 w-full flex flex-col items-center">
      <Banner />
      <SellingPoints />
    </div>
  );
};
