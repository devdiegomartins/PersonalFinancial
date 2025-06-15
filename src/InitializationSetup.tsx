import React from 'react'
import ReactDOM from 'react-dom/client'
import { InitializationSetupProvider } from './app/shared/providers/windows/InitializationSetupProvider'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
	<React.StrictMode>
		<InitializationSetupProvider />
	</React.StrictMode>,
)
