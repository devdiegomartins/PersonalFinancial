import { type ComponentType, type LazyExoticComponent, lazy } from "react";

interface LazyWithRetryOptions {
	maxRetries?: number;
	retryDelay?: number;
	onRetry?: (attempt: number, error: Error) => void;
	onMaxRetriesExceeded?: (error: Error) => void;
}

interface RetryError extends Error {
	isRetryError: boolean;
	retryAttempts: number;
	originalError: Error;
}

/**
 * Creates a lazy component with retry capability in case of import failure
 * @param importFn - Component import function
 * @param options - Retry configuration options
 * @returns React lazy component with retry
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function lazyWithRetry<T extends ComponentType<any>>(
	importFn: () => Promise<{ default: T }>,
	options: LazyWithRetryOptions = {},
): LazyExoticComponent<T> {
	const {
		maxRetries = 5,
		retryDelay = 500,
		onRetry,
		onMaxRetriesExceeded,
	} = options;

	let retryCount = 0;

	const retryImport = async (): Promise<{ default: T }> => {
		try {
			return await importFn();
		} catch (error) {
			retryCount++;

			if (onRetry) {
				onRetry(retryCount, error as Error);
			}

			if (retryCount <= maxRetries) {
				// Wait before trying again
				await new Promise((resolve) => setTimeout(resolve, retryDelay));
				return retryImport();
			}

			// Maximum retry attempts exceeded
			const retryError: RetryError = {
				name: "RetryError",
				message: `Failed to load component after ${maxRetries} attempts`,
				isRetryError: true,
				retryAttempts: retryCount,
				originalError: error as Error,
			};

			if (onMaxRetriesExceeded) {
				onMaxRetriesExceeded(retryError);
			}

			throw retryError;
		}
	};

	return lazy(() => retryImport());
}
