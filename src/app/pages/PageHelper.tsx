import { lazyWithRetry } from "~/services/utils/lazyWithRetry";

// #region Dashboard Pages
export const HomePage = lazyWithRetry(() =>
	import("./dashboard/HomePage").then((module) => ({
		default: module.HomePage,
	})),
);
