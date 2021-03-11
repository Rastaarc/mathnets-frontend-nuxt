<template>
  <div>
    <TheHeadInfo
      text="Instructors"
      @openAddNewDialog="openNewInstructorDialog"
    />
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <div v-if="instructors.length > 0">
        <v-row>
          <v-col
            v-for="(user, i) in instructors"
            :key="i"
            cols="12"
            sm="6"
            md="4"
          >
            <UsersDataCard :user="user.profile" />
          </v-col>
        </v-row>
        <div class="mt-7">
          <ThePagination
            :pagination="pagination"
            @changePage="moveToPage($event)"
          />
        </div>
      </div>
      <div v-else class="mx-auto text-center display-3 font-weight-bold">
        {{ noData }}
      </div>
    </div>
    <NewInstructorDialog
      :open-dialog="newInstructorDialogState"
      @closeDialog="closeNewInstructorDialog"
      @reloadData="$fetch"
    />
  </div>
</template>

<script>
import TheHeadInfo from '~/components/general/TheHeadInfo'
import NewInstructorDialog from '~/components/dialogs/NewInstructorDialog'
import UsersDataCard from '~/components/cards/UsersDataCard'
import ThePagination from '~/components/general/ThePagination'
import FetchError from '~/components/errors/FetchError'
import { CONSTANTS } from '~/assets/javascript/constants'
export default {
  components: {
    UsersDataCard,
    NewInstructorDialog,
    TheHeadInfo,
    ThePagination,
    FetchError,
  },
  middleware: ['authenticate', 'auth-admin'],
  async fetch() {
    let page
    this.pageToGo ? (page = this.pageToGo) : (page = this.$route.query.p)
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.ADMIN.GET_INSTRUCTORS,
      { page }
    )
    this.instructors = data.instructors
    this.pagination = data.pagination
  },
  data() {
    return {
      newInstructorDialogState: false,
      instructors: [],
      pagination: {},
      pageToGo: null,
      noData: CONSTANTS.MESSAGES.NO_DATA_TO_DISPLAY,
    }
  },
  computed: {},
  methods: {
    moveToPage({ page }) {
      this.pageToGo = page
      this.$fetch()
    },
    openNewInstructorDialog() {
      this.newInstructorDialogState = true
    },
    closeNewInstructorDialog() {
      this.newInstructorDialogState = false
    },
  },
  head: {
    title: "Instructors' List",
  },
}
</script>

<style scoped></style>
