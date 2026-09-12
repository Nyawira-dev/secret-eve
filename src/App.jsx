import { useState } from "react";
import "./App.css";
import products from "./data/products";

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState({});

 const addToCart = (product) => {
  const selectedSize = selectedSizes[product.id];

  if (product.sizes.length > 0 && !selectedSize) {
    alert("Please choose a size first.");
    return;
  }

  setCart((currentCart) => {
    const existingProduct = currentCart.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize
    );

    if (existingProduct) {
      return currentCart.map((item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    }

    return [
      ...currentCart,
      {
        ...product,
        quantity: 1,
        selectedSize: selectedSize || "Please confirm size",
      },
    ];
  });

  setCartOpen(true);
};
  const orderNow = (product) => {
    const selectedSize = selectedSizes[product.id];

    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please choose a size first.");
      return;
    }

   const cartMessage = `Hello Secret Eve 🌹

I'd like to place an order:

${cart
  .map(
    (item) =>
      `${item.name}
Size: ${item.selectedSize}
Quantity: ${item.quantity}
Price: KSh ${item.price.toLocaleString()}
Subtotal: KSh ${(item.price * item.quantity).toLocaleString()}`
  )
  .join("\n\n")}

--------------------
Total: KSh ${cart
  .reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  .toLocaleString()}
--------------------

Thank you!`;

    const whatsappNumber = "254798651199";

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="secret-eve">

      {/* NAVIGATION */}
      <nav className="navbar">

        <div className="logo">
          <img src="/secret-eve-logo.png" alt="Secret Eve" />
        </div>

        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>

          <li>
            <a href="#shop">Shop</a>
          </li>
        </ul>

        <button
          className="cart-icon"
          onClick={() => setCartOpen(true)}
        >
          🛒 <span>{cart.length}</span>
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

          <p className="small-title">
            WELCOME TO
          </p>

          <h1>
            SECRET EVE
          </h1>

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
      <section
        className="shop-section"
        id="shop"
      >

        <div className="section-heading">

          <p>
            DISCOVER
          </p>

          <h2>
            Our Collection
          </h2>

          <span></span>

        </div>


        <div className="product-grid">

          {products.map((product) => (

            <div
              className="product-card"
              key={product.id}
            >

              {/* PRODUCT IMAGE */}
              <div
                className="product-image"
                onClick={() =>
                  setSelectedImage(product.image)
                }
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

              </div>


              {/* PRODUCT INFORMATION */}
              <div className="product-info">

                <h3>
                  {product.name}
                </h3>

                <p className="price">
                  KSh {product.price.toLocaleString()}
                </p>


                {/* SIZE SELECTION */}
                {product.sizes.length > 0 && (

                  <div className="size-selection">

                    <p className="sizes">
                      Choose size:
                    </p>

                    <div className="size-options">

                      {product.sizes.map((size) => (

                        <button
  key={size}
  className={`size-option ${
    selectedSizes[product.id] === size ? "selected" : ""
  }`}
  type="button"
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
                    onClick={() =>
                      addToCart(product)
                    }
                  >
                    ADD TO CART
                  </button>


                  <button
                    className="order-button"
                    onClick={() =>
                      orderNow(product)
                    }
                  >
                    ORDER NOW
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* CART */}
      {cartOpen && (

        <div className="cart-overlay">

          <div className="cart-panel">


            {/* CART HEADER */}
            <div className="cart-header">

              <h2>
                Your Cart
              </h2>

              <button
                className="close-cart"
                onClick={() =>
                  setCartOpen(false)
                }
              >
                ×
              </button>

            </div>


            {/* EMPTY CART */}
            {cart.length === 0 ? (

              <div className="empty-cart">

                <div className="empty-cart-icon">
                  🛍️
                </div>

                <h3>
                  Your cart is empty
                </h3>

                <p>
                  Add something beautiful to your cart.
                </p>

                <button
                  className="continue-shopping"
                  onClick={() =>
                    setCartOpen(false)
                  }
                >
                  CONTINUE SHOPPING
                </button>

              </div>

            ) : (

              <>

                {/* CART ITEMS */}
                <div className="cart-items">

                  {cart.map((item) => (

                    <div
                      className="cart-item"
                      key={`${item.id}-${item.selectedSize}`}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />


                     <div className="cart-item-info">

  <h3>{item.name}</h3>

  <p>
    KSh {item.price.toLocaleString()}
  </p>

  <span className="cart-size">
    Size: {item.selectedSize}
  </span>

  <span className="cart-quantity-label">
    Quantity: {item.quantity}
  </span>

  <div className="quantity-controls">

    <button
      onClick={() => {
        setCart((currentCart) =>
          currentCart
            .map((cartItem) =>
              cartItem.id === item.id &&
              cartItem.selectedSize === item.selectedSize
                ? {
                    ...cartItem,
                    quantity: cartItem.quantity - 1,
                  }
                : cartItem
            )
            .filter(
              (cartItem) => cartItem.quantity > 0
            )
        );
      }}
    >
      −
    </button>

    <span>{item.quantity}</span>

    <button
      onClick={() => {
        setCart((currentCart) =>
          currentCart.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.selectedSize === item.selectedSize
              ? {
                  ...cartItem,
                  quantity: cartItem.quantity + 1,
                }
              : cartItem
          )
        );
      }}
    >
      +
    </button>

  </div>

</div>
                    </div>

                  ))}

                </div>


                {/* CART TOTAL */}
                <div className="cart-total">

                  <div>

                    <span>
                      Total
                    </span>

                    <strong>
                      KSh{" "}
                      {cart
                        .reduce(
                          (total, item) =>
                            total +
                            item.price *
                              item.quantity,
                          0
                        )
                        .toLocaleString()}
                    </strong>

                  </div>


                  {/* WHATSAPP CART ORDER */}
                  <button
                    className="checkout-button"
                    onClick={() => {

                      const cartMessage = `Hello Secret Eve 🌹

I'd like to order:

${cart
  .map(
    (item) =>
      `${item.name}
Size: ${item.selectedSize}
Quantity: ${item.quantity}
KSh ${(item.price * item.quantity).toLocaleString()}`
  )
  .join("\n\n")}

Total: KSh ${cart
                        .reduce(
                          (total, item) =>
                            total +
                            item.price *
                              item.quantity,
                          0
                        )
                        .toLocaleString()}

Thank you!`;

                      window.open(
                        `https://wa.me/254798651199?text=${encodeURIComponent(
                          cartMessage
                        )}`,
                        "_blank"
                      );

                    }}
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
          onClick={() =>
            setSelectedImage(null)
          }
        >

          <button
            className="close-image"
            onClick={() =>
              setSelectedImage(null)
            }
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Secret Eve lingerie"
            onClick={(e) =>
              e.stopPropagation()
            }
          />

        </div>

      )}


      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          SECRET EVE
        </div>

        <p>
          Elegant Lingerie For Every Desire
        </p>

        <p className="copyright">
          © 2026 Secret Eve. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default App;