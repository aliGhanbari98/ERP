// components
import { Modal, Table } from 'base/ui'
import { Icon, Headline } from '@liquid-design/liquid-design-react'
// styles
import styles from './index.module.scss'

const accessor = (row, key) => (
  <div className={styles.accessor}>
    {row[key] && row[key].length
      ? row[key].map((value) => <span>{value}</span>)
      : '---'}
  </div>
)

const columns = [
  { header: 'Terms', key: 'terms' },
  { header: 'Limitation', key: 'limitation' },
  { header: 'From', key: 'min_second', accessor },
  { header: 'To', key: 'max_second', accessor },
  { header: 'Rate', key: 'rates', accessor },
]

const getAllFieldsByKey = (data, key) => data.map((item) => item[key])
const dataFormatter = (data) =>
  data.map(({ terms, limitation, rates = [] }) => ({
    terms,
    limitation: limitation || '---',
    min_second: getAllFieldsByKey(rates, 'min_second'),
    max_second: getAllFieldsByKey(rates, 'max_second'),
    rate: getAllFieldsByKey(rates, 'rate'),
  }))

const ContractDetails = ({ open, onClose, data }) => {
  const formattedData = dataFormatter(data)
  return (
    <div className={styles.contractDetails}>
      <Modal
        isOpen={open}
        onClose={onClose}
        className={styles.contractModal}
        label={
          <div className={styles.label}>
            <Icon name="document" isFilled />
            <Headline type="H4">Terms 1</Headline>
          </div>
        }
      >
        <Table
          className={styles.table}
          columns={columns}
          rows={formattedData}
        />
      </Modal>
    </div>
  )
}

export default ContractDetails
