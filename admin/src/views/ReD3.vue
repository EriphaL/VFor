<template>
  <div ref="container" class="svg-container" align="center">
    <svg ref="svg" id="svg">
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
    nodes: [
      { data: { name: "张三", id: "zhangsan" } },
      { data: { name: "李四", id: "lisi" } },
      { data: { name: "王五", id: "wangwu" } }
    ],
    edges: [
      { data: { time: "20200501" }, source: "zhangsan", target: "lisi" },
      { data: { time: "20200502" }, source: "wangwu", target: "lisi" },
      { data: { time: "20200502" }, source: "lisi", target: "wangwu" },
      { data: { time: "20200505" }, source: "zhangsan", target: "wangwu" }
    ],
    margin: { top: 24, right: 10, bottom: 34, left: 40 },

    res: {},
    svgWidth: 0,
    toggle: true,
    svgBox: {}
    //   width:
  }),
  methods: {
    async fetch() {
      this.res = require("../assets/data/city.json");
    },
    // AddResizeListener() {
    //   window.addEventListener("resize", () => {
    //     this.$data.toggle = false;
    //     setTimeout(() => {
    //       this.$data.toggle = true;
    //       this.$data.svgWidth = this.$refs.container.offsetWidth * 0.9;
    //       this.render();
    //     }, 300);
    //   });
    // },
    getAxis() {
      const width = this.svgWidth;
      const height = this.svgHeight;
      const margin = this.margin;
      const svg = d3.select("#svg");
      const x = this.xScale;
      const y = this.yScale;
      const yLabel = this.nodes.map(d => d.data.name);
      //   console.log();

      const xAxis = g =>
        g
          .attr("id", "xAxis")
          .attr("transform", `translate(0,${height - margin.bottom})`)
          .call(
            d3.axisBottom(x).ticks(
              [
                ...new Set(
                  this.edges.map(d => {
                    return d.data.time;
                  })
                )
              ].length
            )
          )
          .call(g => g.select(".domain").remove())
          .call(g =>
            g
              .append("text")
              .attr("x", width)
              .attr("y", margin.bottom - 4)
              .attr("fill", "currentColor")
              .attr("text-anchor", "end")
          );

      const yAxis = g =>
        g
          .attr("id", "yAxis")
          .attr("transform", `translate(${margin.left},0)`)
          .call(
            d3
              .axisLeft(y)
              .tickFormat(d => {
                for (let el of this.nodes) {
                  if (el.data.id == d) return el.data.name;
                }
              })
              .ticks(this.nodes.length)
              //   .tickValues(yLabel)
              .tickSize(-width)
          );

      svg.append("g").call(xAxis);
      svg.append("g").call(yAxis);
    },
    getPaint() {
      const width = this.svgWidth;
      const height = this.svgHeight;
      const margin = this.margin;
      const svg = d3.select("#svg");
      const x = this.xScale;
      const y = this.yScale;

      const location = this.location;

      const endColor = d3.schemeCategory10[3];
      const startColor = d3.schemeCategory10[1];

      function arc(x1, y1, x2, y2) {
        return `M${x1},${y1} ${x2},${y2}`;
      }
      // a = {
      //     b: 11
      // }

      // a.b = 12

      // a = {
      //     b: 13
      // }
      // Object.defineProperty
      //
      // watch: {
      //     a () {
      //         console.log('change ')
      //     }
      // }
      // watch: {
      //     a: {
      //         handler () {
      //             console.log('change')
      //         },
      //         deep: true
      //     }
      // }
      // 内部点线绘制画布起始坐标点平移
      const transX =
        document.getElementById("xAxis").childNodes[0].transform.baseVal[0]
          .matrix.e - margin.left;
      const transY =
        document.getElementById("yAxis").getElementsByTagName("g")[0].transform
          .baseVal[0].matrix.f - margin.top;
      const paintG = svg
        .append("g")
        .attr("transform", `translate(${transX},${transY})`);
      // 线段带箭头
      paintG
        .attr("fill", "none")
        .selectAll("path")
        .data(location)
        .join("path")
        .attr("stroke", "black")
        .attr("marker-end", "url(#arrowId)")
        .attr("d", d => {
          return arc(d.x1, d.y1, d.x2, d.y2);
        });
      // 起始原点
      paintG
        .attr("fill", "currentColor")
        .selectAll("circle")
        .data(location)
        .join("circle")
        .attr("r", 1.75)
        .attr("cx", d => d.x1)
        .attr("cy", d => d.y1);
    },
    render() {
      d3.select("#svg").attr("viewBox", [0, 0, this.svgWidth, this.svgHeight]);
      //   渲染坐标轴
      this.getAxis();
      //   绘制线点
      this.getPaint();
    }
  },
  created() {
    this.fetch();
  },
  mounted() {
    this.svgWidth = this.$refs.container.offsetWidth * 0.9;
    // this.AddResizeListener();
    this.render();
  },
  computed: {
    // svgBox() {
    //   let w = this.$refs.container.offsetWidth * 0.9;
    //   let h = w / 1.6;
    //   this.svgBox = {
    //     width: w,
    //     height: h
    //   };
    //   return [0, 0, w, h];
    // },
    // getTransX() {
    //   return document.getElementById("xAxis").childNodes[0].transform.baseVal[0]
    //     .matrix.e;
    // },
    // getTransY() {
    //   return document.getElementById("yAxis").getElementsByTagName("g")[0]
    //     .transform.baseVal[0].matrix.f;
    // },
    xScale() {
      return d3
        .scaleBand()
        .domain([...new Set(this.edges.map(d => d.data.time))])
        .range([this.margin.left, this.svgWidth - this.margin.right]);
    },
    yScale() {
      return d3
        .scaleBand()
        .domain(
          this.nodes.map(d => {
            return d.data.id;
          })
        )
        .range([this.margin.top, this.svgHeight - this.margin.bottom]);
    },
    svgHeight() {
      return this.svgWidth / 1.61803398875; // 黄金比例
    },
    location() {
      // 找到每对{x1: 168.93333333333337, y1: 219.10822973227653, x2: 168.93333333333337, y2: 109.55411486613826}
      // 起始点和结束点
      let getX = this.edges.map(d => this.xScale(d.data.time));
      let getY = this.edges.map(d => this.yScale(d.source));
      const start = [];
      for (let i = 0; i < getX.length; i++) {
        start.push({ x1: getX[i], y1: getY[i] });
      }
      const end = [];
      const location = [];
      getY = this.edges.map(d => this.yScale(d.target));
      for (let i = 0; i < getX.length; i++) {
        end[i] = { x2: getX[i], y2: getY[i] };
        let cur = Object.assign(start[i], end[i]);
        location.push(cur);
      }
      return location;
    }
  }
};
/*eslint-enable */
</script>