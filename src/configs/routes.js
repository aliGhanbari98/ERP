import {
  LoginPage,
  RegisterPage,
  DashboardPage,
  WorklogPage,
  WorklogDetailsPage,
  RequestsPage,
  PersonnelPage,
  PersonnelManagementPage,
  WorkplaceManagementPage,
  TeamManagementPage,
  ShiftManagementPage,
  CompanySettingsPage,
  Holidays,
  Help,
  AccountingPage,
  PrivacyPolicy,
  TermsOfUse,
  ContractTerms,
} from 'pages'

export const Routes = [
  {
    Component: DashboardPage,
    path: '/',
    visibleTo: ['admin', 'employee', 'manager'],
  },
  {
    Component: WorklogPage,
    path: '/worklog',
    visibleTo: ['admin', 'employee', 'manager'],
  },
  {
    Component: WorklogDetailsPage,
    path: '/worklog/details',
    visibleTo: ['employee'],
  },
  {
    Component: WorklogDetailsPage,
    path: '/worklog/details/:userId',
    visibleTo: ['admin', 'employee', 'manager'],
  },
  {
    Component: RequestsPage,
    path: '/requests',
    visibleTo: ['admin', 'employee', 'manager'],
  },
  {
    Component: PersonnelPage,
    path: '/personnel',
    visibleTo: ['admin'],
  },
  {
    Component: PersonnelManagementPage,
    path: '/personnel/:userId',
    visibleTo: ['admin', 'manager', 'employee'],
  },
  {
    Component: AccountingPage,
    path: '/accounting',
    visibleTo: ['admin', 'manager', 'employee'],
  },
  {
    Component: AccountingPage,
    path: '/accounting/:userId',
    visibleTo: ['admin', 'manager', 'employee'],
  },
  // {
  //   Component: SettingsPage,
  //   path: 'settings',
  //   visibleTo: ['admin'],
  // },
  {
    Component: WorkplaceManagementPage,
    path: '/settings/workplace-management',
    visibleTo: ['admin'],
  },
  {
    Component: TeamManagementPage,
    path: '/settings/team-management',
    visibleTo: ['admin'],
  },
  {
    Component: ShiftManagementPage,
    path: '/settings/shift-management',
    visibleTo: ['admin'],
  },
  {
    Component: CompanySettingsPage,
    path: '/settings/company-settings',
    visibleTo: ['admin'],
  },
  {
    Component: Holidays,
    path: '/settings/holidays',
    visibleTo: ['admin'],
  },
  {
    Component: ContractTerms,
    path: '/settings/contract-settings',
    visibleTo: ['admin', 'employee', 'manager'],
  },
  {
    Component: Help,
    path: '/help',
    visibleTo: ['admin', 'employee', 'manager'],
  },
]

export const AuthRoutes = [
  {
    Component: LoginPage,
    path: '/*',
  },
  {
    Component: RegisterPage,
    path: '/register',
  },
  {
    Component: PrivacyPolicy,
    path: '/privacy-policy',
    visibleTo: ['admin', 'employee', 'manager'],
  },
  {
    Component: TermsOfUse,
    path: '/terms-of-use',
    visibleTo: ['admin', 'employee', 'manager'],
  },
]

export default Routes
