<template>
  <section :class="props.className">
    <img :src="`${baseURL}/${props.thumbnail}`"
      class="w-full h-full object-cover transition-all duration-100 group-hover:scale-150" alt="">
    <div class="bg-[#00000038] absolute top-0 left-0 right-0 bottom-0 flex justify-end items-start flex-col px-4 py-8">
      <div class="hidden gap-4 my-4 group-hover:flex transition-all duration-100">
        <span class="pi pi-pencil text-blue-900" @click="onEdit"></span>
        <span class="pi pi-play-circle text-pink-500" @click="onClick" :key="props.thumbnail"></span>
        <span class="pi pi-trash text-red-900" @click="onDelete"></span>
      </div>
      <h1 class="text-slate-100 font-bold text-[18px] group-hover:text-[20px] transition-all duration-100">{{
        props.title }}</h1>
      <span class="text-slate-200 text-[12px] tracking-[1px] group-hover:text-[14px]  transition-all duration-100">{{
        props.description
      }}</span>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { baseURL } from '@/helpers/doRequest';

const emmit = defineEmits(['onShowVideo', 'onEdit', 'onDelete'])
interface VideoInterface {
  thumbnail?: string,
  title?: string,
  description?: string
  className?: string
}

const onClick = () => {
  emmit('onShowVideo')
}
const onDelete = () => {
  emmit('onDelete')
}
const onEdit = () => {
  emmit('onEdit')
}
const props = defineProps<VideoInterface>()
</script>
<style lang="">

</style>