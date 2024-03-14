import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserRouts from './routs/UserRouts';
import AdminRouts from './routs/AdminRouts';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/*' element={<UserRouts />}/>
        <Route exact path='/admin/*' element={<AdminRouts />}/>
      </Routes>
    </>
  );
}

export default App;
