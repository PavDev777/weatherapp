import React from "react";

const initialState = {
  citiesList: JSON.parse(localStorage.getItem("citiesList")) || [],
  inputValue: "",
  editingCity: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_CITY": {
      const newState = {
        ...state,
        citiesList: [...state.citiesList, action.payload],
      };
      return newState;
    }
    case "DELETE_CITY": {
      const oldArray = state.citiesList;
      const newArray = oldArray.filter((el) => el.id !== action.payload);
      return {
        ...state,
        citiesList: newArray,
        editingCity: initialState.editingCity,
        inputValue: initialState.inputValue,
      };
    }
    case "EDIT_CITY": {
      return {
        ...state,
        inputValue: action.payload,
        editingCity: action.payload,
      };
    }
    case "CHANGE_INPUT_VALUE": {
      return {
        ...state,
        inputValue: action.payload,
      };
    }
    case "RESET_INPUT_VALUE": {
      return {
        ...state,
        inputValue: initialState.inputValue,
        editingCity: initialState.editingCity,
      };
    }
    case "EDIT_CITY_DONE": {
      const { editingCity } = state;
      const oldArray = state.citiesList;
      const filteredArray = oldArray.filter((el) => el.city !== editingCity);
      const newArray = [...filteredArray, action.payload];
      return {
        ...state,
        citiesList: newArray,
        inputValue: initialState.inputValue,
        editingCity: initialState.editingCity,
      };
    }

    default:
      return initialState;
  }
};

export const useCitiesList = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { citiesList } = state;

  React.useEffect(() => {
    localStorage.setItem("citiesList", JSON.stringify(citiesList));
  }, [citiesList]);

  return [state, dispatch];
};
