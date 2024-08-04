<template>
  <div class="flex flex-col gap-8">
    <HeaderComponent :withBackButton="false" />
    <section class="bg-white p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-hidden">
      <SkeletonComponent v-for="item in [1, 2, 3, 4]" :key="item" v-if="pagination.loading" />
      <PhotoComponent v-for="camera in cameraData" :source="`${baseURL}/${camera.source}`" :date="camera.date"
        :userID="camera.userID" :note="camera.note" @change-note="changeNote(camera._id)" v-else />
      <div ref="observer" />
      <ModalNoteComponent :is-show="showModal" title="Modal" body="content" @on-ok="onOk">
        <InputComponent placeholder="Masukan pertanyaan" v-model="state.note" className="h-[50px] my-7"
          icon="pi-question-circle">
          <span v-if="v$.note.$error" v-for="error in v$.note.$errors">{{
            error.$message }}</span>
        </InputComponent>
      </ModalNoteComponent>
    </section>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';

import PhotoComponent from '@/components/PhotoComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue';
import doRequest, { baseURL } from '@/helpers/doRequest';
import type { IPagination } from '@/interface/paginate';
import { SuccessResponse } from '@/helpers/SuccessResponse';
import type { ICamera } from '@/interface/cameara';
import { toast } from '@steveyuowo/vue-hot-toast';
import { ErrorResponse } from '@/helpers/ErrorResponse';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import ModalNoteComponent from '@/components/ModalNoteComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import { useIntersectionObserver } from '@vueuse/core';
import SkeletonComponent from '@/components/SkeletonComponent.vue';

interface CardInterface {
  title?: string,
  amount?: number
}

const observer = ref(null)

const pagination = ref<IPagination>({
  page: 1,
  limit: 12,
  total: 0,
  search: null,
  loading: false,
  totalPage: 0
})

const userID = ref<string>('')
const showModal = ref<boolean>(false)

const state = reactive({
  note: '',
})
let rules = {
  note: { required },
}
const v$ = useVuelidate(rules, state)

let dataCamera: ICamera[] = []
const cameraData = ref<ICamera[]>()

const getData = async () => {
  pagination.value.loading = true
  try {
    const response = await doRequest({
      url: "/capture",
      method: 'get',
      params: {
        page: pagination.value.page,
        limit: pagination.value.limit,
      }
    })
    const data = SuccessResponse.toPaginate<ICamera[]>(response.data)
    data.data.map((item: any) => dataCamera.push(item))
    cameraData.value = dataCamera
    pagination.value.loading = false
    pagination.value.totalPage = Math.ceil(data.total / data.limit)
  } catch (error) {
    pagination.value.loading = false
    toast.error(ErrorResponse.message(error))
  }
}

function watchIntersection([{ isIntersecting }]: IntersectionObserverEntry[]) {
  if (isIntersecting && !pagination.value.loading) {
    if (pagination.value.page != pagination.value.totalPage) {
      pagination.value.page = pagination.value.page + 1
      getData()
    }
  }
}

useIntersectionObserver(observer, watchIntersection);

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
  }
])

const onOk = async () => {
  try {
    const validate = await v$.value.$validate()
    if (validate) {
      await doRequest({
        url: "/capture/" + userID.value,
        method: "PATCH",
        data: {
          note: state.note
        }
      })

      userID.value = ''
      showModal.value = !showModal.value
      window.location.reload()
    }
  } catch (error) {
    toast.error(ErrorResponse.message(error))
  }
}

const changeNote = (id: string) => {
  userID.value = id
  showModal.value = !showModal.value
}

onMounted(() => {
  getData()
})
</script>
<style lang="">

</style>