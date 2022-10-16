<template>
  <div>
    <label v-if="label" :for="uuid">{{ label }}</label>
    <select
      :value="modelValue"
      v-bind="{
        ...$attrs,
        onChange: ($event) => {
          $emit('update:modelValue', $event.target.value);
        },
      }"
      :id="uuid"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
    >
      <option
        v-for="option in options"
        :value="option"
        :key="option"
        :selected="option === modelValue"
      >
        {{ option }}
      </option>
    </select>
    <p
      v-if="error"
      class="errorMessage"
      :id="`${uuid}-error`"
      aria-live="assertive"
    >
      {{ error }}
    </p>
  </div>
</template>

<script>
import UniqueID from "../features/UniqueID";
export default {
  name: "Baseselect",
  props: {
    options: {
      type: Array,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  setup() {
    const uuid = UniqueID().getID();
    return {
      uuid,
    };
  },
};
</script>
<style scoped>
div {
  margin: 10px;
}
label {
  margin-right: 5px;
}
</style>
