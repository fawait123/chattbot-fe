<template>
    <div :class="props.className">
        <div class="relative w-full min-w-[200px]">
            <textarea v-model="model"
                class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                :placeholder="props.placeholder"></textarea>
            <span class="text-xs text-red-500">
                <slot></slot>
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">

interface InputProps {
    className?: string,
    placeholder?: string,
}

const model = defineModel()
const props = withDefaults(defineProps<InputProps>(), {
    className: "w-full",
    placeholder: "Input Data",
})
</script>
<style lang="">

</style>