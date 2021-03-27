<template>
  <div class="ma-5 ma-md-7">
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else class="mt-10 mt-md-12">
      <v-row justify="center" class="fill-height">
        <v-col cols="12" md="6">
          <v-card elevation="7">
            <v-sheet color="primary" :height="sheetHeight">
              <div
                class="mb-3 mb-md-7 mt-6 pt-2 pt-md-5 text-center white--text text-h4 text-md-h3 font-weight-bold"
              >
                PROFILE
              </div>
            </v-sheet>
            <v-card-text>
              <div class="text-center mb-3">
                <v-avatar :size="avatarSize" color="primary">
                  <span v-if="!dpAvailable" class="text-h2 white--text"
                    >DP</span
                  >
                  <v-img v-else :src="profileDP">
                    <template #placeholder>
                      <v-row
                        justify="center"
                        align="center"
                        class="fill-height"
                      >
                        <v-progress-circular indeterminate />
                      </v-row>
                    </template>
                  </v-img>
                </v-avatar>
              </div>
              <div class="text-center">
                <div class="text-h5 text-md-h4 primary--text font-weight-bold">
                  {{ l_.capitalize('user.first_name') }}
                  {{ l_.capitalize('user.last_name') }}
                </div>
                <div class="text-subtitle-2 grey--text darken-2 mt-n1">
                  {{ 'user.email' }}
                </div>
                <div class="mt-10 mb-9">
                  <div class="text-h5 font-weight-bold">About Me</div>
                  <div class="text-body-2 text-md-subtitle-1">
                    {{ userBio }}
                  </div>
                </div>
              </div>
              <v-divider />
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <div
            class="mt-md-5 primary--text text-center text-title text-md-h5 font-weight-bold text-uppercase"
          >
            CLASSES BY INSTRUCTOR
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
// import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  layout: 'homepage',
  async fetch() {
    if (
      this.$auth.loggedIn &&
      this.$route.params.user === this.$auth.user.username
    ) {
      await this.$router.push({ name: 'profile' })
    } else {
      // eslint-disable-next-line no-console
      console.log('Different User')
    }
  },
  data() {
    return {
      user: {},
      l_: _,
    }
  },
  computed: {
    profileDP() {
      return ''
    },
    dpAvailable() {
      return this.profileDP !== ''
    },
    sheetHeight() {
      return this.$vuetify.breakpoint.smAndDown ? '50px' : '100px'
    },
    avatarSize() {
      return this.$vuetify.breakpoint.xsOnly
        ? '150'
        : this.$vuetify.breakpoint.smOnly
        ? '200'
        : '270'
    },
    userBio() {
      if (this.user.bio) {
        return this.user.bio
      } else {
        return 'No text to display right now. Check back again later'
      }
    },
  },
  head() {
    return {
      title: `${this.l_.capitalize(this.$route.params.user)}'s Profile`,
    }
  },
}
</script>

<style scoped></style>
