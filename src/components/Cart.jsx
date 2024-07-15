import React, { useContext } from 'react'
import { CartContext, TotalContext } from './CartProvider';


function Cart() {

  const { cart, dispatch } = useContext(CartContext);
  const { totals } = useContext(TotalContext);

  const handleQuantityChange = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: parseInt(quantity) } });
  };

  return (
    <div className='whole'>
      <div className='card' >
        {cart.map(product => (
          <div key={product.id} style={{ marginLeft :'40px', border: '4px solid red', padding: '10px', display : 'flex',marginBottom:'20px' }}>
            <div className="left"><img src={product.thumbnail} /></div>
            <div className="right" style={{marginLeft :'20px'}}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Ratings : {product.rating} ⭐</p>
            <p>Price: $ {product.price}</p>
            <p>Quantity : <input type="number" value={product.quantity} onChange={(e) => handleQuantityChange(product.id, e.target.value)} min="0"/></p>
            </div>
         
            
          </div>
        ))}
      </div>
      <div className="total">
      <h3>Total Quantity: {totals.totalQuantity}</h3>
      <h4>Delivery Fee : Free</h4>
      <h3>Total Amount: $ {totals.totalAmount.toFixed(2)}</h3>
      </div>
      
    </div>
  );
};


export default Cart