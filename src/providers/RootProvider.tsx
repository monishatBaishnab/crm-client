import {  RouterProvider } from "react-router";
import router from "../routes/routes";



const RootProvider = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default RootProvider;
