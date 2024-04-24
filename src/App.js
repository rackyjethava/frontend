import React, { createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRouts from './routs/UserRouts';
import AdminRouts from './routs/AdminRouts';
import PrivetRouts from './routs/PrivetRouts';
import { Provider } from 'react-redux';
import { configstore } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'

const data=createContext()
const data1=createContext()

function App() {
  const name = "jhon"
  const age = 20
  const {store,persistor} = configstore()
  return (
    <>
      <data.Provider value={name}>
      <data1.Provider value={age}>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routes>
        <Route element={<PrivetRouts />} >
        <Route exact path='/admin/*' element={<AdminRouts />}/>
        </Route>
        <Route exact path='/*' element={<UserRouts />}/>
        
      </Routes>
      </PersistGate>
      </Provider>
    

      </data1.Provider>
      </data.Provider>
    </>
    
  );
}

export default App;
export{data,data1}
