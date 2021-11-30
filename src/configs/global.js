// const CL = (txt, color) =>
//   console.log(`%c ${txt}`, `color: ${color};font-size: 20px;`)

/*
 * API: 	API Base URL
 * IS_PRODUCTION: Boolean of is production mode
 * DEFAULT_LANGUAGE: Set default language [FA or EN]
 *
 *
 *
 *
 * */

const Configs =
  process.env.NODE_ENV === 'production'
    ? {
        API: '',
        IS_PRODUCTION: true,
        DEFAULT_LANGUAGE: 'EN',
      }
    : {
        API: '',
        IS_PRODUCTION: false,
        DEFAULT_LANGUAGE: 'EN',
      }

export default Configs
