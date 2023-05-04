import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading, ElNotification } from 'element-plus';
import router from './router';
import { user } from './store/user';

let loading: any;

const startLoading = () => {
    interface Options {
        lock: boolean;
        text: string;
        background: string;
    }

    const options: Options = {
        lock: true,
        text: '加载中...',
        background: 'rgba(0,0,0,0.7)',
    };
    loading = ElLoading.service(options);
};

const endLoading = () => {
    loading.close();
};

// 创建一个数组用于存储已发送的请求
const pendingRequests = [];

// 定义一个函数用于生成请求的标识
const generateRequestKey = (config) => {
    if (!config) return;
    return [config.method, config.url].join('&');
};

// 定义一个函数用于移除已完成的请求
const removePendingRequest = (config) => {
    const requestKey = generateRequestKey(config);
    const index = pendingRequests.indexOf(requestKey);
    if (index > -1) {
        pendingRequests.splice(index, 1);
    }
};

// 添加请求拦截器
axios.interceptors.request.use((config) => {
    // 生成请求的标识
    const requestKey = generateRequestKey(config);
    // 判断是否有重复的请求
    if (pendingRequests.includes(requestKey)) {
        // 如果有，就取消掉
        config.cancelToken = new axios.CancelToken((cancel) => {
            cancel('重复的请求被取消了');
        });
    } else {
        // 如果没有，就把请求的标识添加到数组中
        const userstore = user();
        if (userstore.tokenInfo.access_token) {
            config.headers.Authorization = `Bearer ${userstore.tokenInfo.access_token}`;
        }
        startLoading();
        pendingRequests.push(requestKey);
    }
    return config;
});

// 响应拦截
// 定义一个函数来处理响应数据
function handleResponseData({ data, status }) {
    // 检查状态码
    if (status >= 200 && status < 300) {
        // 返回数据
        return { data, status };
    } else {
        // 抛出一个错误，带有消息
        Promise.reject(new Error(data.message));
    }
}

// 定义一个函数来处理错误
function handleError(error) {
    // 检查错误是否被axios取消
    if (axios.isCancel(error)) {
        // 返回一个取消的promise
        return Promise.reject(new axios.Cancel('请求取消'));
    }
    // 检查错误是否有响应
    if (error.response) {
        // 检查状态码是否是401（未授权）
        if (error.response.status === 401) {
            // 获取用户存储
            const userstore = user();
            // 检查用户是否有刷新令牌
            if (userstore.tokenInfo.refresh_token) {
                // 将访问令牌设置为null
                userstore.tokenInfo.access_token = null;
                // 尝试刷新令牌
                return axios({
                    method: 'put',
                    url: '/api/authorizations/refresh',
                    headers: {
                        Authorization: `Bearer ${userstore.tokenInfo.refresh_token}`,
                    },
                })
                    .then((res) => {
                        // 更新用户令牌
                        const { access_token, refresh_token } = res.data;
                        userstore.setToken({ access_token, refresh_token });
                        // 使用新的访问令牌重试原始请求
                        return axios.request({
                            ...error.config,
                            headers: {
                                ...error.config.headers,
                                Authorization: `Bearer ${access_token}`,
                            },
                        });
                    })
                    .catch((error) => {
                        // 如果刷新令牌失败，清除用户令牌和信息
                        if (axios.isCancel(error)) return;
                        if (!userstore.tokenInfo.access_token) {
                            console.log(error);
                            userstore.removeToken();
                            userstore.removeuserInfo();
                            // 如果不在首页，重定向到首页
                            if (router.currentRoute.value.path !== '/') {
                                router.push('/');
                                alert('请重新登陆');
                            }
                        }
                    });
            } else {
                // 如果用户没有刷新令牌，清除用户令牌和信息
                userstore.removeToken();
                userstore.removeuserInfo();
                // 如果不在首页，重定向到首页
                if (router.currentRoute.value.path !== '/') {
                    router.push('/');
                    alert('请重新登陆');
                }
            }
        }
    }
    // 抛出错误
    throw error;
}

// 添加一个拦截器用于响应
axios.interceptors.response.use(
    (response) => {
        // 结束加载
        console.log(response);
        endLoading();
        removePendingRequest(response.config);
        // 处理响应数据
        return handleResponseData(response.data);
    },
    (error) => {
        console.log(error);
        // 移除待处理的请求
        removePendingRequest(error.config);
        // 结束加载
        endLoading();
        // 处理错误
        return handleError(error);
    },
);

export default axios;
