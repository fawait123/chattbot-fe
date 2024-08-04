<template>
    <div
        :class="[props.isShow ? 'flex' : 'hidden', 'absolute top-0 left-0 bottom-0 right-0 bg-[#00000044] justify-center items-center transition-all duration-100 p-4']">
        <section class="rounded-3xl shadow-2xl bg-white w-full lg:w-1/2 relative">
            <span class="pi pi-times-circle text-[24px] text-pink-500 right-4 top-4 absolute cursor-pointer"
                @click="onClose"></span>
            <div class="p-8 text-center sm:p-12">
                <p class="text-sm font-semibold uppercase tracking-widest text-pink-500 my-4">
                    {{ props.title }}
                </p>

                <video :src="props.source" class="w-full h-full" controls></video>
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
interface PopupInterface {
    isShow: boolean,
    source?: string,
    title?: string
}

const emmit = defineEmits(['onClose'])
const props = withDefaults(defineProps<PopupInterface>(), {
    isShow: false,
    source: 'https://videos.pexels.com/video-files/8471681/8471681-uhd_2732_1440_25fps.mp4'
})

const onClose = () => {
    emmit('onClose')
}

</script>
<style lang="">

</style>