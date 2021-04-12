import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import UploadPage from "./views/UploadPage/UploadPage.js";
import DetailProductPage from "./views/DetailProductPage/DetailProductPage";
import CartPage from "./views/CartPage/CartPage";
import MyinfoPage from "./views/MyinfoPage/MyinfoPage";
import OrderinfoPage from "./views/OrderinfoPage/OrderinfoPage";
import IntroducePage from "./views/IntroducPage/IntroducePage";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, true)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/introduce" component={Auth(IntroducePage, null)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/uploadpage" component={Auth(UploadPage, true)} />
          <Route exact path="/user/cart" component={Auth(CartPage, true)} />
          <Route exact path="/user/orderinfo" component={Auth(OrderinfoPage, true)} />
          <Route exact path="/user/info" component={Auth(MyinfoPage, true)} />
          
          <Route exact path="/product/:productId" component={Auth(DetailProductPage, null)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
