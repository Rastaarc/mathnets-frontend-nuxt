<template>
  <div>
    <v-card elevation="5">
      <v-card-text>
        <div class="text-center">
          <v-avatar :size="avatarSize" color="primary">
            <span v-if="!dpAvailable" class="text-h4 white--text">DP</span>
            <v-img v-else :src="profileDP">
              <template #placeholder>
                <v-row justify="center" align="center" class="fill-height">
                  <v-progress-circular indeterminate />
                </v-row>
              </template>
            </v-img>
          </v-avatar>
        </div>
        <div class="text-center mt-4 mb-6 text-capitalize font-weight-black">
          <div class="headline primary--text">
            <div v-if="user.first_name && user.last_name">
              <span class="font-weight-bold"
                >{{ user.first_name }}, {{ user.last_name }}</span
              >
            </div>
            <div v-else>{{ user.username }}</div>
          </div>
        </div>
        <v-divider />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'UsersDataCard',
  props: {
    user: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    profileDP() {
      return this.user.dp_link
    },
    dpAvailable() {
      return !!this.profileDP
    },
    sheetHeight() {
      return this.$vuetify.breakpoint.smAndDown ? '50px' : '100px'
    },
    avatarSize() {
      return this.$vuetify.breakpoint.xsOnly
        ? '100'
        : this.$vuetify.breakpoint.smOnly
        ? '150'
        : '220'
    },
  },
  methods: {},
}
</script>

<style scoped></style>
