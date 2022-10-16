<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>

    <div id="nav">
      <router-link :to="{ name: 'EventDetails' }">Details</router-link>
      |
      <router-link :to="{ name: 'EventRegister' }">Register</router-link>
      |
      <router-link :to="{ name: 'EventEdit' }">Edit</router-link>
    </div>
    <router-view :event="event" />
  </div>
</template>

<script>
export default {
  name: "EventLayout",
  computed: {
    event() {
      return this.$store.state.event;
    },
  },
  created() {
    this.$store.dispatch("fetchEvent", this.$route.params.id);
  },
};
</script>

<style scoped></style>
