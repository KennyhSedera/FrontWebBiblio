import axios from 'axios'

export default {
  Api() {
    return axios.create({ baseURL: 'http://localhost:1142' || 'http://192.168.8.185:1142' })
  },
}
