import { RouterProvider as RRDProvider } from "react-router-dom";
import { router } from "~/app/routes/router";

export const RouterProvider = () => {
	return <RRDProvider router={router} />;
};
