<template >
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
</template >

<script >
// @ is an alias to /src
import EventService from "@/services/EventService.js";
import EventCard from "@/components/EventCard";
import { watchEffect } from "vue";

export default {
  name: "EventList",
  components: {
    EventCard, // register EventCard as a child component
  },
  props: ["page"],
  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },
  created() {
    watchEffect(() => {
      this.events = null;
      EventService.getEvents(2, this.page)
        .then((response) => {
          this.events = response.data;
          this.totalEvents = response.headers["x-total-count"];
        })
        .catch(() => {
          this.$router.push({ name: "NetworkError" });
        });
    });
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 2);
      return this.page < totalPages;
    },
  },
};
</script >

<style scoped >
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
</style >
