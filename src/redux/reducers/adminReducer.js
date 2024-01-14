import { createReducer } from '@reduxjs/toolkit';

export const adminReducer = createReducer(
  {
    users:[]
  },
  {
    getAdminStatesRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    getAdminStatesSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        stats: action.payload.stats,
        usersCount: action.payload.usersCount,
        subscriptionCount: action.payload.subscriptionCount,
        viewsCount: action.payload.viewsCount,
        subscriptionPercentage: action.payload.subscriptionPercentage,
        viewsPercentage: action.payload.viewsPercentage,
        usersPercentage: action.payload.usersPercentage,
        subscriptionProfit: action.payload.subscriptionProfit,
        viewsProfit: action.payload.viewsProfit,
        usersProfit: action.payload.usersProfit,
      };
    },
    getAdminStatesFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    getAllUsersRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    getAllUsersSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    },
    getAllUsersFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },


    deleteUserRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    deleteUserSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },
    deleteUserFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },


    updateUserRoleRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    updateUserRoleSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },
    updateUserRoleFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },


    createCourseRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    createCourseSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },
    createCourseFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    addLectureRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    addLectureSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },
    addLectureFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },




    deleteLectureRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    deleteLectureSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },
    deleteLectureFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },


    deleteCourseRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    deleteCourseSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },
    deleteCourseFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },


    getCourseRequest: state => {
      return {
        ...state,
        loading: true,
      };
    },
    getCourseSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    },
    getCourseFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    clearError: state => {
      return {
        ...state,
        error: null,
      };
    },
    clearMessage: state => {
      return {
        ...state,
        message: null,
      };
    },
  }
);
