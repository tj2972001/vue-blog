import axios from 'axios'

const APIClent = {
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
}

export default {
  getArticles(page, limit) {
    return axios.get(`${APIClent.baseURL}/blog/?page=${page}/?limit=${limit}`)
  },
  getArticle(id) {
    return axios.get({
      url: APIClent.baseURL + '/blog/:' + id,
    })
  },
}
