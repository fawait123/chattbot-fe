<template>
    <div class="flex">
        <div class="flex fixed z-30 h-screen w-16 flex-col justify-between border-e bg-white transition"
            v-show="isMiniSidebar">
            <div>
                <div class="inline-flex size-16 items-center justify-center">
                    <span class="grid size-10 place-content-center rounded-lg bg-[#ecb5d1] text-xs text-white">
                        L
                    </span>
                </div>

                <div class="border-t border-gray-100">
                    <div class="px-2">
                        <div class="py-4 hidden md:block">
                            <span @click="changeSidebar"
                                class="t cursor-pointer group relative flex justify-center rounded bg-[#f1d7e5e3] px-2 py-1.5 text-[#f751a6]">
                                <i class="pi pi-align-left"></i>
                            </span>
                        </div>

                        <ul class="space-y-4 border-t border-gray-100 pt-4">
                            <li v-for="menu in sidbarMenu.filter((el) => el.access?.includes(role))">
                                <span @click="gotoRoute(menu.routeName as string)"
                                    :class="[menu.routeName?.includes(path as string) ? 'bg-[#E45CA2] text-white' : 'text-gray-500', ' cursor-pointer group relative flex justify-center rounded px-2 py-1.5 hover:bg-[#f58bc3e3] hover:text-white transition-all duration-100']">
                                    <span :class="menu.iconName"></span>

                                    <span
                                        class="invisible absolute start-full top-1/2 ms-4 z-20 -translate-y-1/2 rounded bg-[#f751a6] px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                                        {{ menu.title }}
                                    </span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
                <button type="button" @click="onLogout"
                    class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">
                    <span class="pi pi-sign-out"></span>

                    <span
                        class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-[#f751a6] px-2 py-1.5 text-xs font-medium text-white group-hover:visible">
                        Keluar
                    </span>
                </button>
            </div>
        </div>

        <div class="flex z-30 fixed h-screen w-[220px] flex-col justify-between border-e bg-white transition-all duration-75"
            v-show="!isMiniSidebar">
            <div class="px-4 py-6">
                <div class="w-[120px] h-[120px] overflow-hidden flex justify-center items-center">
                    <img src="/public/assets/images/logo-2.png" class="object-cover" alt="">
                </div>
                <div class="py-2 flex justify-end">
                    <span @click="changeSidebar"
                        class="t cursor-pointer group relative flex justify-center rounded bg-[#f1d7e5e3] px-2 py-1.5 text-[#f751a6]">
                        <i class="pi pi-align-right"></i>
                    </span>
                </div>
                <ul class="mt-14 space-y-4">
                    <li v-for="menu in sidbarMenu.filter((el) => el.access?.includes(role))">
                        <span @click="gotoRoute(menu.routeName as string)"
                            :class="[menu.routeName == path ? 'bg-[#E45CA2] text-white hover:text-white' : 'hover:text-[#E45CA2]', ' cursor-pointer transition-all duration-100 rounded-lg  px-4 py-2 text-sm font-medium  flex gap-3 items-center justify-start']">
                            <span :class="menu.iconName"></span>
                            {{ menu.title }}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
                <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                    <img alt="" src="/public/assets/images/logo.jpeg" class="size-10 rounded-full object-cover" />

                    <div>
                        <p class="text-xs">
                            <strong class="block font-medium">{{ userInfo.name }}</strong>

                            <span> {{ userInfo.email }} </span>
                        </p>
                    </div>
                </a>
            </div>
        </div>
        <div :class="[isMiniSidebar ? 'ml-16' : 'ml-[220px]', 'w-full']">
            <header class="bg-white w-full">
                <div class="mx-auto">
                    <div class="flex h-16 items-center justify-end">
                        <div class="relative flex justify-center items-center mx-4">
                            <div>
                                <div class="inline-flex w-[60px] h-[60px] rounded-full overflow-hidden bg-pink-400 cursor-pointer"
                                    @click="changeShowProfileDropdown">
                                    <img src="/public/assets/images/logo.jpeg" alt="" class="object-cover w-[60px]">
                                </div>

                                <div v-show="showProfileDropdown"
                                    class="absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                    role="menu">
                                    <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
                                        <img alt="" src="/public/assets/images/logo.jpeg"
                                            class="size-10 rounded-full object-cover" />

                                        <div>
                                            <p class="text-xs">
                                                <strong class="block font-medium">{{ userInfo.name }}</strong>

                                                <span> {{ userInfo.email }} </span>
                                            </p>
                                        </div>
                                    </a>
                                    <div class="p-2">
                                        <strong class="block p-2 text-xs font-medium uppercase text-gray-400"> General
                                        </strong>

                                        <a href="#" v-for="menu in profileMenu"
                                            @click="gotoRoute(menu.routeName as string)"
                                            class="rounded-lg px-4 py-2 text-sm text-gray-500 flex items-center justify-start gap-3 hover:bg-[#f8ecf3]  hover:text-[#f751a6]"
                                            role="menuitem">
                                            <span :class="menu.iconName"></span>
                                            {{ menu.title }}
                                        </a>
                                    </div>

                                    <div class="p-2">
                                        <strong class="block p-2 text-xs font-medium uppercase text-gray-400"> Danger
                                            Zone </strong>

                                        <button type="button" @click="onLogout"
                                            class="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                            role="menuitem">
                                            <span class="pi pi-sign-out"></span>

                                            Keluar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div class="px-8 py-8">
                <router-view></router-view>
            </div>
        </div>
        <Toaster />
    </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Toaster } from '@steveyuowo/vue-hot-toast';
import Cookie from 'cookiejs';
import type { IUser } from '@/interface/user';

const isMiniSidebar = ref(true);
const showProfileDropdown = ref(false)
const route = useRoute()
const router = useRouter()


interface IUserInfo {
    email: string
    name: string
    role: string
    sub: string
    username: string
}
const path = ref(route.name);
const userInfo = ref<IUserInfo>(JSON.parse(Cookie.get('user') as string))

const user = JSON.parse(Cookie.get("user") as string) as IUser
const role = ref<string>(user.role)


watch(() => {
    path.value = route.name
}, () => path)


interface sidebarMenuInterface {
    title?: string
    iconName?: string,
    routeName?: string,
    access?: string[]
}

const sidbarMenu = ref<sidebarMenuInterface[]>([
    {
        title: "Dashboard",
        iconName: "pi pi-home",
        routeName: "home",
        access: ["superadmin", "puskesmas"]
    },
    {
        title: "Pengguna",
        iconName: "pi pi-users",
        routeName: "users",
        access: ["superadmin"]
    },
    {
        title: "Pertanyaan",
        iconName: "pi pi-list-check",
        routeName: "question",
        access: ["superadmin"]
    },
    {
        title: "Video",
        iconName: "pi pi-video",
        routeName: "video",
        access: ["superadmin"]
    },
    {
        title: "Foto",
        iconName: "pi pi-camera",
        routeName: "camera",
        access: ["superadmin", "puskesmas"]
    }
])

const profileMenu = ref<sidebarMenuInterface[]>([
    {
        title: "Lihat Profile",
        iconName: "pi pi-user",
        routeName: "profile"
    },
    {
        title: "Reset Password",
        iconName: "pi pi-key",
        routeName: "reset-password"
    }
])

const changeSidebar = () => {
    isMiniSidebar.value = !isMiniSidebar.value
}

const changeShowProfileDropdown = () => {
    showProfileDropdown.value = !showProfileDropdown.value
}

const gotoRoute = (routeName: string) => {
    console.log(routeName)
    router.push({ name: routeName })
}

const onLogout = () => {
    Cookie.remove('user')
    Cookie.remove('token')
    window.location.href = "/login"
}
</script>
<style lang="">

  </style>