<template>
  <div>
    <v-card width="100%">
      <v-card-title>{{ topic.course.title }} | {{ topic.title }}</v-card-title>
      <v-card-subtitle class="text-subtitle-2"
        >By: {{ topic.instructor.first_name }},
        {{ topic.instructor.last_name }}</v-card-subtitle
      >
      <v-card-text>
        <div
          :style="{ height: '90px' }"
          @click="showFullDescription(topic.description)"
        >
          <v-clamp autoresize :max-lines="4">{{ topic.description }}</v-clamp>
          <!--{{ topic.description }}-->
          <!--<TextTruncate>{{ topic.description }}</TextTruncate>-->
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          small
          depressed
          color="primary"
          target="_blank"
          :to="{
            name: 'class-title-topic-slug',
            params: { title: topic.course.seo_link, slug: topic.seo_link },
          }"
          >View</v-btn
        >
        <v-btn small depressed color="primary" @click="editTopic(topic)"
          >Edit</v-btn
        >
        <v-btn small depressed color="error" @click="deleteTopic(topic.id)"
          >Delete</v-btn
        >
        <v-spacer />
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
import VClamp from 'vue-clamp'
import FullDescriptionDialog from '~/components/dialogs/FullDescriptionDialog'
export default {
  name: 'TopicDataCard',
  components: {
    FullDescriptionDialog,
    VClamp,
  },
  props: {
    topic: {
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
  computed: {},
  methods: {
    editTopic(topic) {
      this.$emit('editTopic', { ...topic })
    },
    deleteTopic(id) {
      this.$emit('deleteTopic', { id })
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
