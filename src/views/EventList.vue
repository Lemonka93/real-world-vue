<template>
  <h1>Events For Good</h1>
  <div class="events">

    <EventCard v-for="event in events" :event="event" :key="event.id"/>
  </div>
</template>

<script>
// @ is an alias to /src
import EventService from '@/services/EventService.js'
import EventCard from '@/components/EventCard'

export default {
  name: 'EventList',
  components: {
    EventCard,  // register EventCard as a child component
  },
  data () {
    return {
      events: null,
    }
  },
  created () {
    EventService.getEvents()
        .then(response => {
          this.events = response.data
        }).catch(error => {
      console.log(error)
    })
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
