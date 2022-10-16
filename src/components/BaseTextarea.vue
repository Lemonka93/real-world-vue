<template>
  <div class="baseTextarea">
    <label :for="uuid" v-if="label">{{ label }}</label>
    <textarea
      :placeholder="label"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      :id="uuid"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
    ></textarea>
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
  props: {
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
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
.baseTextarea {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
