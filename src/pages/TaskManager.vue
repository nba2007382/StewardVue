<template>
    <el-main>
        <el-card header="京东任务管理">
            <el-table :data="jdData" border style="width: 100%">
                <el-table-column prop="id" label="商品编号" />
                <el-table-column prop="title" label="商品名称" />
                <el-table-column prop="href" label="商品链接">
                    <template #default="{ row }">
                        <a :href="row.href" target="_blank">{{ row.href }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="img" label="商品图片">
                    <template #default="{ row }">
                        <el-image
                            :src="formatterImg(row.img)"
                            fit="cover"
                            style="width: 100px; height: 100px"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    :formatter="formatJdStatus"
                />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="{ row }">
                        <el-row>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="handleJdStart(row)"
                                >开始</el-button
                            >
                        </el-row>
                        <el-row
                            ><el-button
                                type="warning"
                                size="mini"
                                @click="handleJdPause(row)"
                                >暂停</el-button
                            ></el-row
                        >
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card header="天猫任务管理" style="margin-top: 100px">
            <el-table :data="tmallData" border style="width: 100%">
                <el-table-column prop="id" label="商品编号" />
                <el-table-column prop="title" label="商品名称" />
                <el-table-column prop="href" label="商品链接">
                    <template #default="{ row }">
                        <a :href="row.href" target="_blank">{{ row.href }}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="img" label="商品图片">
                    <template #default="{ row }">
                        <el-image
                            :src="formatterImg(row.img)"
                            fit="cover"
                            style="width: 100px; height: 100px"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    :formatter="formatTmStatus"
                />
                <el-table-column fixed="right" label="操作" width="120">
                    <template #default="{ row }">
                        <el-row>
                            <el-button
                                type="primary"
                                size="mini"
                                @click="handleTmStart(row)"
                                >开始</el-button
                            >
                        </el-row>
                        <el-row
                            ><el-button
                                type="warning"
                                size="mini"
                                @click="handleTmPause(row)"
                                >暂停</el-button
                            ></el-row
                        >
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </el-main>
</template>

<script>
import {
    getAllJd,
    getAllTm,
    getJdTask,
    getTmallTask,
    stopJdTask,
    stopTmallTask,
} from '../api/steward';
import { onMounted, ref } from 'vue';
export default {
    setup() {
        const tmallData = ref();
        const jdData = ref();

        onMounted(async () => {
            const { data: jd } = await getAllJd();
            const { data: tmall } = await getAllTm();
            getStopJdTaskData();
            getStopTmallTaskData();
            tmallData.value = tmall;
            jdData.value = jd;
        });

        const formatterImg = (str) => {
            let imgUrl = str.replace('.avif', '.jpg');
            return imgUrl;
        };

        const jdTask = ref({});
        const tmallTask = ref({});

        async function getStopJdTaskData() {
            const { data } = await getJdTask();
            jdTask.value = data ?? {};
        }

        async function getStopTmallTaskData() {
            const { data } = await getTmallTask();
            tmallTask.value = data ?? {};
        }

        function formatTmStatus({ id }) {
            const isStop = tmallTask.value[id] ?? false;
            return isStop ? '暂停执行' : '正在执行';
        }

        function formatJdStatus({ id }) {
            const isStop = jdTask.value[id] ?? false;
            return isStop ? '暂停执行' : '正在执行';
        }

        async function handleJdStart({ id }) {
            const isStop = jdTask.value[id] ?? false;
            if (!isStop) return;
            const { message } = await stopJdTask(id, 0);
            alert(message);
            getStopJdTaskData();
        }

        async function handleTmStart({ id }) {
            const isStop = tmallTask.value[id] ?? false;
            if (!isStop) return;
            const { message } = await stopTmallTask(id, 0);
            alert(message);
            getStopTmallTaskData();
        }

        async function handleTmPause({ id }) {
            const isStop = tmallTask.value[id] ?? false;
            if (isStop) return;
            const { message } = await stopTmallTask(id, 1);
            alert(message);
            getStopTmallTaskData();
        }

        async function handleJdPause({ id }) {
            const isStop = jdTask.value[id] ?? false;
            if (isStop) return;
            const { message } = await stopJdTask(id, 1);
            alert(message);
            getStopJdTaskData();
        }

        return {
            formatterImg,
            tmallData,
            jdTask,
            jdData,
            formatTmStatus,
            formatJdStatus,
            handleJdStart,
            handleTmStart,
            handleTmPause,
            handleJdPause,
        };
    },
};
</script>

<style></style>
