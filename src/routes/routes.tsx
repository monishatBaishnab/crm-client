import { createBrowserRouter, RouteObject } from "react-router";
import RootLayout from "../layout/RootLayout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <>Home</> },
      { path: "/project", element: <>Projects</> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
