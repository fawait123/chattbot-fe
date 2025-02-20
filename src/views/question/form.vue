<template>
    <div class="flex flex-col gap-8">
        <HeaderComponent />
        <section class="bg-white">
            <div class="mx-auto">
                <div class="grid grid-cols-1 gap-x-16 gap-y-8">
                    <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 space-y-8">
                        <div class="grid grid-cols-1">
                            <InputComponent placeholder="Masukan pertanyaan" v-model="state.description"
                                className="h-[50px]" icon="pi-question-circle">
                                <span v-if="v$.description.$error" v-for="error in v$.description.$errors">{{
                                    error.$message }}</span>
                            </InputComponent>
                        </div>
                        <div class="mt-4">
                            <ButtonPrimaryComponent title="Simpan" @onClick="onClick" :loading="loading" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script lang="ts" setup>
import ButtonPrimaryComponent from '@/components/ButtonPrimaryComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import doRequest from '@/helpers/doRequest';
import { ErrorResponse } from '@/helpers/ErrorResponse';
import { SuccessResponse } from '@/helpers/SuccessResponse';
import type { IQuestion } from '@/interface/question';
import { toast } from '@steveyuowo/vue-hot-toast';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';



const router = useRouter()
const route = useRoute()

const query = ref<any>(route.query)
const loading = ref<boolean>(false)

onMounted(async () => {
    if (query.value.edit) {
        try {
            const response = await doRequest({
                url: "/question/" + query.value.id,
                method: "get",
            })
            const user = SuccessResponse.toJson<IQuestion>(response.data)
            state.description = user.description
        } catch (error) {
            toast.error(ErrorResponse.message(error))
        }
    }
})

const state = reactive({
    description: '',
})
let rules = {
    description: { required },
}
const v$ = useVuelidate(rules, state)


const onClick = async () => {
    try {
        const validate = await v$.value.$validate()

        if (validate) {
            query.value.edit ? await editData() : await postData()

            toast.success(`Data pertanyaan berhasil ${query.value.edit ? 'diubah' : 'ditambah'}`)

            router.push({ name: 'question' })
        }
    } catch (error) {
        toast.error(ErrorResponse.message(error))
    }
}


const editData = (): Promise<boolean | any> => {
    loading.value = true
    return new Promise(async (resolve, reject) => {
        try {
            await doRequest({
                url: "/question/" + query.value.id,
                method: "patch",
                data: state
            })
            loading.value = false
            resolve(true)
        } catch (error) {
            loading.value = false
            reject(error)
        }
    })
}


const postData = (): Promise<boolean | any> => {
    loading.value = true
    return new Promise(async (resolve, reject) => {
        try {
            await doRequest({
                url: "/question",
                method: "post",
                data: state
            })
            loading.value = false
            resolve(true)
        } catch (error) {
            loading.value = false
            reject(error)
        }
    })
}
</script>
<style lang="">

</style>