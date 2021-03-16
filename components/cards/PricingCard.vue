<template>
  <div>
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError :show-img="false" @reloadFetch="$fetch" />
    </div>
    <v-card v-else class="text-center">
      <v-img :src="thumbnail" lazy-src="/images/thumbnail.jpg" height="240">
        <template #placeholder>
          <v-row justify="center" align="center" class="fill-height">
            <v-progress-circular indeterminate />
          </v-row>
        </template>
      </v-img>
      <v-card-text>
        <div
          class="text-center mt-4 mb-6 text-h6 primary--text text-md-h4 font-weight-bold"
        >
          {{ pricing.title }}
        </div>
        <div
          class="text-caption text-md-h6 text-center truncate-t"
          @click="showFullDescription(pricing.description)"
        >
          {{ pricing.description }}
          <!-- <TextTruncate>{{ pricing.description }}</TextTruncate> -->
        </div>
        <div class="font-weight-black text-h4 text-md-h2 black--text">
          &#8358;{{ pricing.dprice }}
        </div>
        <div class="font-weight-bold text-caption text-md-body-2 mb-5">
          for {{ pricing.duration }}
          {{ pricing.duration > 1 ? 'years' : 'year' }}
        </div>
        <v-btn
          v-if="$auth.loggedIn"
          :disabled="!canApply"
          color="primary"
          depressed
          @click="add(pricing)"
          >Add</v-btn
        >
        <v-divider v-if="!$auth.loggedIn && pricing.price > 0" />
      </v-card-text>
      <v-card-actions
        v-if="!$auth.loggedIn && pricing.price > 0"
        class="text-caption error--text text-md-title"
      >
        <v-spacer />
        Please Signup/Login First
        <v-spacer />
      </v-card-actions>
    </v-card>
    <FullDescriptionDialog
      :open="openFullDescription"
      :text="fullDescription"
      @closeDialog="openFullDescription = false"
    />
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import FullDescriptionDialog from '~/components/dialogs/FullDescriptionDialog'
import FetchError from '~/components/errors/FetchError'
import CircularLoader from '~/components/loaders/CircularLoader'

export default {
  name: 'PricingCard',
  components: {
    FullDescriptionDialog,
    CircularLoader,
    FetchError,
  },
  props: {
    pricing: {
      type: Object,
      default: () => {},
    },
  },
  async fetch() {
    if (
      this.$auth.loggedIn &&
      this.$auth.user.user_type === CONSTANTS.USER_TYPES.STUDENT
    ) {
      const { data } = await this.$axios.post(
        CONSTANTS.ROUTES.STUDENT.CHECK_SUBSCRIPTION_STATUS,
        { subscription: this.pricing.id }
      )
      this.studentCanApply = data.status
    }
  },
  data() {
    return {
      openFullDescription: false,
      fullDescription: '',
      studentCanApply: true,
    }
  },
  computed: {
    thumbnail() {
      return this.pricing.thumbnail_link
        ? this.pricing.thumbnail_link
        : '/images/thumbnail.jpg'
    },
    canApply() {
      if (!this.$auth.loggedIn) {
        return false
      } else if (
        this.$auth.user.user_type === CONSTANTS.USER_TYPES.INSTRUCTOR ||
        this.$auth.user.user_type === CONSTANTS.USER_TYPES.ADMIN
      ) {
        return false
      } else {
        return this.pricing.price > 0 && this.studentCanApply
      }
    },
  },
  methods: {
    showFullDescription(data) {
      this.fullDescription = data
      this.openFullDescription = true
    },
    add(data) {
      this.$emit('addSubscription', { ...data })
    },
  },
}
</script>

<style scoped>
.truncate-t {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
