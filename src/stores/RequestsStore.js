import { AsyncTrunk } from 'mobx-sync'
import { makeAutoObservable } from 'mobx'

class RequestsStore {
  requests = []

  constructor() {
    makeAutoObservable(this)
  }

  addRequest = (request) => {
    this.requests.push(request)
  }

  setRequest = (request, index) => {
    this.requests[index] = request
  }

  confirm = (request) => {
    const index = this.requests.findIndex((item) => item.id === request.id)
    this.requests[index].teamManager = { status: 'Confirmed' }
    this.requests = this.requests.slice()
  }

  reject = (request) => {
    const index = this.requests.findIndex((item) => item.id === request.id)
    this.requests[index].teamManager = { status: 'Rejected' }
    this.requests = this.requests.slice()
  }
}

const requestsStore = new RequestsStore()

const trunk = new AsyncTrunk(requestsStore, { storage: localStorage })
trunk.init()

export default requestsStore
