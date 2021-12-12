import axios from 'axios'

const URL = 'https://192.168.107.126:8080/'

export default axios.create({
  url: URL,
  baseURL: URL
})