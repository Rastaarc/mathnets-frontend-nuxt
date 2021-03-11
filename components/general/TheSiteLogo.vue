<template>
  <div>
    <v-btn text plain :to="{ name: 'index' }"
      ><v-img
        large
        :alt="altText"
        :lazy-src="logoUrl"
        :src="logoUrl"
        :width="logoWidth"
    /></v-btn>
  </div>
</template>

<script>
import { CONSTANTS } from '~/assets/javascript/constants'

export default {
  name: 'TheSiteLogo',
  props: {
    logoType: {
      type: String,
      default: 'primary',
    },
    width: {
      type: Number,
      default: 120,
    },
  },
  data() {
    return {
      altText: CONSTANTS.APP_NAME,
    }
  },
  computed: {
    logoUrl() {
      return this.logoType === 'primary'
        ? '/images/mathsnet_logo_p.png'
        : '/images/mathsnet_logo_w.png'
    },
    logoWidth() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return 95
      } else if (this.$vuetify.breakpoint.smOnly) {
        return 110
      } else {
        return 130
      }
    },
  },
}
</script>

<style scoped></style>
