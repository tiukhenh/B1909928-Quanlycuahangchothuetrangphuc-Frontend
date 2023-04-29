<template>
    <nav class="navbar navbar-expand backgound-violet pl-4 rounded">
        <a href="/" class="navbar-brand text-white">Ứng dụng quản lý cửa hàng cho thuê trang phục</a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{name:'home'}" class="nav-link text-white">
                    Trang chủ
                    <i class="fas fa-home"></i>
                </router-link>
            </li>
        </div>
        <div class="ml-auto navbar-nav pr-4">
            <li class="nav-item text-white pr-1">
                {{ name }}
            </li>
            <li class="nav-item">
               <a href="" class="text-white" @click="logout"> | Đăng xuất <i class="fas fa-user text-white"></i></a>
            </li>
        </div>
    </nav>
</template>
<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
    setup() {
        const router = useRouter();
        let user = localStorage.getItem("token");
        const name = ref("");
        if(!user){
            router.push("/");
        } else {
            name.value = localStorage.getItem("name");
        }
        function logout() {
            let text ="Bạn có muốn đăng xuất không";
            if (confirm(text) == true) {
                localStorage.clear();
                router.push("/");
            } else {
                
            }
            
        }
        
        return {
            logout,
            name,
        }
    }
}
</script>