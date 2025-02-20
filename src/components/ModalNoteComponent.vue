<template>
    <div class="fixed top-0 left-0 right-0 bottom-0 bg-[#0000002a] z-30 flex justify-center items-center overscroll-none"
        v-show="props.isShow">
        <div class="rounded-xl border border-gray-100 bg-white p-4 w-[60%] md:[60%]">
            <div class="flex items-start gap-4">
                <span class="text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </span>

                <div class="flex-1">
                    <strong class="block font-medium text-gray-900"> {{ props.title }}</strong>

                    <slot></slot>

                    <div class="mt-4 flex gap-2">
                        <button @click="onOk"
                            class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                            <span class="text-sm"> Lanjutkan </span>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" class="h-4 w-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </button>

                        <button class="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-50"
                            @click="onClose">
                            <span class="text-sm">Batal</span>
                        </button>
                    </div>
                </div>

                <button class="text-gray-500 transition hover:text-gray-600" @click="onClose">
                    <span class="sr-only">Dismiss popup</span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="h-6 w-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';

interface ModalConfirmProps {
    isShow: boolean
    title: string
}
const props = withDefaults(defineProps<ModalConfirmProps>(), {
    isShow: true
})

const emmit = defineEmits(['onOk', 'onClose'])

const { isShow } = toRefs(props)
const isShowLocal = ref(isShow.value);

watch(isShow, (newValue) => {
    isShowLocal.value = newValue;
});

const onOk = () => {
    emmit('onOk')
}

const onClose = () => {
    emmit('onClose')
};
</script>
<style lang="">

</style>