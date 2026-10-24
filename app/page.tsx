'use client';

import { useEffect, useMemo, useState } from 'react';

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  image: string;
};

type CartItem = {
  id: number;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Aster Wireless Headphones',
    category: 'Audio',
    price: 129,
    originalPrice: 179,
    rating: 4.8,
    reviews: 286,
    badge: 'Hot',
    image:
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 2,
    name: 'Cove Smart Lamp',
    category: 'Home',
    price: 74,
    originalPrice: 99,
    rating: 4.7,
    reviews: 214,
    badge: 'New',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 3,
    name: 'Nova 4K Streaming Stick',
    category: 'Tech',
    price: 89,
    originalPrice: 119,
    rating: 4.9,
    reviews: 342,
    badge: 'Top',
    image:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 4,
    name: 'Harbor Canvas Tote',
    category: 'Fashion',
    price: 42,
    originalPrice: 62,
    rating: 4.6,
    reviews: 128,
    badge: 'Sale',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 5,
    name: 'Halo Ceramic Blender',
    category: 'Home',
    price: 96,
    originalPrice: 130,
    rating: 4.8,
    reviews: 176,
    badge: 'Best',
    image:
      'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 6,
    name: 'Pulse Smartwatch',
    category: 'Tech',
    price: 199,
    originalPrice: 249,
    rating: 4.9,
    reviews: 418,
    badge: 'Trend',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 7,
    name: 'Luma Face Roller',
    category: 'Wellness',
    price: 28,
    originalPrice: 36,
    rating: 4.5,
    reviews: 98,
    badge: 'Fresh',
    image:
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 8,
    name: 'Drift Leather Backpack',
    category: 'Fashion',
    price: 154,
    originalPrice: 190,
    rating: 4.8,
    reviews: 214,
    badge: 'Elite',
    image:
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 9,
    name: 'Sora Air Purifier',
    category: 'Wellness',
    price: 132,
    originalPrice: 168,
    rating: 4.7,
    reviews: 160,
    badge: 'Pro',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 10,
    name: 'Vanta Mechanical Keyboard',
    category: 'Tech',
    price: 119,
    originalPrice: 169,
    rating: 4.9,
    reviews: 390,
    badge: 'Featured',
    image:
      'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 11,
    name: 'Ridge Throw Blanket',
    category: 'Home',
    price: 58,
    originalPrice: 79,
    rating: 4.6,
    reviews: 132,
    badge: 'Cozy',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 12,
    name: 'Echo Mini Speaker',
    category: 'Audio',
    price: 64,
    originalPrice: 89,
    rating: 4.8,
    reviews: 274,
    badge: 'Loved',
    image:
      'https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=900&q=80',
  },
];

const categoryOptions = ['All', 'Audio', 'Home', 'Tech', 'Fashion', 'Wellness'];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const savedCart = window.localStorage.getItem('velora-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch {
        setCart([]);
      }
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (isReady) {
      window.localStorage.setItem('velora-cart', JSON.stringify(cart));
    }
  }, [cart, isReady]);

  const visibleProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (query.trim()) {
      const search = query.toLowerCase();
      filtered = filtered.filter((product) =>
        `${product.name} ${product.category}`.toLowerCase().includes(search),
      );
    }

    switch (sortBy) {
      case 'low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [selectedCategory, query, sortBy]);

  const cartEntries = useMemo(
    () =>
      cart
        .map((item) => {
          const product = products.find((entry) => entry.id === item.id);
          if (!product) return null;
          return { ...product, quantity: item.quantity };
        })
        .filter(Boolean) as Array<Product & { quantity: number }>,
    [cart],
  );

  const cartCount = cartEntries.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartEntries.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal === 0 ? 0 : subtotal > 200 ? 0 : 14;
  const total = subtotal + shipping + subtotal * 0.08;

  const addToCart = (productId: number) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.id === productId);
      if (existing) {
        return previous.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...previous, { id: productId, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart((previous) => {
      const next = previous
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0);
      return next;
    });
  };

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cartEntries.length) return;

    const form = new FormData(event.currentTarget);
    const customer = {
      name: String(form.get('customerName') || 'Customer'),
      email: String(form.get('customerEmail') || 'customer@email.com'),
      address: String(form.get('customerAddress') || 'N/A'),
      city: String(form.get('customerCity') || 'N/A'),
      zip: String(form.get('customerZip') || 'N/A'),
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartEntries.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          customer,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      alert(data.message || 'Checkout successful');
      setCart([]);
      setIsCheckoutOpen(false);
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <>
      <header className="topbar">
        <div className="brand" aria-label="Velora home">
          <div className="brand-mark">V</div>
          <span>Velora</span>
        </div>

        <nav className="nav" aria-label="Main navigation">
          <a href="#">Home</a>
          <a href="#">New Arrivals</a>
          <a href="#">Trending</a>
          <a href="#">Deals</a>
          <a href="#">About</a>
        </nav>

        <div className="toolbar">
          <label className="search-wrap" aria-label="Search products">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M10.5 3a7.5 7.5 0 015.81 12.81l4.39 4.39 1.41-1.41-4.39-4.39A7.5 7.5 0 1110.5 3zm0 2a5.5 5.5 0 100 11 5.5 5.5 0 000-11z" />
            </svg>
            <input
              type="text"
              placeholder="Search products"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>

          <button className="cart-button" type="button" onClick={() => setIsCartOpen(true)}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 18a2 2 0 110 4 2 2 0 010-4zm10 0a2 2 0 110 4 2 2 0 010-4zM6.2 6h14.1l-1.7 8.1a2 2 0 01-2 1.6H9.2a2 2 0 01-2-1.6L5 3H2V1h4l.5 2.5H20v2H6.2z" />
            </svg>
            <span>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">Fresh arrivals</span>
            <h1>Upgrade your everyday essentials.</h1>
            <p>
              Discover elevated pieces in audio, home, tech, and wellness chosen for comfort,
              performance, and modern luxury.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" type="button">
                Shop now
              </button>
              <button className="secondary-btn" type="button">
                Explore deals
              </button>
            </div>
            <div className="stats">
              <div>
                <strong>20k+</strong>
                <span>Happy shoppers</span>
              </div>
              <div>
                <strong>4.9/5</strong>
                <span>Average rating</span>
              </div>
              <div>
                <strong>2-day</strong>
                <span>Shipping</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="promo-card">
              <div className="promo-badge">Best seller</div>
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"
                alt="Headphones"
              />
              <div className="promo-info">
                <div>
                  <p>Soundcore Max</p>
                  <span>Noise cancelling • Bluetooth 5.4</span>
                </div>
                <strong>$169</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="controls">
          <div className="filters" aria-label="Product categories">
            {categoryOptions.map((category) => (
              <button
                key={category}
                type="button"
                className={`chip ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <label className="sort-wrap" htmlFor="sortSelect">
            <span>Sort by</span>
            <select id="sortSelect" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option value="featured">Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </label>
        </section>

        <section className="product-section">
          <div className="section-head">
            <div>
              <span className="eyebrow small">Curated picks</span>
              <h2>Popular products</h2>
            </div>
            <p className="result-count">{visibleProducts.length} items</p>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <article key={product.id} className="product-card">
                <div className="product-image-wrap">
                  <span className="product-badge">{product.badge}</span>
                  <img src={product.image} alt={product.name} />
                </div>

                <div className="product-info">
                  <div className="product-meta">
                    <span>{product.category}</span>
                    <span>{product.reviews} reviews</span>
                  </div>

                  <h3 className="product-title">{product.name}</h3>

                  <div className="product-price-row">
                    <span className="product-price">{formatCurrency(product.price)}</span>
                    <span className="product-original">{formatCurrency(product.originalPrice)}</span>
                  </div>

                  <div className="product-foot">
                    <span className="rating">{product.rating}</span>
                    <button className="add-btn" type="button" onClick={() => addToCart(product.id)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <aside className={`cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label="Shopping cart">
        <div className="cart-header">
          <h3>Your cart</h3>
          <button className="close-cart" type="button" onClick={() => setIsCartOpen(false)}>
            ×
          </button>
        </div>

        <div className="cart-items">
          {cartEntries.length === 0 ? (
            <div className="empty-cart">
              <div>
                <h4>Your cart is empty</h4>
                <p>Add a few favorites to get started.</p>
              </div>
            </div>
          ) : (
            cartEntries.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.category}</p>

                  <div className="cart-item-controls">
                    <div className="qty-controls">
                      <button className="qty-btn" type="button" onClick={() => updateQuantity(item.id, -1)}>
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button className="qty-btn" type="button" onClick={() => updateQuantity(item.id, 1)}>
                        +
                      </button>
                    </div>

                    <span className="item-price">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <strong>{formatCurrency(shipping)}</strong>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <button
            className="checkout-btn"
            type="button"
            onClick={() => {
              if (!cartEntries.length) {
                alert('Your cart is empty.');
                return;
              }
              setIsCheckoutOpen(true);
            }}
          >
            Proceed to checkout
          </button>
        </div>
      </aside>

      <div className={`modal ${isCheckoutOpen ? '' : 'hidden'}`} aria-hidden={!isCheckoutOpen}>
        <div className="modal-card">
          <button className="modal-close" type="button" onClick={() => setIsCheckoutOpen(false)}>
            ×
          </button>
          <h3>Checkout</h3>
          <form onSubmit={handleCheckout}>
            <div className="field-group">
              <label htmlFor="customerName">Full name</label>
              <input id="customerName" name="customerName" type="text" placeholder="Alex Morgan" required />
            </div>

            <div className="field-group">
              <label htmlFor="customerEmail">Email</label>
              <input id="customerEmail" name="customerEmail" type="email" placeholder="alex@email.com" required />
            </div>

            <div className="field-group">
              <label htmlFor="customerAddress">Address</label>
              <input id="customerAddress" name="customerAddress" type="text" placeholder="123 Market St" required />
            </div>

            <div className="field-row">
              <div className="field-group">
                <label htmlFor="customerCity">City</label>
                <input id="customerCity" name="customerCity" type="text" placeholder="New York" required />
              </div>

              <div className="field-group">
                <label htmlFor="customerZip">ZIP</label>
                <input id="customerZip" name="customerZip" type="text" placeholder="10001" required />
              </div>
            </div>

            <button className="primary-btn full-width" type="submit">
              Place order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
