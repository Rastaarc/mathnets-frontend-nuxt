<template>
  <div>
    <TheHeadInfo text="My Classes" :show-add="false" />
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <div v-if="courses && courses.length > 0">
        <v-row>
          <v-col
            v-for="(course, n) in courses"
            :key="n"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <CourseDataCardGeneral :course="course.course" />
          </v-col>
        </v-row>
        <div class="mt-7">
          <ThePagination
            :pagination="pagination"
            @changePage="moveToPage($event)"
          />
        </div>
      </div>
      <div v-else>
        <NoDataToDisplay />
      </div>
    </div>
  </div>
</template>

<script>
import TheHeadInfo from '~/components/general/TheHeadInfo'
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import { CONSTANTS } from '~/assets/javascript/constants'
import NoDataToDisplay from '~/components/general/NoDataToDisplay'
import CourseDataCardGeneral from '~/components/cards/CourseDataCardGeneral'
export default {
  middleware: ['authenticate', 'auth-student'],
  components: {
    NoDataToDisplay,
    TheHeadInfo,
    CircularLoader,
    FetchError,
    CourseDataCardGeneral,
  },
  async fetch() {
    let page
    this.pageToGo ? (page = this.pageToGo) : (page = this.$route.query.p)
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.STUDENT.LOAD_COURSES,
      {
        page,
      }
    )
    this.courses = data.courses
    this.pagination = data.pagination
  },
  data() {
    return {
      courses: [],
      pageToGo: 1,
      pagination: {},
    }
  },
  computed: {},
  methods: {
    moveToPage({ page }) {
      this.pageToGo = page
      this.$fetch()
    },
  },
  head: {
    title: 'Student Classes',
  },
}
</script>

<style scoped></style>
