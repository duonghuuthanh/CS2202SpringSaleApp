import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "react-bootstrap";
import Register from "./components/Register";
import { MyCartContext, MyDispatchContext, MyUserContext } from "./configs/Contexts";
import { useReducer } from "react";
import MyUserReducer from "./reducers/MyUserReducer";
import Cart from "./components/Cart";
import MyCartReducer from "./reducers/MyCartReducer";

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null);
  const [totalCart, cartDispatch] = useReducer(MyCartReducer, 0);

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <MyCartContext.Provider value={[totalCart, cartDispatch]}>
          <BrowserRouter>
            <Header />

            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/cart" element={<Cart />} />
              </Routes>
            </Container>

            <Footer />
        </BrowserRouter>
        </MyCartContext.Provider>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
}

export default App;