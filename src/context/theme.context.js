import { createContext, useState } from "react";
 
const ThemeContext = createContext();



function ThemeProviderWrapper(props) {
    const [navTheme, setNavTheme] = useState("lightNav"); 
    const [bodyTheme, setBodyTheme] = useState("lightBody");
    const [cardsTheme, setCardsTheme] = useState("lightCard");
    const [boxTheme, setBoxTheme] = useState("#ffdca9")
    
    const toggleTheme = () => {   
        if (navTheme === "lightNav") {
          setNavTheme("darkNav");
          setBodyTheme("darkBody");
          setCardsTheme("darkCard");
          setBoxTheme("gray")
        } else {
          setNavTheme("lightNav");
          setBodyTheme("lightBody");
          setCardsTheme("lightCard");
          setBoxTheme("#ffdca9")
        }
      };
    return (
      
      <ThemeContext.Provider value={{bodyTheme, navTheme, cardsTheme, boxTheme, toggleTheme}} >
          {props.children}
      </ThemeContext.Provider>
    )
  }
   
  export { ThemeContext, ThemeProviderWrapper };  
