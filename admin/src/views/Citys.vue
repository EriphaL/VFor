<template>
  <div ref="container" class="svg-container" align="center">
    <svg ref="svg" id="svg" :width="svgWidth" :height="svgHeight"
    v-if="redrawToggle === true">
      <defs>
        <marker
          id="arrowId"
          viewBox="0 0 10 10"
          refX="1"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
      </defs>
    </svg>
  </div>
</template>
<script>
/*eslint-disable */
import * as d3 from "d3";

export default {
  data: () => ({
    res: {},
    svgWidth: 0,
    redrawToggle: true,

    //   width:
  }),
  methods: {
    async fetch() {
      this.res = require("../assets/data/city.json");
    },
    // 即响应式绘制
    AddResizeListener() {
      window.addEventListener("resize", () => {
        this.$data.redrawToggle = false;
        setTimeout(() => {
          this.$data.redrawToggle = true;
          this.$data.svgWidth = this.$refs.container.offsetWidth * 0.8;
          // 重新绘制
          this.chart();
        }, 0);
      });
      //   console.log([...new Set(this.edges.map(d => d.data.time))].length);
    },
    chart() {
      // 无效
      // this.svgWidth = this.$refs.container.offsetWidth *0.9
      const data = this.res;
      const width = this.svgWidth;
      const height = this.svgHeight;
      const margin = { top: 24, right: 10, bottom: 34, left: 40 };
      const svg = d3.select("#svg");
      svg.attr("viewBox", [0, 0, this.svgWidth, this.svgHeight]);
      // svg.attr("viewBox",[0,0,800,500])

      const x = d3
        .scaleLog()
        .domain(
          padLog(d3.extent(data.flatMap(d => [d.POP_1980, d.POP_2015])), 0.1)
        )
        .rangeRound([margin.left, width - margin.right]);
      const y = d3
        .scaleLinear()
        .domain(
          padLinear(
            d3.extent(data.flatMap(d => [d.R90_10_1980, d.R90_10_2015])),
            0.1
          )
        )
        .rangeRound([height - margin.bottom, margin.top]);

      function padLinear([x0, x1], k) {
        const dx = ((x1 - x0) * k) / 2;
        return [x0 - dx, x1 + dx];
      }
      function padLog(x, k) {
        return padLinear(x.map(Math.log), k).map(Math.exp);
      }

      const endColor = d3.schemeCategory10[3];

      const startColor = d3.schemeCategory10[1];

      const grid = g =>
        g
          .attr("stroke", "currentColor")
          .attr("stroke-opacity", 0.1)
          .call(g =>
            g
              .append("g")
              .selectAll("line")
              .data(x.ticks())
              .join("line")
              .attr("x1", d => 0.5 + x(d))
              .attr("x2", d => 0.5 + x(d))
              .attr("y1", margin.top)
              .attr("y2", height - margin.bottom)
          )
          .call(g =>
            g
              .append("g")
              .selectAll("line")
              .data(y.ticks())
              .join("line")
              .attr("y1", d => 0.5 + y(d))
              .attr("y2", d => 0.5 + y(d))
              .attr("x1", margin.left)
              .attr("x2", width - margin.right)
          );

      const xAxis = g =>
        g
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).ticks(width / 80, ".1s"))
          .call(g => g.select(".domain").remove())
          .call(g =>
            g
              .append("text")
              .attr("x", width)
              .attr("y", margin.bottom - 4)
              .attr("fill", "currentColor")
              .attr("text-anchor", "end")
              .text(data.x)
          );

      function arc(x1, y1, x2, y2) {
        const r = Math.hypot(x1 - x2, y1 - y2) * 2;
        return `M${x1},${y1} A${r},${r} 0,0,1 ${x2},${y2}`;
      }

      const yAxis = g =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .call(d3.axisLeft(y))
          .call(g => g.select(".domain").remove())
          .call(g =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y)
          );

      svg.append("g").call(grid);

      svg.append("g").call(xAxis);

      svg.append("g").call(yAxis);

      //   箭头
      const arrowId = "arrowID";
      const gradientIds = data.map(() => {
        //   console.log(DOM.uid("gradient"));
        //   return DOM.uid("gradient");
        return;
      });

      const defs = svg.append("defs");

      

      //   const arrowMarker =
      // defs.append("marker")
      // .attr("id",arrowId)
      // .attr("markerUnits","strokeWidth")
      // .attr("markerWidth","8")
      // .attr("markerHeight","8")
      // .attr("viewBox","0 0 12 12")
      // .attr("refX","13")
      // .attr("refY","6")
      // .attr("orient","auto");

      // defs
      //   .append("marker")
      //   .attr("id", arrowId)
      //   // .attr("id",arrowId.id)
      //   .attr("markerHeight", 10)
      //   .attr("markerWidth", 10)
      //   .attr("refX", 5)
      //   .attr("refY", 2.5)
      //   .attr("orient", "auto")

      //   // 箭头形状填充
      //   .append("path")
      //   .attr("fill", endColor)
      //   .attr("d", "M0,0v5l7,-2.5Z");

      //   var marker

      svg
        .append("g")
        .attr("fill", "none")
        .selectAll("path")
        .data(data)
        .join("path")
        .attr("stroke", "black")
        .attr("marker-end", "url(#arrowId)")
        .attr("d", d => {
          //   console.log();
          return arc(
            x(d.POP_1980),
            y(d.R90_10_1980),
            // 终点坐标
            x(d.POP_2015),
            y(d.R90_10_2015)
          );
        });
      // 起始原点
      svg
        .append("g")
        .attr("fill", "currentColor")
        .selectAll("circle")
        .data(data)
        .join("circle")
        .attr("r", 1.75)
        .attr("cx", d => x(d.POP_1980))
        .attr("cy", d => y(d.R90_10_1980));

      svg
        .append("g")
        .attr("fill", "currentColor")
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 4)
        .selectAll("text")
        .data(data.filter(d => d.highlight))
        .join("text")
        .attr("dy", d => (d.R90_10_1980 > d.R90_10_2015 ? "1.2em" : "-0.5em"))
        .attr("x", d => x(d.POP_2015))
        .attr("y", d => y(d.R90_10_2015))
        .text(d => d.nyt_display)
        .call(text => text.clone(true))
        .attr("fill", "none")
        .attr("stroke", "white");

      //   svg
      //     .append("defs")
      defs
        .selectAll("linearGradient")
        .data(data)
        .join("linearGradient")
        .attr("id", (d, i) => gradientIds[i].id)
        // .attr("id","gradients")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", d => x(d.POP_1980))
        .attr("x2", d => x(d.POP_2015))
        .attr("y1", d => y(d.R90_10_1980))
        .attr("y2", d => y(d.R90_10_2015))
        .call(g =>
          g
            .append("stop")
            .attr("stop-color", startColor)
            .attr("stop-opacity", 0.5)
        )
        .call(g =>
          g
            .append("stop")
            .attr("offset", "100%")
            .attr("stop-color", endColor)
        );

      return svg.node();
    }
  },
  created() {
    this.fetch();
    console.log(this.svgViewBox);//can not fetch
    // d3.json('../assets/data/city.json').then(d=>
    // console.log(d)
    // )
  },
  mounted() {
    this.svgWidth = this.$refs.container.offsetWidth * 0.9;
    //   console.log(this.svgWidth);
    // this.chart();

    this.AddResizeListener()
    this.chart();
  },
  updated() {
    // this.svgWidth = this.$refs.container.offsetWidth * 0.9;
    // this.chart();
  },
  computed: {
    svgViewBox() {
      //   const { width, heihgt } = this.svgBox;
      const w = this.$refs.svg.offsetWidth * 0.9;
      const h = w / 1.61803398875;
      const svgBox = {
        'width': w,
        'height': h
      };
      //   return [0, 0, w, h];
      return svgBox;
    },
    xScale() {
      //   console.log(this.xValue);
      return d3
        .scaleBand()
        .domain([...new Set(this.edges.map(d => d.data.time))])
        .range([0, this.svgWidth - 2 * this.margin.left]);
      // .nice();
    },
    // 通过线性比例尺自动生成
    yScale() {
      return d3
        .scaleBand()
        .domain(
          this.nodes.map(d => {
            // console.log(d);
            return d.data.id;
          })
        )
        .range([0, this.svgHeight - this.margin.bottom]);
      // .padding(0);无效
    },
    // svgWidth(){return this.$refs.svg.offsetWidth*0.9},
    svgHeight() {
      return this.svgWidth / 1.61803398875; // 黄金比例
    }
  }
};
/*eslint-enable */
</script>