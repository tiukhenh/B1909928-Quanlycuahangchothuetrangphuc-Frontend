<template>
    <div class="mr-auto text-violet ">
        <h4><i class="far fa-chart-bar"></i> Hoạt động hôm nay:</h4>
    </div>
    <div class="row">
        <div class=" card backgound-violet col-3 ml-2">
            <div class="card-body">
                <h6 class="text-white"><i class="fas fa-shopping-cart text-white"></i> Số đơn hàng: {{ countBill }}
                </h6>
            </div>
        </div>
        <div class=" card backgound-violet col-3 ml-2">
            <div class="card-body">
                <h6 class="text-white"><i class="fas fa-redo text-white"></i> Khách trả hàng: {{ countBillReturn }}</h6>
            </div>
        </div>
    </div>
</template>
<script>

import axios from "axios";
import { reactive, computed, ref, watch, toRefs } from "vue";

export default {
    props: ['status'],
    setup(props) {
        const { status } = toRefs(props);
        const data = reactive({
            listBill: [],
            bill: {}
        });
        const countBill = ref(0);
        const countBillReturn = ref(0);
        //ref => data= ref(2) =>data.value = 3
        //data = reactive([]); => data.push(1,2);
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${day}-${month}-${year}`;
        async function getAllBills() {
            try {
                const response = await axios.get("http://localhost:3000/api/bill");
                data.listBill = response.data;

                for (var i = 0; i < data.listBill.length; i++) {
                    if (data.listBill[i].ngaylap == currentDate) {
                        countBill.value++;
                    }
                    if (data.listBill[i].ngaytrahientai != "" && data.listBill[i].ngaytrahientai == currentDate) {
                        countBillReturn.value++;
                    }
                }
            } catch (e) {

            }
        }
        getAllBills();
        watch(status, () => {
            countBillReturn.value++;
        })
        return {
            countBill,
            countBillReturn,
        }
    }
};
</script>
