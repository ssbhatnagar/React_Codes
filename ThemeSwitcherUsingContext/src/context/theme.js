import React from "react";
import { createContext, useContext } from "react";



export const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {},
});

export const ThemeProvider = ThemeContext.Provider;


export default function useTheme() {
    return useContext(ThemeContext);
}

// const ThemeContext = createContext({
//     themeMode: 'light',
//     lightTheme: () => {},
//     darkTheme: () => {}
// })

// export const ThemeProvider = ThemeContext.Provider;

// // the below function can also be written as 
// // export default function useTheme(){
// //     return useContext(ThemeContext);
// // }

// const useTheme = () => useContext(ThemeContext);

// export default useTheme;