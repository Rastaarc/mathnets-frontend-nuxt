<template>
  <div class="mb-5">
    <v-sheet color="secondary" class="mt-n5 pt-6 pt-md-3">
      <v-row class="mx-2" align="center">
        <v-col cols="12" sm="7" md="5" class="pl-5">
          <div
            class="primary--text text-h3 text-sm-h4 text-md-h2 text-center text-md-left font-weight-black"
          >
            <!--LEARN MATH EASILY AND SWIFTLY WITH US -->
            Learn Maths Easily and Swiftly with Us
          </div>
          <div
            class="title text-sm-subtitle-1 text-md-h5 mt-2 text-center text-md-left"
          >
            Learn and understand math easily and quickly using great teaching
            methods
          </div>
        </v-col>
        <v-col cols="12" sm="5" md="7" class="mt-n9 mt-sm-0">
          <v-img :src="displayImage" :lazy-src="displayImage">
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="primary" />
              </v-row>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-sheet>
    <v-row class="mt-5 mx-5">
      <v-col cols="12">
        <div class="mx-4 d-flex">
          <span class="text-uppercase font-weight-bold">CLASSES</span>
          <span class="ml-auto">
            <v-btn icon
              ><v-icon color="primary">mdi-chevron-left</v-icon></v-btn
            >
            <v-btn icon
              ><v-icon color="primary">mdi-chevron-right</v-icon></v-btn
            >
          </span>
        </div>
        <v-divider> </v-divider>
      </v-col>
    </v-row>
    <v-row
      v-if="$fetchState.pending"
      justify="center"
      align="center"
      align-content="center"
    >
      <v-col cols="12">
        <CircularLoader />
      </v-col>
    </v-row>
    <div v-else-if="$fetchState.error" class="mx-4">
      <FetchError :show-img="false" @reloadFetch="$fetch" />
    </div>
    <div v-else class="mx-7 my-7">
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
        <div class="mt-12 mb-9 text-center">
          <v-btn color="primary" outlined :to="{ name: 'classes' }"
            >See More</v-btn
          >
        </div>
      </div>
      <div v-else class="text-center font-weight-bold text-h4">
        {{ messages.NO_COURSE_DATA }}
      </div>
    </div>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'
import CourseDataCardGeneral from '~/components/cards/CourseDataCardGeneral'
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'

export default {
  layout: 'homepage',
  components: {
    CourseDataCardGeneral,
    CircularLoader,
    FetchError,
  },
  async fetch() {
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.GENERAL.GET_RANDOM_COURSES,
      {
        d: 0,
      }
    )
    this.courses = data.courses
  },
  data() {
    return {
      messages: CONSTANTS.MESSAGES,
      displayImage: '/images/hero_image.png',
      courses: [],
      pagination: {},
    }
  },
  head() {
    return {
      title: `Home`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: `${CONSTANTS.APP_NAME} Homepage, Online maths schools`,
        },
      ],
    }
  },
}
</script>
