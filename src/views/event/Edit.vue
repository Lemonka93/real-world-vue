<template >
  <p>Edit an Event</p>
</template >

<script >
export default {
  name: "EventEdit",
  props: ["event"],
  data: function () {
    return {
      unsavedChanges: true,
    };
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
</script >

<style scoped >
</style >
