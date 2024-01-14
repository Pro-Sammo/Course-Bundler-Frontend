import { createReducer } from '@reduxjs/toolkit';

export const userReducer = createReducer(
  {
    isAutenticated: false,
    user: '',
    message: '',
  },
  {
    loginRequest: state => {
      return{
        ...state,
        loading:true
      }
    },
    loginSuccess: (state, action) => {
      return{
        ...state,
        loading:false,
        isAutenticated:true,
        user:action.payload.user,
        message : action.payload.message

      }
    },
    loginFail: (state, action) => {
      return{
        ...state,
        loading:false,
        isAutenticated:false,
        user:action.payload.user,
        error : action.payload

      }
    },



    registerRequest: state => {
      return{
        ...state,
        loading:true
      }
    },
    registerSuccess: (state, action) => {
      return{
        ...state,
        loading:false,
        isAutenticated:true,
        user:action.payload.user,
        message : action.payload.message

      }
    },
    registerFail: (state, action) => {
      return{
        ...state,
        loading:false,
        isAutenticated:false,
        user:action.payload.user,
        error : action.payload

      }
    },
    logoutRequest: state => {
      return{
        ...state,
        loading:true
      }
    },
    logoutSuccess: (state, action) => {
      return{
        ...state,
        loading:false,
        isAutenticated:false,
        user:null,
        message : action.payload.message
      }

    },
    logoutFail: (state, action) => {
      return{
        ...state,
        loading:false,
        isAutenticated:false,
        error : action.payload

      }
    },





    loadUserRequest: state => {
      return{
        ...state,
        loading:true
      }
    },
    loadUserSuccess: (state, action) => {
      return{
        ...state,
        loading:false,
        isAutenticated:true,
        user:action.payload,
      }
    },
    loadUserFail: (state, action) => {
      return{
        ...state,
        loading:false,
        isAutenticated:false,
        user:action.payload.user,
        error : action.payload

      }
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


export const profileReducer = createReducer({},
  {
  updateProfileRequest:(state)=>{
    return{
      ...state,
      loading:true,
    }
  },
  updateProfileSuccess:(state,action)=>{
    return{
      ...state,
      loading:false,
      message:action.payload
    }
   
  },
  updateProfileFail:(state,action)=>{
    return{
      ...state,
      loading:false,
      message:action.payload
    }
  },



  updateProfilePictureRequest:(state)=>{
    return{
      ...state,
      loading:true,
    }
  },
  updateProfilePictureSuccess:(state,action)=>{
    return{
      ...state,
      loading:false,
      message:action.payload
    }
  },
  updateProfilePictureFail:(state,action)=>{
    return{
      ...state,
      loading:false,
      message:action.payload
    }
  },


  changePasswordRequest:(state)=>{
    return{
      ...state,
      loading:true,
    }
  },
  changePasswordSuccess:(state,action)=>{
    return{
      ...state,
      loading:false,
      message:action.payload
    }
  },
  changePasswordFail:(state,action)=>{
    return{
      ...state,
      loading:false,
      message:action.payload
    }
  },



  removeFromPlaylistRequest:(state)=>{
    return{
      ...state,
      loading:true,
    }
  },
  removeFromPlaylistSuccess:(state,action)=>{
    return{
      ...state,
      loading:false,
      message:action.payload
    }
  },
  removeFromPlaylistFail:(state,action)=>{
    return{
      ...state,
      loading:false,
      message:action.payload
    }
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
  
})

