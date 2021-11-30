import { AsyncTrunk } from 'mobx-sync'
import { makeAutoObservable } from 'mobx'

class AuthStore {
  token = null

  phone = null

  email = 'user@example.com'

  userData = {}

  constructor() {
    makeAutoObservable(this)
  }
}

const authStore = new AuthStore()

const trunk = new AsyncTrunk(authStore, { storage: localStorage })
trunk.init()

export default authStore
