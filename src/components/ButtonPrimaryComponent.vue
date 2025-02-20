<template>
    <button @click="onClick"
        :class="[props.className, 'block rounded-lg bg-[#f751a6] hover:bg-[#fa98cb] px-5 py-3 text-sm font-medium text-white transition  focus:outline-none focus:ring']"
        type="button" :disabled="props.loading">
        <div class="flex justify-center items-center gap-4">
            <SpinnerComponent v-show="props.loading" class-name="border-slate-100 h-5 w-5" />
            {{ props.title }}
        </div>
    </button>
</template>

<script setup lang="ts">
import SpinnerComponent from './SpinnerComponent.vue';

interface ButtonInterface {
    title?: string,
    className?: string,
    loading?: boolean
}

const emmitt = defineEmits(['onClick'])
const props = withDefaults(defineProps<ButtonInterface>(), {
    title: "Button",
    className: "",
    loading: false
})

const onClick = () => {
    emmitt('onClick')
}
</script>

<style scoped></style>