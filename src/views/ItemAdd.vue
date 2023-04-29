<template>
    <div>
        <div>
            <router-link :to="{
                name: 'home',
            }">
                <a><i class="fas fa-angle-double-left text-violet mx-4 ml-2 "></i></a>
            </router-link>
        </div>
        <div class="border border-violet rounded col-9 mx-auto">
            <h4>Thêm sản phẩm</h4>
            <div class="container col-8" >
                <Form @submit="submitItem" :validation-schema="itemFormSchema">
                    <div class="form-group">
                        <label for="ten">Tên</label>
                        <Field name="ten" type="text" class="form-control" v-model="data.item.ten" />
                        <ErrorMessage name="ten" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="loai">Loại</label>
                        <Field name="loai" type="text" class="form-control" v-model="data.item.loai" />
                        <ErrorMessage name="loai" class="error-feedback" />
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
                    </div>
                </Form>
            </div>
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
        const data = reactive({
            item: {}
        });
        async function submitItem() {
            const response = await axios.post(`http://localhost:3000/api/item`,data.item);
            if(response.status == 200){
                alert("Thêm thành công");
                router.push("/home");
            }
        }
        function backHome() {
            router.push("/home");
        }
        return {
            backHome,
            submitItem,
            itemFormSchema,
            data,
        }
    }
};
</script>