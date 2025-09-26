import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import IconGallery from "./pages/IconGallery";
import NotFound from "./pages/NotFound";

import Overview from "./pages/dashboard/Overview";
import Domains from "./pages/dashboard/Domains";
import Support from "./pages/dashboard/Support";

function App() {
  return (
    <Router>
      <Layout
        children={
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<Overview />} />
              <Route path="domains" element={<Domains />} />
              <Route path="support" element={<Support />} />
            </Route>
            <Route path="/icon-gallery" element={<IconGallery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        }
      ></Layout>
    </Router>
  );
}

export default App;
