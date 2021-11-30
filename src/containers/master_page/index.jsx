import { globalHistory } from '@reach/router'
import { observer } from 'mobx-react-lite'
import { Theme } from '@liquid-design/liquid-design-react'
import navTabs from 'configs/nav'
import { useRef } from 'react'
import MessageModal from 'base/ui/modals/message'
import { authStore, modalsStore } from 'stores'
import Header from '../header'
import Sidebar from '../side_bar'
import styles from './index.module.scss'

const MasterPage = observer(({ children }) => {
  const containerEl = useRef()

  // here should be decided what tabs should be given to sidebar
  const { role: currentRole } = authStore.userData || {}
  const { messageModal } = modalsStore

  const filteredTabs = navTabs.filter(
    ({ visibleTo }) => visibleTo.indexOf(currentRole) !== -1
  )

  globalHistory.listen(({ action }) => {
    if (action === 'PUSH' && containerEl.current) {
      containerEl.current.scrollTo({ top: 0 })
    }
  })

  return (
    <Theme className={styles.theme} themeName="richPurple">
      <main className={styles.masterPage}>
        <MessageModal {...messageModal} />
        <Header />
        <section className={styles.body}>
          <Sidebar tabs={filteredTabs} />
          <div ref={containerEl} className={styles.container} id="master-page">
            {children}
          </div>
        </section>
      </main>
    </Theme>
  )
})

export default MasterPage
