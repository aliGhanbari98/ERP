import { modalsStore } from 'stores'

const modalsHandler = (data) => {
  modalsStore.messageModal = data
  modalsStore.deleteModal = data
}

export default modalsHandler
