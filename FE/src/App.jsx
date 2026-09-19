import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/routing/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/auth/Profile';
import Cart from './pages/cart/Cart';
import Shipping from './pages/checkout/Shipping';
import Payment from './pages/checkout/Payment';
import PlaceOrder from './pages/checkout/PlaceOrder';
import OrderHistory from './pages/orders/OrderHistory';
import OrderDetails from './pages/orders/OrderDetails';
import PrivateRoute from './components/routing/PrivateRoute';
import AdminRoute from './components/routing/AdminRoute';
import DashboardLayout from './components/dashboard/DashboardLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductList from './pages/admin/ProductList';
import ProductEdit from './pages/admin/ProductEdit';
import ProductCreate from './pages/admin/ProductCreate';
import OrderList from './pages/admin/OrderList';
import UserList from './pages/admin/UserList';
import StaffRoute from './components/routing/StaffRoute';
import StaffDashboard from './pages/staff/StaffDashboard';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cart" element={<Cart />} />
          
          {/* Protected Routes for Customer/Guest */}
          <Route path="" element={<PrivateRoute />}>
            <Route path="profile" element={<Profile />} />
            <Route path="shipping" element={<Shipping />} />
            <Route path="payment" element={<Payment />} />
            <Route path="placeorder" element={<PlaceOrder />} />
            <Route path="orderhistory" element={<OrderHistory />} />
            <Route path="order/:id" element={<OrderDetails />} />
          </Route>
        </Route>

        <Route path="/admin" element={<AdminRoute><DashboardLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductList />} />
          <Route path="product/new" element={<ProductCreate />} />
          <Route path="product/:id/edit" element={<ProductEdit />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="users" element={<UserList />} />
        </Route>

        {/* Staff Routes */}
        <Route path="/staff" element={<StaffRoute><DashboardLayout /></StaffRoute>}>
          <Route index element={<StaffDashboard />} />
          <Route path="orders" element={<OrderList />} />
          <Route path="inventory" element={<ProductList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
