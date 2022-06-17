<template>
  <div>
    <!-- ============= Short desc ============-->
    <div
      id="short-desc"
      class="mt-4"
    >
      <div>
        <h3 class="title text-center">Project description</h3><!-- intro-->
        <div class="intro mt-3">
          <!-- <div class="intro-title text-underline font-weight-bold">Description:</div> -->
          <div class="intro-desc">
            This survey aims to understand which information a user considers essential to evaluate an app's privacy risks and benefits before installing it.
          </div>
        </div>

        <div class="intro mt-3">
          <!-- <div class="intro-title text-underline font-weight-bold">Background:</div> -->
          <div class="intro-desc">
            <b>App basic info</b> describes app information taken from the app's market, including the app's name, category, and developer.
          </div>
          <div><b>Data collection refers to</b> the personal data collected by the app (i.e., location, media, connection, telephony, hardware, health & fitness, and user profile)</div>

          <div><b>App's privacy policy.</b> It states how an app gathers, stores, and uses the personal data it collects. This document includes data collection purposes and third parties with which data are shared.</div>
        </div>
      </div>
    </div>
    <UINextButton @next="next" />
  </div>
</template>

<script>
import UINextButton from '@/components/UINextButton.vue'
import { UPDATE_INSTRUCTION } from '@/store/modules/user/action.type.js'

export default {
  components: {
    UINextButton
  },
  computed: {
  },
  mounted() {
  },
  methods: {
    next() {
      this.$store.dispatch(UPDATE_INSTRUCTION)
        .then(() => {
          this.$router.push('/questions')
        })
    },
  }
};
</script>