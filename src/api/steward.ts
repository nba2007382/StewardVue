import axios from '../https';

const url = {
    login: '/api/user/login',
    register: `/api/user/register`,
    userDel: `/api/user/del`,
    getUsers: `/api/user/`,
    getJdChart: '/api/chart/jd',
    getJdCalculationChart: '/api/chart/jdCalculation',
    getAllJdCalculation: `/api/table/jd`,
    getJdCalculationById: `/api/detail/getJdCalculation`,
    getJdGoods: `/api/monito/jd/getgoods`,
    delJdGoods: `/api/monito/jd/delgoods`,
    addJdGoods: `/api/monito/jd/addgoods`,
    getJdGoodsById: `/api/detail/JdGoodsInfo`,
    getTmChart: '/api/chart/tm',
    getTmCalculationChart: '/api/chart/tmCalculation',
    getAllTmCalculation: `/api/table/tm`,
    getTmCalculationById: `/api/detail/getTmCalculation`,
    getTmGoods: `/api/monito/tm/getgoods`,
    delTmGoods: `/api/monito/tm/delgoods`,
    addTmGoods: `/api/monito/tm/addgoods`,
    getTmGoodsById: `/api/detail/TmGoodsInfo`,
    getAllJd: `/api/detail/Jd`,
    getAllTm: `/api/detail/Tm`,
    stopTmallTask: `/api/task/stop/tm`,
    stopJdTask: `/api/task/stop/jd`,
    getTmallTask: `/api/task/tm`,
    getJdTask: `/api/task/jd`,
};

export async function stopJdTask(id, status) {
    const { data } = await axios.post(url.stopJdTask, {
        data: { id, status },
    });
    return data;
}

export async function stopTmallTask(id, status) {
    const { data } = await axios.post(url.stopTmallTask, {
        data: { id, status },
    });
    return data;
}

export async function getJdTask() {
    const { data } = await axios.get(url.getJdTask);
    return data;
}

export async function getTmallTask() {
    const { data } = await axios.get(url.getTmallTask);
    return data;
}

export async function getAllJd() {
    const { data } = await axios.get(url.getAllJd);
    return data;
}

export async function getAllTm() {
    const { data } = await axios.get(url.getAllTm);
    return data;
}

export async function getUsers() {
    const { data } = await axios.get(url.getUsers);
    return data;
}

export async function userLogin(info) {
    const { data } = await axios.post(url.login, info);
    return data;
}

export async function userRegister(info) {
    const { data } = await axios.post(url.register, info);
    return data;
}

export async function getJdChart() {
    const { data } = await axios.get(url.getJdChart);
    return data;
}
export async function getJdCalculation() {
    const { data } = await axios.get(url.getJdCalculationChart);
    return data;
}

export async function getAllJdCalculation() {
    const { data } = await axios.post(url.getAllJdCalculation);
    return data;
}

export async function getJdCalculationById(id: string) {
    const { data } = await axios.get(url.getJdCalculationById, {
        params: {
            id,
        },
    });
    return data;
}

export async function getJdGoods() {
    const { data } = await axios.get(url.getJdGoods);
    return data;
}

export async function delJdGoods(id: any) {
    const { data } = await axios.delete(url.delJdGoods, {
        data: { id },
    });
    return data;
}

export async function addJdGoods(add: string) {
    const { data } = await axios.get(url.addJdGoods, {
        params: {
            url: add,
        },
    });
    return data;
}

export async function getJdGoodsById(id: any) {
    const { data } = await axios.get(url.getJdGoodsById, {
        params: {
            id,
        },
    });
    return data;
}

export async function getTmChart() {
    const { data } = await axios.get(url.getTmChart);
    return data;
}
export async function getTmCalculation() {
    const { data } = await axios.get(url.getTmCalculationChart);
    return data;
}

export async function getAllTmCalculation() {
    const { data } = await axios.post(url.getAllTmCalculation);
    return data;
}

export async function getTmCalculationById(id: string) {
    const { data } = await axios.get(url.getTmCalculationById, {
        params: {
            id,
        },
    });
    return data;
}

export async function getTmGoods() {
    const { data } = await axios.get(url.getTmGoods);
    return data;
}

export async function delTmGoods(id: any) {
    const { data } = await axios.delete(url.delTmGoods, {
        data: { id },
    });
    return data;
}

export async function delUser(email: any) {
    const { data } = await axios.delete(url.userDel, {
        data: { email },
    });
    return data;
}

export async function addTmGoods(add: string) {
    const { data } = await axios.get(url.addTmGoods, {
        params: {
            url: add,
        },
    });
    return data;
}

export async function getTmGoodsById(id: any) {
    const { data } = await axios.get(url.getTmGoodsById, {
        params: {
            id,
        },
    });
    return data;
}
