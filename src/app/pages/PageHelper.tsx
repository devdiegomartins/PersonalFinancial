import { lazyWithRetry } from "~/services/utils/lazyWithRetry";

//#region Splash Pages
export const LazySplashPage = lazyWithRetry(() =>
	import("./splash/SplashPage").then((module) => ({
		default: module.SplashPage,
	})),
);

// #region Dashboard Pages
export const LazyHomePage = lazyWithRetry(() =>
	import("./dashboard/HomePage").then((module) => ({
		default: module.HomePage,
	})),
);
