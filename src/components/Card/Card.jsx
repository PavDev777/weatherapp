import React from "react";
import { useWeather } from "../../hooks/useWeather";
import Styled from "./Card.module.scss";
import { GlobalContext } from "../../App";
import { Link, useLocation } from "react-router-dom";

const Card = React.memo(({ city, id, setCityCoord }) => {
  const data = useWeather(city);
  const { dispatch } = React.useContext(GlobalContext);
  const location = useLocation();

  React.useEffect(() => {
    if (data && data.coord.lat && data.coord.lon && setCityCoord) {
      setCityCoord({
        lat: data.coord.lat,
        lon: data.coord.lon,
      });
    }
  }, [data, setCityCoord]);

  const handleOnClickDelete = (e) => {
    e.preventDefault();

    dispatch({
      type: "DELETE_CITY",
      payload: id,
    });
  };

  const handleOnClickEdit = (e) => {
    e.preventDefault();

    dispatch({
      type: "EDIT_CITY",
      payload: city,
    });
  };

  if (data === null) {
    return (
      <div className={Styled.Card}>
        <button className={Styled.Delete} onClick={handleOnClickDelete}>
          X
        </button>
        <button className={Styled.Edit} onClick={handleOnClickEdit}>
          Edit
        </button>
        <div className={Styled.MainInfo}>
          <div className={Styled.Title}>{city}</div>
          <div className={Styled.Description}>Not Found</div>
        </div>
      </div>
    );
  }

  if (!data) return null;
  const { name, weather, main } = data;
  const { description, icon } = weather[0];
  const { temp, humidity, feels_like } = main;

  if (location.pathname === `/city/${city}`) {
    return (
      <div className={Styled.Card}>
        <div className={Styled.MainInfo}>
          <img
            className={Styled.Icon}
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="icon"
          />
          <div className={Styled.Title}>{name}</div>
          <div className={Styled.Description}>{description}</div>
          <div className={Styled.Temperature}>{temp.toFixed()}</div>
        </div>
        <div className={Styled.Information}>
          <div> Humidity: {humidity} </div>
          <div> Feels like: {feels_like} </div>
        </div>
      </div>
    );
  }
  return (
    <Link className={Styled.Card} to={`/city/${city.toLowerCase()}`}>
      <button className={Styled.Delete} onClick={handleOnClickDelete}>
        X
      </button>
      <button className={Styled.Edit} onClick={handleOnClickEdit}>
        Edit
      </button>
      <div className={Styled.MainInfo}>
        <img
          className={Styled.Icon}
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="icon"
        />
        <div className={Styled.Title}>{name}</div>
        <div className={Styled.Description}>{description}</div>
        <div className={Styled.Temperature}>{temp.toFixed()}</div>
      </div>
      <div className={Styled.Information}>
        <div> Humidity: {humidity} </div>
        <div> Feels like: {feels_like} </div>
      </div>
    </Link>
  );
});
export default Card;
