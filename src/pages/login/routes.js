import { navigate } from '@reach/router'

import {
  LoginForm,
  Forgot,
  Company,
  Verify,
  ChangePassword,
} from './components'

const routes = [
  {
    props: {},
    path: '/',
    name: 'loginForm',
    Component: LoginForm,
  },
  {
    props: {},
    path: 'company',
    name: 'company',
    Component: Company,
  },
  {
    props: {
      forgot: true,
    },
    path: 'forgot-company',
    name: 'companyForgot',
    Component: Company,
  },
  {
    props: {},
    path: 'forgot',
    name: 'forgot',
    Component: Forgot,
  },
  {
    props: { verification: true },
    path: 'forgot-verification',
    name: 'forgot',
    Component: Forgot,
  },
  {
    props: {},
    path: 'verification',
    name: 'verify',
    Component: Verify,
  },
  {
    props: { limited: true, onCancelClick: () => navigate('/') },
    path: 'change-password',
    name: 'changePassword',
    Component: ChangePassword,
  },
]

export default routes
