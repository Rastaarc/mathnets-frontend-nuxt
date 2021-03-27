<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.background }">
    <v-app-bar color="secondary" flat tile app>
      <v-toolbar-title>
        <TheSiteLogo />
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="(item, i) in menuItemsResponsive"
        :key="i"
        text
        color="primary"
        nuxt
        :to="item.to"
        >{{ item.name }}</v-btn
      >
      <v-spacer />
      <div v-if="!$vuetify.breakpoint.mobile">
        <div v-if="!$auth.loggedIn">
          <v-btn text dark link color="primary" :to="{ name: 'auth-login' }">
            Log in</v-btn
          >
          <v-btn
            class="primary--text"
            dark
            outlined
            link
            :to="{ name: 'auth-signup' }"
          >
            Sign up</v-btn
          >
        </div>
        <div v-else>
          <!-- User Loggedin -->
          <v-btn text color="primary" nuxt :to="dashboard">Dashboard</v-btn>
          <v-btn icon nuxt :to="{ name: 'auth-logout' }"
            ><v-icon color="primary">mdi-power</v-icon></v-btn
          >
        </div>
      </div>
      <div v-else>
        <v-menu offset-y>
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" color="primary" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
              nuxt
              :to="item.to"
            >
              <v-list-item-content>
                <v-list-item-title class="primary--text">{{
                  item.name
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <div v-if="!$auth.loggedIn">
              <v-list-item link :to="{ name: 'auth-login' }">
                <v-list-item-content>
                  <v-list-item-title class="primary--text"
                    >Log in</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item link :to="{ name: 'auth-signup' }">
                <v-list-item-content>
                  <v-list-item-title class="primary--text"
                    >Sign up</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </div>
            <div v-else>
              <!-- User logged-in -->
              <v-list-item nuxt :to="dashboard" exact>
                <v-list-item-content>
                  <v-list-item-title class="primary--text"
                    >Dashboard</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item nuxt :to="{ name: 'auth-logout' }">
                <v-list-item-content>
                  <v-list-item-title class="primary--text"
                    >Logout</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </div>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <TheNavFooter />
    <TheSiteFooter />
    <TheSnackbarAlert />
    <TheActionOverlay />
  </v-app>
</template>

<script>
import TheSnackbarAlert from '~/components/general/TheSnackbarAlert'
import TheActionOverlay from '~/components/general/TheActionOverlay'
import { CONSTANTS } from '~/assets/javascript/constants'
import TheSiteFooter from '~/components/general/TheSiteFooter'
import TheNavFooter from '~/components/general/TheNavFooter'
import TheSiteLogo from '~/components/general/TheSiteLogo'

export default {
  name: 'Homepage',
  components: {
    TheSiteLogo,
    TheNavFooter,
    TheSiteFooter,
    TheActionOverlay,
    TheSnackbarAlert,
  },
  data() {
    return {
      appName: CONSTANTS.APP_NAME,
      menuItems: [
        { name: 'Classes', to: { name: 'classes' } },
        // { name: 'Past Questions', to: { name: 'pq' } },
        { name: 'Pricing', to: { name: 'pricing' } },
        { name: 'About', to: { name: 'about' } },
      ],
    }
  },
  computed: {
    menuItemsResponsive() {
      return this.$vuetify.breakpoint.mobile ? [] : this.menuItems
    },
    dashboard() {
      if (
        this.$auth.user &&
        this.$auth.user.user_type === CONSTANTS.USER_TYPES.ADMIN
      ) {
        return { name: 'admin-dashboard' }
      } else if (
        this.$auth.user &&
        this.$auth.user.user_type === CONSTANTS.USER_TYPES.INSTRUCTOR
      ) {
        return { name: 'instructor-topics' }
      } else if (
        this.$auth.user &&
        this.$auth.user.user_type === CONSTANTS.USER_TYPES.STUDENT
      ) {
        return { name: 'student-classes' }
      } else {
        return '/'
      }
    },
  },
}
</script>

<style scoped></style>
