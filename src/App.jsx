
import './App.css'
import { CartProvider } from './components/CartProvider';
import Cart from './components/Cart'


function App() {
  

  return (
    <>
     <CartProvider>
     <Cart />
    </CartProvider>
      
    </>
  )
}

export default App
