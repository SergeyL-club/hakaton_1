import axios from 'axios'

const URL = 'http://192.168.137.1:8080/'

export default axios.create({
  url: URL,
  baseURL: URL
})