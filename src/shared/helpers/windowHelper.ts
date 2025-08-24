import {
	getCurrentWindow,
	LogicalSize,
	type Window,
} from "@tauri-apps/api/window";

/**
 * Optional configuration for the current window.
 *
 * @remarks
 * Use this type when you want to apply changes to the window (size, decorations, behavior).
 */
type WindowConfigType = {
	/** Allows resizing via window borders */
	isResizable?: boolean;
	/** Shows or hides window decorations (title bar, borders) */
	showDecorations?: boolean;
	/** Keeps the window always on top of other windows */
	isAlwaysOnTop?: boolean;
	/** Allows the window to be closed (enables/disables the close button) */
	isClosable?: boolean;
	/** Desired size: width and height in pixels (device-independent units) */
	size?: { width: number; height: number };
};

/**
 * Returns the reference to the current Tauri-managed window.
 *
 * @returns The `Window` instance that corresponds to the current window.
 *
 * @example
 * const win = getWindow();
 */
export function getWindow(): Window {
	return getCurrentWindow();
}

/**
 * Applies multiple configurations to the current window atomically.
 *
 * If `props` is not provided, the function returns the current window without changes.
 * Fields not provided in `props` will keep their current values.
 *
 * @param props - Object with optional window configuration properties to apply.
 * @returns The `Window` instance after applying the changes.
 *
 * @remarks
 * - The function ensures that the size is always defined: if `props.size` is not
 *   provided, the current window size will be used.
 * - All configuration operations are executed in parallel using `Promise.all`.
 *
 * @example
 * // Set size and make the window non-resizable
 * await setWindowConfig({ size: { width: 1024, height: 768 }, isResizable: false });
 */
export async function setWindowConfig(
	props?: WindowConfigType,
): Promise<Window> {
	const currentWindow = getCurrentWindow();

	if (!props) return currentWindow;

	let size = props?.size
		? new LogicalSize(props.size.width, props.size.height)
		: undefined;

	if (!size) {
		const currentSize = await currentWindow.innerSize();
		size = new LogicalSize(currentSize.width, currentSize.height);
	}

	const mergedProps: Required<WindowConfigType> = {
		isResizable: props?.isResizable ?? (await currentWindow.isResizable()),
		showDecorations:
			props?.showDecorations ?? (await currentWindow.isDecorated()),
		isAlwaysOnTop:
			props?.isAlwaysOnTop ?? (await currentWindow.isAlwaysOnTop()),
		isClosable: props?.isClosable ?? (await currentWindow.isClosable()),
		size,
	};

	await Promise.all([
		currentWindow.setResizable(mergedProps.isResizable),
		currentWindow.setDecorations(mergedProps.showDecorations),
		currentWindow.setAlwaysOnTop(mergedProps.isAlwaysOnTop),
		currentWindow.setClosable(mergedProps.isClosable),
		currentWindow.setSize(mergedProps.size as LogicalSize),
	]);

	return currentWindow;
}

/**
 * Updates the title of the current window.
 *
 * @param title - Text to be displayed in the window's title bar.
 * @returns A promise resolved when the title has been updated.
 *
 * @example
 * await setWindowTitle('My App - Dashboard');
 */
export async function setWindowTitle(title: string): Promise<void> {
	const currentWindow = getCurrentWindow();
	await currentWindow.setTitle(title);
}

/**
 * Closes the current window.
 *
 * @returns A promise resolved when the window has been closed.
 *
 * @example
 * await closeWindow();
 */
export async function closeWindow(): Promise<void> {
	const currentWindow = getCurrentWindow();
	await currentWindow.close();
}
