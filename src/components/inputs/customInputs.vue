<template>
  <input
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    :type="type"
  />
</template>
<script>
export default {
  props: ["value", "type"],
};
</script>
