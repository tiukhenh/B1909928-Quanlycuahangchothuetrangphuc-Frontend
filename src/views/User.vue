<template>
    <AppHeader />
    <div class="row  d-flex justify-content-center mt-2">
        <div class="col-md-10">
            <div class="input-group">
                <input type="text" class="form-control text-violet" placeholder="Nhập thông tin cần tìm"
                    v-model="searchText" />
                <div class="input-group-append">
                    <button class="btn btn-outline-violet text-white" type="button">
                        <i class="fas fa-search"></i> Tìm kiếm
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="mt-2 row d-flex justify-content-around">
        <div class="col-2 backgound-violet rounded">
            <Catalog/>
        </div>
        <div class="col-9">
            <div class="row">
                <div class="col-8 p-0">
                    <table class="table mt-2 table-color">
                        <thead class="backgound-violet text-white">
                            <tr>
                                <th scope="col">Tên đăng nhập</th>
                                <th scope="col">Họ tên</th>
                                <th scope="col">SDT</th>
                                <th scope="col">Địa chỉ</th>
                            </tr>
                        </thead>
                        <tbody v-for="(user, index) in ketqualoc" :key="user._id">
                            <tr class="text-dark">
                                <td>{{ user.userName }}</td>
                                <td>{{ user.name }}</td>
                                <td>{{ user.phone }}</td>
                                <td>{{ user.address }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <AppFooter />
</template>
<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import Catalog from "../components/Catalog.vue";
import axios from "axios";
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
    components: {
        AppHeader,
        AppFooter,
        Catalog,
    },
    setup() {
        const router = useRouter();
        const data = reactive({
            listUser: [],
            user: {}
        });
        const searchText = ref("");
        //ref => data= ref(2) =>data.value = 3
        //data = reactive([]); => data.push(1,2);
        async function getAllUsers() {
            try {
                const response = await axios.get("http://localhost:3000/api/user");
                data.listUser = response.data;
            } catch (e) {

            }

        }
        getAllUsers();
        let ketqualoc = computed(() => {
            return data.listUser.filter((e) => e.userName.toUpperCase().includes(searchText.value.toUpperCase()) || e.phone.toUpperCase().includes(searchText.value.toUpperCase()));
        })
        return {
            ketqualoc,
            searchText,
            data,
        }
    }
};
</script>
