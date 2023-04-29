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
            <div class="mr-auto text-violet ">
                <h4><i class="far fa-chart-bar"></i> Hoạt động hôm nay:</h4>
            </div>
            <div class="row">
                <div class=" card backgound-violet col-3 ml-2">
                    <div class="card-body">
                        <h6 class="text-white"><i class="fas fa-shopping-cart text-white"></i> Số đơn hàng: 0</h6>
                    </div>
                </div>
                <div class=" card backgound-violet col-3 ml-2">
                    <div class="card-body">
                        <h6 class="text-white"><i class="fas fa-redo text-white"></i> Khách trả hàng: 0</h6>
                    </div>
                </div>
            </div>
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
                            </tr>
                        </thead>
                        <tbody v-for="(bill, index) in ketqualoc" :key="bill._id">
                            <tr  @click="chooseBill(bill._id)" class="text-dark">
                                <td>{{ bill.ngaymuon }}</td>
                                <td>{{ bill.ngaytra }}</td>
                                <td>{{ bill.nameCustomer }}</td>
                                <td>{{ bill.phone }}</td>
                                <td>{{ bill.address }}</td>
                                <td v-if="bill.tinhTrang">đã trả</td>
                                <td v-else> đang thuê </td>
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
                            <!-- <div class="p-1">
                                <strong>Sản phẩm</strong>
                                {{
                                    console.log(data.bill.products[i]._id)
                                }}
                            </div> -->
                            <!-- <div class="p-1">
                                <strong>Giá:</strong>
                                {{ data.bill.gia }}
                            </div> -->
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
            listBill: [],
            bill: {}
        });
        const searchText = ref("");
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
        async function chooseBill(id) {
            console.log(id);
            const response = await axios.get(`http://localhost:3000/api/bill/${id}`);
            data.bill = response.data;
        }
        return {
            ketqualoc,
            searchText,
            data,
            chooseBill,
        }
    }
};
</script>
