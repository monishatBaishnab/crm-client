import { createBrowserRouter, RouteObject } from "react-router";
import RootLayout from "../layout/RootLayout";
import Dashboard from "../modules/dashboard/Dashboard";
import Project from "../modules/project/Project";
import Client from "../modules/client/Client";
import Reminder from "../modules/reminder/Reminder";
import Interaction from "../modules/interaction/Interaction";
import Login from "../modules/login/Login";
import Register from "../modules/register/Register";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/projects", element: <Project /> },
      { path: "/clients", element: <Client /> },
      { path: "/reminders", element: <Reminder /> },
      { path: "/interactions", element: <Interaction /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

const router = createBrowserRouter(routes);

export default router;
