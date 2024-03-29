import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRouts from './routs/UserRouts';
import AdminRouts from './routs/AdminRouts';
import PrivetRouts from './routs/PrivetRouts';
import { Provider } from 'react-redux';
import { configstore } from './redux/store';

function App() {
  const store = configstore()
  return (
    <>
    <Provider store={store}>
      <Routes>
        <Route element={<PrivetRouts />} >
        <Route exact path='/admin/*' element={<AdminRouts />}/>
        </Route>
        <Route exact path='/*' element={<UserRouts />}/>
        
      </Routes>
      </Provider>
    </>
    
  );
}

export default App;
