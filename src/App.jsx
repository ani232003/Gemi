import React from 'react';
import Sidebar from './components/Sidebar/sidebar';
import Main from './components/Main/main';
import ContextProvider from '../src/context/Context.jsx'; 
import { ThemeProvider } from './context/themecontext.jsx'; 

const App = () => {
  return (
    <ThemeProvider>
      <ContextProvider>
        <Sidebar />
        <Main />
      </ContextProvider>
    </ThemeProvider>
  );
};

export default App;
