import { createContext, useState } from "react";
 
const ThemeContext = createContext();



function ThemeProviderWrapper(props) {
    const [navTheme, setNavTheme] = useState("lightNav"); 
    const [bodyTheme, setBodyTheme] = useState("lightBody");
    const [cardsTheme, setCardsTheme] = useState("lightCard");
    const [boxTheme, setBoxTheme] = useState("#ffdca9");
    const [boxColor, setBoxColor] = useState("black")
    
    const toggleTheme = () => {   
        if (navTheme === "lightNav") {
          setNavTheme("darkNav");
          setBodyTheme("darkBody");
          setCardsTheme("darkCard");
          setBoxTheme("#0c0c0b");
          setBoxColor("white");
        } else {
          setNavTheme("lightNav");
          setBodyTheme("lightBody");
          setCardsTheme("lightCard");
          setBoxTheme("#ffdca9");
          setBoxColor("black");
        }
      };
    return (
      
      <ThemeContext.Provider value={{bodyTheme, navTheme, cardsTheme, boxTheme, boxColor, toggleTheme}} >
          {props.children}
      </ThemeContext.Provider>
    )
  }
   
  export { ThemeContext, ThemeProviderWrapper };  
