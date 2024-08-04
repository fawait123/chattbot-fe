<template>
    <div :class="props.className">
        <div class="relative h-full w-full min-w-[200px] ">
            <div class="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 left-3 -translate-y-2/4">
                <i :class="['pi ', props.icon, 'text-slate-500']" aria-hidden="true"></i>
            </div>
            <input :type="type" @change="onChange" :placeholder="props.placeholder" v-model="model"
                class="pl-[40px] peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50" />
            <span class="text-xs text-red-500">
                <slot></slot>
            </span>
            <div class="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4 cursor-pointer"
                v-show="props.secure" @click="changeType">
                <i :class="['pi ', isSecure ? 'pi-eye' : 'pi-eye-slash']" aria-hidden="true"></i>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface InputProps {
    className?: string,
    placeholder?: string,
    type?: string,
    icon?: string,
    secure?: boolean
}

const emmit = defineEmits(['onChange'])

const model = defineModel()
const props = withDefaults(defineProps<InputProps>(), {
    className: "w-full",
    placeholder: "Input Data",
    type: "text",
    icon: "pi-user",
    secure: false
})

const isSecure = ref<boolean>(props.secure)
const type = ref<string>(props.type)

const changeType = (): void => {
    isSecure.value = !isSecure.value
    type.value = type.value == "password" ? "text" : "password"
}

const onChange = (event: any) => {
    emmit('onChange', event)
}



</script>

<style scoped></style>