<template>
    <BarChart title="Bar Chart" xKey="name" yKey="amount" :data="barChartData"/>
</template>

<script>
import BarChart from "../components/BarChart";

export default {
  name: "App",
  components: {
    BarChart
  },
  data: () => ({
    barChartData: [
      {
        name: "张三",
        amount: 25
      },
      {
        name: "李四",
        amount: 40
      },
      {
        name: "老王",
        amount: 15
      },
      {
        name: "老五",
        amount: 9
      }
    ]
  })
};
</script>
