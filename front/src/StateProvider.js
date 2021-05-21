import { createContext, useContext, useReducer } from "react";

const stateContext = createContext();

const StateProvider = ({ initialState, reducer, children }) => {
  return (
    <stateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </stateContext.Provider>
  );
};

export const useStateValue = () => useContext(stateContext);

export default StateProvider;
