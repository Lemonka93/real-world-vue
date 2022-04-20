<template>
  <p>Register an event</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  name: "EventRegister",
  props: ["event"],
  inject: ["GStore"],
  methods: {
    register() {
      //assuming successful API call to register them
      this.GStore.flashMessage =
        "You are successfully registered for " + this.event.title;
      setTimeout(() => {
        this.GStore.flashMessage = "";
      }, 3000);
      this.$router.push({
        name: "EventDetails",
      });
    },
  },
};
</script>

<style scoped>
</style>
