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
          {{ callee === 'update' ? 'Update' : 'Add New' }} Topic
        </v-card-title>
        <v-card-text>
          <div v-if="$fetchState.pending">
            {{ fetchPendingMessage }}
          </div>
          <div v-else-if="$fetchState.error">
            {{ fetchErrorMessage }}
          </div>
          <v-form v-else ref="form" :value="valid" @submit.prevent="submitForm">
            <v-text-field
              v-model="topicData.title"
              label="Topic Title"
              :rules="rules.fieldRequired"
            ></v-text-field>
            <v-textarea
              v-model="topicData.description"
              label="Topic Description"
              :rules="rules.fieldRequired"
            ></v-textarea>
            <v-text-field
              v-model="topicData.video_link"
              label="Video Link"
              :rules="rules.thumbnailLink"
              counter="250"
            ></v-text-field>
            <v-select
              v-model="topicData.course"
              label="Topic Class"
              :items="courses"
              item-text="title"
              item-value="id"
              :rules="rules.fieldRequired"
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
    topicData: {
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
      CONSTANTS.ROUTES.GENERAL.GET_COURSES,
      { getAll: true }
    )
    this.courses = data.courses
  },
  data() {
    return {
      rules: formRules,
      valid: false,
      loading: false,
      fetchPendingMessage: CONSTANTS.MESSAGES.FETCH_LOADING_DATA,
      fetchErrorMessage: CONSTANTS.MESSAGES.FETCH_LOADING_ERROR,
      courses: [],
    }
  },
  computed: {},
  methods: {
    closeDialog() {
      this.clearData()
      this.$emit('closeDialog')
    },
    async submitForm() {
      if (!this.$refs.form.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      this.loading = true
      try {
        this.topicData.title = _.upperFirst(this.topicData.title)
        let url
        if (this.callee === 'add') {
          url = CONSTANTS.ROUTES.INSTRUCTOR.ADD_TOPIC
        } else {
          url = CONSTANTS.ROUTES.INSTRUCTOR.UPDATE_TOPIC
        }
        const { data } = await this.$axios.post(url, {
          data: this.topicData,
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
      this.topicData.title = ''
      this.topicData.description = ''
      this.topicData.course = ''
      this.topicData.video_link = ''
    },
  },
}
</script>

<style scoped></style>
