import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContectProvider } from "./store/CartContext";

function App() {
  return (
    <CartContectProvider>
      <Header />
      <Meals />
    </CartContectProvider>
  );
}

export default App;
