import { createBrowserRouter, RouteObject } from "react-router";
import RootLayout from "../layout/RootLayout";
import Dashboard from "../modules/dashboard/Dashboard";
import Reminder from "../modules/reminder/Reminder";
import Interaction from "../modules/interaction/Interaction";
import Login from "../modules/login/Login";
import Register from "../modules/register/Register";
import ProtectedRoute from "../layout/ProtectedRoute";
import Projects from "../modules/project/Projects";
import ProjectForm from "../modules/project/ProjectForm";
import NotFound from "../modules/404/NotFound";
import { Clients, CreateClient, UpdateClient } from "../modules/client";

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/create", element: <ProjectForm /> },
      { path: "/clients", element: <Clients /> },
      { path: "/clients/create", element: <CreateClient /> },
      { path: "/clients/update/:id", element: <UpdateClient /> },
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
