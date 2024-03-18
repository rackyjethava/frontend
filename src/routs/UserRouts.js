import React from 'react';
import Header from '../user/component/header/Header';
import { Route, Routes } from 'react-router-dom';
import Footer from '../user/component/Footer/Footer';
import Home from '../user/container/Home/Home';
import Shop from '../user/container/shop/Shop';
import Shop_detail from '../user/container/shop_detail/Shop_detail';
import Cart from '../user/container/page/cart/Cart';
import Checkout from '../user/container/page/checkout/Checkout';
import Testimonial from '../user/container/page/testimonial/Testimonial';
import Error from '../user/container/page/error/Error';
import Contect from '../user/container/contect/Contect';
import UserLogin from '../user/container/login/UserLogin';
import UserRagister from '../user/container/ragister/UserRagister';


function UserRouts(props) {
    return (
        <>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/shop" element={<Shop />} />
                <Route exact path="/shop_detail" element={<Shop_detail />} />
                <Route exact path="/shop/:id" element={<Shop_detail />}/>
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/checkout" element={<Checkout />} />
                <Route exact path="/testimonial" element={<Testimonial />} />
                <Route exact path="/error" element={<Error />} />
                <Route exact path="/contect" element={<Contect />} />
                <Route exact path="/login" element={<UserLogin />} />
                <Route exact path="/register" element={<UserRagister />} />
                
            </Routes>
            <Footer />
        </>
    );
}

export default UserRouts;