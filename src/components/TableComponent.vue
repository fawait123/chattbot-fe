<template>
    <div class="flex flex-wrap mb-5">
        <div class="w-full max-w-full mb-6 mx-auto">
            <div
                class="relative flex-[1_auto] flex flex-col break-words min-w-0 bg-clip-border rounded-[.95rem] bg-white">
                <div v-show="!props.loading"
                    class="relative flex flex-col min-w-0 break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 p-4">
                    <div class="w-[200px]">
                        <InputComponent @on-change="onSearch" v-model="model" icon="pi-search"
                            class="border-[#f751a6] mx-9 my-4" placeholder="Cari..." />
                    </div>
                    <!-- card body  -->
                    <div class="flex-auto block py-8 pt-6 px-9">
                        <div class="overflow-x-auto">
                            <table class="w-full my-0 align-middle text-dark border-neutral-200">
                                <thead class="align-bottom">
                                    <tr class="font-semibold text-[0.95rem] text-secondary-dark">
                                        <th class="pb-3 text-start min-w-[80px]" v-show="props.withNumber">NO</th>
                                        <th class="pb-3 text-start min-w-[175px]" v-for="column in props.columns"
                                            :key="column.key">{{ column.value }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="border-b border-dashed last:border-b-0" v-if="props.rows.length > 0"
                                        v-for="(row, index) in props.rows" :key="index">
                                        <td v-show="props.withNumber">{{ (props.perPage - 1) * props.limit + (index + 1)
                                            }} .</td>
                                        <td class="p-3 pl-0" v-for="column in props.columns">
                                            <slot :name="column.key" :row="row"></slot>
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td :colspan="props.columns.length" class="text-center">Tidak ada data untuk
                                            ditampilkan</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="flex justify-between w-full">
                        <div class="flex items-center gap-3">
                            <span class="text-[12px] font-normal">show {{ props.perPage }} of {{ props.total }}</span>
                            <select name="" id="" class="p-[2px] bg-white outline-none text-[12px]"
                                @click="onLimit($event)">
                                <option value="10" :selected="props.perPage == 10">10</option>
                                <option value="20" :selected="props.perPage == 20">20</option>
                                <option value="50" :selected="props.perPage == 50">50</option>
                                <option value="100" :selected="props.perPage == 100">100</option>
                            </select>
                        </div>
                        <div class="inline-flex items-center justify-center gap-3">
                            <span @click="onPrev"
                                :class="[props.perPage == 1 ? 'pointer-events-none' : 'inline-flex cursor-pointer size-8 items-center justify-center rounded border border-gray-100 bg-[#f751a6] hover:bg-[#ecaece] transition-all text-white rtl:rotate-180']">
                                <span class="sr-only">Next Page</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>

                            <p class="text-xs text-gray-900 text-[12px]">
                                {{ props.perPage }}
                                <span class="mx-0.25">/</span>
                                {{ Math.ceil(props.total / props.limit) }}
                            </p>

                            <span @click="onNext"
                                :class="[Math.ceil(props.total / props.limit) == props.perPage ? 'pointer-events-none' : 'inline-flex cursor-pointer size-8 items-center justify-center rounded border border-gray-100 bg-[#f751a6] hover:bg-[#ecaece] transition-all text-white rtl:rotate-180']">
                                <span class="sr-only">Next Page</span>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd" />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="p-4 w-full justify-center items-center flex" v-show="props.loading">
                    <SpinnerComponent />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
const model = defineModel()
import type { ITable } from '@/interface/table';
import InputComponent from './InputComponent.vue';
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const emmit = defineEmits(['onNext', 'onPrev', 'onLimit', 'onSearch', 'onChange'])

const props = withDefaults(defineProps<ITable<any>>(), {
    withNumber: true,
    perPage: 1,
    limit: 10
})


const onPrev = () => {
    emmit('onPrev')
}

const onNext = () => {
    emmit('onNext')
}

const onLimit = (event: any) => {
    emmit('onLimit', parseInt(event.target.value) as number)
}

const onSearch = (event: any) => {
    emmit('onSearch', event)
}
</script>
<style lang="">

</style>