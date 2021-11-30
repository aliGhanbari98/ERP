/* eslint-disable import/prefer-default-export */
import axios from 'axios'
import { reqWrapper } from './wrapper'

export const uploadReq = reqWrapper(({ file, setProgressValue }) => {
  const bodyFormData = new FormData()
  bodyFormData.append('_file', file)

  const config = {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )
      setProgressValue(percentCompleted)
    },
  }

  return axios.post('/files/upload', bodyFormData, config).then((data) => data)
})

export const deleteFileReq = reqWrapper((fileName) =>
  axios
    .delete(`/files/${fileName}`, { params: { key: fileName } })
    .then((data) => data)
)
