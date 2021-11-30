import { forwardRef } from 'react'
import {
  Table as LiquidTable,
  Headline,
} from '@liquid-design/liquid-design-react'
import { removeEmpty } from 'helpers/filteringHandler'
import Spinner from 'base/ui/spinner'
import Toolbar from './toolbar/toolbar'
import Pagination from '../pagination'
import styles from './index.module.scss'

const Table = forwardRef(
  (
    {
      className,
      title,
      columns,
      rows,
      hasPhoto,
      hasRowInfo,
      size,
      disabledRowsIndexes,
      withPagination,
      dataFormatter,
      pages,
      toolbar,
      queryFunction,
      headerAction,
      stateHandler,
      rowsPerPage,
      filterParams,
      isLoading,
    },
    ref
  ) => {
    const handleAccessor = (row, key) =>
      row[key] !== undefined && row[key] !== null ? row[key] : '---'
    return (
      <div ref={ref} className={`${styles.table} ${className || ''}`}>
        {(title || headerAction) && (
          <header>
            {typeof title === 'string' ? (
              <Headline type="H2">{title}</Headline>
            ) : (
              title
            )}
            {headerAction && (
              <div className={styles.headerAction}>{headerAction}</div>
            )}
          </header>
        )}

        {toolbar && (
          <div className={styles.toolbar}>
            <Toolbar {...toolbar} />
          </div>
        )}

        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <LiquidTable
            className={`${styles.dataTable} ${
              hasPhoto ? styles.hasPhoto : ''
            } ${hasRowInfo ? styles.hasRowInfo : ''}`}
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
        )}

        {withPagination && (
          <Pagination
            className={styles.pagination}
            totalPages={Math.ceil(pages / rowsPerPage)}
            totalItems={pages}
            handlePageChange={(pageIndex) => {
              queryFunction({
                offset: (pageIndex - 1) * rowsPerPage,
                limit: rowsPerPage,
                ...removeEmpty(filterParams),
              })
                .then((data) =>
                  stateHandler(dataFormatter ? dataFormatter(data) : data)
                )
                .catch(() => {})
            }}
          />
        )}
      </div>
    )
  }
)

export default Table
