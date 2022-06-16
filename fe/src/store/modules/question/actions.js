import {
  STORE_ANSWER,
  GET_QUESTIONS,
  GET_ANSWER,
  SUCCESS,
  GET_COMMENTS
} from './action.type';
import api from '@/services/api'

export default {
  [STORE_ANSWER](store, responses) {
    return api({
      headers: { Authorization: localStorage.token }
    }).post('/handle-questions', responses)
  },
  [GET_QUESTIONS](store) {
    return api({
      headers: { Authorization: localStorage.token }
    }).post('/questions').then(response => {
      store.commit('setQuestions', response.data)
    })
  },
  [GET_COMMENTS](store, appName) {
    return api({
      headers: { Authorization: localStorage.token }
    }).get(`/comments/${appName}`).then(response => {
      store.commit('setComments', response.data)
    })
  },
  [GET_ANSWER](store) {
    return api({
      headers: { Authorization: localStorage.token }
    }).get('/answer').then(response => {
      store.commit('setAnswer', response.data)
    })
  },
  [SUCCESS]() {
    return api({
      headers: { Authorization: localStorage.token }
    }).post('/success')
  },
};