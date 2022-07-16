import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../Card/Card";
import Styled from "./SingleCity.module.scss";
import { useForeCast } from "../../hooks/useForeCast";
import DailyCard from "../DailyCard/DailyCard";

const SingleCity = () => {
  const params = useParams();
  const [cityCoord, setCityCoord] = React.useState(null);
  const data = useForeCast(cityCoord);
  const navigate = useNavigate();

  return (
    <div className={Styled.Wrapper}>
      <button className={Styled.BackButton} onClick={() => navigate(-1)}>
        Go Back
      </button>
      <Card city={params.city} setCityCoord={setCityCoord} />
      {data && (
        <div className={Styled.DailyCards}>
          {data?.daily.map((dailyCard) => (
            <DailyCard key={dailyCard.dew_point} dailyCard={dailyCard} />
          ))}
        </div>
      )}
    </div>
  );
};
export default SingleCity;
