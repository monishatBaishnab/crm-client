import { RouterProvider } from "react-router";
import router from "../routes/routes";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from "sonner";

// Create a client
const queryClient = new QueryClient();

const RootProvider = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default RootProvider;
