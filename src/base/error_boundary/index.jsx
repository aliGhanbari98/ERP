import { Component } from 'react'
import axios from 'axios'
import { withAlert } from 'react-alert'

class ErrorBoundary extends Component {
  componentDidMount() {
    this.responseInterceptor = axios.interceptors.response.use(
      (res) => res,
      (error) => {
        const { alert } = this.props
        const { response } = error
        alert.show(`${response.status}: ${response.statusText}`, {
          type: 'error',
        })
        throw error
      }
    )
  }

  componentWillUnmount() {
    // Remove handlers, so Garbage Collector will get rid of if WrappedComponent will be removed
    axios.interceptors.request.eject(this.requestInterceptor)
    axios.interceptors.response.eject(this.responseInterceptor)
  }

  render() {
    const { children } = this.props
    return children
  }
}

export default withAlert()(ErrorBoundary)
