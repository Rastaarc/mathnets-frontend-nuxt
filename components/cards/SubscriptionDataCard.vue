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
      <v-card-title class="text-capitalize">{{ item.title }}</v-card-title>
      <v-card-subtitle> &#8358;{{ item.price }}</v-card-subtitle>
      <v-card-text>
        <div
          class="truncate-t"
          :style="{ height: '20px' }"
          @click="showFullDescription(item.description)"
        >
          {{ item.description }}
          <!--<TextTruncate>{{ item.description }}</TextTruncate>-->
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-icon :small="xSmall" color="primary"
          >mdi-clipboard-clock-outline</v-icon
        >
        <span class="primary--text subtitle-2"
          >{{ item.duration }}{{ item.duration > 1 ? 'yrs' : 'yr' }}</span
        >
        <v-spacer></v-spacer>
        <v-btn
          :x-small="xSmall"
          outlined
          color="primary"
          @click="updateData(item)"
          >Modify</v-btn
        >
        <v-btn :x-small="xSmall" color="error" @click="deleteData(item)"
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
import FullDescriptionDialog from '~/components/dialogs/FullDescriptionDialog'
export default {
  name: 'CourseDataList',
  components: { FullDescriptionDialog },
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
    }
  },
  computed: {
    thumbnail() {
      return this.item.thumbnail_link
        ? this.item.thumbnail_link
        : '/images/thumbnail.jpg'
    },
    breakpoint() {
      return this.$vuetify.breakpoint.name
    },
    xSmall() {
      return this.breakpoint === 'xs'
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

<style>
.truncate-t {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
