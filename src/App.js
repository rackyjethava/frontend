import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRouts from './routs/UserRouts';
import AdminRouts from './routs/AdminRouts';
import PrivetRouts from './routs/PrivetRouts';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivetRouts />} >
        <Route exact path='/admin/*' element={<AdminRouts />}/>
        </Route>
        <Route exact path='/*' element={<UserRouts />}/>
        
      </Routes>
    </>
  );
}

export default App;
