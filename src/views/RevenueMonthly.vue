<template>
    <AppHeader />
    <div class="mt-2 row d-flex justify-content-around">
        <div class="col-2 backgound-violet rounded">
            <Catalog />
        </div>
        <div class="col-9">
            <h4 class="text-violet">DOANH THU
                <router-link :to="{
                    name: 'revenue',
                }">
                    <a class="text-violet"><strong>HÀNG NGÀY </strong> </a>
                </router-link>
                <router-link :to="{
                        name: 'revenueMonthly',
                    }">
                    <a class="active activ"><u><strong>HÀNG THÁNG</strong></u></a>
                </router-link>

            </h4>
            <h6>Hôm nay: {{ currentDate }}</h6>
            <select v-model="selected">
                <option value="">Tất cả</option>
                <option v-for=" i in 12 " :value="i">Tháng {{ i }}</option>
            </select>
            <div>
                <table class="table mt-2">
                    <thead class="backgound-violet text-white">
                        <tr>
                            <th scope="col">Tháng</th>
                            <th scope="col">Hóa đơn</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{{ selected }}</td>
                            <td>
                                <table class="table mt-2">
                                            <thead class="backgound-violet text-white">
                                                <tr>
                                                    <th scope="col">ID hóa đơn</th>
                                                    <th scope="col">Tên khách hàng</th>
                                                    <th scope="col">Tên sản phẩm</th>
                                                    <th scope="col">Tổng tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(bill, index) in afterSelect" :key="bill._id">
                                    
                                                    <td>{{ bill._id }}</td>
                                                    <td>{{ bill.nameCustomer }}</td>
                                                    <td>
                                                        <ol v-for="(item, index) in bill.products" :key="index">
                                                            <li>{{ item.ten }}</li>
                                                        </ol>
                                                    </td>
                                                    <td>{{ new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency', currency: 'VND'
                                                    }).format(bill.tongTien * 1000) }}</td>
                                                </tr>

                                            </tbody>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>Tổng: {{ new Intl.NumberFormat('vi-VN', {
                                                    style: 'currency', currency: 'VND'
                                                }).format(sum * 1000) }}</td>
                                            </tr>
                                        </table>
                            </td>
                        </tr>
                    </tbody>
                    <tr>
                        <td></td>
                        <td>Tổng: 200.000đ</td>
                    </tr>
                </table>
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
import { reactive, ref, computed } from "vue";
import { useRouter } from "vue-router";

export default {
    components: {
        AppHeader,
        AppFooter,
        Catalog,
    },
    setup() {
        const date = new Date();
        let currentDate = `ngày ${date.getDate()} tháng ${(date.getMonth() + 1)} năm${date.getFullYear()}`;
        let currentDate1 = `${date.getDate()}-${(date.getMonth() + 1)}-${date.getFullYear()}`;
        const selected = ref("");
        const router = useRouter();
        const data = reactive({
            listBill: [],
        });
        const sum = ref(0);
        //ref => data= ref(2) =>data.value = 3
        //data = reactive([]); => data.push(1,2);
        async function getAllBills() {
            try {
                const response = await axios.get("http://localhost:3000/api/bill");
                data.listBill = response.data;

            } catch (e) {

            }

        }
        getAllBills();
        let afterSelect = computed(() => {
            if (selected.value != "") {
                return data.listBill.filter((e) => e.ngaylap.slice(e.ngaylap.indexOf('-') + 1, e.ngaylap.lastIndexOf('-')) == selected.value);
            }
            return data.listBill.filter((e) => e.ngaylap.slice(e.ngaylap.indexOf('-') + 1, e.ngaylap.lastIndexOf('-')).includes(selected.value));
        })

        return {
            afterSelect,
            selected,
            sum,
            data,
            currentDate,
        }
    }
};
</script>