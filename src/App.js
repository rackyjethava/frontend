import React, { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRouts from './routs/UserRouts';
import AdminRouts from './routs/AdminRouts';
import PrivetRouts from './routs/PrivetRouts';
import { Provider } from 'react-redux';
import { configstore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './context/ThemeContext';
import { ContactProvider } from './context/ContactContext';


function App() {

  const { store, persistor } = configstore()
  return (
    <>
      <ContactProvider>
        <ThemeProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Routes>
                <Route element={<PrivetRouts />} >
                  <Route exact path='/admin/*' element={<AdminRouts />} />
                </Route>
                <Route exact path='/*' element={<UserRouts />} />
              </Routes>
            </PersistGate>
          </Provider>
        </ThemeProvider>
        </ContactProvider>

    </>

  );
}

export default App;

