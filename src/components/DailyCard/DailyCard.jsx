import Styled from "./DailyCard.module.scss";
import React from "react";

const DailyCard = ({ dailyCard }) => {
  const {
    dt,
    weather,
    temp: { day },
  } = dailyCard;
  const { main, icon } = weather[0];
  const currentDate = new Date(dt * 1000);

  return (
    <div className={Styled.DailyCard}>
      <div>{currentDate.toString().split(" ")[0]}</div>
      <img
        className={Styled.Icon}
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="icon"
      />
      <div className={Styled.DailyDay}>{Math.round(day)}</div>
      <div className={Styled.DailyMain}>{main}</div>
    </div>
  );
};
export default DailyCard;
