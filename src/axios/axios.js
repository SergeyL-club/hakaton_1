import axios from 'axios'

const URL = 'https://hack.okeit.edu:8080/'

export default axios.create({
  url: URL,
  baseURL: URL
})