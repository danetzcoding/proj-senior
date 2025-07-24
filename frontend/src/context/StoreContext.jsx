import { createContext } from "react";

import { question_list } from "../assets/assets"
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {


  const contextValue = {
    question_list
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;