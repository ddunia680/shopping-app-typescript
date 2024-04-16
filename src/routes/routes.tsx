import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import App from "../App";
import AddNewProduct from "../pages/addNewProduct";
import ProductDetails from "../pages/productDetails";
import { AnimatePresence } from "framer-motion";
 
export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {path: "", element: <Home />},
            {path: "AddItem", element: <AddNewProduct /> },
            {path: "productDetail/:itemId", element: <AnimatePresence><ProductDetails /></AnimatePresence> },
        ]
    }
])