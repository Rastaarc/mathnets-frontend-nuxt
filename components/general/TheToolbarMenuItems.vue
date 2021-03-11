<template>
  <div>
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
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'TheToolbarMenuItems',
  data() {
    return {
      menuItems: [
        { name: 'Classes', to: { name: 'classes' } },
        { name: 'Past Questions', to: { name: 'pq' } },
        { name: 'Pricing', to: { name: 'pricing' } },
        { name: 'About', to: { name: 'about' } },
      ],
    }
  },
  computed: {
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
  methods: {},
}
</script>

<style scoped></style>
