#  Shopping Store

A modern e-commerce store built with **React 18**, **Redux Toolkit**, and **React Router DOM**, powered by **Vite** for a fast development experience. Products are fetched from an external API using **Axios**, with loading states handled by **React Loader Spinner** and iconography by **React Icons**.


## Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI component library |
| [Vite](https://vitejs.dev/) | Build tool & dev server with HMR |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Global state management (cart, products) |
| [React Redux](https://react-redux.js.org/) | React bindings for Redux |
| [React Router DOM v6](https://reactrouter.com/) | Client-side routing |
| [Axios](https://axios-http.com/) | HTTP client for API requests |
| [React Icons](https://react-icons.github.io/react-icons/) | Icon library |
| [React Loader Spinner](https://mhnpd.github.io/react-loader-spinner/) | Loading state UI |
| ESLint | Code linting |

---

## Project Structure

```
shopping-react-sn/
├── public/               # Static assets (favicon, images)
├── src/
│   ├── components/       # Reusable UI components (Navbar, ProductCard, Cart, etc.)
│   ├── pages/            # Route-level page components (Home, ProductDetail, Cart page)
│   ├── store/            # Redux store setup, slices (cartSlice, productsSlice)
│   ├── App.jsx           # Root component — router and layout
│   └── main.jsx          # Entry point — renders App, provides Redux store
├── index.html            # HTML entry point (Vite)
├── vite.config.js        # Vite configuration
├── eslint.config.js      # ESLint configuration
└── package.json          # Project metadata and dependencies
```

---

## Features

- Product listing fetched from an external REST API
- Add to cart / remove from cart functionality
- Quantity management per cart item
- Cart total calculation
- Global state managed with Redux Toolkit slices
- Loading spinner while products are being fetched
- Client-side routing with React Router DOM v6
- Lightning-fast dev server with Vite HMR

---

## Get Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18` or higher
- `npm` v9 or higher (comes with Node)

You can verify your versions:

```bash
node -v
npm -v
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SepideNorouzi/shopping-react-sn.git

# 2. Navigate into the project directory
cd shopping-react-sn

# 3. Install dependencies
npm install
```

### Running the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (Vite's default port).

### Building for Production

```bash
npm run build
```

The optimized production build will be output to the `dist/` folder.

### Previewing the Production Build

```bash
npm run preview
```

This serves the `dist/` folder locally so you can verify the production build before deploying.

### Linting

```bash
npm run lint
```

---

## API

This project fetches product data from an external API. The base URL and endpoints are configured via Axios inside the `src/` directory.

```bash
# .env
VITE_API_BASE_URL=https://your-api-url.com
```

Access it in your code as:

```js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

---

## Architecture Overview

```
main.jsx
  └── <Provider store={store}>      ← Redux store injected here (global)
        └── <App />
              └── <RouterProvider>  ← React Router v6 routing
                    ├── /           → Home (product listing)
                    ├── /products/:id → Product detail page
                    └── /cart       → Cart page
```

**State flow:**

- Products are fetched with Axios → dispatched to Redux via a `createAsyncThunk` action
- Cart actions (add, remove, update quantity) are handled by `cartSlice`
- Components read state via `useSelector` and dispatch actions via `useDispatch`

---

## Key Concepts Used

| Concept | Where |
|---|---|
| `createSlice` | Cart and product state management |
| `createAsyncThunk` | Async API calls with loading/error state |
| `useSelector` | Reading Redux state in components |
| `useDispatch` | Triggering Redux actions |
| `useNavigate` / `useParams` | React Router navigation and URL params |
| Axios interceptors (optional) | Centralized API error handling |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start local dev server with HMR |
| `npm run build` | Bundle app for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## License

This project is open source. Feel free to use and modify it for learning purposes.

---
