import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fruit from '../admin/component/fruits/Fruit';
import Layout from '../admin/component/Layout/Layout';
import Vagitable from '../admin/component/vagitable/Vagitable';

function AdminRouts(props) {
    return (
        <Layout>
        <Routes>
            <Route exact path='/fruits' element={<Fruit />} />
            <Route exact path='/vagitable' element={<Vagitable />} />
        </Routes>
        </Layout>
    );
}

export default AdminRouts;