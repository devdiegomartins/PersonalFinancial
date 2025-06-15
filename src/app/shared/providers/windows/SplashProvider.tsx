import { useEffect } from 'react'
import { BootstrapProvider } from '../BootstrapProvider'
import { useInitializationStatusApp } from '../../hooks/useInitializationStatusApp'

export function SplashProvider() {
	const boot = useInitializationStatusApp()

	useEffect(() => {
		boot()
	}, [])

	return <BootstrapProvider>SplashProvider</BootstrapProvider>
}
