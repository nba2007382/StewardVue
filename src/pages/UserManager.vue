<template>
    <el-main>
        <el-table :data="userData" border style="width: 100%">
            <el-table-column prop="name" label="用户名" width="180" />
            <el-table-column prop="email" label="邮箱" />
            <el-table-column
                prop="status"
                label="状态"
                :formatter="formatStatus"
            />
            <el-table-column
                prop="create_time"
                label="创建时间"
                :formatter="formatTimestamp"
            />
            <el-table-column fixed="right" label="操作" width="120">
                <template #default="{ row }">
                    <el-button
                        type="danger"
                        size="mini"
                        @click="handleDelete(row)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </el-main>
</template>

<script>
import { delUser, getUsers } from '../api/steward';
import { onMounted, ref } from 'vue';
export default {
    setup() {
        const userData = ref();
        onMounted(async () => {
            const { data } = await getUsers();
            userData.value = data;
        });

        function formatStatus(status) {
            return status === 0 ? '未激活' : '已激活';
        }

        async function handleDelete({ email }) {
            const { message } = await delUser(email);
            alert(message);
            const { data } = await getUsers();
            userData.value = data;
        }

        function formatTimestamp({ create_time: timestamp }) {
            // 创建一个Date对象，根据时间戳
            console.log(timestamp);
            const date = new Date(parseInt(timestamp));
            // 获取年份
            const year = date.getFullYear();
            // 获取月份，注意月份是从0开始的，所以要加1，并且补0
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            // 获取日期，并且补0
            const day = date.getDate().toString().padStart(2, '0');
            // 获取小时，并且补0
            const hour = date.getHours().toString().padStart(2, '0');
            // 获取分钟，并且补0
            const minute = date.getMinutes().toString().padStart(2, '0');
            // 获取秒数，并且补0
            const second = date.getSeconds().toString().padStart(2, '0');
            // 返回格式化后的字符串，例如2021-12-15 14:23:45
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        }

        return { userData, formatStatus, handleDelete, formatTimestamp };
    },
};
</script>

<style></style>
