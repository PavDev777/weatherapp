import React from "react";

export const useWeather = (city) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const asyncData = async () => {
      if (city) {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );

        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          setData(null);
        }
      }
    };
    asyncData();
  }, [city]);
  return data;
};
