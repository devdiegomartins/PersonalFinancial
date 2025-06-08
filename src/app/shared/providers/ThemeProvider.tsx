import type { PropsWithChildren } from 'react'
import '../styles/global.css'

export function ThemeProvider({ children }: PropsWithChildren) {
	return <>{children}</>
}
