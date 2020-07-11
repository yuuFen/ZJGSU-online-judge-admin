import { getLessons, addLesson } from '@/services/lesson';

const UserModel = {
  namespace: 'lesson',
  state: {
    currentUser: {},
  },
  effects: {
    *fetchLessons(_, { call, put }) {
      const response = yield call(getLessons);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *addLesson({ data }, { call, put }) {
      const response = yield call(addLesson);
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
