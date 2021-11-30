import { useEffect } from 'react'
import { Router } from '@reach/router'
import { observer } from 'mobx-react-lite'
import ErrorBoundary from 'base/error_boundary'
import { Alert as AlertProvider } from 'base/ui'
import routes, { AuthRoutes as authRoutes } from 'configs/routes'
import { MasterPage, AuthenticationPage } from 'containers'
import { authStore, personnelStore } from 'stores'
import { usersReq } from 'queries/users'
import { profileReq } from 'queries/profile'
import { getCurrentLanguage } from './helpers/language'
import { updateDirection } from './helpers/direction'
import './assets/StyleLoader'

const App = observer(() => {
  getCurrentLanguage()
  updateDirection()

  const { role: currentRole } = authStore.userData || {}

  const filteredRoutes = routes.filter(
    ({ visibleTo }) => visibleTo.indexOf(currentRole) !== -1
  )

  useEffect(() => {
    // TODO: Fix this
    if (localStorage.getItem('loggedIn')) {
      // navigate('/dashboard')
      usersReq(null, { validRoles: ['admin', 'manager'] })
        .then((data) => {
          personnelStore.personnels = [
            { name: 'All personnel', value: { id: '' } },
            ...data.result.map((member) => ({
              ...member,
              name: `${member.first_name} ${member.last_name}`,
            })),
          ]
        })
        .catch(() => {})

      if (localStorage.getItem('accessToken'))
        profileReq()
          .then((data) => {
            if (data) authStore.userData = data
          })
          .catch(() => {})
    }
  }, [])

  return (
    <AlertProvider>
      <ErrorBoundary>
        <Router style={{ display: 'contents' }}>
          <MasterPage path="/dashboard">
            {filteredRoutes.map(({ Component, props, path }) => (
              <Component key={path} {...props} path={path} />
            ))}
          </MasterPage>

          <AuthenticationPage default>
            {authRoutes.map(({ Component, props, path }) => (
              <Component key={path} {...props} path={path} />
            ))}
          </AuthenticationPage>
        </Router>
      </ErrorBoundary>
    </AlertProvider>
  )
})

export default App
