<template>
  <layout-wrapper>
    <canvas ref="solvesChartCanvas" :height="height"></canvas>
  </layout-wrapper>
</template>

<script>
import Vue from 'vue'
// eslint-disable-next-line import/no-named-as-default
import Chart from 'chart.js/auto'
import 'chartjs-adapter-moment'

export default Vue.extend({
  props: {
    propsData: {
      type: Array,
      require: true,
      default: () => [],
    },
    ymax: {
      type: Number,
      require: true,
      default: 0,
    },
    height: {
      type: Number,
      require: false,
      default: 500,
    },
  },
  data() {
    return {
      data: {
        chart: null,
        datasets: [
          {
            label: 'Total Score',
            fontColor: 'red',
            borderColor: 'rgb(251, 235, 194)',
            fill: true,
            data: this.propsData,
          },
        ],
      },

      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'YYYY/MM/DD',
                hour: 'MM/DD HH:mm',
              },
            },
            ticks: {
              fontColor: 'rgb(251, 235, 194)',
              maxTicksLimit: 15,
            },
          },
          y: {
            ticks: {
              fontColor: 'rgb(251, 235, 194)',
            },
            suggestedMin: 0,
            suggestedMax: this.ymax,
          },
        },
        maintainAspectRatio: false,
      },
    }
  },
  mounted() {
    this.renderChart()
  },
  methods: {
    renderChart() {
      const canvas = this.$refs.solvesChartCanvas
      this.chart = new Chart(canvas, {
        type: 'line',
        data: this.data,
        options: this.options,
      })
    },
    redrawChart(ymax) {
      this.chart.destroy()
      this.$set(this.options.scales.y, 'suggestedMax', ymax)
      this.renderChart()
    },
  },
})
</script>

<style></style>
