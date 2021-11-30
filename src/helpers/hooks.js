import { useState } from 'react'

export const useChangeHandler = (defaultValue, isNumber) => {
  const [value, setValue] = useState(defaultValue || '')
  return {
    value,
    setValue,
    reset: () => setValue(defaultValue),
    bind: {
      value,
      onChange: (val) => {
        // if (
        //   e.target.maxLength !== -1 &&
        //   e.target.maxLength < e.target.value.length
        // )
        //   return
        if (isNumber) {
          if (Number(val) || val.length === 0 || Number(val) === 0) {
            setValue(val)
          }
        } else {
          setValue(val)
        }
      },
    },
  }
}

export const useToggle = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  return {
    value,
    toggle: () => setValue((flag) => !flag),
  }
}
