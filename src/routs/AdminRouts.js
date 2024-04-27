import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fruit from '../admin/component/fruits/Fruit';
import Layout from '../admin/component/Layout/Layout';

import Category from '../admin/component/category/Category';
import Facilities from '../admin/component/facilities/Facilities';
import Products from '../admin/component/products/Products';
import Counter from '../admin/component/counter/Counter';
import Coupon from '../admin/component/coupon/Coupon';
import Verity from '../admin/component/verity/Verity';


function AdminRouts(props) {
    return (
        <Layout>
        <Routes>
            <Route exact path='/fruits' element={<Fruit />} />
             <Route exact path='/counter' element={<Counter />} />
            <Route exact path='/category' element={<Category />} />
            <Route exact path='/facilities' element={<Facilities />} />
            <Route exact path='/products' element={<Products/>} />
            <Route  exact path='/coupon' element={<Coupon />}/>
            <Route  exact path='/verity' element={<Verity />}/>
        </Routes>
        </Layout>
    );
}

export default AdminRouts;