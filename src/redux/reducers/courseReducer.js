import { createReducer } from '@reduxjs/toolkit';

export const courseReducer = createReducer(
  {
    courses: [],
    lectures:[],
  },
  {
    allCoursesRequest: state => {
      return{
        ...state,
        loading:true
      }
    },
    allCoursesSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        courses: action.payload,
      };
    },
    allCoursesFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },


    getCourseLectureRequest: state => {
      return{
        ...state,
        loading:true
      }
    },
    getCourseLectureSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        lectures: action.payload,
      };
    },
    getCourseLectureFail: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },



    addToPlaylistRequest: state => {
      return{
        ...state,
        loading:true
      }
      },
      addToPlaylistSuccess: (state, action) => {
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
      },
      addToPlaylistFail: (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },

      clearError: state => {
        return{
          ...state,
          error:null
        }
      },
      clearMessage: state => {
        return{
          ...state,
          message:null
        }
      },
  }
);
