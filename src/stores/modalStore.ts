import { createStore } from './create'

type ModalStoreType = {
  modalList: Record<string, unknown>
}

export const modalStore = createStore<ModalStoreType>('modal_store', {
  modalList: {},
})
