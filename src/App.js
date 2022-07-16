import React from "react";
import Styled from "./App.module.scss";
import Input from "./components/Input/Input";
import CardList from "./components/CardList/CardList";
import { useCitiesList } from "./hooks/useCitiesList";
import { Routes, Route } from "react-router-dom";
import SingleCity from "./components/SingleCity/SingleCity";

export const GlobalContext = React.createContext();

function App() {
  const [state, dispatch] = useCitiesList();

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      <div className={Styled.Main}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Input />
                <CardList />
              </>
            }
          />
          <Route path="/city/:city" element={<SingleCity />} />
        </Routes>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
