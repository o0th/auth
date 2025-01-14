const isString = (string) =>
  typeof string === 'string' || string instanceof String

export const validate = (schema, data) => {
  for (const key of Object.keys(schema)) {
    if (!schema[key].includes('optional') && data[key] === undefined) {
      return { error: { key, reason: 'missing' } }
    }
  }

  return { error: undefined }
}
