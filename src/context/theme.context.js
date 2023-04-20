import { createContext, useState } from "react";
 
const ThemeContext = createContext();



function ThemeProviderWrapper(props) {
    const [navTheme, setNavTheme] = useState("lightNav"); 
    const [bodyTheme, setBodyTheme] = useState("lightBody");
    const [cardsTheme, setCardsTheme] = useState("lightCard")
    
    const toggleTheme = () => {   
        if (navTheme === "lightNav") {
          setNavTheme("darkNav");
          setBodyTheme("darkBody");
          setCardsTheme("darkCard");
        } else {
          setNavTheme("lightNav");
          setBodyTheme("lightBody");
          setCardsTheme("lightCard");
        }
      };
    return (
      
      <ThemeContext.Provider value={{bodyTheme, navTheme, cardsTheme, toggleTheme}} >
          {props.children}
      </ThemeContext.Provider>
    )
  }
   
  export { ThemeContext, ThemeProviderWrapper };  
