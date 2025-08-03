import "./App.css";
import { Router } from "./pages/router";
import { CartProvider } from "@/context/cartContext"; 

function App() {
  return (
    <CartProvider>
      <Router />
    </CartProvider>
  );
}

export default App;
