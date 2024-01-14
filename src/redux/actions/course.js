import { server } from '../store';
import axios from 'axios';

export const getAllCourses =(keyword = '', category = '') => async dispatch => {
    try {
      dispatch({ type: 'allCoursesRequest' });

      const { data } = await axios.get(
        `${server}/courses?keyword=${keyword}&category=${category}`
      );

      dispatch({ type: 'allCoursesSuccess', payload: data.courses });
    } catch (error) {
      dispatch({
        type: 'allCoursesFail',
        payload: error.response.data.message,
      });
    }
  };

export const getCourseLectures = id => async dispatch => {
  try {
    dispatch({ type: 'getCourseLectureRequest' });

    const { data } = await axios.get(`${server}/course/${id}`, {
      withCredentials: true,
    });

    dispatch({ type: 'getCourseLectureSuccess', payload: data.lectures });
  } catch (error) {
    dispatch({
      type: 'getCourseLectureFail',
      payload: error.response.data.message,
    });
  }
};
