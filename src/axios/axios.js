import axios from 'axios'

const URL = 'https://hack.oksei.ru:8080/'

export default axios.create({
  url: URL,
  baseURL: URL
})