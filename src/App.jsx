import { useReducer, useState } from 'react';
import './App.css';

const products = [
  {
    id: 'arc-lamp',
    name: 'Arc Table Lamp',
    category: 'Home',
    price: 68,
    note: 'Warm light, anywhere',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Sculptural table lamp on a wooden desk',
    tone: 'sage',
  },
  {
    id: 'daily-tote',
    name: 'Daily Carry Tote',
    category: 'Accessories',
    price: 34,
    note: 'Made for the everyday',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Neutral canvas tote bag',
    tone: 'sand',
  },
  {
    id: 'pour-over',
    name: 'Pour Over Set',
    category: 'Kitchen',
    price: 52,
    note: 'A slower kind of morning',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Coffee being prepared for a pour over',
    tone: 'clay',
  },
  {
    id: 'field-notes',
    name: 'Field Notes Journal',
    category: 'Stationery',
    price: 18,
    note: 'Room for the next idea',
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Open notebook with a pen on a desk',
    tone: 'blue',
  },
  {
    id: 'everyday-bottle',
    name: 'Everyday Bottle',
    category: 'Accessories',
    price: 29,
    note: 'Hydration, on your terms',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Reusable water bottle',
    tone: 'blue',
  },
  {
    id: 'linen-throw',
    name: 'Linen Throw',
    category: 'Home',
    price: 74,
    note: 'Soft texture, lasting comfort',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',
    imageAlt: 'Soft throw draped across an armchair',
    tone: 'sand',
  },
];

const categories = ['Everything', 'Home', 'Accessories', 'Kitchen', 'Stationery'];

function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      const existingItem = cart.find((item) => item.id === action.product.id);
      return existingItem
        ? cart.map((item) => item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...cart, { ...action.product, quantity: 1 }];
    }
    case 'increase':
      return cart.map((item) => item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item);
    case 'decrease':
      return cart
        .map((item) => item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item)
        .filter((item) => item.quantity > 0);
    case 'remove':
      return cart.filter((item) => item.id !== action.id);
    case 'clear':
      return [];
    default:
      return cart;
  }
}

export default function App() {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [activeCategory, setActiveCategory] = useState('Everything');
  const [search, setSearch] = useState('');

  const visibleProducts = products.filter((product) => {
    const matchesCategory = activeCategory === 'Everything' || product.category === activeCategory;
    const matchesSearch = `${product.name} ${product.category}`.toLowerCase().includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 6;

  return (
    <main className="shop-page">
      <div className="announcement">Thoughtful things for everyday living <span>·</span> Free shipping over $100</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="ShopEasy home">shop<span>easy</span><b>.</b></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a href="#products">Shop all</a>
          <a href="#products">Our picks</a>
          <a href="#story">Our story</a>
        </nav>
        <a className="cart-jump" href="#cart" aria-label={`Cart with ${itemCount} items`}>
          <span className="bag-icon" aria-hidden="true">▱</span> Cart <span className="cart-count">{itemCount}</span>
        </a>
      </header>

      <section className="shop-hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-mark" /> THE GOOD EVERYDAY</p>
          <h1>Find your<br /><em>everyday</em> favorite.</h1>
          <p>Useful things, made with care. A considered collection for slower mornings and better little moments.</p>
          <a className="hero-link" href="#products">Explore the collection <span aria-hidden="true">↘</span></a>
        </div>
        <div className="hero-art" role="img" aria-label="A calm, sunlit living room with thoughtfully chosen home goods">
          <div className="hero-stamp"><span>MADE FOR</span><strong>the good<br />everyday</strong><span>EST. 2024</span></div>
        </div>
        <div className="hero-index">01 <span>/</span> 04</div>
      </section>

      <div className="benefit-strip" id="story">
        <span><b>01</b> Considered design</span>
        <span><b>02</b> Made to be used</span>
        <span><b>03</b> Packed with care</span>
      </div>

      <section className="shop-content" id="products">
        <div className="catalog">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE SHOP</p>
              <h2>Good things, gathered.</h2>
            </div>
            <label className="search-box">
              <span aria-hidden="true">⌕</span>
              <input aria-label="Search products" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Find something..." />
            </label>
          </div>

          <div className="category-list" aria-label="Filter products by category">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? 'category-button active' : 'category-button'}
                type="button"
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {visibleProducts.map((product, index) => {
              const cartItem = cart.find((item) => item.id === product.id);
              return (
                <article className="product-card" key={product.id} style={{ '--card-order': index }}>
                  <div className={`product-image ${product.tone}`}>
                    <img src={product.image} alt={product.imageAlt} loading="lazy" />
                    <span className="product-category">{product.category}</span>
                  </div>
                  <div className="product-info">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.note}</p>
                    </div>
                    <span className="product-price">${product.price}</span>
                  </div>
                  <button className={cartItem ? 'add-button added' : 'add-button'} type="button" onClick={() => dispatch({ type: 'add', product })}>
                    {cartItem ? `Add another · ${cartItem.quantity} in bag` : 'Add to bag'} <span aria-hidden="true">+</span>
                  </button>
                </article>
              );
            })}
            {visibleProducts.length === 0 && <p className="no-results">Nothing here yet. Try another search.</p>}
          </div>
        </div>

        <aside className="cart-panel" id="cart" aria-labelledby="cart-title">
          <div className="cart-heading">
            <div>
              <p className="eyebrow">YOUR SELECTION</p>
              <h2 id="cart-title">The bag <span>({itemCount})</span></h2>
            </div>
            {cart.length > 0 && <button className="clear-button" type="button" onClick={() => dispatch({ type: 'clear' })}>Clear bag</button>}
          </div>

          {cart.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-bag" aria-hidden="true">▱</span>
              <p>Your bag is taking a breather.</p>
              <span>Find a little something for your everyday.</span>
            </div>
          ) : (
            <div className="cart-items">
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="cart-item-detail">
                    <h3>{item.name}</h3>
                    <span>${item.price}</span>
                    <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                      <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => dispatch({ type: 'decrease', id: item.id })}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => dispatch({ type: 'increase', id: item.id })}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-end">
                    <span>${item.price * item.quantity}</span>
                    <button className="remove-button" type="button" onClick={() => dispatch({ type: 'remove', id: item.id })}>Remove</button>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="cart-totals">
            <div><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
            <div><span>Shipping</span><strong>{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</strong></div>
            <div className="total-line"><span>Total</span><strong>${(subtotal + shipping).toFixed(2)}</strong></div>
            {subtotal > 0 && subtotal < 100 && <p className="shipping-note">You&apos;re ${(100 - subtotal).toFixed(2)} away from free shipping.</p>}
            <button className="checkout-button" type="button" disabled={cart.length === 0}>Continue to checkout <span aria-hidden="true">↗</span></button>
            <p className="secure-note">A little joy, packed with care.</p>
          </div>
        </aside>
      </section>

      <footer className="site-footer"><a className="brand" href="#top">shop<span>easy</span><b>.</b></a><span>GOOD THINGS, FOR EVERY DAY.</span><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
   