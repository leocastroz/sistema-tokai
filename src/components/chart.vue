<template>
  <div class="container">
    <canvas ref="lineChart" class="teste"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const lineChart = ref(null);

onMounted(() => {
  const ctx = lineChart.value.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Sample Line Chart',
        data: [5, 9, 6, 3, 6, 9, 10],
        fill: true,
        borderColor: '#c2c2c2c4',
        tension: 0.5,
        backgroundColor: '#ffffff00',
        borderWidth: 2,
        pointRadius: 5,
        // pointBackgroundColor: '#8d8d8d',
        // pointBorderColor: '#8d8d8d',
        pointHoverRadius: 10,
        // pointHoverBackgroundColor: '#8d8d8d',
        // pointHoverBorderColor: '#3d8d8d',
        // pointHitRadius: 10,
        // pointBorderWidth: 2,
        showLine: true,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        title: {
          display: false,
          text: 'Sample Line Chart'
        },
        legend: {
          display: false
        }
      },
      
    }
  });
});
</script>

<style>
.container {
  position: relative;
  width: 100%;
  height: 100px;
}

.teste {
  width: 100% !important;
}
</style>
