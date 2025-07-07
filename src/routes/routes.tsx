import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import CustomerManagement from "../pages/shared/customerManagement/CustomerManagement";
import CustomerDetails from "../pages/shared/customerManagement/CustomerDetails";
import ManageOrders from "../pages/shared/orderManagement/ManageOrders";
import OrderDetails from "../pages/shared/orderManagement/OrderDetails";
import DraftOrders from "../pages/shared/orderManagement/DraftOrders";
import Login from "../pages/auth/Login";
import UserManagement from "../pages/admin/UserManagement";
// import ManageBlogs from "../pages/shared/blogManagement/ManageBlogs";
import CreateBlog from "../pages/shared/blogManagement/CreateBlog";
import ProtectedAdmin from "../auth/ProtectedAdmin";
import ManageReviews from "../pages/shared/reviewManagement/ManageReviews";
import CreateReview from "../pages/shared/reviewManagement/CreateReview";
import ErrorPage from "../pages/shared/error/ErrorPage";
import Statistics from "../pages/shared/Statistics/Statistics";
import EditBlog from "../pages/shared/blogManagement/EditBlog";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/dashboard"} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dashboard",
    element: <App />,

    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "customers",
        element: <CustomerManagement />,
      },
      {
        path: "customers/:id",
        element: <CustomerDetails />,
      },
      {
        path: "orders",
        element: <ManageOrders />,
      },
      {
        path: "orders/drafts",
        element: <DraftOrders />,
      },
      {
        path: "orders/:id",
        element: <OrderDetails />,
      },
      {
        path: "users",
        element: (
          <ProtectedAdmin>
            <UserManagement />
          </ProtectedAdmin>
        ),
      },
      // {
      //   path: "blogs",
      //   element: <ManageBlogs />,
      // },
      {
        path: "blogs/create-new",
        element: <CreateBlog />,
      },
      {
        path: "blogs/edit/:blogId",
        element: <EditBlog />,
      },
      {
        path: "reviews",
        element: <ManageReviews />,
      },
      {
        path: "reviews/create-review",
        element: <CreateReview />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
