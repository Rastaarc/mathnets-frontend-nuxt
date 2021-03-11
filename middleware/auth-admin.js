import { CONSTANTS } from '~/assets/javascript/constants'

export default function ({ store, $auth, $axios, redirect }) {
  if ($auth.user.user_type !== CONSTANTS.USER_TYPES.ADMIN) {
    const msg = CONSTANTS.MESSAGES.ADMIN_REQUIRED
    store.dispatch('snackalert/updateSnackbar', {
      color: 'error',
      msg,
      show: true,
    })
    if ($auth.user.user_type === CONSTANTS.USER_TYPES.STUDENT) {
      redirect({ name: 'student-classes' })
    } else if ($auth.user.user_type === CONSTANTS.USER_TYPES.INSTRUCTOR) {
      redirect({ name: 'instructor-topics' })
    } else {
      redirect({ name: 'index' })
    }
  }
}
