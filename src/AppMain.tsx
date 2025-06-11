import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './app/shared/providers/AppProvider'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<AppProvider />
	</React.StrictMode>,
)
