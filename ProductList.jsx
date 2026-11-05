import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './App.css';

const img = (file) => `${import.meta.env.BASE_URL}plants/${file}.svg`;

// 3 categories, 6 plants each
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    intro: 'Tough leafy plants that help keep indoor air fresh.',
    plants: [
      { name: 'Snake Plant', image: img('snake-plant'), description: 'Upright, sword-shaped leaves. Very hard to kill.', cost: '$15' },
      { name: 'Spider Plant', image: img('spider-plant'), description: 'Arching striped leaves that grow baby plants.', cost: '$12' },
      { name: 'Peace Lily', image: img('peace-lily'), description: 'Glossy leaves and white flowers. Likes moist soil.', cost: '$18' },
      { name: 'Rubber Plant', image: img('rubber-plant'), description: 'Thick, dark leaves on a sturdy stem.', cost: '$20' },
      { name: 'Aloe Vera', image: img('aloe-vera'), description: 'Soothing gel inside the leaves. Needs bright light.', cost: '$14' },
      { name: 'Pothos', image: img('pothos'), description: 'Trailing vines that look great on a shelf.', cost: '$10' },
    ],
  },
  {
    category: 'Aromatic Plants',
    intro: 'Fragrant plants for the windowsill and the kitchen.',
    plants: [
      { name: 'Lavender', image: img('lavender'), description: 'Purple flower spikes with a calming scent.', cost: '$16' },
      { name: 'Mint', image: img('mint'), description: 'Fast-growing and fresh. Great for tea.', cost: '$9' },
      { name: 'Rosemary', image: img('rosemary'), description: 'Woody herb with needle-like leaves.', cost: '$11' },
      { name: 'Basil', image: img('basil'), description: 'Sweet, soft leaves for cooking.', cost: '$8' },
      { name: 'Lemon Balm', image: img('lemon-balm'), description: 'Light lemon scent. Easy to grow in a pot.', cost: '$10' },
      { name: 'Jasmine', image: img('jasmine'), description: 'Climbing plant with sweet-smelling blooms.', cost: '$22' },
    ],
  },
  {
    category: 'Low Light Plants',
    intro: 'Plants that cope with dim rooms and shaded corners.',
    plants: [
      { name: 'ZZ Plant', image: img('zz-plant'), description: 'Shiny leaves. Barely needs water.', cost: '$19' },
      { name: 'Cast Iron Plant', image: img('cast-iron'), description: 'Named for how tough it is. Loves shade.', cost: '$17' },
      { name: 'Chinese Evergreen', image: img('chinese-evergreen'), description: 'Patterned leaves that stay colorful in low light.', cost: '$21' },
      { name: 'Parlor Palm', image: img('parlor-palm'), description: 'Soft, feathery fronds for a tropical look.', cost: '$24' },
      { name: 'Boston Fern', image: img('ferns'), description: 'Full, lacy fronds. Likes humidity.', cost: '$13' },
      { name: 'Dracaena', image: img('dracaena'), description: 'Tall, slim plant with narrow leaves.', cost: '$23' },
    ],
  },
];

function ProductList({ onHome, onPlants, onCart }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Total number of items in the cart, shown next to the cart icon
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // A plant's button is disabled while that plant is in the cart
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(
      addItem({ name: plant.name, image: plant.image, cost: plant.cost })
    );
  };

  return (
    <div>
      {/* Navbar: Home, Plants, Cart */}
      <nav className="navbar">
        <button className="navbar-brand" onClick={onHome} aria-label="Paradise Nursery home">
          <img src={img('snake-plant')} alt="" />
          <span>Paradise Nursery</span>
        </button>
        <div className="navbar-links">
          <button className="navbar-link" onClick={onHome}>Home</button>
          <button className="navbar-link active" onClick={onPlants} aria-current="page">Plants</button>
          <button className="navbar-link cart-link" onClick={onCart} aria-label={`Cart, ${totalQuantity} items`}>
            <svg className="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 7H6" />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      <main className="page-wrap">
        {plantsArray.map((group) => (
          <section className="category" key={group.category}>
            <h2>{group.category}</h2>
            <p className="category-intro">{group.intro}</p>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <article className="product-card" key={plant.name}>
                  <img className="product-image" src={plant.image} alt={plant.name} />
                  <div className="product-body">
                    <h3 className="product-name">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">{plant.cost}</p>
                    <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
