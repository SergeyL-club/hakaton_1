import axios from 'axios'

const URL = process.env.axios_url

export default axios.create({
  url: URL,
  baseURL: URL
})