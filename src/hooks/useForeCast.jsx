import React from "react";

export const useForeCast = (coords) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const asyncData = async () => {
      if (coords !== null) {
        const { lat, lon } = coords;
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=alerts,current,minutely,hourly&appid=${process.env.REACT_APP_API_KEY}&units=metric`
        );
        if (response.ok) {
          const data = await response.json();
          setData(data);
        }
      }
    };
    asyncData();
  }, [coords]);
  return data;
};
