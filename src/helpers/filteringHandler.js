export const removeEmpty = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== ''))

const handler = ({ query, params, stateHandler, formatter, hasSingleItem }) => {
  query(removeEmpty(params)).then((data) =>
    stateHandler(formatter ? formatter(data, hasSingleItem) : data)
  )
}

export default handler
