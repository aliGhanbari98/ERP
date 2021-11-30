const readFileDataAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (event) => {
      resolve(event.target.result)
    }

    reader.onerror = (err) => {
      reject(err)
    }

    reader.readAsBinaryString(file)
  })
}

export default readFileDataAsBase64
