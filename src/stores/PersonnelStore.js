import { AsyncTrunk } from 'mobx-sync'
import { makeAutoObservable } from 'mobx'

class PersonnelStore {
  personnels = []

  constructor() {
    makeAutoObservable(this)
  }
}

const personnelStore = new PersonnelStore()

const trunk = new AsyncTrunk(personnelStore, { storage: localStorage })
trunk.init()

export default personnelStore
