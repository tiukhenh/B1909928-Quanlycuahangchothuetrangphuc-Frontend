<template>
    <div class="mr-auto text-violet ">
                <h4><i class="far fa-chart-bar"></i> Hoạt động hôm nay:</h4>
            </div>
            <div class="row">
                <div class=" card backgound-violet col-3 ml-2">
                    <div class="card-body">
                        <h6 class="text-white"><i class="fas fa-shopping-cart text-white"></i> Số đơn hàng: {{count }}
                        </h6>
                    </div>
                </div>
                <div class=" card backgound-violet col-3 ml-2">
                    <div class="card-body">
                        <h6 class="text-white"><i class="fas fa-redo text-white"></i> Khách trả hàng: 0</h6>
                    </div>
                </div>
            </div>
    
</template>
<script>

import axios from "axios";
import { reactive, computed, ref, watch } from "vue";

export default {
    setup() {
        const data = reactive({
            listBill: [],
            bill: {}
        });
        const count = ref(0);
        //ref => data= ref(2) =>data.value = 3
        //data = reactive([]); => data.push(1,2);
        async function getAllBills() {
            try {
                const response = await axios.get("http://localhost:3000/api/bill");
                data.listBill = response.data;
                const date = new Date();

                let day = date.getDate();
                let month = date.getMonth() + 1;
                let year = date.getFullYear();

                let currentDate = `${day}-${month}-${year}`;
                for(var i =0 ;i<data.listBill.length;i++){
                    if(data.listBill[i].ngaylap == currentDate){
                    count.value++;
                    }
                }
            } catch (e) {

            }

        }
        getAllBills();
        return {
            count,
        }
    }
};
</script>
