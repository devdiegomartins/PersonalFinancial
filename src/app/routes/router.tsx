import { createHashRouter, type RouteObject } from "react-router-dom";
import { authRoutes } from "./auth/auth.routes";
import { dashboardRoutes } from "./dashboard/dashboard.routes";
import { errorRoutes } from "./error/error.routes";
import { firstAccessRoutes } from "./first-access/first-access.routes";
import { splashRoutes } from "./splash/splash.routes";

const routes = ([] as RouteObject[]).concat(
	splashRoutes,
	firstAccessRoutes,
	authRoutes,
	dashboardRoutes,
	errorRoutes,
);

export const router = createHashRouter(routes);
