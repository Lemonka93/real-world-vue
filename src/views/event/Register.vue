<template>
  <p>Register an event</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  name: "EventRegister",
  props: ["event"],
  methods: {
    register() {
      this.$store.dispatch("changeFlashMessage", [
        "You are successfully registered for " + this.event.title,
        "#06c145",
      ]);

      setTimeout(() => {
        this.$store.dispatch("changeFlashMessage", ["", ""]);
      }, 5000);
      this.$router.push({
        name: "EventDetails",
      });
    },
  },
};
</script>

<style scoped></style>
