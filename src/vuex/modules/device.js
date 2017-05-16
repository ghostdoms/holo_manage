import {getDeviceList,getDeviceDefaultList,addDevice,deleteDevice,pairDevice,startPairDevice,restartDevice,shutdownDevice} from '../../api/device-api';
export const GET_DEVICE_LIST = 'GET_DEVICE_LIST'; //获取列表
export const GET_DEVICE_DEFULT_LIST = 'GET_DEVICE_DEFULT_LIST'; //获取默认列表
export const ADD_DEVICE = 'ADD_DEVICE';
export const DELETE_DEVICE = 'DELETE_DEVICE';
export const DEVICE_APP_LIST = 'DEVICE_APP_LIST';
export const PAIR_DEVICE = 'PAIR_DEVICE';
export const START_PAIR_DEVICE = 'START_PAIR_DEVICE';
export const RESTART_DEVICE = 'RESTART_DEVICE';
export const SHUTDOWN_DEVICE = 'SHUTDOWN_DEVICE';
export default {
    state: {
        isMark:-1,//0 license 1 device delete 2 app uninstall 
        isCommon:true,
        getListData:'',
        deleteId:'',
        loading:true,
        pinType:'',
        deviceCount:'',
        alertType:'',
        alertInfo:'',
        initNo:0,
    },
    actions: {
        getDeviceList({ commit }) {
            commit(GET_DEVICE_LIST);
        },
        getDeviceDefaultList({ commit }) {
            commit(GET_DEVICE_DEFULT_LIST);
        },
        addDevice({ commit },data) {
            commit(ADD_DEVICE,data);
        },
        deleteDevice({ commit },data) {
            commit(DELETE_DEVICE,data);
        },
        deviceAppList({ commit },data) {
            commit(DEVICE_APP_LIST,data);
        },
        pairDevice({ commit },data) {
            commit(PAIR_DEVICE,data);
        },
        startPairDevice({ commit },data) {
            commit(START_PAIR_DEVICE,data);
        },
        restartDevice({ commit },data) {
            commit(RESTART_DEVICE,data);
        },
        shutdownDevice({ commit },data) {
            commit(SHUTDOWN_DEVICE,data);
        }
    },
    mutations: {
        [GET_DEVICE_LIST](state) {
           getDeviceList(state);
        },
        [GET_DEVICE_DEFULT_LIST](state) {
           getDeviceDefaultList(state);
        },
        [ADD_DEVICE](state,data) {
           addDevice(state,data);
        },
        [DELETE_DEVICE](state,data) {
           deleteDevice(state,data);
        },
        [DEVICE_APP_LIST](state,data) {
           deviceAppList(state,data);
        },
        [PAIR_DEVICE](state,data) {
           pairDevice(state,data);
        },
        [START_PAIR_DEVICE](state,data) {
           startPairDevice(state,data);
        },
        [RESTART_DEVICE](state,data) {
           restartDevice(state,data);
        },
        [SHUTDOWN_DEVICE](state,data) {
           shutdownDevice(state,data);
        }
    },
    getters: {
       
    }
};
