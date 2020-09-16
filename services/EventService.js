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
  getArticles(page, limit, sort) {
    return axios.get(
      `${APIClent.baseURL}/blog/?page=${page}&limit=${limit}&sort=${sort}`
    )
  },
  getArticle(id) {
    return axios.get(`${APIClent.baseURL}/blog/${id}`)
  },
  login(formData) {
    return axios({
      method: 'POST',
      url: `${APIClent.baseURL}/user/login`,
      data: formData,
    })
  },
  signup(formData) {
    return axios({
      method: 'POST',
      url: `${APIClent.baseURL}/user/signup`,
      data: formData,
    })
  },
  postArticle(formData) {
    return axios({
      method: 'POST',
      url: `${APIClent.baseURL}/blog`,
      data: formData,
    })
  },
}
