<template>
  <div class="baseInput">
    <label :for="uuid" v-if="label">{{ label }}</label>
    <input
      v-bind="$attrs"
      :placeholder="label"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :id="uuid"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : null"
    />
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
      type: [String, Number],
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
  },
  name: "BaseInput",
  setup() {
    const uuid = UniqueID().getID();
    return {
      uuid,
    };
  },
};
</script>
<style scoped>
.baseInput {
  margin: 10px;
}
label {
  margin-right: 5px;
}
</style>
