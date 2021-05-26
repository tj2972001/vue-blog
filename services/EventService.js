import axios from "axios";

const APIClent = {
  baseURL: process.env.mainUrl || "http://167.99.48.45:8000/api/v1",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 10000,
};

export default {
  getArticles(page, limit, sort, categories) {
    const catArr = Array.from(categories);
    const catNeetArr = catArr.map((e) => '"' + e + '"');
    if (categories.length > 0) {
      return axios.get(
        `${APIClent.baseURL}/blog/?page=${page}&limit=${limit}&sort=${sort}&categories=[${catNeetArr}]`
      );
    } else {
      console.log("baseUrl is " + APIClent.baseURL);
      return axios({
        method: "GET",
        url: `${APIClent.baseURL}/blog/?page=${page}&limit=${limit}&sort=${sort}`,
        withCredentials: true,
      });
    }
  },
  getArticle(id) {
    return axios({
      method: "GET",
      url: `${APIClent.baseURL}/blog/${id}`,
      withCredentials: true,
    });
  },
  login(formData) {
    console.log("loginn");
    console.log(`${APIClent.baseURL}/user/login`);
    return axios({
      method: "POST",
      url: `${APIClent.baseURL}/user/login`,
      data: formData,
      withCredentials: true,
    });
  },
  logOut() {
    return axios({
      method: "GET",
      url: `${APIClent.baseURL}/user/logout`,
      withCredentials: true,
    });
  },
  signup(formData) {
    return axios({
      method: "POST",
      url: `${APIClent.baseURL}/api/v1/user/signup`,
      withCredentials: true,

      data: formData,
    });
  },
  postArticle(formData) {
    return axios({
      method: "POST",
      url: `${APIClent.baseURL}/blog`,
      withCredentials: true,
      data: formData,
    });
  },
  updateUserInfo(formData) {
    return axios({
      method: "PATCH",
      url: `${APIClent.baseURL}/user/profile/update`,
      withCredentials: true,

      data: formData,
    });
  },
  updatePassword(formData) {
    return axios({
      method: "PATCH",
      url: `${APIClent.baseURL}/user/updatePassword`,
      withCredentials: true,

      data: formData,
    });
  },
  clap(articleId) {
    return axios({
      method: "PATCH",
      url: `${APIClent.baseURL}/blog/article/${articleId}/clap`,
      withCredentials: true,
    });
  },
  unclap(articleId) {
    return axios({
      method: "PATCH",
      url: `${APIClent.baseURL}/blog/article/${articleId}/unClap`,
      withCredentials: true,
    });
  },
  fetchLikesOnPost(articleId) {
    return axios({
      method: "GET",
      url: `${APIClent.baseURL}/blog/article/${articleId}/likes`,
      withCredentials: true,
    });
  },
  deleteArticle(articleId) {
    return axios({
      method: "DELETE",
      url: `${APIClent.baseURL}/blog/${articleId}`,
      withCredentials: true,
    });
  },
};
