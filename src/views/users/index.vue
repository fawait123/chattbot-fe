<template>
  <div class="flex flex-col gap-8">
    <HeaderComponent :with-primary-button="true" title="Tambah User" route-name="users-create"
      :with-back-button="false" />
    <TableComponent :columns="tableColumn" :rows="tableRow" :total="pagination.total" :perPage="pagination.page"
      :loading="pagination.loading" v-model="pagination.search" @onPrev="onPrev" @onNext="onNext"
      :limit="pagination.limit" @onLimit="onLimit">
      <template #name="{ row }">{{ row.name }}</template>
      <template #username="{ row }">{{ row.username }}</template>
      <template #email="{ row }">{{ row.email }}</template>
      <template #role="{ row }"><span
          class="whitespace-nowrap rounded-full bg-blue-100 px-2.5 py-0.5 text-sm text-blue-700">{{ row.role }}
        </span></template>
      <template #status="{ row }">
        <SwitchComponent :id="row._id"
          :class-name="row.role == 'superadmin' ? 'has-[:checked]:bg-slate-500 cursor-default' : ''"
          :checked="row.status" @onClick="changeStatus(row._id, row.status)" :disabled="row.role == 'superadmin'" />
      </template>
      <template #action="{ row }">
        <div class="flex items-center gap-8 cursor-pointer" v-if="row.role != 'superadmin'">
          <span class="pi pi-pencil text-blue-500" @click="onChange(row._id)"></span>
          <span class="pi pi-trash text-red-500" @click="onConfimDelete(row._id)"></span>
        </div>
        <span v-else class="whitespace-nowrap rounded-full bg-red-100 px-2.5 py-0.5 text-sm text-red-700">-</span>
      </template>
    </TableComponent>
    <ModalConfirmComponent :is-show="showModalConfirm" @on-ok="onOk" title="Hapus Data"
      body="Apakah kamu yakin ingin menghapus data ?" />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue';
import TableComponent from '@/components/TableComponent.vue'
import { toast } from '@steveyuowo/vue-hot-toast';
import { ErrorResponse } from '@/helpers/ErrorResponse';
import doRequest from '@/helpers/doRequest';
import { SuccessResponse } from '@/helpers/SuccessResponse';
import type { IUser } from '@/interface/user';
import type { IColumn } from '@/interface/table';
import SwitchComponent from '@/components/SwitchComponent.vue'
import type { IPagination } from '@/interface/paginate';
import { useRouter } from 'vue-router';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ModalConfirmComponent from '@/components/ModalConfirmComponent.vue'


const router = useRouter()
const tableRow = ref<IUser[]>([])
const tableColumn = ref<IColumn[]>([
  {
    key: "name",
    value: "Nama"
  },
  {
    key: "username",
    value: "Username"
  },
  {
    key: "email",
    value: "Email"
  },
  {
    key: "role",
    value: "Role"
  },
  {
    key: "status",
    value: "Status"
  },
  {
    key: "action",
    value: "Aksi"
  }
])
const pagination = ref<IPagination>({
  page: 1,
  limit: 10,
  total: 0,
  search: null,
  loading: false
})
const showModalConfirm = ref<boolean>(false)
const idDelete = ref<string | null>(null)

const onConfimDelete = (id: string) => {
  idDelete.value = id
  showModalConfirm.value = !showModalConfirm.value
}
const onOk = () => {
  deleteData(idDelete.value as string)
  showModalConfirm.value = !showModalConfirm.value
}

const onChange = (id: string) => [
  router.push({ name: 'users-create', query: { id, edit: 'true' } })
]

const getData = async () => {
  pagination.value.loading = true
  try {
    const response = await doRequest({
      url: "/user",
      method: "get",
      params: {
        page: pagination.value.page,
        limit: pagination.value.limit,
        search: pagination.value.search
      }
    })
    const data = SuccessResponse.toPaginate<IUser[]>(response.data)
    tableRow.value = data.data
    pagination.value.page = data.page
    pagination.value.limit = data.limit
    pagination.value.total = data.total
    pagination.value.loading = false
  } catch (error) {
    pagination.value.loading = false
    toast.error(ErrorResponse.message(error))
  }
}

const deleteData = async (id: string) => {
  try {
    await doRequest({
      url: "/user/" + id,
      method: "delete",
    })

    toast.success('Data berhasil dihapus')
    idDelete.value = null
    getData()
  } catch (error) {
    toast.error(ErrorResponse.message(error))
  }
}

watch(() => {
  getData()
}, () => pagination)


const changeStatus = async (id: string, status: boolean) => {
  try {
    await doRequest({
      url: "/user/change-status/" + id,
      method: 'post',
      data: {
        status: !status
      }
    })

    toast.success('Data status berhasil di update')
    getData()
  } catch (error) {
    toast.error(ErrorResponse.message(error))
  }
}

const onPrev = () => {
  pagination.value.page = pagination.value.page - 1
}

const onNext = () => {
  pagination.value.page = pagination.value.page + 1
}

const onLimit = (limit: number) => {
  pagination.value.limit = limit
}
</script>
<style lang="">

</style>