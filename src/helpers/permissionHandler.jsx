import { observer } from 'mobx-react-lite'
import { authStore } from 'stores'

const Permission = observer((props) => {
  const { children, view } = props
  const currentRole = authStore.userData.role
  const havePermission = view.indexOf(currentRole) !== -1
  return <>{havePermission ? children : null}</>
})

export default Permission
