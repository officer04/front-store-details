import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ROUTES } from './const';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Reviews from './components/Reviews/Reviews';
import Home from './components/Home/Home';
import Contacts from './components/Сontacts/Contacts';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Stock from './components/Stock/Stock';
import AboutCompany from './components/AboutCompany/AboutCompany';
import Assortment from './components/Assortment/Assortment';
import Basket from './components/Basket/Basket';
import Products from './components/Products/Products';
import ModalAccount from './components/ModalAccount/ModalAccount';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ResetPasswordRequest from './components/ResetPasswordRequest/ResetPasswordRequest';


function App() {
  const { modal } = useSelector(({ user }) => user);
  return (
    <div className="App">
      <Header />
      {modal && <ModalAccount />}
      <Routes>
        <Route path={ROUTES.REVIEWS} element={<Reviews />} />
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.CONTACTS} element={<Contacts />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTRATION} element={<Registration />} />
        <Route path={ROUTES.STOCK} element={<Stock />} />
        <Route path={ROUTES.ABOUT_COMPANY} element={<AboutCompany />} />
        <Route path={ROUTES.ASSORTMENT} element={<Assortment />} />
        <Route path={ROUTES.BASKET} element={<Basket />} />
        <Route path={`${ROUTES.PRODUCTS}/:id`} element={<Products />} />
        <Route path={`${ROUTES.RESET_PASSWORD}/:requestId`} element={<ResetPassword />} />
        <Route path={ROUTES.RESET_PASSWORD_REQUEST} element={<ResetPasswordRequest />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
