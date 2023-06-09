import { NotificationsProvider } from "@mantine/notifications";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { MantineProvider } from "@mantine/core";
import RegisterLanding from "./components/registerLanding";
import Profile from "./pages/profile";
import Cart from "./pages/cart";
import Invoices from "./components/checkout/Invoices";

function App() {
  return (
    <MantineProvider theme={{ colorScheme: "white" }} withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/landing" element={<RegisterLanding />} exact />
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/cart" element={<Cart />} exact />
          <Route path="/invoice" element={<Invoices />} exact />
        </Routes>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
