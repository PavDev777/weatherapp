import Styled from "./CardList.module.scss";
import Card from "../Card/Card";
import React from "react";
import { GlobalContext } from "../../App";

const CardList = () => {
  const {
    state: { citiesList },
  } = React.useContext(GlobalContext);

  return (
    <div className={Styled.CardList}>
      {citiesList?.map((city) => (
        <Card key={city.id} {...city} />
      ))}
    </div>
  );
};
export default CardList;
