import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export function initialState() {
  return {
    questions: [],
    comments: null,
    questionId: 1,
    answer: {}
  };
}

const state = initialState();

export default {
  state,
  actions,
  getters,
  mutations,
};
