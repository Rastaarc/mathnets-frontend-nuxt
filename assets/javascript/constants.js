export const CONSTANTS = {
  APP_NAME: 'MathsNet',
  USER_TYPES: {
    STUDENT: '1',
    INSTRUCTOR: '2',
    ADMIN: '3',
  },
  USER_TYPES_TEXT: ['Student', 'Instructor', 'Admin'],
  ROUTES: {
    BASE_URL: 'http://localhost:5000/api/v1/',
    ADMIN: {
      ADD_COURSE: 'admin/add/course',
      UPDATE_COURSE: 'admin/update/course',
      DELETE_COURSE: 'admin/delete/course',
      GET_COURSES: 'admin/get/courses',
      ADD_SUBSCRIPTION: 'admin/add/subscription',
      UPDATE_SUBSCRIPTION: 'admin/update/subscription',
      DELETE_SUBSCRIPTION: 'admin/delete/subscription',
      GET_SUBSCRIPTIONS: 'admin/get/subscriptions',
      GET_BASIC_REVIEWS: 'admin/get/reviews/basic',
      ADD_INSTRUCTOR: 'admin/add/instructor',
      GET_INSTRUCTORS: 'admin/get/instructors',
      ADD_STUDENT: 'admin/add/student',
      GET_STUDENTS: 'admin/get/students',
      LOAD_PAYMENTS: 'admin/load/payments',
    },
    STUDENT: {
      ADD_PAYMENT: '/student/add/payment',
      LOAD_PAYMENTS: '/student/load/payments',
    },
    INSTRUCTOR: {
      GET_TOPICS: 'instructor/get/topics',
      ADD_TOPIC: 'instructor/add/topic',
      UPDATE_TOPIC: 'instructor/update/topic',
      DELETE_TOPIC: 'instructor/delete/topic',
    },
    GENERAL: {
      GET_COURSES: 'get/courses',
      GET_COURSE_DATA: 'get/course/data',
      GET_TOPIC_DATA: 'get/topic/data',
      GET_RANDOM_COURSES: 'get/random/courses',
      UPDATE_PROFILE: 'update/profile',
      GET_SUBSCRIPTIONS_DATA: 'get/subscriptions/data',
      UPDATE_DP_LINK: 'update/dp/link',
    },
    AUTH: {
      LOGIN: 'auth/login',
      SIGNUP: 'auth/signup',
      LOGOUT: 'auth/logout',
      USER: 'auth/get-user',
    },
  },
  ALLOWED_EXTENSIONS_FOR_DP: ['jpeg', 'jpg', 'png'],
  ALLOWED_FILE_SIZE_DP: 1024 * 80, // 80kb
  MESSAGES: {
    NO_VALID_CREDENTIALS: 'No credentials supplied, Please try again',
    INVALID_CREDENTIALS:
      'Sorry! Invalid credentials supplied, Please try again',
    NEW_ACCOUNT_SUCCESSFUL: 'Account created successfully',
    LOGOUT_SUCCESSFUL: 'Your account has been logged out successfully',
    UNKNOWN_ERROR: 'Unknown Error occurred. Please try again',
    INVALID_USERNAME: 'Invalid Username supplied. Please choose another one',
    LOGIN_SUC: 'Account Logged-in successfully',
    LOGIN_ERR: 'Sorry, Your username/email or password is incorrect',
    NO_USER: "Sorry, We can't find the user with the detail(s) supplied",
    USER_EXIST:
      'Sorry! This Username has been registered. Choose another one for your account',
    EMAIL_EXIST:
      'Sorry! This Email has been registered. Choose another one for your account',
    FORM_ERROR: 'Please fill the form properly',
    LOGIN_REQUIRED: 'Please login first before you can access that page',
    ADMIN_REQUIRED: 'Sorry! only super users can access that page',
    INSTRUCTOR_REQUIRED: 'Sorry! only students can access that page',
    STUDENT_REQUIRED: 'Sorry! only students can access that page',
    ALREADY_LOGIN:
      'Please Logout first before you can have access to that page',
    FETCH_LOADING_ERROR:
      'Error Occurred while fetching the data. Please use the refresh button to reload the data',
    FETCH_LOADING_SUCCESS: 'Data Fetched successfully',
    FETCH_LOADING_DATA: 'Loading Data.........',
    NO_DATA_TO_DISPLAY: 'SORRY! NO DATA AVAILABLE TO DISPLAY',
    NO_TOPICS_TO_DISPLAY: 'No Topics Data To Display Right Now',
    COURSE_NOT_FOUND: "Oops! We can't find the course you're looking for",
    TOPIC_NOT_FOUND: "Oops! We can't find the topic you're looking for",
    NO_ACCESS_TO_TOPIC:
      "Oops! You don't have access to view that course contents",
    GENERAL_ERROR_MESSAGE:
      'Oops! Something went wrong with your request. please try again',
  },
}
