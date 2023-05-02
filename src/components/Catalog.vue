<template>
    <div class="card ">
                <ul class="list-group list-group-flush justify-content-center m-2">
                    <li class="list-group-item">
                        <router-link :to="{
                                name: 'user',
                            }">
                            <a href="" class="text-center text-violet">Nhân viên </a>
                        </router-link></li>
                    <li class="list-group-item">
                        <router-link :to="{
                                name: 'home',
                            }">
                            <a href="" class="text-center text-violet">Sản phẩm</a>
                        </router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link :to="{
                                name: 'bill',
                            }">
                            <a href="" class="text-center text-violet">Đơn hàng</a>
                        </router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link :to="{
                                name: 'revenue',
                            }">
                            <a href="" class="text-center text-violet">Doanh thu </a>
                        </router-link>
                    </li>
                    <li class="list-group-item">
                        <router-link :to="{
                                name: 'cart',
                            }">
                            <a href="" class="text-center text-violet">Tạo hóa đơn</a>
                        </router-link>
                    </li>
                </ul>
            </div>
</template>