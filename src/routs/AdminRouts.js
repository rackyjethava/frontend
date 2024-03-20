import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fruit from '../admin/component/fruits/Fruit';
import Layout from '../admin/component/Layout/Layout';
import Vagitable from '../admin/component/vagitable/Vagitable';
import Category from '../admin/component/category/Category';

function AdminRouts(props) {
    return (
        <Layout>
        <Routes>
            <Route exact path='/fruits' element={<Fruit />} />
            <Route exact path='/vagitable' element={<Vagitable />} />
            <Route exact path='/category' element={<Category />} />
        </Routes>
        </Layout>
    );
}

export default AdminRouts;