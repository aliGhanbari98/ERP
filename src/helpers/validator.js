const rules = {
  required: (value) =>
    value === undefined || value === null ? 'Required' : undefined,
  mustBeNumber: (value) =>
    Number.isNaN(value) ? 'Must be a number.' : undefined,
  minValue: (min) => (value) =>
    Number.isNaN(value) || value >= min
      ? undefined
      : `Must be at least ${min}.`,
  validatePassword: (_, allValues) =>
    allValues.password !== allValues.repeat_password
      ? 'Password and Repeat password must be match'
      : undefined,
  maxValue: (max) => (value) =>
    Number.isNaN(value) || value <= max ? undefined : `Must be at most ${max}.`,
  email: (value) =>
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
      ? undefined
      : 'Is not a valid email.',
  phone: (value) =>
    /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g.test(value)
      ? undefined
      : 'Is not a valid phone number.',
  exactLength: (expectedLength) => (value = '') =>
    value.length === expectedLength
      ? undefined
      : `Must contain exactly ${expectedLength} characters.`,
  minLength: (minLength) => (value = '') =>
    value.length >= minLength
      ? undefined
      : `Must contain at least ${minLength} characters.`,
  maxLength: (maxLength) => (value = '') =>
    value.length <= maxLength
      ? undefined
      : `Must contain at most ${maxLength} characters.`,
  composeValidators: (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined
    ),
}

export default rules
