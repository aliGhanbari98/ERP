import { getCurrentLanguage } from './language'

export const getDirection = () => {
  const Lang = getCurrentLanguage()
  if (Lang === 'FA') return 'rtl'
  return 'ltr'
}

export const isRTL = () => getDirection() === 'rtl'

export const isLTR = () => getDirection() === 'ltr'

export const updateDirection = () => {
  document.querySelector('html').dir = getDirection()
}
