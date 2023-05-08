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
            <Catalog />
        </div>
        <div class="col-9">
            <CurrentActivity/>
            <div>
                <button class="btn btn-sm btn-violet mt-2" @click="goToAddItem">
                    <i class="fas fa-plus"></i> Thêm mới sản phẩm
                </button>
            </div>
            <div class="row">
                <div class="col-8">
                    <table class="table mt-2 table-color">
                        <thead class="backgound-violet text-white">
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Tên</th>
                                <th scope="col">Màu sắc</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in ketqualoc" :key="item._id">
                            <tr @click="chooseItem(item._id)" class="text-dark">
                                <td>{{ item._id }}</td>
                                <td>{{ item.ten }}</td>
                                <td>{{ item.mauSac }}</td>
                                <td>{{ new Intl.NumberFormat('vi-VN', {
                                        style: 'currency', currency: 'VND'
                                    }).format(item.gia * 1000) }}</td>
                                <td v-if="item.tinhTrang">đang cho thuê</td>
                                <td v-else> còn trống </td>
                                <td style="cursor: pointer;">
                                    <img @click="addToCart(item._id)" src="../assets/img/add-to-basket.png" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-4 d-flex align-items-start flex-column bd-highlight mb-3">
                    <div v-if="Object.keys(data.item).length != 0">
                        <h4 class="text-violet">
                            Chi tiết Sản phẩm
                        </h4>
                        <div>
                            <div class="p-1">
                                <strong>Tên:</strong>
                                {{ data.item.ten }}
                            </div>
                            <div class="p-1">
                                <strong>Loại:</strong>
                                {{ data.item.loai.ten }}
                            </div>
                            <div class="p-1">
                                <strong>Màu:</strong>
                                {{ data.item.mauSac }}
                            </div>
                            <div class="p-1">
                                <strong>Giá:</strong>
                                {{ new Intl.NumberFormat('vi-VN', {
                                        style: 'currency', currency: 'VND'
                                    }).format(data.item.gia * 1000) }}
                            </div>
                            <div class="p-1">
                                <strong>Tình trạng:&nbsp;</strong>
                                <span v-if="data.item.tinhTrang == true"><i class="fas fa-check"></i></span>
                                <span v-else><i class="fas fa-times"></i></span>
                            </div>
                        </div>
                        <router-link :to="{
                                name: 'item.edit',
                                params: { id: data.item._id },
                            }">
                            <span class="mt-2 text-violet">
                                Chỉnh sửa sản phẩm
                                <i class="fas fa-edit "></i>
                            </span>
                        </router-link>
                    </div>
                    <div class="mt-auto p-2">
                        <table class="table mt-2 table-color">
                            <thead class="backgound-violet text-white">
                                <tr>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Màu sắc</th>
                                    <th scope="col">Giá</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody v-for="(item, index) in data.cartData" :key="item._id">
                                <tr class="text-dark">
                                    <td>{{ item.ten }}</td>
                                    <td>{{ item.mauSac }}</td>
                                    <td>{{ new Intl.NumberFormat('vi-VN', {
                                        style: 'currency', currency: 'VND'
                                    }).format(item.gia * 1000) }}</td>
                                    <td @click="deleteItemInCart(item._id)"><i class="fas fa-trash-alt text-violet"></i>
                                    </td>
                                </tr>

                            </tbody>
                            <tr class="text-dark">
                                <td></td>
                                <td>Tổng tiền:</td>
                                <td>{{ new Intl.NumberFormat('vi-VN', {
                                        style: 'currency', currency: 'VND'
                                    }).format(gia * 1000) }}</td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
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
import CurrentActivity from "../components/CurrentActivity.vue";
import axios from "axios";
import { reactive, computed, ref } from "vue";
import { useRouter } from "vue-router";

export default {
    components: {
        AppHeader,
        AppFooter,
        Catalog,
        CurrentActivity,
    },
    setup() {
        const router = useRouter();
        const data = reactive({
            listItem: [],
            item: {},
            cartData: [],
        });
        if (localStorage.getItem("cartData") != null) {
            data.cartData = JSON.parse(localStorage.getItem("cartData"));
        }
        const isSetCart = ref(false);
        const searchText = ref("");
        //ref => data= ref(2) =>data.value = 3
        //data = reactive([]); => data.push(1,2);
        async function getAllItems() {
            const response = await axios.get("http://localhost:3000/api/item");
            data.listItem = response.data;
        }
        getAllItems();
        async function chooseItem(id) {
            const response = await axios.get(`http://localhost:3000/api/item/${id}`);
            data.item = response.data;
        }
        function goToAddItem() {
            router.push("/items");
        }
        let ketqualoc = computed(() => {
            return data.listItem.filter((e) =>e._id.toUpperCase().includes(searchText.value.toUpperCase()) || e.mauSac.toUpperCase().includes(searchText.value.toUpperCase()) || e.ten.toUpperCase().includes(searchText.value.toUpperCase()) || e.gia.toUpperCase().includes(searchText.value.toUpperCase()));
        })
        async function addToCart(id) {
            try {

                const response = await axios.get(`http://localhost:3000/api/item/${id}`);
                if (response.data.tinhTrang == true) {
                    alert("Sản phẩm đang được cho thuê");
                }
                else {
                    for (var i = 0; i < data.cartData.length; i++) {
                        if (id == data.cartData[i]._id) {

                            isSetCart.value = true;
                            break;
                        }
                        isSetCart.value = false;

                    }
                    if (isSetCart.value == false) {
                        data.cartData.push(response.data);

                        localStorage.setItem("cartData", JSON.stringify(data.cartData));

                    } else {
                        alert("Sản phẩm đã được thêm vào trước đó!");
                    }

                }
            } catch (e) {

            }
        }
        let totalPrice = ref(0);
        if (JSON.parse(localStorage.getItem("cartData")) != null) {
            data.cartData = JSON.parse(localStorage.getItem("cartData"));
        }
        const gia = computed(() => {
            return data.cartData.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.gia), totalPrice.value);
        });
        function deleteItemInCart(id) {
            let text = "Bạn có muốn xóa sản phẩm đã chọn?";
            if (confirm(text) == true) {
                for (var i = 0; i < data.cartData.length; i++) {
                    if (data.cartData[i]._id == id) {
                        data.cartData.splice(i, 1);
                    }
                }
                if (data.cartData.length == 0) {
                    localStorage.removeItem("cartData");
                    data.cartData = [];
                    return;
                }
                localStorage.setItem("cartData", JSON.stringify(data.cartData));

            }
        }
        return {
            addToCart,
            ketqualoc,
            searchText,
            goToAddItem,
            data,
            chooseItem,
            deleteItemInCart,
            gia,
        }
    }
};
</script>
