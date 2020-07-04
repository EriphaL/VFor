<template>
  <div ref="container" class="svg-container" align="center">
    <h1>{{ title }}</h1>
    <!-- v-if="redrawToggle === true" -->
    <svg ref="mainsvg" id="mainsvg" :width="svgWidth" :height="svgHeight" />
  </div>
</template>
<script>
/*eslint-disable */

import * as d3 from "d3";

export default {
  name: "Calltest",
  props: {
    title: String,
    xKey: String,
    yKey: String,
    data: Array,
    nodes: { type: Array, required: true },
    edges: { type: Array, required: true },
    res: { type: Array }
  },
  data() {
    return {
      svgWidth: 0
    };
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
};
/*eslint-enable */
</script>