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
          <div class="intro-title text-underline font-weight-bold">Description:</div>
          <div class="intro-desc">
            The purpose of this survey is to assess the user's preference with respect to the app installation when referring to the necessary information of Android applications before installing the application.
          </div>
        </div>

        <div class="intro mt-3">
          <div class="intro-title text-underline font-weight-bold">Background:</div>
          <div class="intro-desc">
            <b>App basic info</b> describes the app information from the market including app name; category and developer.
          </div>
          <div class="mt-2"><b>Data collection</b> shows the personal data collection (i.e., location, media, connection, telephony, hardware, health & fitness, and user profile)</div>

          <div class="mt-2"><b>App’s privacy</b> policy discloses how an Android app gathers, stores, and uses the personal data which collects from the end-users for the app's service execution. This document includes data collection purposes and the third party.</div>
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