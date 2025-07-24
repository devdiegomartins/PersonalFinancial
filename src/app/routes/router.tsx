import { createHashRouter, type RouteObject } from "react-router-dom";
import { dashboardRoutes } from "./dashboard.routes";

const routes = ([] as RouteObject[]).concat(dashboardRoutes);

export const router = createHashRouter(routes);
