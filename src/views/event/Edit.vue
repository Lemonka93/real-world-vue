<template>
  <h3>Edit an Event</h3>
  <div class="class-container">
    <form @submit.prevent="sendForm">
      <BaseSelect
        :options="categories"
        :label="'Select a category'"
        v-model="editedEvent.category"
      />
      <fieldset>
        <legend>Name & describe your event</legend>
        <BaseInput
          :label="'Title'"
          v-model="editedEvent.title"
          error="This input has an error!"
        />
        <BaseTextarea
          :label="'Description'"
          v-model="editedEvent.description"
        />
      </fieldset>
      <fieldset>
        <legend>Where is your event?</legend>
        <BaseInput :label="'Location'" v-model="editedEvent.location" />
      </fieldset>
      <fieldset>
        <legend>When is your event?</legend>
        <BaseDate v-model="editedEvent.date" label="Date" />
        <BaseTime v-model="editedEvent.time" label="Time" />
      </fieldset>
      <fieldset>
        <legend>Pets</legend>
        <BaseRadioGroup
          name="pets"
          :options="pets"
          :label="'Are pets allowed?'"
          v-model="editedEvent.pets"
          :vertical="true"
        />
      </fieldset>
      <fieldset>
        <legend>Extras</legend>
        <BaseCheckbox label="Catering" v-model="editedEvent.extras.catering" />
        <BaseCheckbox
          label="Live music"
          v-model="editedEvent.extras.liveMusic"
        />
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "EventEdit",
  props: ["event"],
  data: function () {
    return {
      pets: [
        { label: "Yes", value: 1 },
        { label: "No", value: 0 },
      ],
      editedEvent: {
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
      this.$store
        .dispatch("editEvent", this.editedEvent)
        .then(() => {
          this.$store.dispatch("changeFlashMessage", [
            "Event changed successfully",
            "#06c145",
          ]);
          setTimeout(() => {
            this.$store.dispatch("changeFlashMessage", ["", ""]);
          }, 5000);
          this.$router.push({
            name: "EventDetails",
            params: { id: this.editedEvent.id },
          });
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            this.$router.push({ name: "NetworkError" });
          } else {
            this.$router.push({
              name: "ErrorDisplay",
              params: { error: error },
            });
          }
        });
    },
  },
  beforeRouteLeave() {
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
