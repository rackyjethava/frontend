import React from 'react';
import Header from './user/component/header/Header';
import Home from './user/container/Home/Home';
import Footer from './user/component/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Shop from './user/container/shop/Shop';
import Shop_detail from './user/container/shop_detail/Shop_detail';
import Cart from './user/container/page/cart/Cart';
import Checkout from './user/container/page/checkout/Checkout';
import Testimonial from './user/container/page/testimonial/Testimonial';
import Error from './user/container/page/error/Error';
import Contect from './user/container/contect/Contect';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/shop" element={<Shop />} />
        <Route exact path="/shop_detail" element={<Shop_detail />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/testimonial" element={<Testimonial />} />
        <Route exact path="/error" element={<Error />} />
        <Route exact path="/contect" element={<Contect />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
