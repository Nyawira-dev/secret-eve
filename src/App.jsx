
import { useState } from "react";
import "./App.css";
import products from "./data/products";

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedColors, setSelectedColors] = useState({});

  const getAvailableSizes = (product, color) => {
    if (product.id === 20 && color) {
      return product.sizeByColor?.[color] || [];
    }

    return product.sizes || [];
  };

  const getSelection = (product) => {
    const selectedColor = selectedColors[product.id] || "";
    const availableSizes = getAvailableSizes(product, selectedColor);
    const selectedSize = selectedSizes[product.id] || "";

    if (product.colors?.length && !selectedColor) {
      alert("Please choose a color first.");
      return null;
    }

    if (
      availableSizes.length > 0 &&
      !availableSizes.includes(selectedSize)
    ) {
      alert("Please choose an available size first.");
      return null;
    }

    return {
      selectedColor,
      selectedSize: selectedSize || "Please confirm size",
    };
  };

  const addToCart = (product) => {
    const selection = getSelection(product);
    if (!selection) return;

    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === selection.selectedColor &&
          item.selectedSize === selection.selectedSize
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id &&
          item.selectedColor === selection.selectedColor &&
          item.selectedSize === selection.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          ...selection,
          quantity: 1,
        },
      ];
    });

    setCartOpen(true);
  };

  const orderNow = (product) => {
    const selection = getSelection(product);
    if (!selection) return;

    const message = `Hello Secret Eve 

I'd like to order:

${product.name}
${selection.selectedColor ? `Color: ${selection.selectedColor}\n` : ""}Size: ${selection.selectedSize}
Quantity: 1
Price: KSh ${product.price.toLocaleString()}

Thank you!`;

    window.open(
      `https://wa.me/254758522992?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const updateQuantity = (item, change) => {
    setCart((currentCart) =>
      currentCart
        .map((cartItem) =>
          cartItem.id === item.id &&
          cartItem.selectedColor === item.selectedColor &&
          cartItem.selectedSize === item.selectedSize
            ? {
                ...cartItem,
                quantity: cartItem.quantity + change,
              }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const checkoutCart = () => {
    if (cart.length === 0) return;

    const message = `Hello Secret Eve 🌹

I'd like to order:

${cart
  .map(
    (item) =>
      `${item.name}
${item.selectedColor ? `Color: ${item.selectedColor}\n` : ""}Size: ${item.selectedSize}
Quantity: ${item.quantity}
Subtotal: KSh ${(item.price * item.quantity).toLocaleString()}`
  )
  .join("\n\n")}

Total: KSh ${cartTotal.toLocaleString()}

Thank you!`;

    window.open(
      `https://wa.me/254798651199?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="secret-eve">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="logo">
          <img src="/Eve%20logo.png" alt="Secret Eve" />
        </div>

        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#shop">Shop</a></li>
        </ul>

        <button
          className="cart-icon"
          onClick={() => setCartOpen(true)}
          aria-label="Open shopping cart"
        >
          <svg
            className="cart-line-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H6" />
            <circle cx="10" cy="19" r="1.2" />
            <circle cx="18" cy="19" r="1.2" />
          </svg>
          <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
        </button>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="floating-flowers">
          <span className="flower flower-1">✿</span>
          <span className="flower flower-2">✿</span>
          <span className="flower flower-3">✿</span>
          <span className="flower flower-4">✿</span>
        </div>

        <div className="hero-content">
          <div className="rose">🌹</div>
          <p className="small-title">WELCOME TO</p>
          <h1>SECRET EVE</h1>
          <p className="tagline">
            Elegant Lingerie For Every Desire
          </p>
          <p className="hero-details">
            INTIMATES <span>•</span> LINGERIE <span>•</span> ELEGANCE
          </p>
          <a href="#shop" className="shop-button">
            SHOP COLLECTION
          </a>
        </div>
      </section>

      {/* SHOP */}
      <section className="shop-section" id="shop">
        <div className="floating-flowers shop-floating-flowers" aria-hidden="true">
          <span className="flower shop-flower shop-flower-1">✿</span>
          <span className="flower shop-flower shop-flower-2">✿</span>
          <span className="flower shop-flower shop-flower-3">✿</span>
          <span className="flower shop-flower shop-flower-4">✿</span>
          <span className="flower shop-flower shop-flower-5">✿</span>
          <span className="flower shop-flower shop-flower-6">✿</span>
          <span className="flower shop-flower shop-flower-7">✿</span>
          <span className="flower shop-flower shop-flower-8">✿</span>
        </div>

        <div className="section-heading">
          <p>DISCOVER</p>
          <h2>Our Collection</h2>
          <span></span>
        </div>

        <div className="product-grid">
          {products.map((product) => {
            const colors = product.colors || [];
            const selectedColor = selectedColors[product.id] || "";
            const availableSizes = getAvailableSizes(
              product,
              selectedColor
            );

            return (
              <div className="product-card" key={product.id}>
                {/* PRODUCT IMAGE */}
                <div
                  className="product-image"
                  onClick={() => setSelectedImage(product.image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      setSelectedImage(product.image);
                    }
                  }}
                >
                  <img src={product.image} alt={product.name} />
                </div>

                {/* PRODUCT INFORMATION */}
                <div className="product-info">
                  <h3>{product.name}</h3>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <p className="price">
                    KSh {product.price.toLocaleString()}
                  </p>

                  {/* COLOR SELECTION */}
                  {colors.length > 0 && (
                    <div className="color-selection">
                      <p className="sizes">
                        Choose color: 
                      </p>

                      <div className="color-options">
                        {colors.map((color) => (
                          <button
                            key={color}
                            type="button"
                            className={`color-option ${
                              selectedColor === color ? "selected" : ""
                            }`}
                            aria-pressed={selectedColor === color}
                            onClick={() => {
                              setSelectedColors((current) => ({
                                ...current,
                                [product.id]: color,
                              }));

                              if (product.id === 20) {
                                const matchingSizes =
                                  product.sizeByColor?.[color] || [];

                                setSelectedSizes((current) => ({
                                  ...current,
                                  [product.id]: matchingSizes[0] || "",
                                }));
                              }
                            }}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SIZE SELECTION */}
                  {availableSizes.length > 0 && (
                    <div className="size-selection">
                      <p className="sizes">Choose size:</p>

                      <div className="size-options">
                        {availableSizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            className={`size-option ${
                              selectedSizes[product.id] === size
                                ? "selected"
                                : ""
                            }`}
                            onClick={() =>
                              setSelectedSizes((current) => ({
                                ...current,
                                [product.id]: size,
                              }))
                            }
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PRODUCT BUTTONS */}
                  <div className="product-buttons">
                    <button
                      className="cart-button"
                      onClick={() => addToCart(product)}
                    >
                      ADD TO CART
                    </button>

                    <button
                      className="order-button"
                      onClick={() => orderNow(product)}
                    >
                      ORDER NOW
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CART */}
      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setCartOpen(false);
            }
          }}
        >
          <div className="cart-panel">
            <div className="cart-header">
              <h2>Your Cart</h2>

              <button
                className="close-cart"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛍️</div>
                <h3>Your cart is empty</h3>
                <p>Add something beautiful to your cart.</p>

                <button
                  className="continue-shopping"
                  onClick={() => setCartOpen(false)}
                >
                  CONTINUE SHOPPING
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                    >
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>

                        <p>KSh {item.price.toLocaleString()}</p>

                        {item.selectedColor && (
                          <span className="cart-size">
                            Color: {item.selectedColor}
                          </span>
                        )}

                        <span className="cart-size">
                          Size: {item.selectedSize}
                        </span>

                        <span className="cart-quantity-label">
                          Quantity: {item.quantity}
                        </span>

                        <div className="quantity-controls">
                          <button
                            onClick={() => updateQuantity(item, -1)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() => updateQuantity(item, 1)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <div>
                    <span>Total</span>
                    <strong>
                      KSh {cartTotal.toLocaleString()}
                    </strong>
                  </div>

                  <button
                    className="checkout-button"
                    onClick={checkoutCart}
                  >
                    ORDER CART ON WHATSAPP
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* IMAGE VIEWER */}
      {selectedImage && (
        <div
          className="image-viewer"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="close-image"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Secret Eve product"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      {/* FOOTER */}
      <footer>
        <div className="floating-flowers footer-floating-flowers" aria-hidden="true">
          <span className="flower footer-flower footer-flower-1">✿</span>
          <span className="flower footer-flower footer-flower-2">✿</span>
          <span className="flower footer-flower footer-flower-3">✿</span>
          <span className="flower footer-flower footer-flower-4">✿</span>
          <span className="flower footer-flower footer-flower-5">✿</span>
          <span className="flower footer-flower footer-flower-6">✿</span>
        </div>

        <p className="footer-tagline">
          Elegant Lingerie For Every Desire
        </p>

        <div className="footer-socials">
          <a
            href="https://www.instagram.com/_secreteve_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-instagram"></i>
            <span>@_secreteve_</span>
          </a>

          <a
            href="https://www.tiktok.com/@_secreteve._"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-tiktok"></i>
            <span>@_secreteve._</span>
          </a>
        </div>

        <p className="copyright">
          © 2026 Secret Eve. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
