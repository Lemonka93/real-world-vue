<template>
  <h3>Edit an Event</h3>
  <form @submit.prevent="sendForm">
    <BaseSelect
      :options="categories"
      :label="'Category'"
      v-model="eventC.category"
    />
    <fieldset>
      <legend>Name & describe your event</legend>
      <BaseInput
        :label="'Title'"
        v-model="eventC.title"
        error="This input has an error!"
      />
      <BaseTextarea :label="'Description'" v-model="eventC.description" />
    </fieldset>
    <fieldset>
      <legend>Where is your event?</legend>
      <BaseInput :label="'Location'" v-model="eventC.location" />
    </fieldset>
    <fieldset>
      <legend>When is your event?</legend>
      <BaseDate v-model="eventC.date" label="Date" />
      <BaseTime v-model="eventC.time" label="Time" />
    </fieldset>
    <fieldset>
      <legend>Pets</legend>
      <BaseRadioGroup
        name="pets"
        :options="pets"
        :label="'Are pets allowed?'"
        v-model="eventC.pets"
        :vertical="true"
      />
    </fieldset>
    <fieldset>
      <legend>Extras</legend>
      <BaseCheckbox label="Catering" v-model="eventC.extras.catering" />
      <BaseCheckbox label="Live music" v-model="eventC.extras.liveMusic" />
    </fieldset>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
// import BaseInput from "@/components/BaseInput.vue";
// import BaseTextarea from "../../components/BaseTextarea.vue";
// import BaseSelect from "@/components/BaseSelect.vue";
// import BaseCheckbox from "../../components/BaseCheckbox.vue";
import EventService from "@/services/EventService.js";
// import BaseRadioGroup from "../../components/BaseRadioGroup.vue";
// import BaseDate from "../../components/BaseDate.vue";
// import BaseTime from "../../components/BaseTime.vue";

export default {
  name: "EventEdit",
  // components: {
  //   BaseInput,
  //   BaseSelect,
  //   BaseCheckbox,
  //   BaseRadioGroup,
  //   BaseDate,
  //   BaseTextarea,
  //   BaseTime
  // },
  props: ["event"],
  data: function () {
    return {
      pets: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
      eventC: {
        ...this.event,
        extras: { catering: false, liveMusic: false },
        pets: undefined,
      },
      unsavedChanges: false,
      categories: [
        "sustainability",
        "nature",
        "animal welfare",
        "housing",
        "education",
        "food",
        "community",
      ],
    };
  },
  methods: {
    sendForm() {
      EventService.putEvent(this.eventC.id, this.eventC)
        .then(console.log("good"))
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeRouteLeave() {
    console.log("abc");
    if (this.unsavedChanges) {
      const answer = confirm(
        "Do you really want to leave? You have unsaved changes!"
      );
      return answer;
    }
  },
};
</script>

<style>
fieldset {
  border: 0;
  margin: 20px 0;
  padding: 0;
}

legend,
h3 {
  font-size: 28px;
  font-weight: 700;
  margin-top: 20px;
}
h3 {
  color: #42b983;
}
button {
  text-transform: uppercase;
  font-size: 16px;
  margin: 15px 40px;
  color: white;
  cursor: pointer;
  background-color: #42b983;
  transform: all 0.2s;
  border-radius: 100px;
  border: #42b983;
  padding: 10px 25px;
}
button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}
button:active {
  transform: translateY(-1px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
}
</style>
