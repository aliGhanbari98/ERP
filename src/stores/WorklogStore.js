import { AsyncTrunk } from 'mobx-sync'
import { makeAutoObservable } from 'mobx'

class WorklogStore {
  worklogs = []

  constructor() {
    makeAutoObservable(this)
  }
}

const worklogStore = new WorklogStore()

const trunk = new AsyncTrunk(worklogStore, { storage: localStorage })
trunk.init()

export default worklogStore
