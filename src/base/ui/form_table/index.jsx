import { Table as LiquidTable } from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const FormTable = ({ className, columns, rows, size, disabledRowsIndexes }) => {
  const handleAccessor = (row, key) => row[key]

  return (
    <LiquidTable
      className={`${styles.formTable} ${className || ''}`}
      columns={[
        ...columns.map((column) => ({
          header: column.header,
          accessor: (row) => {
            if (column.accessor) return column.accessor(row, column.key)
            return handleAccessor(row, column.key)
          },
        })),
      ]}
      rows={rows}
      size={size}
      disabledRowsIndexes={disabledRowsIndexes}
    />
  )
}

export default FormTable
