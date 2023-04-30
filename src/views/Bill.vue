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
            <div class="row">
                <div class="col-8 p-0">
                    <table class="table mt-2 table-color">
                        <thead class="backgound-violet text-white">
                            <tr>
                                <th scope="col">Ngày thuê</th>
                                <th scope="col">Ngày trả</th>
                                <th scope="col">Tên KH</th>
                                <th scope="col">SDT</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Tình trạng</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody v-for="(bill, index) in ketqualoc" :key="bill._id">
                            <tr @click="chooseBill(bill._id)" class="text-dark">
                                <td>{{ bill.ngaymuon }}</td>
                                <td>{{ bill.ngaytra }}</td>
                                <td>{{ bill.nameCustomer }}</td>
                                <td>{{ bill.phone }}</td>
                                <td>{{ bill.address }}</td>
                                <td>{{ new Intl.NumberFormat('vi-VN', {
                                    style: 'currency', currency: 'VND'
                                }).format(bill.tongTien * 1000) }}</td>
                                <td v-if="bill.tinhTrang">đã trả</td>
                                <td v-else> đang thuê </td>
                                <td v-if="bill.tinhTrang"></td>
                                <td v-else @click="returnBill(bill._id)"><i class="fas fa-undo"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-4 d-flex align-items-end flex-column bd-highlight mb-3 pr-0">
                    <div v-if="Object.keys(data.bill).length != 0">
                        <h4 class="text-violet">
                            Chi tiết hóa đơn
                        </h4>
                        <div>
                            <div class="p-1">
                                <strong>Tên khách hàng:</strong>
                                {{ data.bill.nameCustomer }}
                            </div>
                            <div class="p-1">
                                <strong>Số điện thoại:</strong>
                                {{ data.bill.phone }}
                            </div>
                            <div class="p-1">
                                <strong>CCCD:</strong>
                                {{ data.bill.indentification }}
                            </div>
                            <div class="p-1">
                                <strong>Danh sách sản phẩm</strong>
                                <ol>
                                    <li v-for="(item, index) in data.bill.products" :key="index"><span>Tên sản pham: {{
                                        item.ten }}</span><br><span>Gia: {{ new Intl.NumberFormat('vi-VN', {
        style: 'currency', currency: 'VND'
    }).format(item.gia * 1000) }}</span></li>
                                </ol>
                            </div>

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
import CurrentActivity from "../components/CurrentActivity.vue";
import axios from "axios";
import { reactive, computed, ref, watch } from "vue";
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
            listBill: [],
            bill: {}
        });
        const isChecked = ref(false);
        const searchText = ref("");
        const count = ref(0);
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
        let ketqualoc = computed(() => {
            return data.listBill.filter((e) => e.nameCustomer.toUpperCase().includes(searchText.value.toUpperCase()) || e.phone.toUpperCase().includes(searchText.value.toUpperCase()));
        })
        watch(isChecked, async () => {

            try {
                const res = await axios.get("http://localhost:3000/api/bill");
                data.listBill = res.data;
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        })
        // let ketqualoc
        async function chooseBill(id) {
            const response = await axios.get(`http://localhost:3000/api/bill/${id}`);
            data.bill = response.data;
        }
        async function returnBill(id) {
            let text = "Bạn muốn xác nhận trả hàng?";
            if (confirm(text) == true) {
                await axios.put(`http://localhost:3000/api/bill/${id}`);
                const response = await axios.get(`http://localhost:3000/api/bill/${id}`);
                

                for (var i = 0; i < response.data.products.length; i++) {

                    await axios.put(`http://localhost:3000/api/item/tinhtrang/${response.data.products[i]._id}`);
                }
                isChecked.value = !isChecked.value;
            }
        }

        return {
            count,
            returnBill,
            ketqualoc,
            searchText,
            data,
            chooseBill,
        }
    }
};
</script>
