<template>
  <div class="my-10">
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <div v-if="canRateTheClass" class="mt-5">
        <div class="font-weight-bold primary--text text-uppercase">
          Help us to Rate this Class in order to improve our teaching methods
        </div>
        <div class="text-center">
          <v-rating
            v-model="reviewData.rating"
            :x-large="$vuetify.breakpoint.mdAndUp"
            :large="$vuetify.breakpoint.smAndDown"
            color="primary"
          />
        </div>
        <v-form ref="reviewForm" :value="value" @submit.prevent="addReview">
          <v-text-field
            v-model="reviewData.titleText"
            :rules="rules.fieldRequired"
            label="Review Title"
            outlined
            :counter="titleTextLength"
          />
          <v-textarea
            v-model="reviewData.reviewText"
            :rules="rules.fieldRequired"
            label="Review"
            :counter="totalLength"
            outlined
          />
          <div class="text-center">
            <v-btn
              outlined
              color="primary"
              class="text-capitalize mb-5"
              :loading="loading"
              @click="addReview"
              >Add Review</v-btn
            >
          </div>
        </v-form>
      </div>
      <div class="mt-7">
        <div
          v-if="comments.length > 0"
          class="text-h6 text-md-h4 font-weight-bold primary--text text-uppercase mb-2 text-left"
        >
          Recent Reviews
        </div>
        <v-expansion-panels v-if="comments.length > 0">
          <v-expansion-panel v-for="(comment, n) in comments" :key="n">
            <v-expansion-panel-header
              class="font-weight-bold text-title text-uppercase primary--text"
              >{{ comment.student.username }} says
              <span v-if="$vuetify.breakpoint.mdAndUp"
                >:- {{ comment.title }}</span
              >
              <template #actions>
                <v-icon color="primary"> $expand </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="text-left text-caption text-md-h6"
            >
              <div class="text-title">
                <div
                  v-if="$vuetify.breakpoint.mdAndUp"
                  class="d-flex mt-n4 mb-5"
                >
                  {{ formattedDate(comment.created_on) }} |
                  <v-rating
                    readonly
                    small
                    color="primary"
                    :value="comment.rating"
                  />
                </div>
                <div v-else>
                  <div
                    class="font-weight-bold primary--text mt-n5 text-title mb-3 text-uppercase"
                  >
                    {{ comment.title }}
                  </div>
                  <div class="mt-n2 mb-5 text-caption">
                    {{ formattedDate(comment.created_on) }}
                    <v-rating
                      readonly
                      x-small
                      color="primary"
                      :value="comment.rating"
                    />
                  </div>
                </div>
              </div>
              {{ comment.text }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <div
          v-else
          class="text-title text-md-h4 text-center font-weight-bold primary--text mb-3"
        >
          NO REVIEW FOR THIS CLASS YET
        </div>
        <br />
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import format from 'date-fns/format'
import { formRules } from '~/assets/javascript/formRules'
import { CONSTANTS } from '~/assets/javascript/constants'
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'

export default {
  name: 'TheRatingBox',
  components: {
    CircularLoader,
    FetchError,
  },
  props: {
    course: {
      type: Object,
      default: () => {},
    },
  },
  async fetch() {
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.GENERAL.LOAD_COMMENTS,
      {
        class_id: this.course.id,
      }
    )
    this.comments = data.comments
    if (
      this.$auth.loggedIn &&
      this.$auth.user.user_type === CONSTANTS.USER_TYPES.STUDENT
    ) {
      const courseResp = await this.$axios.post(
        CONSTANTS.ROUTES.STUDENT.CHECK_COURSE_STATUS,
        { data: { course: this.course.id } }
      )
      this.studentHasCourse = !courseResp.data.status

      const res = await this.$axios.post(
        CONSTANTS.ROUTES.STUDENT.CHECK_REVIEW_STATUS,
        {
          class_id: this.course.id,
        }
      )
      this.studentRatingStatus = res.data.status
    }
    this.ratingReviews = data.reviews
  },
  data() {
    return {
      rules: formRules,
      value: false,
      loading: false,
      totalLength: 150,
      titleTextLength: 20,
      reviewData: {
        rating: 2,
        titleText: '',
        reviewText: '',
      },
      comments: [],
      ratingReviews: {},
      studentRatingStatus: false,
      studentHasCourse: false,
    }
  },
  computed: {
    canRateTheClass() {
      if (
        this.$auth.loggedIn &&
        this.$auth.user.user_type === CONSTANTS.USER_TYPES.STUDENT &&
        !this.studentRatingStatus &&
        (this.course.subscription.price < 1 || this.studentHasCourse)
      ) {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    formattedDate(c) {
      return format(new Date(c), 'dd MMM YYY HH:mm:ss')
    },
    async addReview() {
      if (!this.$refs.reviewForm.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      } else if (this.reviewData.reviewText.length > this.totalLength) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          `Maximum length for Review Text is ${this.totalLength}`
        )
        return
      } else if (this.reviewData.titleText.length > this.titleTextLength) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          `Maximum length for Title Text is ${this.titleTextLength}`
        )
        return
      }
      this.loading = true
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.STUDENT.ADD_REVIEW,
          {
            review: {
              ...this.reviewData,
              courseId: this.course.id,
            },
          }
        )
        this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
        this.studentRatingStatus = true
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
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
