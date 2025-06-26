const LOCAL_STORAGE_NAME = "cesieats_cart";

export function getCart() {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem(LOCAL_STORAGE_NAME) ?? null;
  return cart ? JSON.parse(cart) : [];
}

export function addToCart(product) {
  if (typeof window === "undefined") return;
  const cart = getCart();
  const existingProduct = cart.find(
    (item) => item.id_product === product.id_product,
  );
  if (existingProduct) {
    existingProduct.quantity = (existingProduct.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdate"));
}

export function removeFromCart(productId) {
  if (typeof window === "undefined") return;
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.id_product !== productId);
  localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cartUpdate"));
}

export function updateProductQuantity(productId, quantity) {
  if (typeof window === "undefined") return;
  const cart = getCart();
  const product = cart.find((item) => item.id_product === productId);
  if (product) {
    product.quantity = quantity;
    if (product.quantity <= 0) {
      removeFromCart(productId);
    } else {
      localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdate"));
    }
  }
}

export function clearCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOCAL_STORAGE_NAME);
  window.dispatchEvent(new Event("cartUpdate"));
}

export function getTotalCartValue() {
  const cart = getCart();
  let total = 0;
  cart.forEach((product) => {
    let price = product.price;
    price *= product.quantity;
    total += price;
  });
  return total;
}
