<template>
  <h1>Events For Good</h1>
  <div class="events">
    <EventCard v-for="event in events" :event="event" :key="event.id" />
    <div class="pagination">
      <router-link
        id="page-prev"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        >&lt;- Prev
      </router-link>
      <router-link
        id="page-next"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPage"
      >
        Next -&gt;
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard";
export default {
  name: "EventList",
  components: {
    EventCard, // register EventCard as a child component
  },
  props: ["page"],
  computed: {
    events() {
      return this.$store.state.events;
    },
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages;
    },
    totalEvents() {
      return this.$store.state.totalEventsCount;
    },
  },
  watch: {
    page: {
      handler() {
        this.$store.dispatch("fetchEvents", [2, this.page]);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  width: 290px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>
