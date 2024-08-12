<template>
  <div class="flex flex-col gap-8">
    <HeaderComponent />
    <section class="bg-white">
      <div class="mx-auto">
        <div class="grid grid-cols-1 gap-x-16 gap-y-8">
          <div class="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:grid-cols-2">
              <div class="flex flex-col gap-4">
                <InputComponent placeholder="Masukan password lama" :secure="true" v-model="state.passwordOld"
                  className="h-[50px]" icon="pi-key">
                  <span v-if="v$.passwordOld.$error" v-for="error in v$.passwordOld.$errors">{{ error.$message }}</span>
                </InputComponent>

                <InputComponent placeholder="Masukan Password baru" :secure="true" v-model="state.passwordNew"
                  icon="pi-key" className="h-[50px]">
                  <span v-if="v$.passwordNew.$error" v-for="error in v$.passwordNew.$errors">{{ error.$message
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
import { toast } from '@steveyuowo/vue-hot-toast';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';



const router = useRouter()

const loading = ref<boolean>(false)
const userId = ref<string>('')


const state = reactive({
  passwordNew: '',
  passwordOld: '',
  email: '',
  role: ''
})


let rules = {
  passwordNew: { required },
  passwordOld: { required },
}

const v$ = useVuelidate(rules, state)


const onClick = async () => {
  try {
    const validate = await v$.value.$validate()

    if (validate) {
      await editData()

      toast.success(`Password berhasil diubah`)

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
        url: "/profile/reset-password",
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