<template>
  <div class="mx-5 my-7">
    <div>View Profile</div>
    {{ $route.params.user }}
  </div>
</template>

<script>
export default {
  layout: 'homepage',
  async fetch() {
    if (this.$route.params.user === this.$auth.user.username) {
      await this.$router.push({ name: 'profile' })
    } else {
      // eslint-disable-next-line no-console
      console.log('Different User')
    }
  },
}
</script>

<style scoped></style>
