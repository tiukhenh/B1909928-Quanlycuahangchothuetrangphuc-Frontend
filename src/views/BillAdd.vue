<template>
    <div>
        <div>
            <router-link :to="{
                name: 'bill',
            }">
                <a><i class="fas fa-angle-double-left text-violet mx-4 ml-2 "></i></a>
            </router-link>
        </div>
        <div class="border border-violet rounded col-9 mx-auto">
            <h4>Thêm Hóa Đơn</h4>
            <div class="container col-8">
                <Form @submit="submitItem">
                    <div class="form-group">
                        <label for="nameCustomer">Tên khách hàng</label>
                        <Field name="nameCustomer" type="text" class="form-control" v-model="data.bill.nameCustomer" />
                        <ErrorMessage name="nameCustomer" class="error-feedback" />
                        {{ data.bill.nameCustomer }}
                    </div>
                    <div class="form-group">
                        <label for="phone">Số điện thoại</label>
                        <Field name="phone" type="text" class="form-control" v-model="data.bill.phone" />
                        <ErrorMessage name="phone" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="ngaymuon">Ngày mượn</label>
                        <Field name="ngaymuon" type="date" class="form-control" v-model="data.bill.ngaymuon" />
                        <ErrorMessage name="ngaymuon" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="ngaytra">Ngày trả</label>
                        <Field name="ngaytra" type="date" class="form-control" v-model="data.bill.ngaytra" />
                        <ErrorMessage name="ngaytra" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="indentification">Số CCCD</label>
                        <Field name="indentification" type="text" class="form-control"
                            v-model="data.bill.indentification" />
                        <ErrorMessage name="indentification" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="address">Địa chỉ</label>
                        <Field name="address" type="text" class="form-control" v-model="data.bill.address" />
                        <ErrorMessage name="address" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-violet">Lưu</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import router from "../router";
import axios from "axios";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const router = useRouter();
        if(localStorage.getItem("cartData")==null){
            router.push("/cart");
        }
        const itemFormSchema = yup.object().shape({
            ten: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
        });
        const data = reactive({
            bill: {}
        });
        async function submitItem() {
            data.bill.tinhTrang = false;
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${day}-${month}-${year}`;
            data.bill.ngaylap = currentDate;
            data.bill.products = JSON.parse(localStorage.getItem("cartData"));
            const response = await axios.post("http://localhost:3000/api/bill",data.bill);
            // console.log(data.bill.products);
            for(var i =0 ;i<data.bill.products.length;i++) {
                console.log(data.bill.products[i]._id);
                await axios.put(`http://localhost:3000/api/item/tinhtrang/${data.bill.products[i]._id}`);
            }
            localStorage.removeItem("cartData");
            router.push("/bill");

        }
        return {
            submitItem,
            itemFormSchema,
            data,
        }
    }
};
</script>