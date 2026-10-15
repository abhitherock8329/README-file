import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

function ProductList() {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
        { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" }
      ]
    },
    {
      category: "Aromatic Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba", description: "Calming scent, aids sleep.", cost: "$20" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729808999-652d57383844", description: "Sweet, fragrant blooms.", cost: "$18" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <div className="navbar" style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="tag">
          <div className="luxury">
            <img src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png" alt="" style={{ height: '50px' }} />
            <a href="/" style={{ textDecoration: 'none', color: 'white' }}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div><a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>Plants</a></div>
          <div>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(true); }} style={{ color: 'white', fontSize: '20px', textDecoration: 'none' }}>
              <h1 className="cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" id="IconChangeColor" height="68" width="68">
                  <rect width="256" height="256" fill="none"></rect>
                  <path d="M184,184H69.8L41.9,30.6A8,8,0,0,0,34.1,24H16" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                  <circle cx="80" cy="204" r="20" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                  <circle cx="184" cy="204" r="20" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
                  <path d="M62.5,144H188.1a8,8,0,0,0,7.8-6.1l16.3-65.2a8,8,0,0,0-7.8-9.9H51.2" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
                </svg>
                <span className="cart_quantity_count">{totalQuantity}</span>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((categoryObj, index) => (
            <div key={index}>
              <h1 className="plant_heading"><div>{categoryObj.category}</div></h1>
              <div className="product-list">
                {categoryObj.plants.map((plant, pIndex) => (
                  <div className="product-card" key={pIndex}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <div className="product-title">{plant.name}</div>
                    <div className="product-description">{plant.description}</div>
                    <div className="product-cost">{plant.cost}</div>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isPlantInCart(plant.name)}
                      style={{ backgroundColor: isPlantInCart(plant.name) ? '#ccc' : '#4CAF50' }}
                    >
                      {isPlantInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={(e) => { e.preventDefault(); setShowCart(false); }} />
      )}
    </div>
  );
}

export default ProductList;
