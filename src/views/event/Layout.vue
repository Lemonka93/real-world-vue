<template>
  <div v-if="GStore.event">
    <h1>{{ GStore.event.title }}</h1>

    <div id="nav">
      <router-link :to="{ name: 'EventDetails', params: { id: GStore.event.id } }"
        >Details</router-link
      >
      |
      <router-link :to="{ name: 'EventRegister', params: { id: GStore.event.id } }"
        >Register</router-link
      >
      |
      <router-link :to="{ name: 'EventEdit', params: { id: GStore.event.id } }"
        >Edit</router-link
      >
    </div>
    <router-view :event="GStore.event" />
  </div>
</template>

<script>
export default {
  name: "EventLayout",
  inject: ["GStore"],
};
</script>

<style scoped></style>
