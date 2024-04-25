import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import App from "../App";
import AddNewProduct from "../pages/addNewProduct";
import Orders from "../Components/orders/orders";
import ProductDetails from "../pages/productDetails";
import { AnimatePresence } from "framer-motion";
 
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: "", element: <Home />},
            {path: "addItem", element: <AddNewProduct /> },
            {path: "orders", element: <Orders /> },
            {path: "productDetail/:itemId", element: <AnimatePresence><ProductDetails /></AnimatePresence> },
        ]
    }
])