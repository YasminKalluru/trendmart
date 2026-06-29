import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import OrderSuccess from "./pages/OrderSuccess";
import Wishlist from "./pages/Wishlist";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
          <Route path="/Orders" element={<ProtectedRoute><Orders /></ProtectedRoute>}/>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/order-success" element={<OrderSuccess />}/>
          <Route path="/Wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>

    </Routes>
      </BrowserRouter>
  );
}

export default App;