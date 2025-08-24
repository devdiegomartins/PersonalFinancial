import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { LazyHomePage } from "../../pages/PageHelper";

export const dashboardRoutes: RouteObject[] = [
	{
		path: "/dashboard",
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<LazyHomePage />
			</Suspense>
		),
	},
];
