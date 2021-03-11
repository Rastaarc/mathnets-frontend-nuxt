import { CONSTANTS } from '~/assets/javascript/constants'

export default function ({ store, $auth, $axios, redirect }) {
  if ($auth.loggedIn) {
    const msg = CONSTANTS.MESSAGES.ALREADY_LOGIN
    store.dispatch('snackalert/updateSnackbar', {
      color: 'error',
      msg,
      show: true,
    })
    if ($auth.user.user_type === CONSTANTS.USER_TYPES.STUDENT) {
      redirect({ name: 'student-classes' })
    } else if ($auth.user.user_type === CONSTANTS.USER_TYPES.INSTRUCTOR) {
      redirect({ name: 'instructor-topics' })
    } else if ($auth.user.user_type === CONSTANTS.USER_TYPES.ADMIN) {
      redirect({ name: 'admin-dashboard' })
    } else {
      redirect({ name: 'index' })
    }
  }
}
