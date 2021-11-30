import { makeAutoObservable } from 'mobx'

class ModalsStore {
  messageModal = { isOpen: false, message: '', type: 'success' }

  constructor() {
    makeAutoObservable(this)
  }
}

const modalsStore = new ModalsStore()

export default modalsStore
