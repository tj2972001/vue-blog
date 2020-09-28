import axios from 'axios'

const APIClent = {
  baseURL: process.env.baseUrl,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
}

export default {
  getArticles(page, limit, sort, categories) {
    const catArr = Array.from(categories)
    const catNeetArr = catArr.map((e) => '"' + e + '"')
    if (categories.length > 0) {
      return axios.get(
        `${APIClent.baseURL}/blog/?page=${page}&limit=${limit}&sort=${sort}&categories=[${catNeetArr}]`
      )
    } else {
      return axios.get(
        `${APIClent.baseURL}/blog/?page=${page}&limit=${limit}&sort=${sort}`
      )
    }
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
  logOut() {
    return axios({
      method: 'GET',
      url: `${APIClent.baseURL}/user/logout`,
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
  updateUserInfo(formData) {
    return axios({
      method: 'PATCH',
      url: `${APIClent.baseURL}/user/profile/update`,
      data: formData,
    })
  },
  updatePassword(formData) {
    return axios({
      method: 'PATCH',
      url: `${APIClent.baseURL}/user/updatePassword`,
      data: formData,
    })
  },
  clap(articleId) {
    return axios({
      method: 'PATCH',
      url: `${APIClent.baseURL}/blog/article/${articleId}/clap`,
    })
  },
  unclap(articleId) {
    return axios({
      method: 'PATCH',
      url: `${APIClent.baseURL}/blog/article/${articleId}/unClap`,
    })
  },
  fetchLikesOnPost(articleId) {
    return axios({
      method: 'GET',
      url: `${APIClent.baseURL}/blog/article/${articleId}/likes`,
    })
  },
  deleteArticle(articleId) {
    return axios({
      method: 'DELETE',
      url: `${APIClent.baseURL}/blog/${articleId}`,
    })
  },
}
