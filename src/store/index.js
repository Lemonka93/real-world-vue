import { createStore } from "vuex";
import EventService from "@/services/EventService";
import router from "../router";
import NProgress from "nprogress";

export default createStore({
  state: {
    user: "Valeriya Mironova",
    events: [],
    totalEventsCount: 0,
    event: {},
    notAuthorised: true,
    flashMessage: { message: "", color: "" },
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event);
    },
    SET_EVENTS(state, events) {
      state.events = events;
    },
    SET_EVENT(state, event) {
      state.event = event;
    },
    SET_TOTAL_EVENTS_COUNT(state, totalEventsCount) {
      state.totalEventsCount = parseInt(totalEventsCount);
    },
    SET_FLASH_MESSAGE(state, [message, color]) {
      state.flashMessage = { message, color };
      console.log(state.flashMessage);
    },
  },
  actions: {
    changeFlashMessage({ commit }, [message, color]) {
      commit("SET_FLASH_MESSAGE", [message, color]);
    },
    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find((event) => event.id === id);
      if (existingEvent) {
        commit("SET_EVENT", existingEvent);
      } else {
        EventService.getEvent(id)
          .then((response) => {
            commit("SET_EVENT", response.data);
          })
          .catch((error) => {
            if (error.response && error.response.status == 404) {
              console.log(router);
              router.push({
                name: "404Resource",
                params: { resource: "event" },
              });
            } else {
              router.push({ name: "NetworkError" });
            }
          });
      }
    },
    fetchEvents({ commit }, [perPage, page]) {
      NProgress.start();
      EventService.getEvents(perPage, page)
        .then((response) => {
          commit("SET_TOTAL_EVENTS_COUNT", response.headers["x-total-count"]);
          commit("SET_EVENTS", response.data);
        })
        .catch(() => {
          router.push({ name: "NetworkError" });
        })
        .finally(() => {
          NProgress.done();
        });
    },
    createEvent({ commit }, event) {
      return EventService.postEvent(event)
        .then(() => {
          commit("ADD_EVENT", event);
        })
        .catch((error) => {
          throw error;
        });
    },
  },
  modules: {},
});
