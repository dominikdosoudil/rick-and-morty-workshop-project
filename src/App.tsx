import {
  Outlet,
  RouterProvider,
  Link,
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Characters
        </Link>{" "}
        {/*<Link to="/about" className="[&.active]:font-bold">*/}
        {/*  Episodes*/}
        {/*</Link>*/}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Characters,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

const routeTree = rootRoute.addChildren([indexRoute, aboutRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

import "./App.css";
import Characters from "./pages/Characters.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
