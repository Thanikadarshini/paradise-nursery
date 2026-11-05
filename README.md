# Paradise Nursery

Paradise Nursery is an online plant shop built with **React** and **Redux Toolkit**.
Browse houseplants by category, add them to your cart, and adjust quantities
while the cart total updates automatically.

## Features

- Landing page with the company name, an About Us section and a **Get Started** button
- Product listing with 18 houseplants in 3 categories (Air Purifying, Aromatic, Low Light)
- **Add to Cart** buttons that disable once a plant is in the cart
- Navbar on the Plants and Cart pages with links to Home, Plants and Cart
- Cart icon that shows the live total number of items
- Cart page with thumbnail, name, unit price, subtotal per plant, increase/decrease
  buttons, delete button, overall total, **Checkout** ("Coming Soon") and
  **Continue Shopping**

## Project structure

```
src/
  main.jsx        Entry point, wraps the app in the Redux Provider
  store.js        Redux store
  CartSlice.jsx   Cart slice: addItem, removeItem, updateQuantity
  App.jsx         Landing page and simple page switching
  App.css         Landing page styles (background image) and shared styles
  AboutUs.jsx     Company details
  ProductList.jsx Product listing page
  CartItem.jsx    Shopping cart page
```

## Run locally

```bash
npm install
npm run dev
```

Build for production with `npm run build`.

## Tech stack

React 18, Redux Toolkit, React-Redux, Vite
