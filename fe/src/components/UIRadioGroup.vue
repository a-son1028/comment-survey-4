<template>
  <div class="anwsers mt-2">
    <label
      v-for="option in options"
      :key="option.value"
      class="container-radio"
    >{{ option.label }}
      <input
        :name="name"
        class="type-question"
        type="radio"
        v-bind="{
          ...(required === 'true' && {required: true}),
          ...(value == option.value && { checked: true})
        }"

        @change="$emit('input', option.value)"
      ><span class="checkmark" />
    </label>
  </div>
</template>


<script>

export default ({
  props: {
    options: {
      type: Array,
      default: function () {
        return []
      },
    },
    name: {
      type: String,
      default: ""
    },
    value: {
      type: [Number, String],
      default: null
    },
    required: {
      type: String,
      default: "true"
    },
  },
  emits: ['input'],
})
</script>
