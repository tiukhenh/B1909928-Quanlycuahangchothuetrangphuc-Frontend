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
                    <a class="active activ"><u><strong>HÀNG NGÀY </strong></u> </a>
                </router-link>
                <router-link :to="{
                    name: 'revenueMonthly',
                }">
                    <a class="text-violet"><strong>HÀNG THÁNG</strong></a>
                </router-link>
                
            </h4>
            <h6>Hôm nay: {{ currentDate }}</h6>
            <div>
                <table class="table mt-2 table-color">
                    <thead class="backgound-violet text-white">
                        <tr>
                            <th scope="col">ID hóa đơn</th>
                            <th scope="col">Tên khách hàng</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Tổng tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(bill, index) in aftersum" :key="bill._id" class="text-dark">
                            <td>{{ bill._id }}</td>
                            <td>{{ bill.nameCustomer }}</td>
                            <td>
                                <ol >
                                    <li v-for="(item, index) in bill.products" :key="index">{{ item.ten }}</li>
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
                        <td  class="text-dark"><strong>Tổng: {{ new Intl.NumberFormat('vi-VN', {
                            style: 'currency', currency: 'VND'
                        }).format(total * 1000) }}</strong></td>
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
import { reactive, ref, computed, watch, watchEffect } from "vue";
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

        const router = useRouter();
        const data = reactive({
            listBill: [],
        });
        let sum = ref(0);
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
        const total = computed(() => {
            for(var i =0 ;i<data.listBill.length;i++){
                if(data.listBill[i].ngaylap == currentDate1){
                    sum.value += data.listBill[i].tongTien ; 
                }
            }
            return sum.value;
        });
        let aftersum = computed(() => {
            return data.listBill.filter((e) => e.ngaylap == currentDate1);
        })
    
        return {
            aftersum,
            total,
            data,
            currentDate,
        }
    }
};
</script>
