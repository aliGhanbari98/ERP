/* eslint-disable import/no-unresolved */
import { ReactComponent as HelpIcon } from 'assets/icons/question-circle.svg'
import { ReactComponent as SettingIcon } from 'assets/icons/setting.svg'
import { ReactComponent as AccountingIcon } from 'assets/icons/accounting.svg'
import { lang } from 'helpers/language'

const tabs = [
  {
    title: lang('nav.Dashboard'),
    iconName: 'dashboard',
    path: '/dashboard',
    visibleTo: ['admin', 'employee', 'manager'],
  },
  {
    title: lang('nav.Worklog'),
    iconName: 'finance',
    path: '/dashboard/worklog',
    visibleTo: ['admin', 'manager'],
  },
  {
    title: lang('nav.Worklog'),
    iconName: 'finance',
    path: '/dashboard/worklog/details',
    visibleTo: ['employee'],
  },
  {
    title: lang('nav.Requests'),
    iconName: 'keys',
    path: '/dashboard/requests',
    visibleTo: ['admin', 'employee', 'manager'],
  },
  {
    title: lang('nav.Personnel'),
    iconName: 'person',
    path: '/dashboard/personnel',
    visibleTo: ['admin'],
  },
  {
    title: lang('nav.Accounting'),
    iconSVG: AccountingIcon,
    path: '/dashboard/accounting',
    visibleTo: ['admin', 'employee', 'manager'],
  },
  {
    title: lang('nav.Settings'),
    iconSVG: SettingIcon,
    path: '/dashboard/settings',
    expandable: true,
    visibleTo: ['admin'],
  },
  {
    title: lang('nav.Help'),
    iconSVG: HelpIcon,
    path: '/dashboard/help',
    visibleTo: ['admin', 'employee', 'manager'],
  },
]

export default tabs
