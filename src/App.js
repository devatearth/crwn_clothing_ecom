import Home from "./routes/home/home-component";
import { Routes, Route } from "react-router-dom";
import Navigation from "./routes/navigation/navigation-component";
import Authentication from "./routes/authentication/authentication-component";
import Shop from "./routes/shop/shop-component";
import Checkout from "./component/checkout/checkout.component";
import { useEffect } from "react";
import { checkUserSession } from "./store/user/user.action";
import { onUserAuthChangedLister, createUserDocumentFromAuth, getCurrentUser } from "./utils/firebase/firebase-utils";
import { useDispatch } from "react-redux";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>)
};

export default App;
