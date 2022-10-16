<template>
  <label v-if="label" :for="uuid">{{ label }}</label>
  <div
    :id="uuid"
    :aria-describedby="error ? `${uuid}-error` : null"
    :aria-invalid="error ? true : null"
  >
    <component
      :is="vertical ? 'div' : 'span'"
      v-for="option in options"
      :key="option.value"
    >
      <BaseRadio
        :value="option.value"
        :label="option.label"
        :name="name"
        :modelValue="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
      />
    </component>
  </div>
  <p
    v-if="error"
    class="errorMessage"
    :id="`${uuid}-error`"
    aria-live="assertive"
  >
    {{ error }}
  </p>
</template>
<script>
import UniqueID from "../features/UniqueID";

export default {
  props: {
    label: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      requared: true,
    },
    options: {
      type: Array,
      requared: true,
    },
    modelValue: {
      type: [String, Number],
      requared: true,
    },
    vertical: {
      type: Boolean,
      default: false,
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
