import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContectProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContectProvider>
        <Header />
        <Meals />
        <Cart />
      </CartContectProvider>
    </UserProgressContextProvider>
  );
}

export default App;
