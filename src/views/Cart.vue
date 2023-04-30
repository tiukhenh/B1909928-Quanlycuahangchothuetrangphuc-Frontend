<template>
    <AppHeader />
    <div class="mt-2 row d-flex justify-content-around">
        <div class="col-2 backgound-violet rounded">
            <Catalog/>
        </div>
        <div class="col-9">
            <div class="row">
                <div class="col-8">
                    <table class="table mt-2">
                        <thead class="backgound-violet text-white">
                            <tr>
                                <th scope="col">Tên</th>
                                <th scope="col">Màu sắc</th>
                                <th scope="col">Giá</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in data.cartData" :key="item._id">
                            <tr>
                                <td>{{ item.ten }}</td>
                                <td>{{ item.mauSac }}</td>
                                <td>{{ item.gia }}</td>
                                <td @click="deleteItemInCart(item._id)"><i class="fas fa-trash-alt text-violet"></i></td>
                            </tr>

                        </tbody>
                        <tr>
                            <td></td>
                            <td>Tổng tiền:</td>
                            <td>{{ gia }}</td>
                            <td></td>
                        </tr>
                    </table>
                    <div class="row d-flex justify-content-between">
                        <div class="col-4 ">
                            <button class="rounded" @click="ContinueAddCart">Thêm sản phẩm</button>
                        </div>
                        <div class="col-4 ">
                            <button class="rounded" @click="gotoAddBill">Tạo Hóa Đơn</button>
                        </div>
                        <div class="col-4 ">
                            <button class="rounded" @click="deleteAllCart">Xóa tất cả</button>
                        </div>
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
            cartData: [],
        });
        let totalPrice = ref(0);
        if (JSON.parse(localStorage.getItem("cartData")) != null) {
            data.cartData = JSON.parse(localStorage.getItem("cartData"));
        }       
        const gia = computed(() => {           
            return data.cartData.reduce((accumulator, currentValue) => accumulator + parseFloat(currentValue.gia), totalPrice.value);
        });
        localStorage.setItem("cartData",JSON.stringify(data.cartData));
        function deleteItemInCart(id) {
            let text = "Bạn có muốn đăng xuất không";
            if (confirm(text) == true) {
                for (var i = 0; i < data.cartData.length; i++) {
                    if (data.cartData[i]._id == id) {
                        data.cartData.splice(i, 1);
                    }
                }
                if (data.cartData.length == 0) {
                    localStorage.removeItem("cartData");
                    return;
                }
                localStorage.setItem("cartData", JSON.stringify(data.cartData));

            }
        }
        function deleteAllCart() {
            let text = "Bạn muốn xóa tất cả sản phẩm không";
            if (confirm(text) == true) {
                localStorage.removeItem("cartData");
                data.cartData = [];
            }

        }
        function ContinueAddCart() {
            router.push("/home");
        }
        function gotoAddBill() {
            router.push("/bill/add")
        }
        return {
            ContinueAddCart,
            deleteItemInCart,
            deleteAllCart,
            gotoAddBill,
            data,
            gia,
        }
    }
};
</script>
