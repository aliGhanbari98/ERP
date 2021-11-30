import { useEffect, useState } from 'react'
import { Glyph } from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const Pagination = ({
  className,
  totalPages = 0,
  totalItems,
  handlePageChange,
}) => {
  const [pages, setPages] = useState([])
  const [activePage, setActivePage] = useState(pages[0] || 1)
  const [pagesToShow, setPagesToShow] = useState(pages.slice(0, 4))

  useEffect(() => {
    setPages(Array.from({ length: totalPages }, (_, i) => i + 1))
  }, [totalPages])

  useEffect(() => {
    setActivePage(1)
  }, [totalItems])

  useEffect(() => {
    if (activePage > 3) {
      let startIndex = activePage - 3
      if (pages.length - startIndex < 4) startIndex -= 1

      setPagesToShow(pages.slice(startIndex, activePage + 1))
    } else setPagesToShow(pages.slice(0, activePage + (4 - activePage)))
  }, [pages, activePage])

  const handleChange = (page) => {
    if (page >= 1 && page <= pages.length) setActivePage(page)
    if (handlePageChange instanceof Function) handlePageChange(page)
  }

  return (
    <div className={`${styles.pagination} ${className || ''}`}>
      <button
        className={`${styles.nav} ${
          activePage === (pages[0] || 1) ? styles.disable : ''
        }`}
        type="button"
        onClick={() => handleChange(pages[0])}
      >
        <Glyph size={20} color="primary.lgiht" name="arrowDoubleLeft" />
      </button>

      <button
        className={`${styles.nav} ${
          activePage === (pages[0] || 1) ? styles.disable : ''
        }
        `}
        type="button"
        onClick={() => handleChange(activePage - 1)}
      >
        <Glyph size={20} color="primary.lgiht" name="arrowLeft" />
      </button>

      {pagesToShow.map((page) => (
        <button
          key={page}
          className={`${styles.page} ${
            activePage === page ? styles.active : ''
          }`}
          type="button"
          onClick={() => handleChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={`${styles.nav} ${
          activePage === (pages.length || 1) ? styles.disable : ''
        }`}
        type="button"
        onClick={() => handleChange(activePage + 1)}
      >
        <Glyph size={20} color="primary.lgiht" name="arrowRight" />
      </button>

      <button
        className={`${styles.nav} ${
          activePage === (pages.length || 1) ? styles.disable : ''
        }`}
        type="button"
        onClick={() => handleChange(pages[pages.length - 1])}
      >
        <Glyph size={20} color="primary.lgiht" name="arrowDoubleRight" />
      </button>
    </div>
  )
}

export default Pagination
