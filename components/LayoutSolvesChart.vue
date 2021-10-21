<script>
import { Line } from 'vue-chartjs'

export default {
  name: 'LayoutSolvesTable',
  extends: Line,
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
  },
  data() {
    return {
      data: {
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
        legend: {
          display: false,
        },
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          xAxes: [
            {
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
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'rgb(251, 235, 194)',
                suggestedMin: 0,
                suggestedMax: this.ymax,
              },
            },
          ],
        },
        maintainAspectRatio: false,
      },
    }
  },
  mounted() {
    this.renderChart(this.data, this.options)
  },
  methods: {
    redrawChart(ymax) {
      console.log(this.propsData)
      this.$data._chart.destroy()
      this.$set(this.options.scales.yAxes[0].ticks, 'suggestedMax', ymax)
      this.renderChart(this.data, this.options)
    },
  },
}
</script>

<style></style>
