<template>
  <div class="ma-5">
    <div v-if="$fetchState.pending">
      <CircularLoader />
    </div>
    <div v-else-if="$fetchState.error">
      <FetchError @reloadFetch="$fetch" />
    </div>
    <div v-else>
      <div v-if="topicAvailable">
        <v-breadcrumbs>
          <v-breadcrumbs-item
            ><v-btn
              text
              tile
              plain
              color="primary"
              :to="{ name: 'classes' }"
              class="text-capitalize"
              >Classes</v-btn
            ></v-breadcrumbs-item
          >
          /
          <v-breadcrumbs-item
            ><v-btn
              text
              tile
              plain
              color="primary"
              class="text-capitalize"
              :to="{
                name: 'class-title',
                params: { title: this.$route.params.title },
              }"
            >
              {{ courseTitle }}
            </v-btn></v-breadcrumbs-item
          >
        </v-breadcrumbs>
        <div v-if="!studentClassError">
          <div v-if="!isRealYoutubeId" style="max-width: 100%; min-width: 100%">
            <VideoPlayer :player-options="options" />
          </div>
          <div v-else class="my-8 d-flex mx-auto youtube-player-2">
            <v-spacer />
            <youtube :video-id="youtubeId" />
            <v-spacer />
          </div>
        </div>
        <!--<vue-core-video-player :src="options.sources[0].src" />
        <video-embed :src="options.sources[1].src" />-->
        <div class="mt-7 mb-3 font-weight-bold primary--text">
          {{ currentTopic.title }}
        </div>
        <div>
          <v-row justify="center" class="mt-5">
            <v-col cols="12" md="8">
              <div
                class="text-title text-md-h5 font-weight-bold text-uppercase"
              >
                Class Topics
              </div>
              <div>
                <div v-if="topicsLoading">
                  <v-progress-circular indeterminate color="primary" />
                </div>
                <div v-else>
                  <div v-if="topics.length > 0">
                    <v-expansion-panels>
                      <v-expansion-panel v-for="(topic, i) in topics" :key="i">
                        <v-expansion-panel-header
                          v-if="topic.seo_link === $route.params.slug"
                          class="text-title font-weight-bold primary--text"
                          >{{ topic.title }}
                          <template #actions>
                            <v-icon color="primary"> $expand </v-icon>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-header
                          v-else
                          class="font-weight-bold"
                          >{{ topic.title }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content
                          class="text-caption text-md-h6"
                        >
                          <div
                            v-if="$vuetify.breakpoint.mdAndUp"
                            class="d-flex text-body-2"
                          >
                            By:
                            <v-btn
                              plain
                              text
                              color="primary"
                              class="text-capitalize text-decoration-none px-1"
                              @click="updateProfileDialog(topic.instructor)"
                              >{{ topic.instructor.first_name }},{{
                                topic.instructor.last_name
                              }}
                            </v-btn>
                            |{{ formattedDate(topic.created_on) }}
                          </div>
                          <div v-else class="text-caption">
                            By:
                            <v-btn
                              plain
                              text
                              color="primary"
                              class="text-capitalize text-decoration-none px-1"
                              @click="updateProfileDialog(topic.instructor)"
                              >{{ topic.instructor.first_name }},{{
                                topic.instructor.last_name
                              }} </v-btn
                            >| {{ formattedDate(topic.created_on) }}
                          </div>
                          <div class="d-flex">
                            <v-spacer /><nuxtLink
                              v-if="topic.seo_link !== $route.params.slug"
                              class="text-decoration-none"
                              :to="{
                                name: 'class-title-topic-slug',
                                params: {
                                  slug: topic.seo_link,
                                  title: topic.course.seo_link,
                                },
                              }"
                              >View Topic</nuxtLink
                            >
                          </div>
                          <div>{{ topic.description }}</div>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                    <div class="mt-4 text-center">
                      <TheRatingBox :course="courseData" />
                    </div>
                  </div>
                  <div
                    v-else
                    class="mt-4 font-weight-bold text-md-h5 text-title text-uppercase text-center"
                  >
                    {{ messages.NO_TOPIC_FOR_CLASS }}
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="4">
              <div
                class="primary--text text-title text-md-h5 font-weight-bold text-center text-uppercase"
              >
                Other Classes
              </div>
              <div v-if="otherCoursesLoading" class="text-center">
                <v-progress-circular indeterminate color="primary" />
              </div>
              <div v-else>
                <div v-if="otherCourses.length > 0">
                  <div
                    v-for="(course, i) in otherCourses"
                    :key="i"
                    class="mb-4"
                  >
                    <CourseDataCardGeneral :course="course" />
                  </div>
                </div>
                <div
                  v-else
                  class="mt-4 font-weight-bold text-md-h5 text-title text-uppercase text-center"
                >
                  No other classes yet. Check back later
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </div>
      <div v-else>
        <GeneralError msg="Invalid Topic Request" :show-reload="false" />
      </div>
    </div>
    <profile-dialog
      :open-dialog="showProfileDialog"
      :profile-data="profileDialogData"
      @closeDialog="showProfileDialog = false"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import format from 'date-fns/format'
import TheRatingBox from '~/components/general/TheRatingBox'
import VideoPlayer from '~/components/video/VideoPlayer'
import CircularLoader from '~/components/loaders/CircularLoader'
import FetchError from '~/components/errors/FetchError'
import { CONSTANTS } from '~/assets/javascript/constants'
import GeneralError from '~/components/errors/GeneralError'
import ProfileDialog from '~/components/dialogs/ProfileDialog'
export default {
  layout: 'homepage',
  // middleware: ['authenticate'],
  components: {
    GeneralError,
    VideoPlayer,
    CircularLoader,
    FetchError,
    TheRatingBox,
    ProfileDialog,
  },
  async fetch() {
    let errorOccurred = false
    const { data } = await this.$axios.post(
      CONSTANTS.ROUTES.GENERAL.GET_COURSE_DATA,
      {
        data: {
          course_seo_link: this.$route.params.title,
        },
      }
    )
    if (data.message) {
      errorOccurred = true
      this.$store.dispatch('snackalert/showErrorSnackbar', data.message)
      await this.$router.push({ name: 'classes' })
    }
    if (!this.$auth.loggedIn && data.course.subscription.price > 0) {
      errorOccurred = true
      await this.$router.push({ name: 'auth-login' })
    } else if (
      this.$auth.loggedIn &&
      this.$auth.user.user_type === CONSTANTS.USER_TYPES.STUDENT &&
      data.course.subscription.price > 0
    ) {
      const cResp = await this.$axios.post(
        CONSTANTS.ROUTES.STUDENT.CHECK_COURSE_STATUS,
        { data: { course: data.course.id } }
      )
      if (cResp.data.status) {
        errorOccurred = true
        await this.$store.dispatch(
          'snackalert/showErrorSnackbar',
          CONSTANTS.MESSAGES.ADD_COURSE_FIRST
        )
        await this.$router.push({
          name: 'class-title',
          params: { title: this.$route.params.title },
        })
      }
    }
    this.studentClassError = errorOccurred
    if (!errorOccurred) {
      this.courseData = data.course
      const res = await this.$axios.post(
        CONSTANTS.ROUTES.GENERAL.GET_TOPIC_DATA,
        {
          data: {
            course_id: this.courseData.id,
            topic_seo_link: this.$route.params.slug,
          },
        }
      )
      if (res.data.message) {
        this.$store.dispatch('snackalert/showErrorSnackbar', res.data.message)
        this.topicAvailable = false
        await this.$router.push({
          name: 'class-title',
          params: { title: this.courseData.seo_link },
        })
      }

      await this.loadTopics(this.courseData.id)
      await this.loadOtherCourses(this.courseData.id)

      this.youtubeId = this.$youtube.getIdFromURL(this.currentTopic.video_link)
      this.isRealYoutubeId = this.youtubeId !== this.currentTopic.video_link
    }
  },
  data() {
    return {
      showProfileDialog: false,
      profileDialogData: null,
      courseData: {},
      messages: CONSTANTS.MESSAGES,
      topics: [],
      otherCourses: [],
      topicsLoading: true,
      otherCoursesLoading: true,
      addCourseLoading: false,
      topicAvailable: true,
      youtubeId: null,
      isRealYoutubeId: false,
      studentClassError: false,
    }
  },
  computed: {
    /* youtubeId() {
      return this.$youtube.getIdFromURL(this.currentTopic.video_link)
    },
    isYoutubeVideo() {
      return this.currentTopic.video_link !== this.youtubeId
    }, */
    options() {
      return {
        language: 'en',
        fluid: true,
        responsive: true,
        // techOrder: ['youtube', 'html5'],
        sources: [
          {
            src: this.currentTopic.video_link,
          },
          {
            src: this.currentTopic.video_link,
          },
        ],
      }
    },
    courseTitle() {
      return this.courseData.title
        ? _.startCase(this.courseData.title)
        : 'Loading'
    },
    currentTopic() {
      if (this.topics.length > 0) {
        return this.topics.filter(
          (topic) => topic.seo_link === this.$route.params.slug
        )[0]
      } else {
        return {}
      }
    },
    topicTitle() {
      if (!this.topicAvailable) return 'Unknown'
      return this.currentTopic.title ? this.currentTopic.title : 'Loading'
    },
  },
  mounted() {},
  methods: {
    updateProfileDialog(instructor) {
      this.profileDialogData = instructor
      this.showProfileDialog = true
    },
    formattedDate(c) {
      return format(new Date(c), 'dd MMM YYY')
    },
    async loadTopics(courseId) {
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.GENERAL.GET_TOPIC_DATA,
          {
            data: {
              course_id: courseId,
            },
          }
        )
        this.topics = data.topics
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
      }
      this.topicsLoading = false
    },
    async loadOtherCourses(courseId) {
      try {
        const { data } = await this.$axios.post(
          CONSTANTS.ROUTES.GENERAL.GET_RANDOM_COURSES,
          { data: courseId }
        )
        this.otherCourses = data.courses
      } catch (e) {
        let msg
        if (e.response) {
          msg = e.response.data.message
        } else {
          msg = CONSTANTS.MESSAGES.UNKNOWN_ERROR
        }
        this.$store.dispatch('snackalert/showErrorSnackbar', msg)
      }
      this.otherCoursesLoading = false
    },
  },
  head() {
    return {
      title: `${this.topicTitle} Class`,
    }
  },
}
</script>

<style>
/*.youtube-player-2 {
  width: auto !important;
}*/
.youtube-player-2 {
  overflow: hidden;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
}
.youtube-player-2 iframe {
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
#youtube-player-2 {
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
