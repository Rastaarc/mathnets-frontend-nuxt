<template>
  <div class="mx-5 mx-sm-8 mx-md-16 my-8">
    <div
      class="font-weight-black primary--text text-h6 text-center text-md-h3 text-uppercase"
    >
      About Us
    </div>
    <div class="text-center mt-5 mt-md-7 mb-5">
      <div class="font-weight-bold text-title text-md-h5">How we started</div>
      <div class="text-caption text-md-title">
        Mathsnet platform is a platform that teaches all the curriculum  Mathematics 
        at primary level, Secondary level and A level Mathematics. 
        <br/><br/>
        All the tutors are professionals in Mathematics with a minimum qualification 
        of Master of Science in Mathematics in different areas of Mathematics. 
        <br/><br/><br/>
        Solutions to past questions such as West Africa Examination ( WAEC), GCE, 
        NECO and JAMB are solved.
        <br/><br/>
        There are free video for students to watch.
      </div>
    </div>
    <div
      class="text-center font-weight-bold mt-5 mt-md-10 text-title text-md-h5"
    >
      Creator
    </div>
    <v-row align="center" justify="center" class="mt-3 fill-height">
      <v-col cols="12" md="6">
        <v-card>
          <v-img
            src="/images/tutors/alamu_funmi.jpg"
            lazy-src="/images/thumbnail.jpg"
            :height="creatorImageHeight"
          >
            <template #placeholder>
              <v-row align="center" justify="center" fill-height>
                <v-progress-circular indeterminate />
              </v-row>
            </template>
          </v-img>
          <v-card-text>
            <div class="text-center">
              <span class="font-weight-bold text-md-h6 text-title primary--text"
                >Funmi, Alamu(Mrs)</span
              >
              PhD
            </div>
            <div class="text-caption text-md-title text-justify">
              <b>Alamu Awoniran Funmilola</b> is a PhD Student of Applied Mathematics 
              at the University Ilorin. 
              <br/><br/>
              She has her first degree in Mathematics at Olabisi Onabanjo University 
              Ago- Iwoye, Ogun State. 
              <br/><br/>
              She has a Master of Science in Applied Mathematics at the University 
              of Port Harcourt, Rivers State. 
              <br/><br/>
              She was once a Mathematics lecturer at Uptonville Oil and Gas Institute 
              GRA, Port Harcourt. She has three publications.
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'About',
  layout: 'homepage',
  computed: {
    creatorImageHeight() {
      return this.$vuetify.breakpoint.xsOnly
        ? '200px'
        : this.$vuetify.breakpoint.smOnly
        ? '280px'
        : '390px'
    },
  },
  head() {
    return {
      title: 'About Us',
    }
  },
}
</script>

<style scoped></style>
