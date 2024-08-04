<template>
    <div class="flex flex-col gap-8">
        <HeaderComponent />
        <section class="bg-white">
            <div class="mx-auto">
                <div class="grid grid-cols-1 gap-x-16 gap-y-8">
                    <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 space-y-8">
                        <div class="grid grid-cols-1 gap-8 sm:grid-cols-1">
                            <InputComponent placeholder="Masukan judul video" v-model="state.title" className="h-[50px]"
                                icon="pi-bookmark">
                                <span v-if="v$.title.$error" v-for="error in v$.title.$errors">{{ error.$message
                                    }}</span>
                            </InputComponent>
                            <TextAreaComponent placeholder="Masukan deskripsi video" v-model="state.description">
                                <span v-if="v$.description.$error" v-for="error in v$.description.$errors">{{
                                    error.$message
                                }}</span>
                            </TextAreaComponent>
                            <InputComponent placeholder="Pilih video" v-model="state.file" className="h-[50px]"
                                @on-change="onUpload" type="file" icon="pi-cloud-upload">
                                <span v-if="v$.file.$error" v-for="error in v$.file.$errors">{{
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
import TextAreaComponent from '@/components/TextAreaComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue';
import InputComponent from '@/components/InputComponent.vue';
import doRequest from '@/helpers/doRequest';
import { ErrorResponse } from '@/helpers/ErrorResponse';
import { SuccessResponse } from '@/helpers/SuccessResponse';
import { toast } from '@steveyuowo/vue-hot-toast';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { IVideo } from '@/interface/video';


const imageFile = ref<File | null>(null)
const loading = ref<boolean>(false)
const router = useRouter()
const route = useRoute()

const query = ref<any>(route.query)

onMounted(async () => {
    if (query.value.edit) {
        try {
            const response = await doRequest({
                url: "/video/" + query.value.id,
                method: "get",
            })
            const video = SuccessResponse.toJson<IVideo>(response.data)
            state.title = video.title
            state.description = video.description
        } catch (error) {
            toast.error(ErrorResponse.message(error))
        }
    }
})

const state = reactive({
    title: '',
    description: '',
    file: null,
})
let rules = {
    title: { required },
    description: { required },
    file: { required },
}

if (query.value.edit) {
    rules.file = {}
}
const v$ = useVuelidate(rules, state)

const onUpload = (event: any) => {
    imageFile.value = event.target.files[0] || null
}
const onClick = async () => {
    try {
        const validate = await v$.value.$validate()

        if (validate) {
            query.value.edit ? await editData() : await postData()

            toast.success(`Data video berhasil ${query.value.edit ? 'diubah' : 'ditambah'}`)

            router.push({ name: 'video' })
        }
    } catch (error) {
        toast.error(ErrorResponse.message(error))
    }
}


const editData = (): Promise<boolean | any> => {
    loading.value = true
    return new Promise(async (resolve, reject) => {
        try {
            const data = new FormData()
            console.log(imageFile.value)
            data.append('title', state.title)
            data.append('description', state.description)
            if (imageFile.value) {
                data.append('source', imageFile.value as any)
            }
            await doRequest({
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                url: "/video/" + query.value.id,
                method: "patch",
                data: data
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
            const data = new FormData()

            data.append('title', state.title)
            data.append('description', state.description)
            data.append('source', imageFile.value as any)
            await doRequest({
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                url: "/video",
                method: "post",
                data: data
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