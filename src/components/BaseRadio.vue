<template>
  <input type="radio" :checked="modelValue===value" :value="value" @change="$emit('update:modelValue',value)"
    v-bind="$attrs" :id="uuid" />
  <label v-if="label" :for="uuid">{{label}}</label>
</template>
<script>
import UniqueID from '../features/UniqueID';
export default {
  props: {
    modelValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number],
      requared: true,
    },
  },
  setup() {
    const uuid = UniqueID().getID()
    return {
      uuid
    }
  }
}
</script>