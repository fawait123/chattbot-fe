<template>
    <section class="flex flex-col gap-8">
        <section class="bg-white">
            <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <div class="text-center sm:text-left">
                        <h1 class="text-2xl font-bold text-gray-900 sm:text-3xl">Halo Selamat Datang, {{ user?.name }}
                        </h1>

                        <p class="mt-1.5 text-sm text-gray-500">Kamu login sebagai, {{ user.role }} 🎉</p>
                    </div>

                    <div class="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
                        <button @click="onBack" v-show="props.withBackButton"
                            class="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-5 py-3 text-gray-500 transition hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring"
                            type="button">
                            <span class="text-sm font-medium"> Kembali</span>

                            <span class="pi pi-arrow-up-left"></span>
                        </button>

                        <ButtonPrimaryComponent @onClick="onClick" className="px-5 py-3" :title="props.title"
                            v-show="props.withPrimaryButton" />
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
<script lang="ts" setup>
import type { IUser } from '@/interface/user';
import Cookie from 'cookiejs';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ButtonPrimaryComponent from './ButtonPrimaryComponent.vue';

interface IHeaderComponent {
    title?: string,
    withPrimaryButton?: boolean,
    routeName?: string,
    withBackButton?: boolean
}
const props = withDefaults(defineProps<IHeaderComponent>(), {
    withPrimaryButton: false,
    withBackButton: true
})

const user = ref<IUser>(JSON.parse(Cookie.get('user') as any))
const router = useRouter()

const onBack = () => {
    router.back()
}

const onClick = () => {
    router.push({
        name: props.routeName as string
    })
}
</script>
<style lang="">

</style>