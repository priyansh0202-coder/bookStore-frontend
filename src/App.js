import { BrowserRouter, Routes, Route } from "react-router-dom"
import Books from "./pages/Books";
import Add from "./pages/Add";
import { Provider } from "react-redux"
import store from "./redux/store";
import Cart from "./pages/Cart";
import CheckOut from "./pages/CheckOut";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Books />} />
            <Route path="/add" element={<Add />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
