<template>
  <div class="mb-md-15">
    <TheHeadInfo text="Overview" :show-add="false" />
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <v-row align="center" class="mt-5">
        <v-col
          v-for="(item, i) in overviewItems"
          :key="i"
          cols="12"
          sm="6"
          md="4"
        >
          <v-sheet
            elevation="7"
            :color="boardColors[i]"
            height="200px"
            class="pa-4 white--text"
            rounded
          >
            <v-row>
              <v-col cols="2">
                <v-icon color="white" x-large
                  >mdi-book-education-outline</v-icon
                >
              </v-col>
              <v-col cols="10" class="text-center">
                <div class="display-3 font-weight-bold mt-4">
                  {{ item.count }}
                </div>
                <div class="text-uppercase title mt-4">{{ item.text }}</div>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <v-col
          v-for="(item, i) in overviewItems2"
          :key="overviewItems.length + i"
          cols="12"
          sm="6"
          md="4"
        >
          <v-sheet
            elevation="7"
            :color="boardColors[overviewItems.length + i]"
            height="200px"
            class="pa-2 pt-4 white--text"
            rounded
          >
            <div class="text-center">
              <div class="text-h4 text-md-h5 font-weight-bold text-uppercase">
                {{ item.head }}
              </div>
              <v-divider dark></v-divider>
              <div class="text-uppercase subtitle-1 mt-3">{{ item.text }}</div>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import TheHeadInfo from '~/components/general/TheHeadInfo'
export default {
  middleware: ['authenticate', 'auth-admin'],
  components: {
    TheHeadInfo,
    CircularLoader,
    FetchError,
  },
  async fetch() {
    const { data } = await this.$axios.get(
      CONSTANTS.ROUTES.ADMIN.GET_BASIC_REVIEWS
    )
    this.counter.courses = data.data.total_courses
    this.counter.sub_level = data.data.total_sub_levels
    this.counter.topics = data.data.total_topics
    this.counter.students = data.data.total_students
    this.counter.instructors = data.data.total_instructors
    this.counter.payments = data.data.total_payments
    this.counter.pendingPayments = data.data.total_pending_payments
    this.counter.paidPayments = data.data.total_paid_payments
    this.mostAddedCourse = data.data.highest_added_course
    this.mostAddedSubscription = data.data.highest_added_subscription
  },
  data() {
    return {
      d: null,
      boardColors: [
        'primary',
        'pink darken-4',
        'green darken-4',
        'yellow darken-4',
        'teal darken-3',
        'blue darken-4',
        'red darken-4',
        'green lighten-1',
        'amber darken-4',
        'teal darken-3',
        'green darken-2',
      ],
      counter: {
        courses: 0,
        topics: 0,
        pq: 0,
        sub_level: 0,
        students: 0,
        instructors: 0,
        payments: 0,
        pendingPayments: 0,
        paidPayments: 0,
      },
      mostAddedCourse: null,
      mostAddedSubscription: null,
    }
  },
  computed: {
    overviewItems() {
      return [
        { count: this.counter.topics, text: 'Topics' },
        { count: this.counter.courses, text: 'Classes' },
        { count: this.counter.pq, text: 'Past Questions' },
        { count: this.counter.sub_level, text: 'Subscription Levels' },
        { count: this.counter.students, text: 'Students' },
        { count: this.counter.instructors, text: 'Instructors' },
        { count: this.counter.payments, text: 'Total Payments' },
        { count: this.counter.pendingPayments, text: 'Pending Payments' },
        { count: this.counter.paidPayments, text: 'Paid Payments' },
      ]
    },
    overviewItems2() {
      return [
        {
          head: this.mostAddedSubscription,
          text: 'The Most Subscribed Subscription by Students',
        },
        {
          head: this.mostAddedCourse,
          text: 'The Most Subscribed Class By Students',
        },
      ]
    },
    sbreak() {
      return this.$vuetify.breakpoint.name
    },
    totalTopics() {
      return 345
    },
    totalCourses() {
      return 200
    },
  },
  head: {
    title: 'Dashboard',
  },
}
</script>

<style scoped></style>
