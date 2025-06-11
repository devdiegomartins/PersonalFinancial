import React from 'react'
import ReactDOM from 'react-dom/client'
import { SplashProvider } from './app/shared/providers/SplashProvider'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<SplashProvider />
	</React.StrictMode>,
)
