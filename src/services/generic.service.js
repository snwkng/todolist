import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api'

export const request = async ({ url, method, data = {} }) => {
  const response = await axios[method](`${BASE_URL}/${url}`, data)
  return response.data
}
