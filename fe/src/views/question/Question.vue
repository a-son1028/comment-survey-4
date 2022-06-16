<template>
  <div>
    <UILoader v-if="isLoading" />
    <div
      class="mt-5"
    >
      <form
        method="POST"
        @submit="next"
      >
        <div id="questions">

          <div>
            <div><b>1.	How do you rate the necessity of the app's features in the Android app installation?</b></div>
            <div class="mt-2"><b>App basic info:</b> 
              <div>
                <div>
                  <u style="margin-left: 10px">App name</u>
                  <UIRadioGroup
                    v-model="question11.value"
                    name="question11"
                    :options="questionOptions"
                  />
                </div>

                <div>
                  <u style="margin-left: 10px">Category</u>
                  <UIRadioGroup
                    v-model="question12.value"
                    name="question12"
                    :options="questionOptions"
                  />
                </div>

                <div>
                  <u style="margin-left: 10px">Developer </u>
                  <UIRadioGroup
                    v-model="question13.value"
                    name="question13"
                    :options="questionOptions"
                  />
                </div>
              </div>  
            </div>


            <div class="mt-2"><b>Data collection:</b> 
              <div>
                <UIRadioGroup
                  v-model="question2.value"
                  name="question2"
                  :options="questionOptions"
                />
              </div>  
            </div>

            <div class="mt-2"><b>Privacy policy:</b> 
              <div>
                <div>
                  <u style="margin-left: 10px">Data collection purpose</u>
                  <UIRadioGroup
                    v-model="question31.value"
                    name="question31"
                    :options="questionOptions"
                  />
                </div>

                <div>
                  <u style="margin-left: 10px">Third party </u>
                  <UIRadioGroup
                    v-model="question32.value"
                    name="question32"
                    :options="questionOptions"
                  />
                </div>
              </div>  
            </div>

            <div class="mt-2"><b>Other:</b>
              <div>
                <UITextarea
                  v-model="question4.value"
                  name="question4"
                />
              </div>
            </div>
          </div>

          <div class="mt-3">
            <div><b>2. Why do you think this information is enough for your app installation decision?</b></div>
            <div>
              <UITextarea
                v-model="question5.value"
                name="question5"
              />
            </div>
          </div>
        </div>
        <div style="position: relative">
          <UINextButton />
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import UINextButton from '@/components/UINextButton.vue'
import UILoader from '@/components/UILoader.vue'
import UIRadioGroup from '@/components/UIRadioGroup.vue'
import UITextarea from '@/components/UITextarea.vue'
import { GET_ANSWER, STORE_ANSWER } from '@/store/modules/question/action.type.js'
import { GET_USER_INFO } from '@/store/modules/user/action.type.js'

const questionOptions = [{label: 'Very unnecessary', value: 1}, {label: 'Unnecessary', value: 2}, {label: 'Neutral', value: 3},{label: 'Necessary', value: 4},{label: 'Very necessary', value: 5} ]

export default {
  components: {
    UINextButton,
    UILoader,
    UIRadioGroup,
    UITextarea,
  },
  data: () => ({
    isLoading: true,
    questionOptions,
    question11: {
      name: 'question11',
      description: 'appname',
      value: null,
    },
    question12: {
      name: 'question12',
      description: 'category',
      value: null,
    },
    question13: {
      name: 'question13',
      description: 'developer',
      value: null,
    },
    question2: {
      name: 'question2',
      description: 'datacollection',
      value: null,
    },
    question31: {name: 'question31',
      description: 'datacollectionpurpose',
      value: null,
    },
    question32: {name: 'question32',
      description: 'thirdparty',
      value: null,
    },
    question4: {name: 'question4',
      description: 'other',
      value: '',
    },
     question5: {name: 'question5',
      description: 'question2',
      value: '',
    },
  }),
  computed: {
    ...mapGetters({
      answer: 'getAnswer',
      userInfo: 'getUserInfo'
    })
  },
  watch: {
    userInfo(userInfo) {
      if(!userInfo.isInstruction) this.$router.push('/')
    },
    answer(answer) {
      console.log('answer',answer)
      if(!answer) return
      answer.responses.forEach(response => {
        Object.entries(response).map(([key, value])=> {
          this[response.name][key] = value
        })
      })
    }
  },
  mounted() {
    Promise.all([
      this.$store.dispatch(GET_ANSWER),
      this.$store.dispatch(GET_USER_INFO),
    ]).then(() => this.isLoading = false)

  },
  methods: {
    next(e) {
      e.preventDefault();
      this.isLoading = true
      const data = {
        responses: [this.question11, this.question12, this.question13,this.question2,this.question31,this.question32,this.question4,this.question5]
      }

      this.$store.dispatch(STORE_ANSWER, data)
      .then(() => {
        this.isLoading = false

        this.$router.push('/success')
      })
    },
  }
};
</script>

<style scoped>
  .scrollable {
    overflow-y: scroll; max-height: 250px;
  }
  .ml-10 {
    margin-left: 10px;
  }
</style>