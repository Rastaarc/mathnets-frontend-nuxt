<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app color="primary" dark>
      <v-sheet color="secondary" height="210px" class="mb-7 mt-6">
        <div class="text-center primary--text pt-6">
          <v-avatar size="100" color="primary">
            <span
              v-if="!dpAvailable"
              class="text-center secondary--text text-h4"
              >DP</span
            >
            <v-img v-else :src="profileDP">
              <template #placeholder>
                <v-row justify="center" align="center" class="fill-height">
                  <v-progress-circular indeterminate />
                </v-row>
              </template>
            </v-img>
          </v-avatar>
          <div class="title font-weight-bold">
            {{ l_.capitalize($auth.user.username) }}
          </div>
          <div class="text-caption grey--text mt-n2">
            {{
              l_.capitalize(
                USER_HOLDER[parseInt(this.$auth.user.user_type) - 1]
              )
            }}
          </div>
        </div>
      </v-sheet>
      <v-list nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="white--text" dark v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template #append>
        <div class="text-center mb-8">
          <v-btn outlined color="white" @click="logout"
            ><v-icon left>mdi-logout</v-icon>Logout</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
    <v-app-bar color="primary" fixed flat tile app>
      <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
      <v-toolbar-title class="white--text"
        ><!--<v-btn
          tile
          plain
          class="text-capitalize"
          text
          :to="{ name: 'index' }"
          dark
          >{{ title }}</v-btn
        >-->
        <TheSiteLogo logo-type="white" />
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
import _ from 'lodash'
import { CONSTANTS } from '~/assets/javascript/constants'
import TheSiteLogo from '~/components/general/TheSiteLogo'

export default {
  components: { TheSiteLogo },
  props: {
    showNavBar: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      l_: _,
      drawer: false,
      title: CONSTANTS.APP_NAME,
      USER_HOLDER: CONSTANTS.USER_TYPES_TEXT,
      studentItems: [
        /* {
          title: 'Dashboard',
          to: { name: 'student-dashboard' },
          icon: 'mdi-view-dashboard-outline',
        }, */
        {
          title: 'Classes',
          to: { name: 'student-classes' },
          icon: 'mdi-book-open-outline',
        },
        {
          title: 'Subscriptions',
          to: { name: 'student-subscriptions' },
          icon: 'mdi-badge-account-horizontal-outline',
        },
        {
          title: 'Payments',
          to: { name: 'student-payments' },
          icon: 'mdi-credit-card-outline',
        },
        {
          title: 'Profile',
          to: { name: 'profile' },
          icon: 'mdi-account-circle-outline',
        },
      ],
      instructorItems: [
        /* {
          title: 'Dashboard',
          to: { name: 'instructor-dashboard' },
          icon: 'mdi-view-dashboard-outline',
        }, */
        {
          title: 'Topics',
          to: { name: 'instructor-topics' },
          icon: 'mdi-book-open-page-variant-outline',
        },
        {
          title: 'Profile',
          to: { name: 'profile' },
          icon: 'mdi-account-circle-outline',
        },
      ],
      adminItems: [
        {
          title: 'Dashboard',
          to: { name: 'admin-dashboard' },
          icon: 'mdi-view-dashboard-outline',
        },
        {
          title: 'Classes',
          to: { name: 'admin-classes' },
          icon: 'mdi-book-open-outline',
        },
        /* {
          title: 'Topics',
          to: { name: 'admin-topics' },
          icon: 'mdi-book-open-page-variant-outline',
        }, */
        {
          title: 'Past Questions',
          to: { name: 'admin-pq' },
          icon: 'mdi-cast-education',
        },
        {
          title: 'Instructors',
          to: { name: 'admin-instructors' },
          icon: 'mdi-clipboard-account-outline',
        },
        {
          title: 'Students',
          to: { name: 'admin-students' },
          icon: 'mdi-account-supervisor-outline',
        },
        {
          title: 'Subscriptions',
          to: { name: 'admin-subscriptions' },
          icon: 'mdi-badge-account-horizontal-outline',
        },
        {
          title: 'Payments',
          to: { name: 'admin-payments' },
          icon: 'mdi-credit-card-outline',
        },
        {
          title: 'Profile',
          to: { name: 'profile' },
          icon: 'mdi-account-circle-outline',
        },
      ],
    }
  },
  computed: {
    profileDP() {
      return this.$auth.user.dp_link
    },
    dpAvailable() {
      return !!this.profileDP
    },
    isAdmin() {
      if (this.$auth.user.user_type === CONSTANTS.USER_TYPES.ADMIN) return true
      return false
    },
    isInstructor() {
      if (this.$auth.user.user_type === CONSTANTS.USER_TYPES.INSTRUCTOR)
        return true
      return false
    },
    isStudent() {
      if (this.$auth.user.user_type === CONSTANTS.USER_TYPES.STUDENT)
        return true
      return false
    },
    items() {
      if (this.isAdmin) {
        return this.adminItems
      } else if (this.isInstructor) {
        return this.instructorItems
      } else if (this.isStudent) {
        return this.studentItems
      } else {
        return []
      }
    },
  },
  methods: {
    logout() {
      this.$router.push({ name: 'auth-logout' })
    },
  },
}
</script>

<style></style>
