import { useEffect, useState } from 'react'
import { navigate, useLocation } from '@reach/router'
import { Image, Navbar } from 'base/ui'
import { Button } from 'base/form'
// eslint-disable-next-line import/no-unresolved
import { ReactComponent as RoomSceneSVG } from 'assets/illustrations/room_scene.svg'
import styles from './index.module.scss'

const settingsItems = [
  {
    label: 'Workplace Management',
    path: '/dashboard/settings/workplace-management',
  },
  { label: 'Contract Settings', path: '/dashboard/settings/contract-settings' },
  { label: 'Shift Management', path: '/dashboard/settings/shift-management' },
  { label: 'Team Management', path: '/dashboard/settings/team-management' },
  { label: 'Complany Settings', path: '/dashboard/settings/company-settings' },

  // { label: 'Holidays', path: '/dashboard/settings/holidays' },
]

const Sidebar = ({ tabs }) => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(0)
  const [activeSubTab, setActiveSubTab] = useState(-1)
  const [expandSidebar, setExpandSidebar] = useState(false)

  useEffect(() => {
    if (tabs) {
      const index =
        location.pathname === '/dashboard'
          ? 0
          : tabs.findIndex((item, tabIndex) =>
              tabIndex === 0 ? false : location.pathname.startsWith(item.path)
            )
      setActiveTab(index)

      const subIndex = settingsItems.findIndex(
        (item) => item.path === location.pathname
      )
      setActiveSubTab(subIndex)
    }
  }, [location, tabs])

  const handleNavigate = (path, index, expandable) => {
    if (path && !expandable) {
      navigate(path)
      setExpandSidebar(false)
      setActiveTab(index)
    } else {
      setExpandSidebar(true)
    }
  }

  const handleSubNavigate = (path, index) => {
    setExpandSidebar(false)
    setActiveTab(-1)
    setActiveSubTab(index)
    navigate(path)
  }

  const navTabs = tabs.map((item, index) => ({
    ...item,
    onClick: () => handleNavigate(item.path, index, item.expandable),
  }))

  return (
    <div className={styles.sidebar}>
      <Navbar
        className={styles.navBar}
        tabs={navTabs}
        activeTabIndex={activeTab}
      />

      <div
        className={`${styles.expandableSidebar} ${
          expandSidebar ? styles.open : ''
        } ${
          location.pathname.startsWith('/dashboard/settings')
            ? styles.fixed
            : ''
        }`}
      >
        <RoomSceneSVG />

        <div className={styles.buttons}>
          {settingsItems.map(({ label, path }, index) => (
            <Button
              key={index}
              className={activeSubTab === index && styles.selected}
              appearance="ghost"
              onClick={() => {
                handleSubNavigate(path, index)
              }}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
