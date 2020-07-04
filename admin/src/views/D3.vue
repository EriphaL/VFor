<template>
  <Call
    title="话单时间序列图"
    xKey="name"
    yKey="amount"
    :nodes="nodes"
    :edges="edges"
  />
</template>
<script>
/*eslint-disable */

import Call from "../components/Call";
export default {
  components: {
    Call
  },
  data() {
    return {
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
      res: [
        // data: [{
        //     source: {
        //         id: ,
        //         xx
        //     },
        //     target
        // }],
        // {
        //     data: {name: "张三", id: "zhangsan"},
        //     records: {
        //         {target_id: "lisi", time: "20200501"},
        //         {target_id: "wangwu", time: "20200505"}
        //     }
        // }
        // {
        //   time: "20200501",
        //   records: [
        //     {
        //       source: "zhangsan",
        //       target: "lisi"
        //     }
        //   ]
        // }
      ]
      //   barChartData: [
      //     {
      //       name: "张三",
      //       amount: 25
      //     },
      //     {
      //       name: "李四",
      //       amount: 40
      //     },
      //     {
      //       name: "老王",
      //       amount: 15
      //     },
      //     {
      //       name: "老五",
      //       amount: 9
      //     }
      //   ]
    };
  },
  methods: {
    transData(p, source) {
      let res = JSON.parse(JSON.stringify(p));
      res.map(el => {
        el["records"] = [];
        source.map(item => {
          if (item.source === el.data.id) {
            let addRecord = { target_id: item.target, time: item.data.time };
            //   console.log(addRecord);
            el["records"].push(addRecord);
          }
        });
        return el;
      });
      //   console.log(res);
      return res;
    }
  },
  created() {
    this.res = this.transData(this.nodes, this.edges);
  }
};
/*eslint-enable */
</script>