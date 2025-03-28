import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import ReviewPage from "../reviewforms/ReviewPage";
import UploadReview from "../reviewforms/UploadReview";
import ManageReviews from "../dashboard/ManageReviews";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <CartProvider>
                <App />
            </CartProvider>
        ),
        children: [
            {
                path: '/',
                element: <Home />
            },
 
            {
                path: "/reviewpage",
                element: <ReviewPage />
            },

        ]
    },
    
  
]);

export default router;
