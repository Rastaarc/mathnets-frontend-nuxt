<template>
  <div>
    <v-card class="colorback mb-7 px-7 pt-6" flat tile>
      <v-card-text>
        <v-row class="fill-height mb-8" justify="center" align="center">
          <v-col cols="12" sm="6" md="8">
            <div
              class="primary--text text-h5 text-md-h3 text-center text-sm-left font-weight-bold"
            >
              Ready to make your Mathematics learning a beautiful one?
            </div>
            <div
              class="text-subtitle-2 text-md-h6 text-center text-sm-left mt-4"
            >
              Browse through our available classes to brighten your horizon and
              excel in <span class="primary--text">Mathematics</span> or use the
              search box to find a specific class
            </div>
          </v-col>
          <v-col
            v-if="!$vuetify.breakpoint.xsOnly"
            cols="12"
            sm="6"
            md="4"
            class="text-center"
            order="1"
            order-sm="2"
          >
            <v-img
              :src="displayImg"
              min-width="300px"
              max-width="500px"
              alt="Display Image"
            >
              <template #placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="primary" />
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          align="center"
          class="mt-3 px-sm-16 text-center fill-height d-flex-column"
        >
          <v-col cols="12">
            <v-form ref="searchForm" :value="valid" @submit.prevent="search">
              <v-text-field
                v-model="searchItem"
                filled
                rounded
                :rules="searchRules"
                append-icon="mdi-magnify"
                @click:append="search"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn
            :small="$vuetify.breakpoint.xsOnly"
            color="primary"
            depressed
            @click="search"
            >search</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <div class="mx-3 mt-16 mt-sm-4 mt-md-2">
      <div v-if="$fetchState.pending">
        <CircularLoader />
      </div>
      <div v-else-if="$fetchState.error">
        <FetchError @reloadFetch="$fetch" />
      </div>
      <div v-else>
        <div v-if="courses.length > 0">
          <v-row>
            <v-col
              v-for="(course, n) in courses"
              :key="n"
              cols="12"
              sm="6"
              md="4"
            >
              <CourseDataCardGeneral :course="course" />
            </v-col>
          </v-row>
          <div class="mt-7">
            <ThePagination
              :pagination="pagination"
              @changePage="moveToPage($event)"
            />
          </div>
        </div>
        <div v-else class="mt-10 mb-8 text-center font-weight-bold text-h4">
          {{ messages.NO_COURSE_DATA }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import CourseDataCardGeneral from '~/components/cards/CourseDataCardGeneral'
import ThePagination from '~/components/general/ThePagination'
import { CONSTANTS } from '~/assets/javascript/constants'
import { formRules } from '~/assets/javascript/formRules'
export default {
  layout: 'homepage',
  components: {
    CircularLoader,
    FetchError,
    CourseDataCardGeneral,
    ThePagination,
  },
  async fetch() {
    let page
    let search

    this.pageToGo ? (page = this.pageToGo) : (page = this.$route.query.p)
    this.searchItem
      ? (search = this.searchItem)
      : (search = this.$route.query.s)

    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.GENERAL.GET_COURSES,
      { page, search }
    )
    this.courses = data.courses
    this.pagination = data.pagination
  },
  data() {
    return {
      messages: CONSTANTS.MESSAGES,
      valid: false,
      courses: [],
      pagination: {},
      pageToGo: null,
      searchItem: this.$route.query.s ? this.$route.query.s : '',
      displayImg: '/images/courses_page_hero_img.png',
      searchRules: formRules.fieldRequired,
    }
  },
  computed: {
    displayHeight() {
      return this.$vuetify.breakpoint.mdAndUp
        ? '600px'
        : this.$vuetify.breakpoint.sm
        ? '450px'
        : '300px'
    },
  },
  methods: {
    moveToPage({ page }) {
      this.pageToGo = page
      this.$fetch()
    },
    search() {
      if (!this.$refs.searchForm.validate()) {
        this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.FORM_ERROR
        )
        return
      }
      this.$router.push({
        path: this.$route.path,
        query: { s: this.searchItem },
      })
      this.$fetch()
    },
  },
  head: {
    title: 'Classes',
  },
}
</script>

<style scoped>
.colorback {
  background-color: #dbdef0;
}
</style>
