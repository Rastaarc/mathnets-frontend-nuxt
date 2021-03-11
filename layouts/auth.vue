<template>
  <v-app :style="{ background: $vuetify.theme.themes.light.secondary }">
    <v-app-bar color="primary" prominent flat tile app>
      <v-spacer />
      <v-app-bar-title class="mt-n5"
        ><TheSiteLogo logo-type="w"
      /></v-app-bar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <!--<v-row
        v-if="$vuetify.breakpoint.mdAndUp"
        align="center"
        justify="center"
        class="mt-7"
      >
        <v-col cols="12" md="7" offset-md="4">
          <v-card
            width="250"
            flat
            tile
            style="background-color: transparent !important"
          >
            <v-img :src="img" />
          </v-card>
        </v-col>
      </v-row>-->
      <v-container>
        <v-row
          justify="center"
          align="center"
          align-content="center"
          class="mt-9 mt-md-12"
        >
          <v-col cols="12" sm="6" md="5">
            <v-card elevation="12" rounded>
              <nuxt />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <TheNavFooter />
    <TheSiteFooter />
    <TheSnackbarAlert />
  </v-app>
</template>

<script>
import TheSnackbarAlert from '~/components/general/TheSnackbarAlert'
import TheSiteLogo from '~/components/general/TheSiteLogo'
import TheNavFooter from '~/components/general/TheNavFooter'
import TheSiteFooter from '~/components/general/TheSiteFooter'
export default {
  name: 'Auth',
  components: { TheSiteFooter, TheNavFooter, TheSiteLogo, TheSnackbarAlert },
  data() {
    return {
      img: '/images/auth_page_img.png',
    }
  },
  computed: {},
  methods: {},
}
</script>

<style scoped></style>
