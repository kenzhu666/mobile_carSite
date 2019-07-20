<template>
  <v-lease></v-lease>
</template>

<script>
import lease from "./sellform/lease.vue";

import simple from "./sellform/simple.vue";

export default {
  components: {
    "v-lease": lease
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
</style>
