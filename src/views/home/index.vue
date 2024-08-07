<template>
  <div class="flex flex-col gap-8">
    <HeaderComponent :withBackButton="false" />
    <section class="bg-white">
      <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div class="mx-auto max-w-3xl text-center">
          <h2 class="text-3xl font-bold text-gray-900 sm:text-4xl">Trusted by eCommerce Businesses</h2>

          <p class="mt-4 text-gray-500 sm:text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione dolores laborum labore
            provident impedit esse recusandae facere libero harum sequi.
          </p>
        </div>

        <div class="mt-8 sm:mt-12 grid">
          <div v-if="loading" class="grid grid-cols-4">
            <SkeletonComponent v-for="item in [1, 2, 3, 4]" :key="item" />
          </div>
          <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3" v-else>
            <div class="flex flex-col rounded-lg bg-[#f8e6ef] px-4 py-8 text-center" v-for="card in cardData">
              <dt class="order-last text-lg font-medium text-gray-500">{{ card.title }}</dt>

              <dd class="text-4xl font-extrabold text-[#f751a6] md:text-5xl">{{ card.amount }} </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <section class="bg-white p-2">
        <SkeletonComponent v-if="loadingChart" />
        <Bar :options="chartOptions" :data="barData" v-else />
      </section>
      <section class="bg-white p-2">
        <SkeletonComponent v-if="loadingChart" />
        <Line :options="chartOptions" ref="lineRef" :data="lineData" v-else />
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
import HeaderComponent from '@/components/HeaderComponent.vue';
import doRequest from '@/helpers/doRequest';
import { ErrorResponse } from '@/helpers/ErrorResponse';
import { toast } from '@steveyuowo/vue-hot-toast';
import { onMounted, ref } from 'vue';
import { Bar, Line } from 'vue-chartjs'
import {
  Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,
  PointElement,
  LineElement
} from 'chart.js'
import SkeletonComponent from '@/components/SkeletonComponent.vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend, PointElement, LineElement)

interface CardInterface {
  title?: string,
  amount?: number
}

interface IDashboard {
  user: number
  video: number
  capture: number
  question: number
}

const loading = ref<boolean>(false)
const loadingChart = ref<boolean>(false)

const cardData = ref<CardInterface[]>([
  {
    title: "Total Pengguna",
    amount: 20
  },
  {
    title: "Total Foto",
    amount: 100
  },
  {
    title: "Total Video",
    amount: 50
  },
  {
    title: "Total Pertanyaan",
    amount: 50
  }
])

const barData = ref({
  labels: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  datasets: [
    {
      label: 'Jumlah pengguna menggunakan chatt',
      backgroundColor: '#E45CA2',
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
    }
  ]
})

const lineData = ref({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Jumlah pengguna menggunakan chatt',
      backgroundColor: '#E45CA2',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
})

const chartOptions = ref({ responsive: true })
const lineRef = ref(null)

const getData = async () => {
  loading.value = true
  try {
    const response = await doRequest({
      url: "/dashboard",
      method: 'get',
    })
    const data: IDashboard = response.data

    const indexUser = cardData.value.findIndex((el) => el.title == "Total Pengguna")
    cardData.value[indexUser].amount = data.user
    const indexVideo = cardData.value.findIndex((el) => el.title == "Total Video")
    cardData.value[indexVideo].amount = data.video
    const indexFoto = cardData.value.findIndex((el) => el.title == "Total Foto")
    cardData.value[indexFoto].amount = data.capture
    const indexQuestion = cardData.value.findIndex((el) => el.title == "Total Pertanyaan")
    cardData.value[indexQuestion].amount = data.question
    loading.value = false
  } catch (error) {
    loading.value = false
    toast.error(ErrorResponse.message(error))
  }
}

const getUserActivity = async () => {
  loadingChart.value = true
  try {
    const response = await doRequest({
      url: "/dashboard/user/activity",
      method: 'get',
    })
    const data: any[] = response.data

    // Update the whole lineData object to ensure reactivity
    lineData.value = {
      labels: data.map(item => item.label),
      datasets: [
        {
          label: 'Jumlah pengguna menggunakan chatt',
          backgroundColor: '#E45CA2',
          data: data.map(item => item.value)
        }
      ]
    };

    barData.value = {
      labels: data.map(item => item.label),
      datasets: [
        {
          label: 'Jumlah pengguna menggunakan chatt',
          backgroundColor: '#E45CA2',
          data: data.map(item => item.value)
        }
      ]
    }
    loadingChart.value = false


  } catch (error) {
    loadingChart.value = false
    toast.error(ErrorResponse.message(error))
  }
}


onMounted(() => {
  getData()
  getUserActivity()
})

</script>
<style lang="">

</style>