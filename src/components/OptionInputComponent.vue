<template>
    <div>
        <label :for="[props.label, 'Option']"
            class="block w-full cursor-pointer rounded-lg border border-gray-200 p-3 text-gray-600 hover:border-black has-[:checked]:border-pink-400 has-[:checked]:bg-pink-500 has-[:checked]:text-white"
            tabindex="0">
            <input :value="props.name" class="sr-only" v-model="model" :id="[props.label, 'Option']" type="radio"
                tabindex="-1" name="option" />

            <span class="text-sm"> {{ props.label }}</span>
        </label>
        <span class="text-xs text-red-500">
            <slot></slot>
        </span>
    </div>
</template>
<script lang="ts" setup>
interface OptionInputInterface {
    label: string,
    name: string,
}

const model = defineModel()
const props = defineProps<OptionInputInterface>()
</script>
<style lang="">

</style>