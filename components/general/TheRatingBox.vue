<template>
  <div class="my-10">
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
    <div class="mt-5">
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
        class="text-h6 text-md-h4 font-weight-bold primary--text text-uppercase mb-2 text-left"
      >
        Recent Reviews
      </div>
      <v-expansion-panels>
        <v-expansion-panel v-for="n in 10" :key="n">
          <v-expansion-panel-header class="font-weight-bold"
            >Username says:
            <span v-if="$vuetify.breakpoint.mdAndUp">- Review Title</span>
            <template #actions>
              <v-icon color="primary"> $expand </v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-left text-caption text-md-h6">
            <div
              v-if="$vuetify.breakpoint.smAndDown"
              class="font-weight-bold primary--text mb-3"
            >
              Review Title
            </div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
            tincidunt ut urna in faucibus. Quisque eget aliquet metus. Nullam
            dignissim, nibh vitae ultricies ullamcorper, nibh metus volutpat
            erat, mattis bibendum ipsum turpis quis nibh. Sed rutrum, lorem quis
            vehicula viverra, ante
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import { formRules } from '~/assets/javascript/formRules'
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'TheRatingBox',
  props: {},
  data() {
    return {
      rules: formRules,
      value: false,
      loading: false,
      totalLength: 150,
      titleTextLength: 20,
      reviewData: {
        rating: 1,
        titleText: '',
        reviewText: '',
      },
    }
  },
  computed: {},
  methods: {
    addReview() {
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
      // eslint-disable-next-line no-console
      console.log(this.reviewData)
      this.loading = false
    },
  },
}
</script>

<style scoped></style>
