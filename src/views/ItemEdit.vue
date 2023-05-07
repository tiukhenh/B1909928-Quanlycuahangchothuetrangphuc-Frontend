<template>
    <div v-if="Object.keys(data.item).length != 0">
        <div><a href="" @click="backHome"><i class="fas fa-angle-double-left text-violet mx-4 ml-2 "></i></a></div>
        <div class="border border-violet rounded col-9 mx-auto">
            <h4>Chỉnh sửa sản phẩm</h4>
            <div class="container col-8" >
                <Form @submit="submitItem" :validation-schema="itemFormSchema">
                    <div class="form-group">
                        <label for="ten">Tên</label>
                        <Field name="ten" type="text" class="form-control" v-model="data.item.ten" />
                        <ErrorMessage name="ten" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="loai">Loại</label><br>
                        <!-- <Field name="loai" type="text" class="form-control" v-model="data.item.loai" /> -->
                        <select v-model="data.type" class="rounded" name="loai">
                            <option v-for= " type in data.listType " :key="type._id" > {{ type.ten }} </option>
                        </select>

                    </div>
                    <div class="form-group">
                        <label for="mauSac">Màu sắc</label>
                        <Field name="mauSac" type="text" class="form-control" v-model="data.item.mauSac" />
                        <ErrorMessage name="mauSac" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="gia">Giá</label>
                        <Field name="gia" type="float" class="form-control" v-model="data.item.gia" />
                        <ErrorMessage name="gia" class="error-feedback" />
                    </div>
                    <!-- <div class="form-group form-check">
                        <input name="tinhTrang" type="checkbox" class="form-check-input" v-model="data.item.tinhTrang" />
                        <label for="tinhTrang" class="form-check-label">
                            <strong>Tình trạng</strong>
                        </label>
                    </div> -->
                    <div class="form-group">
                        <button class="btn btn-violet">Lưu</button>
                        <button v-if="data.item._id" type="button" class="ml-2 btn btn-danger"
                            @click="deleteItem">Xóa</button>
                    </div>
                </Form>
            </div>
            <p>{{ message }}</p>
        </div>
    </div>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";
import axios from "axios";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const itemFormSchema = yup.object().shape({
            ten: yup
                .string()
                .required("Tên phải có giá trị.")
                .min(2, "Tên phải ít nhất 2 ký tự.")
                .max(50, "Tên có nhiều nhất 50 ký tự."),
        });
        const route = useRoute();
        const router = useRouter();
        const id = route.params.id;
        const data = reactive({
            item: {},
            listType: [],
            type: {},
        });
        // console.log(id);
        async function getItem() {
            const response = await axios.get(`http://localhost:3000/api/item/${id}`);
            data.item = response.data;
            data.type = data.item.loai.ten;
            // console.log(response);
            // console.log(data.item);
        }
        getItem()
        async function getAllTypes() {
            const response = await axios.get("http://localhost:3000/api/type");
            data.listType = response.data;
        }
        getAllTypes();
        async function submitItem() {
            if (data.type != null) {
                for (var i = 0; i < data.listType.length; i++) {
                    if (data.listType[i].ten == data.type) {
                        data.item.loai = data.listType[i];
                    }
                }
            }
            const response = await axios.put(`http://localhost:3000/api/item/${id}`,data.item);
            if(response.status == 200){
                alert("Ok thanh cong");
                router.push("/home");
            }
        }
        async function deleteItem() {
            let text ="Bạn muốn xóa sản phẩm?";
            if (confirm(text) == true) {
                const response = await axios.delete(`http://localhost:3000/api/item/${id}`,data.item);
                if(response.status == 200){
                    alert("Ok thanh cong");
                    router.push("/home");
                }
            } else {
                
            }
            
        }
        function backHome() {
            router.push("/home");
        }
        return {
            backHome,
            deleteItem,
            submitItem,
            itemFormSchema,
            data,
        }
    }
};
</script>