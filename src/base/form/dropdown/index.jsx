/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react'
import { Glyph } from '@liquid-design/liquid-design-react'
import Checkbox from '../checkbox'
import styles from './index.module.scss'

const Dropdown = ({
  className,
  onClick,
  onSelect,
  label,
  placeholder,
  options,
  defaultItem = { value: '' },
  selectable,
  selectedItems,
  setSelectedItems,
  color = 'secondary',
  disabled,
}) => {
  const [value, onChange] = useState('')
  const [items, setItems] = useState(options)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState()

  useEffect(() => {
    if (defaultItem && defaultItem.value) {
      const itemVal = items.find(
        (item) => item[defaultItem.key] === defaultItem.value.toString()
      )
      setSelectedItem(itemVal || '')
    } else setSelectedItem('')
  }, [defaultItem.value])

  const handleCheckbox = (item, state) => {
    setSelectedItems((prevState) => {
      const prev = prevState

      if (!state) {
        const index = prev.findIndex((prevItem) => prevItem.id === item.id)
        prev.splice(index, 1)
      } else prev.push(item)

      onSelect(prev)
      return prev
    })
  }

  // TODO use debounce
  useEffect(() => {
    if (value !== '' && value !== undefined && options) {
      const tempItems = []
      options.forEach((item) => {
        if (item.name.includes(value)) tempItems.push(item)
      })
      setItems(tempItems)
      setMenuOpen(true)
    } else setItems(options)
  }, [value, options])

  const handleFocus = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setMenuOpen(true)
    }
  }

  const handleBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setMenuOpen(false)
    }
  }

  const handleClick = (item) => {
    if (onChange instanceof Function) onChange('')
    if (onClick instanceof Function) onClick(item)
    if (!selectable) {
      setSelectedItem(item)
      // TODO
      setTimeout(() => setMenuOpen(false), 50)
    }
  }

  return (
    <div
      className={`${styles.dropDown} ${className || ''} ${
        label ? styles.hasLabel : ''
      } ${disabled ? styles.disabled : ''}`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {label && <label>{label || ''}</label>}
      <input
        className={menuOpen ? styles.active : ''}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setMenuOpen(true)}
      />

      <button
        type="button"
        className={`${styles.chevron} ${menuOpen ? styles.active : ''} ${
          styles[color] || ''
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Glyph size={20} color="primary.light" name="arrowDown" />
      </button>

      <span
        className={`${styles.placeholder} ${value ? styles.hide : ''} ${
          selectedItem ? styles.active : ''
        } ${label ? styles.hasLabel : ''}`}
      >
        {selectable
          ? placeholder
          : (selectedItem && selectedItem.name) || placeholder || ''}
      </span>

      {options && options.length > 0 ? (
        <div className={`${styles.items} ${menuOpen ? styles.active : ''}`}>
          {((items.length > 0 && items) || options).map((item, index) => (
            <button
              key={index}
              type="button"
              className={`${styles.item} ${
                (selectedItem && (selectedItem.id || selectedItem.name)) ===
                (item.id && item.name)
                  ? styles.active
                  : ''
              } ${item.disabled ? styles.disabled : ''}`}
              onClick={() => handleClick(item)}
            >
              {selectable && (
                <Checkbox
                  isChecked={
                    selectedItems &&
                    selectedItems.findIndex((val) => val.id === item.id) !== -1
                  }
                  onChange={(state) => handleCheckbox(item, state)}
                  className={styles.checkbox}
                />
              )}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className={`${styles.items} ${menuOpen ? styles.active : ''}`}>
          <span className={styles.noData}>No Options</span>
        </div>
      )}
    </div>
  )
}

export default Dropdown
