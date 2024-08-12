<template>
  <div class="flex flex-col gap-8">
    <HeaderComponent />
    <section class="bg-white">
      <div class="mx-auto">
        <div class="grid grid-cols-1 gap-x-16 gap-y-8">
          <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:grid-cols-2">
              <div class="flex flex-col gap-4">
                <InputComponent placeholder="Masukan nama anda" v-model="state.name" className="h-[50px]"
                  icon="pi-user">
                  <span v-if="v$.name.$error" v-for="error in v$.name.$errors">{{ error.$message }}</span>
                </InputComponent>

                <InputComponent placeholder="Masukan username anda" v-model="state.username" icon="pi-id-card"
                  className="h-[50px]">
                  <span v-if="v$.username.$error" v-for="error in v$.username.$errors">{{ error.$message
                    }}</span>
                </InputComponent>
                <InputComponent placeholder="Masukan email anda" v-model="state.email" className="h-[50px]"
                  icon="pi-envelope">
                  <span v-if="v$.email.$error" v-for="error in v$.email.$errors">{{ error.$message
                    }}</span>
                </InputComponent>
                <div class="mt-4">
                  <ButtonPrimaryComponent title="Simpan" @onClick="onClick" :loading="loading" />
                </div>
              </div>
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
import type { IUser } from '@/interface/user';
import { toast } from '@steveyuowo/vue-hot-toast';
import useVuelidate from '@vuelidate/core';
import { email, required } from '@vuelidate/validators';
import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';



const router = useRouter()
const route = useRoute()

const query = ref<any>(route.query)
const loading = ref<boolean>(false)
const userId = ref<string>('')

onMounted(async () => {
  getProfile()
})

const getProfile = async () => {
  try {
    const response = await doRequest({
      url: "/profile",
      method: "get",
    })
    const user = SuccessResponse.toJson<IUser>(response.data)
    state.username = user.username
    state.name = user.name
    state.email = user.email
    state.role = user.role
    userId.value = user._id
  } catch (error) {
    toast.error(ErrorResponse.message(error))
  }
}

const state = reactive({
  username: '',
  name: '',
  email: '',
  role: ''
})


let rules = {
  username: { required },
  name: { required },
  email: { required, email },

}

const v$ = useVuelidate(rules, state)


const onClick = async () => {
  try {
    const validate = await v$.value.$validate()

    if (validate) {
      await editData()

      toast.success(`Data profile berhasil diubah`)

      router.push({ name: 'users' })
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
        url: "/user/" + userId.value,
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
</script>
<style lang="">

</style>