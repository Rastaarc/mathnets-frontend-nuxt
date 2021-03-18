<template>
  <div>
    <v-card elevation="3">
      <v-img :src="thumbnail" lazy-src="/images/thumbnail.jpg" height="240">
        <template #placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="primary" />
          </v-row>
        </template>
      </v-img>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-subtitle
        ><v-chip color="primary">{{
          item.subscription.title
        }}</v-chip></v-card-subtitle
      >
      <v-card-text>
        <div
          :style="{ height: '55px' }"
          @click="showFullDescription(item.description)"
        >
          <v-clamp autoresize :max-lines="3">{{ item.description }}</v-clamp>
          <!--{{ item.description }}-->
          <!--- <TextTruncate>{{ item.description }}</TextTruncate> -->
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <!-- TODO: ADD RATING -->
        <!--<v-rating
          x-small
          :length="499"
          :value="ratingValue"
          color="amber darken-2"
        />-->
        <v-spacer></v-spacer>
        <v-btn
          :x-small="xSmall"
          :small="$vuetify.breakpoint.mdAndUp"
          outlined
          color="primary"
          @click="updateData(item)"
          >Modify</v-btn
        >
        <v-btn
          :x-small="xSmall"
          :small="$vuetify.breakpoint.mdAndUp"
          color="error"
          @click="deleteData(item)"
          >Delete</v-btn
        >
      </v-card-actions>
    </v-card>
    <FullDescriptionDialog
      :open="openFullDescription"
      :text="fullDescription"
      @closeDialog="openFullDescription = false"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import VClamp from 'vue-clamp'
import FullDescriptionDialog from '~/components/dialogs/FullDescriptionDialog'
export default {
  name: 'CourseDataList',
  components: { FullDescriptionDialog, VClamp },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      openFullDescription: false,
      fullDescription: '',
      thumb: '/images/hero_image.png',
      rating: [199, 299, 399],
    }
  },
  computed: {
    thumbnail() {
      if (this.item.thumbnail_link) {
        return this.item.thumbnail_link
      } else {
        return '/images/thumbnail.jpg'
      }
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name
    },
    xSmall() {
      return this.breakpoint === 'xs'
    },
    ratingValue() {
      return _.sample(this.rating)
    },
  },
  methods: {
    updateData(item) {
      this.$emit('updateData', { ...item })
    },
    deleteData(item) {
      this.$emit('deleteData', { ...item })
    },
    showFullDescription(data) {
      this.fullDescription = data
      this.openFullDescription = true
    },
  },
}
</script>

<style scoped>
.truncate-t {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
