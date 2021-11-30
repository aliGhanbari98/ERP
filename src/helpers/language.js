/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-fragments */

import React from 'react'
import { Languages } from '../assets/languages'
import Configs from '../configs/global'

export const getCurrentLanguage = () => {
  const LANG = localStorage.getItem('lang')
  if (LANG === 'FA' || LANG === 'EN') return LANG
  localStorage.setItem('lang', Configs.DEFAULT_LANGUAGE)
  return Configs.DEFAULT_LANGUAGE
}

export const Lang = ({ id }) => {
  const CurrentLanguage = Languages[getCurrentLanguage()]
  return <React.Fragment>{CurrentLanguage[id] || id}</React.Fragment>
}

export const lang = (id) => {
  const CurrentLanguage = Languages[getCurrentLanguage()]
  return CurrentLanguage[id] || id
}

export const setLanguage = (language) => {
  localStorage.setItem('lang', language)
  window.location.reload()
}
