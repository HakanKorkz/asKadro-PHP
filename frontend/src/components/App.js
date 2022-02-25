import React from 'react';
import { GlobalContextProvider } from '../context/GlobalContext';
import Routes from './navigation/Routes';
import { CookiesProvider } from "react-cookie";
import "./App.css"
const App = () => {
  return (
    <CookiesProvider>
      <GlobalContextProvider>
        <Routes />
      </GlobalContextProvider>
    </CookiesProvider>
  )

}

export default App;