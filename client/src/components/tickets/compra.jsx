import '../../style/tickets/compra.css';
import React from 'react';

const Comprar = ({ precioTotal }) => {
  return (
    <div className="comprar">
      <div className="total-price">
        <h3>Price</h3>
        <h2>${precioTotal.toFixed(2)}</h2>
      </div>
      <div className='Buy-ticket'>
        <button>
            <h2>Buy ticket</h2>
        </button>
      </div>
    </div>
  );
}

export default Comprar;