<template>
    <form @submit.prevent="submit" method="post" style="margin: 100px">
        <div
            class="background-form border border-violet rounded col-6 m-auto m-4 justify-content-center p-4 align-items-center">
            <div class="form-group justify-content-around">
                <label for="" class="col-4">Tên đăng nhập</label>
                <input class="col-8" type="text" v-model="username" placeholder="Tên đăng nhập" required />
            </div>
            <div class="form-group justify-content-around">
                <label for="" class="col-4">Mật khẩu</label>
                <input class="col-8" type="password" v-model="password" placeholder="Mật khẩu" required />
            </div>
            <div class="text-danger">{{ message }}</div>
            
            <button type="submit" class="btn btn-outline-violet backgound-violet text-white btn-block">Đăng nhập</button>
        </div>
    </form>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
export default {
    setup() {
        const router = useRouter();
        const username = ref("");
        const password = ref("");
        const message = ref("");
        async function submit() {
            const response = await axios.post("http://localhost:3000/api/user/login", {
                "userName": username.value,
                "password": password.value
            });
            console.log(response.data.status);
            if(response.data.status==404){
                message.value = "Tên đăng nhập không tồn tại";
            }
            if(response.data.status==400){
                message.value = "Mật khẩu không hợp lệ";
            }
            if(response.data.status==200){
                //Set token luu tru
                localStorage.setItem("token",response.token);
                localStorage.setItem("name",response.data.data.name);
                router.push("/home");
            }
        }
        const userToken = localStorage.getItem("token");
        if (userToken) {
            router.push("/home");
        }

        return {
            submit,
            message,
            username,
            password
        }
    }
}
</script>

<style> body {
     background-image: url("../assets/img/background-1.jpg");
 }

 .background-form {
     background-color: white;
 }
</style>