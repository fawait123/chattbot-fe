<template>
    <div>
        <a href="#" class="group relative block w-full md:w-[400px] shadow-md">
            <div class="relative h-[350px] sm:h-[450px]">
                <img :src="props.source" alt=""
                    class="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0" />

                <img :src="props.source" alt=""
                    class="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100" />
            </div>

            <div class="absolute inset-0 flex flex-col items-start justify-end p-6">
                <h3 class="text-xs font-medium text-white py-[4px] px-4 bg-[#00000070]">{{ props?.userID?.name || `Tidak
                    Diketahui` }}</h3>

                <p class="mt-1.5 text-pretty text-xs text-white py-[4px] px-4 bg-[#00000070]">
                    {{ moment(props.date).format("DD MMMM YYYY") }}
                </p>
                <span v-if="props.note"
                    class="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="-ms-1 me-1.5 h-4 w-4">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <p class="whitespace-nowrap text-sm">{{ props.note }}</p>
                </span>
                <span v-else @click="showModal"
                    class="mt-3 inline-block bg-[#f751a6] px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Catatan
                </span>
            </div>
        </a>
    </div>
</template>
<script lang="ts" setup>
import type { IUser } from '@/interface/user';
import moment from 'moment';

interface PhotoInterface {
    source: string
    date: string
    userID: IUser
    note?: string
}

const emmit = defineEmits(['changeNote'])


const props = defineProps<PhotoInterface>()

const showModal = (event: any) => {
    event.preventDefault();
    emmit('changeNote')
}
</script>
<style lang="">

</style>