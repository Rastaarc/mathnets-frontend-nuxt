<template>
  <div>
    <v-dialog v-model="openDialog" :width="width" persistent>
      <v-card>
        <v-sheet color="primary" :height="sheetHeight">
          <div
            class="mb-3 mb-md-7 mt-6 pt-2 pt-md-5 text-center white--text text-h4 text-md-h3 font-weight-bold"
          >
            PROFILE
          </div>
        </v-sheet>
        <v-card-text>
          <div class="text-center mb-3 mt-4">
            <v-avatar :size="avatarSize" color="primary">
              <span v-if="!dpAvailable" class="text-h2 white--text">DP</span>
              <v-img v-else :src="profileDP">
                <template #placeholder>
                  <v-row justify="center" align="center" class="fill-height">
                    <v-progress-circular indeterminate />
                  </v-row>
                </template>
              </v-img>
            </v-avatar>
          </div>
          <div class="text-center">
            <div class="text-h5 text-md-h4 primary--text font-weight-bold">
              {{ firstName }}
              {{ lastName }}
            </div>
            <div class="font-italic text-subtitle-2 grey--text darken-2 mt-n1">
              {{ email }}
            </div>
            <div class="mt-10 mb-9">
              <div class="text-h5 font-weight-bold primary--text">About Me</div>
              <div class="text-body-2 text-md-subtitle-1">{{ userBio }}</div>
            </div>
          </div>
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
// import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'ProfileDialog',
  props: {
    openDialog: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 400,
    },
    profileData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    sheetHeight() {
      return this.$vuetify.breakpoint.smAndDown ? '50px' : '100px'
    },
    profileDP() {
      return this.profileData !== null
        ? this.profileData.dp_link
          ? this.profileData.dp_link
          : ''
        : ''
    },
    dpAvailable() {
      return this.profileData !== null && this.profileData.dp_link
    },
    avatarSize() {
      return this.$vuetify.breakpoint.xsOnly
        ? '100'
        : this.$vuetify.breakpoint.smOnly
        ? '150'
        : '220'
    },
    userBio() {
      return this.profileData !== null
        ? this.profileData.bio
          ? this.profileData.bio
          : 'No text to display right now. Check back later'
        : ''
    },
    firstName() {
      return this.profileData !== null
        ? this.profileData.first_name
          ? _.capitalize(this.profileData.first_name)
          : 'FirstName'
        : ''
    },
    lastName() {
      return this.profileData !== null
        ? this.profileData.last_name
          ? _.capitalize(this.profileData.last_name)
          : 'LastName'
        : ''
    },
    email() {
      return this.profileData !== null
        ? this.profileData.email
          ? this.profileData.email
          : 'No email'
        : ''
    },
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog')
    },
  },
}
</script>

<style scoped></style>
