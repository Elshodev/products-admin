import { lazy, ReactElement } from "react";

const Products = lazy(() => import("../pages/products"));

interface RouteConfig {
  path: string;
  element: ReactElement;
}

const adminRoutes: RouteConfig[] = [{ path: "/", element: <Products /> }];

export default adminRoutes;
export type { RouteConfig };
