<template>
  <div class="baseTime">
    <label :for="uuid" v-if="label">{{ label }}</label>
    <input
      type="time"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
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
.baseTime {
  margin: 10px;
}
.baseTime label {
  margin-right: 5px;
}
</style>
