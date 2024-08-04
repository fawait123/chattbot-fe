<template>
    <div :class="[props.className, 'inline-block animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface text-red-400 motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-red-400']"
        role="status">
        <span
            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
    </div>
</template>
<script lang="ts" setup>
interface ISpinnerComponent {
    className?: string
}
const props = withDefaults(defineProps<ISpinnerComponent>(), {
    className: "border-pink-500 h-8 w-8"
})


</script>
<style lang="">

</style>