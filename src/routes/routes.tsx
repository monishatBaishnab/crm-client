import { createBrowserRouter, RouteObject } from "react-router";
import RootLayout from "../layout/RootLayout";
import Dashboard from "../modules/dashboard/Dashboard";
import Login from "../modules/login/Login";
import Register from "../modules/register/Register";
import ProtectedRoute from "../layout/ProtectedRoute";
import NotFound from "../modules/404/NotFound";
import { Clients, CreateClient, UpdateClient } from "../modules/client";
import { CreateProject, Projects, UpdateProject } from "../modules/project";
import { CreateReminder, Reminders, UpdateReminder } from "../modules/reminder";
import { CreateInteraction, Interactions, UpdateInteraction } from "../modules/interaction";

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
      { path: "/projects/create", element: <CreateProject /> },
      { path: "/projects/update/:id", element: <UpdateProject /> },
      { path: "/clients", element: <Clients /> },
      { path: "/clients/create", element: <CreateClient /> },
      { path: "/clients/update/:id", element: <UpdateClient /> },
      { path: "/reminders", element: <Reminders /> },
      { path: "/reminders/create", element: <CreateReminder /> },
      { path: "/reminders/update/:id", element: <UpdateReminder /> },
      { path: "/interactions", element: <Interactions /> },
      { path: "/interactions/create", element: <CreateInteraction /> },
      { path: "/interactions/update/:id", element: <UpdateInteraction /> },
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
