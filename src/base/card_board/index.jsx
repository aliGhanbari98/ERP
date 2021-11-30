import { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Table } from 'base/ui'
import { AddRequestModal } from 'base/ui/modals'
import tablesColumns from 'helpers/tablesColumns'
import filteringHandler from 'helpers/filteringHandler'
import rowsPerPage from 'helpers/tablesRowsCount'
import { useToggle } from 'helpers/hooks'
import { requestsReq, updateRequestReq } from 'queries/requests'
import { personnelStore } from 'stores'
import styles from './index.module.scss'

const CardBoardRowInfo = ({ date, desc }) => (
  <div className={styles.cardBoardRowInfo}>
    <div className={styles.date}>
      <span>Date of registration</span>
      <span>
        {new Date(date).toLocaleString('default', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })}
      </span>
    </div>

    <div className={styles.desc}>
      <span>Description</span>
      <span>{desc}</span>
    </div>
  </div>
)

const { dashboard: dashboardTablesPages } = rowsPerPage

const CardboardTable = observer(() => {
  const { personnels } = personnelStore
  const [cardBoardData, setCardBoardData] = useState({ total: 0, result: [] })
  const cardBoardState = useRef({ status: 'pending' })
  const { value: tableIsLoading, toggle: toggleTableIsLoading } = useToggle(
    false
  )

  const handleStatus = (row, status) => {
    toggleTableIsLoading()
    updateRequestReq({ id: row.id, body: { status } })
      .then(() => {
        filteringHandler({
          query: requestsReq,
          params: {
            ...cardBoardState.current,
            status: 'pending',
            limit: dashboardTablesPages.cardBoard,
          },
          stateHandler: setCardBoardData,
          // eslint-disable-next-line no-use-before-define
          formatter,
        })
        toggleTableIsLoading()
      })
      .catch(() => {})
  }

  const formatter = ({ result, total }) => ({
    total,
    result: result.map((item) => ({
      ...item,
      rowInfo: <CardBoardRowInfo date={item.user.create_datetime} />,
      handleStatus,
    })),
  })

  const toolbar = {
    tableType: 'cardBoard',
    personnel: {
      options: personnels,
      onClick: (value) => {
        cardBoardState.current.user_id = value.id
        filteringHandler({
          query: requestsReq,
          params: {
            ...cardBoardState.current,
            user_id: value.id,
            status: 'pending',
            limit: dashboardTablesPages.cardBoard,
          },
          stateHandler: setCardBoardData,
          formatter,
        })
      },
    },
    onStartDate: (date) => {
      cardBoardState.current.from = date
      filteringHandler({
        query: requestsReq,
        params: {
          ...cardBoardState.current,
          from: date,
          to: cardBoardState.current.to,
          status: 'pending',
          limit: dashboardTablesPages.cardBoard,
        },
        stateHandler: setCardBoardData,
        formatter,
      })
    },
    onEndDate: (date) => {
      cardBoardState.current.to = date
      filteringHandler({
        query: requestsReq,
        params: {
          ...cardBoardState.current,
          from: cardBoardState.current.from,
          to: date,
          status: 'pending',
          limit: dashboardTablesPages.cardBoard,
        },
        stateHandler: setCardBoardData,
        formatter,
      })
    },
    requestType: {
      onClick: ({ value }) => {
        cardBoardState.current.request_types = value
        filteringHandler({
          query: requestsReq,
          params: {
            ...cardBoardState.current,
            request_types: value,
            status: 'pending',
            limit: dashboardTablesPages.cardBoard,
          },
          stateHandler: setCardBoardData,
          formatter,
        })
      },
    },
  }

  useEffect(() => {
    requestsReq(
      { limit: dashboardTablesPages.cardBoard, status: 'pending' },
      { validRoles: ['admin', 'manager'] }
    )
      .then((data) => setCardBoardData(formatter(data)))
      .catch(() => {})
  }, [])

  return (
    <Table
      className={styles.cardBoard}
      headerAction={<AddRequestModal />}
      title="Cardboard"
      toolbar={toolbar}
      columns={tablesColumns.cardBoard}
      rows={cardBoardData.result}
      hasRowInfo
      isLoading={tableIsLoading}
      size="large"
      pages={cardBoardData.total}
      rowsPerPage={dashboardTablesPages.cardBoard}
      filterParams={cardBoardState.current}
      dataFormatter={formatter}
      queryFunction={requestsReq}
      stateHandler={setCardBoardData}
      withPagination
    />
  )
})

export default CardboardTable
