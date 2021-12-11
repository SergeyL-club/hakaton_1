import axios from 'axios'

export default axios.create({
  baseURL: 'http://192.168.102.240:8080/'
})