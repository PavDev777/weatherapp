import React from "react";
import Styled from "./Input.module.scss";
import { GlobalContext } from "../../App";

const Input = () => {
  const ref = React.useRef(null);

  const {
    state: { inputValue, editingCity },
    dispatch,
  } = React.useContext(GlobalContext);

  const handleOnClick = () => {
    if (!inputValue) return;

    dispatch({
      type: "ADD_CITY",
      payload: {
        id: Math.floor(Math.random() * 100),
        city: inputValue,
      },
    });
    dispatch({
      type: "RESET_INPUT_VALUE",
    });
    ref.current.focus();
  };
  const handleOnKey = (e) => {
    if (e.key === "Enter" && inputValue && !editingCity) {
      dispatch({
        type: "ADD_CITY",
        payload: {
          id: Math.floor(Math.random() * 100),
          city: inputValue,
        },
      });
      dispatch({
        type: "RESET_INPUT_VALUE",
      });
      ref.current.focus();
    }
  };

  const handleOnChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT_VALUE",
      payload: e.target.value,
    });
  };

  const handleOnDone = () => {
    if (inputValue.length) {
      dispatch({
        type: "EDIT_CITY_DONE",
        payload: {
          id: Math.floor(Math.random() * 100),
          city: inputValue,
        },
      });
      dispatch({
        type: "RESET_INPUT_VALUE",
      });
      ref.current.focus();
    }
  };

  return (
    <div className={Styled.InputWrap}>
      <input
        className={Styled.Input}
        value={inputValue}
        onChange={handleOnChange}
        ref={ref}
        onKeyPress={handleOnKey}
      />

      {editingCity && inputValue ? (
        <button className={Styled.Button} onClick={handleOnDone}>
          Done
        </button>
      ) : (
        <button className={Styled.Button} onClick={handleOnClick}>
          +
        </button>
      )}
    </div>
  );
};
export default Input;
