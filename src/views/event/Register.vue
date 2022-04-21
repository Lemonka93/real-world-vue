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
      this.GStore.flashMessage.message =
        "You are successfully registered for " + this.event.title;
      this.GStore.flashMessage.color = "#06c145";
      setTimeout(() => {
        this.GStore.flashMessage.message = "";
      }, 5000);
      this.$router.push({
        name: "EventDetails",
      });
    },
  },
};
</script>

<style scoped></style>
