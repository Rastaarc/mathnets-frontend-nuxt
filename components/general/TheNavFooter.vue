<template>
  <v-card
    flat
    :color="$vuetify.theme.themes.light.background"
    class="mt-10 mb-16 text-center text-sm-left"
    min-width="100%"
  >
    <v-card-text>
      <v-row justify="center" class="mx-auto">
        <v-col cols="12" sm="4" lg="3">
          <span class="headline font-weight-medium primary--text"
            >Navigation</span
          >
          <ListItems :items="navigation" />
        </v-col>
        <v-col cols="12" sm="4" lg="3">
          <span class="headline font-weight-medium primary--text"
            >Interactive</span
          >
          <ListItems :items="interactive" />
        </v-col>
        <v-col cols="12" sm="4" lg="3">
          <span class="headline font-weight-medium primary--text">Company</span>
          <ListItems :items="company" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// import { CONSTANTS } from '~/assets/javascript/constants'
import ListItems from '~/components/ListItems'

export default {
  name: 'TheNavFooter',
  components: {
    ListItems,
  },
  data() {
    return {
      navigation: [
        { to: { name: 'index' }, name: 'Home' },
        { to: { name: 'auth-signup' }, name: 'Sign Up' },
        { to: { name: 'auth-login' }, name: 'Log In' },
      ],
      interactive: [
        { to: { name: 'classes' }, name: 'Classes' },
        // { to: { name: 'pq' }, name: 'Past Questions' },
      ],
      company: [
        { to: { name: 'pricing' }, name: 'Pricing' },
        { to: { name: 'about' }, name: 'About Us' },
        { to: { name: 'contact' }, name: 'Contact Us' },
        { to: { name: 'terms' }, name: 'Terms & Conditions' },
      ],
    }
  },
}
</script>

<style scoped></style>
