import React from 'react'
import ReactDOM from 'react-dom/client'
import { DebugErrorProvider } from './app/shared/providers/DebugErrorProvider'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<DebugErrorProvider />
	</React.StrictMode>,
)
