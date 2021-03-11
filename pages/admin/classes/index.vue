<template>
  <div>
    <TheHeadInfo text="Classes" @openAddNewDialog="openCourseDialog" />
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <div v-if="courses.length > 0">
        <v-row>
          <v-col
            v-for="(item, i) in courses"
            :key="i"
            sm="6"
            md="4"
            class="mb-2"
          >
            <CourseDataCard
              :item="item"
              @deleteData="openConfirmationDialog($event)"
              @updateData="updateData($event)"
            />
          </v-col>
        </v-row>
        <div class="mt-7">
          <ThePagination
            :pagination="pagination"
            @changePage="moveToPage($event)"
          />
        </div>
      </div>
      <div
        v-else
        class="mx-auto text-center text-h6 text-sm-h5 text-md-h3 font-weight-bold"
      >
        {{ noData }}
      </div>
    </div>
    <CourseDialog
      :show-dialog="dialogState"
      :course-data="courseData"
      :callee="callee"
      @closeDialog="closeCourseDialog"
      @reloadData="$fetch"
    />
    <ConfirmationDialog
      :open-dialog="confirmationDialogState"
      :item="itemToDelete"
      @YesAnswer="deleteData($event)"
      @CancelAnswer="confirmationDialogState = false"
    />
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import CourseDialog from '~/components/dialogs/CourseDialog'
import CourseDataCard from '~/components/cards/CourseDataCard'
import ConfirmationDialog from '~/components/dialogs/ConfirmationDialog'
import CircularLoader from '~/components/loaders/CircularLoader'
import TheHeadInfo from '~/components/general/TheHeadInfo'
import ThePagination from '~/components/general/ThePagination'
import FetchError from '~/components/errors/FetchError'
export default {
  middleware: ['authenticate', 'auth-admin'],
  components: {
    FetchError,
    TheHeadInfo,
    ConfirmationDialog,
    CourseDialog,
    CourseDataCard,
    CircularLoader,
    ThePagination,
  },
  async fetch() {
    let page
    this.pageToGo ? (page = this.pageToGo) : (page = this.$route.query.p)
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.ADMIN.GET_COURSES,
      { page }
    )
    this.courses = data.courses
    this.pagination = data.pagination
  },
  data() {
    return {
      courses: [],
      pagination: {},
      dialogState: false,
      fetchPendingMessage: CONSTANTS.MESSAGES.FETCH_LOADING_DATA,
      fetchErrorMessage: CONSTANTS.MESSAGES.FETCH_LOADING_ERROR,
      noData: CONSTANTS.MESSAGES.NO_DATA_TO_DISPLAY,
      courseData: {
        title: '',
        description: '',
        subscription: '',
        id: '',
        thumbnail_link: '',
      },
      callee: 'add',
      confirmationDialogState: false,
      itemToDelete: null,
      pageToGo: null,
    }
  },
  computed: {
    breakPoint() {
      return this.$vuetify.breakpoint.name
    },
    small() {
      if (this.breakPoint === 'xs') {
        return true
      } else {
        return false
      }
    },
    large() {
      if (this.breakPoint === 'xs') {
        return false
      } else {
        return true
      }
    },
    xLarge() {
      if (
        this.breakPoint === 'md' ||
        this.breakPoint === 'lg' ||
        this.breakPoint === 'xl'
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    moveToPage({ page }) {
      this.pageToGo = page
      this.$fetch()
    },
    openConfirmationDialog(data) {
      this.itemToDelete = data
      this.confirmationDialogState = true
    },
    openCourseDialog() {
      this.callee = 'add'
      this.dialogState = true
    },
    closeCourseDialog() {
      this.dialogState = false
    },
    async deleteData(item) {
      this.confirmationDialogState = false
      this.$store.dispatch('actionoverlay/updateOverlayAction', true)
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.ADMIN.DELETE_COURSE,
          { data: item.id }
        )
        this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
        this.$fetch()
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
      }
      this.$store.dispatch('actionoverlay/updateOverlayAction', false)
    },
    updateData(item) {
      this.callee = 'update'

      this.courseData.title = item.title
      this.courseData.description = item.description
      this.courseData.subscription = item.subscription.id
      this.courseData.id = item.id
      this.courseData.thumbnail_link = item.thumbnail_link

      this.dialogState = true
    },
  },
  head: {
    title: 'Classes List',
  },
}
</script>

<style scoped></style>
