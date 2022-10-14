<template>
  <div>
    <input
      type="checkbox"
      :checked="modelValue"
      @change="
        ($event) => {
          $emit('update:modelValue', $event.target.checked);
        }
      "
      v-bind="$attrs"
      :id="uuid"
    />
    <label v-if="label" :for="uuid">{{ label }}</label>
  </div>
</template>
<script>
import UniqueID from "../features/UniqueID";
export default {
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: [String, Number],
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
