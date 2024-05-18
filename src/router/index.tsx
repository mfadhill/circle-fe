import { RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import RootLayout from "../layout/RootLayout";
import Profile from "../pages/Profile";
import Search from "../pages/Search";
import Login from "../pages/Auth/login/components/Login";
import Followings from "../pages/Followings";
import AuthLayout from "../layout/AuthLayout";
import Register from "../pages/Auth/register/components/Register";

const router: RouteObject[] = [
   {
      path: "/",
      element: <RootLayout />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: "profile",
            element: <Profile />,
         },
         {
            path: "search",
            element: <Search />,
         },
         {
            path: "follows",
            element: <Followings />,
         },
      ]   
   },{
      path:"/auth",
      element:<AuthLayout/>,
      children:[
         {
            path:"login",
            element:<Login />
         },
         {
            path:"register",
            element:<Register />
         }
      ]
   }
];

export default router;
