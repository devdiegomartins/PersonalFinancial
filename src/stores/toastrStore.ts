import { createStore } from './create'

export const toastrStore = createStore('modal_store', {
  toastrList: [],
})
