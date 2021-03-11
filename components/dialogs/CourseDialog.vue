<template>
  <div>
    <v-dialog
      v-model="showDialog"
      :max-width="maxWidth"
      :fullscreen="fullscreen"
      persistent
    >
      <v-card>
        <v-card-title class="primary--text">
          {{ callee === 'update' ? 'Update' : 'Add New' }} Course
        </v-card-title>
        <v-card-text>
          <div v-if="$fetchState.pending">
            {{ fetchPendingMessage }}
          </div>
          <div v-else-if="$fetchState.error">
            {{ fetchErrorMessage }}
          </div>
          <v-form
            v-else
            ref="courseForm"
            :value="valid"
            @submit.prevent="submitForm"
          >
            <v-text-field
              v-model="courseData.title"
              label="Class Title"
              :rules="rules.newCourseTitle"
            ></v-text-field>
            <v-textarea
              v-model="courseData.description"
              label="Class Description"
              :rules="rules.newCourseDescription"
            ></v-textarea>
            <v-text-field
              v-model="courseData.thumbnail_link"
              label="Class Thumbnail"
              :rules="rules.thumbnailLink"
              counter="250"
            ></v-text-field>
            <v-select
              v-model="courseData.subscription"
              label="Class Subscription Level"
              :items="subscriptions"
              item-text="title"
              item-value="id"
              :rules="rules.newCourseLevel"
            ></v-select>
            <div class="text-center mt-7">
              <v-btn :loading="loading" color="primary" dark type="submit">{{
                callee === 'update' ? 'Update' : 'Add'
              }}</v-btn>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn x-small text color="error" @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { formRules } from '~/assets/javascript/formRules'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    courseData: {
      type: Object,
      default: () => {},
    },
    callee: {
      type: String,
      default: 'add',
    },
    maxWidth: {
      type: Number,
      default: 450,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
  },
  async fetch() {
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.ADMIN.GET_SUBSCRIPTIONS,
      { getAll: true }
    )
    this.subscriptions = data.subscriptions
  },
  data() {
    return {
      rules: formRules,
      valid: false,
      loading: false,
      fetchPendingMessage: CONSTANTS.MESSAGES.FETCH_LOADING_DATA,
      fetchErrorMessage: CONSTANTS.MESSAGES.FETCH_LOADING_ERROR,
      subscriptions: [],
    }
  },
  computed: {},
  methods: {
    closeDialog() {
      this.clearData()
      this.$emit('closeDialog')
    },
    async submitForm() {
      if (!this.$refs.courseForm.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      this.loading = true
      try {
        this.courseData.title = _.upperFirst(this.courseData.title)
        let url
        if (this.callee === 'add') {
          url = CONSTANTS.ROUTES.ADMIN.ADD_COURSE
        } else {
          url = CONSTANTS.ROUTES.ADMIN.UPDATE_COURSE
        }
        const { data } = await this.$axios.post(url, {
          data: this.courseData,
        })
        this.$store.dispatch('snackalert/showSuccessSnackbar', data.message)
        this.$emit('reloadData')
        this.closeDialog()
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
    clearData() {
      this.courseData.title = ''
      this.courseData.description = ''
      this.courseData.subscription = ''
      this.courseData.thumbnail_link = ''
    },
  },
}
</script>

<style scoped></style>
