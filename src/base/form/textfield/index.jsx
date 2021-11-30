/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  TextField as LiquidTextField,
  Icon,
} from '@liquid-design/liquid-design-react'
import styles from './index.module.scss'

const TextField = ({
  wrapperClassName,
  className,
  value,
  onChange,
  label,
  placeholder,
  multiline,
  elemAfter,
  onUpload,
  error,
  type,
  disabled,
}) => {
  return (
    <div className={`${styles.textFieldWrapper} ${wrapperClassName || ''}`}>
      <LiquidTextField
        inputClassName={className || ''}
        value={value === undefined || value === null ? '' : value}
        onChange={onChange}
        label={label}
        placeholder={placeholder}
        multiline={multiline}
        error={error}
        type={type}
        disabled={disabled}
      />

      {elemAfter && (
        <span className={`${styles.elemAfter} ${label ? styles.hasLabel : ''}`}>
          {elemAfter}
        </span>
      )}

      {onUpload && (
        <label className={styles.uploader}>
          <Icon name="clip" />
          <input
            type="file"
            onChange={(e) => onUpload(e.currentTarget.files[0])}
            style={{ display: 'none' }}
          />
        </label>
      )}
    </div>
  )
}

export default TextField
