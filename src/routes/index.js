import LoginPage from "../pages/authPages/loginPage";
import RegisterPage from "../pages/authPages/signUp";
import Dashboard from "../pages/dashboard";
import ProfilePage from "../pages/profilePage";
import Notes from "../pages/notes";


export const AllRoutes = [
  {
    path: "/",
    page: <Dashboard />,
    isPrivate: true,
  },
  {
    path: "/login",
    page: <LoginPage />,
    isPrivate: false,
  },
  {
    path: "/signup",
    page: <RegisterPage />,
    isPrivate: false,
  },
  {
    path: "/profile",
    page: <ProfilePage />,
    isPrivate: true,
  },
  {
    path: "/notes",
    page: <Notes />,
    isPrivate: true,
  },
];
