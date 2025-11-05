import { Spinner } from '~/ui/components/Spinner/SpinnerComponent'

export const WindowLoadingComponent = () => {
  return (
    <div className="flex w-dvw h-dvh items-center justify-center fixed top-0 left-0 z-[9999] bg-slate-950/30">
      <Spinner />
    </div>
  )
}
