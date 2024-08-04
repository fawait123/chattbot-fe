<template>
    <div class="flex justify-center items-center h-screen p-4">
        <div class="w-[90%] bg-white shadow-md rounded-lg h-[90%] flex justify-between flex-col xl:flex-row relative">
            <div class="flex justify-center items-center flex-col absolute top-4 left-4">
                <span class="block font-bold text-[30px] tracking-[2px]">PREGNANCY</span>
                <span class="block tracking-[5px] text-[14px] font-semibold text-[#E45CA2]">WOMAN HEALTH</span>
            </div>
            <div class="flex-1 flex justify-center items-center flex-col p-4">
                <h1 class="font-bold text-[30px]">LOGIN</h1>
                <p class="font-normal text-[16px] tracking-[1.4px] my-4">How to i get started lorem ipsum dolor at?</p>
                <InputComponent placeholder="Username" v-model="state.username"
                    class-name="w-full xl:w-[400px] h-[50px] mb-8" icon="pi-user-plus">
                    <span v-if="v$.username.$error" v-for="error in v$.username.$errors">{{ error.$message }}</span>
                </InputComponent>
                <InputComponent placeholder="Password" v-model="state.password"
                    class-name="w-full xl:w-[400px] h-[50px]" type="password" icon="pi-key" :secure="true">
                    <span v-if="v$.password.$error" v-for="error in v$.password.$errors">{{ error.$message }}</span>
                </InputComponent>
                <div class="w-full xl:w-[400px] flex justify-end my-3 mb-8">
                    <span class="tracking-[1px] text-black font-semibold underline cursor-pointer">Reset Password</span>
                </div>
                <ButtonComponent @on-click="onClick" class-name="w-full xl:w-[400px] h-[50px] bg-[#E45CA2]" />
                <div class="w-full xl:w-[400px] flex justify-end my-3">
                    <span class="tracking-[1px] text-black font-normal">dons't have an
                        account ? <span
                            class="tracking-[1px] text-black font-semibold underline cursor-pointer">Register</span>
                    </span>
                </div>
            </div>
            <div class="flex-1 flex justify-center items-center bg-[#E45CA2] flex-col rounded-lg p-4">
                <div class="flex justify-start w-full xl:w-[500px] mb-8">
                    <span class="text-white text-[30px] font-bold">SEGERA DAFTAR , <br><span
                            class="text-white text-[15px] font-semibold tracking-[2px]">AYO KONSULTASIKAN KESEHATAN
                            GIGI, KEHAMILAN
                            ANDA
                            DISINI</span> </span>

                </div>
                <div class="w-full xl:w-[500px] border-2 border-white rounded-lg">
                    <img src="/assets/svg/pregnant.svg" class="w-full xl:w-[400px]" alt="">
                </div>
            </div>
        </div>
        <Toaster />
    </div>
</template>

<script lang="ts" setup>
import { toast, Toaster } from "@steveyuowo/vue-hot-toast";
import InputComponent from "@/components/InputComponent.vue"
import ButtonComponent from "@/components/ButtonComponent.vue"
import { reactive, ref } from "vue";
import { required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import doRequest from "@/helpers/doRequest";
import Cookie from 'cookiejs'
import { ErrorResponse } from "@/helpers/ErrorResponse";
import type { ILogin } from "@/interface/login";
import { SuccessResponse } from "@/helpers/SuccessResponse";

const state = reactive({
    username: '',
    password: '',
})
const rules = {
    username: { required }, // Matches state.firstName
    password: { required }, // Matches state.lastName
}

const v$ = useVuelidate(rules, state)
const onClick = async () => {
    try {
        const login = await v$.value.$validate()
        if (login) {
            const credentials = await doRequest({
                url: "/login",
                method: "post",
                data: {
                    username: state.username,
                    password: state.password
                }
            })

            const data = SuccessResponse.toJson<ILogin>(credentials.data)
            Cookie.set('token', data.token, { secure: false })
            Cookie.set("user", JSON.stringify(data.user), { secure: false })

            toast.success('Login sukses')
            setTimeout(() => {
                window.location.href = "/"
            }, 1000)
        }
    } catch (error: any) {
        toast.error(ErrorResponse.message(error))
    }
}
</script>

<style scoped></style>