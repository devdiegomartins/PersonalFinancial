import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { HomePage } from "../../pages/PageHelper";

export const dashboardRoutes: RouteObject[] = [
	{
		path: "/", // TODO temp
		element: (
			<Suspense fallback={<div>Loading...</div>}>
				<HomePage />
			</Suspense>
		),
	},
];
