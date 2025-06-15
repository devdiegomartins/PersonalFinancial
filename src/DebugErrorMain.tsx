import React from 'react'
import ReactDOM from 'react-dom/client'
import { DebugErrorProvider } from './app/shared/providers/windows/DebugErrorProvider'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<DebugErrorProvider />
	</React.StrictMode>,
)
