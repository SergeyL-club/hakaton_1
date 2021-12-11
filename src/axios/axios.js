import axios from 'axios'

export default axios.create({
  baseURL: 'http://192.168.101.61:81/api'
})