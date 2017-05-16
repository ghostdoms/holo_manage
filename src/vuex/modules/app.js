import { getAppList, installApp, updateApp, updateOfApp, restartApp, startApp, stopApp, deviceAppListIp, uninstallApp, addApp, delApp, appDetailList,configIp } from '../../api/app-api';
export const GET_APP_LIST = 'GET_APP_LIST'; //获取列表
export const INSTALL_APP = 'INSTALL_APP';
export const RESTART_APP = 'RESTART_APP';
export const START_APP = 'START_APP';
export const STOP_APP = 'STOP_APP';
export const UNINSTALL_APP = 'UNINSTALL_APP';
export const DEVICE_APP_LIST_IP = 'DEVICE_APP_LIST_IP';
export const ADD_APP = 'ADD_APP';
export const DEL_APP = 'DEL_APP';
export const LIST_DETAIL = 'LIST_DETAIL';
export const UPDATE_APP = 'UPDATE_APP';
export const UPDATE_OF_APP = 'UPDATE_OF_APP';
export const CONFIG_IP='CONFIG_IP';
export default {
    state: {
        //isBase: true,
        getAppData: '',
        appListData: '',
        listDetail: '',
        deleteIdApp: '',
        alertType: '',
        alertInfo: '',
        initNo: 0,
        go: 'Go',
        detail: '',
        Progress:''
    },
    actions: {
        getAppList({ commit }) {
            commit(GET_APP_LIST);
        },
        installApp({ commit }, data) {
            commit(INSTALL_APP, data);
        },
        updateApp({ commit }, data) {
            commit(UPDATE_APP, data);
        },
        updateOfApp({ commit }, data) {
            commit(UPDATE_OF_APP, data);
        },
        restartApp({ commit }, data) {
            commit(RESTART_APP, data);
        },
        startApp({ commit }, data) {
            commit(START_APP, data);
        },
        stopApp({ commit }, data) {
            commit(STOP_APP, data);
        },
        uninstallApp({ commit }, data) {
            commit(UNINSTALL_APP, data);
        },
        deviceAppListIp({ commit }, data) {
            commit(DEVICE_APP_LIST_IP, data);
        },
        addApp({ commit }, data) {
            commit(ADD_APP, data);
        },
        delApp({ commit }, data) {
            commit(DEL_APP, data);
        },
        appDetailList({ commit }, data) {
            commit(LIST_DETAIL, data);
        },
        configIp({ commit }, data) {
            commit(CONFIG_IP, data);
        },
    },
    mutations: {
        [GET_APP_LIST](state) {
            getAppList(state);
        },
        [INSTALL_APP](state, data) {
            installApp(state, data);
        },
        [RESTART_APP](state, data) {
            restartApp(state, data);
        },
        [START_APP](state, data) {
            startApp(state, data);
        },
        [STOP_APP](state, data) {
            stopApp(state, data);
        },
        [UNINSTALL_APP](state, data) {
            uninstallApp(state, data);
        },
        [DEVICE_APP_LIST_IP](state, data) {
            deviceAppListIp(state, data);
        },
        [ADD_APP](state, data) {
            addApp(state, data);
        },
        [DEL_APP](state, data) {
            delApp(state, data);
        },
        [LIST_DETAIL](state, data) {
            appDetailList(state, data);
        },
        [UPDATE_APP](state, data) {
            updateApp(state, data);
        },
        [UPDATE_OF_APP](state, data) {
            updateOfApp(state, data);
        },
        [CONFIG_IP](state, data) {
            configIp(state, data);
        },
    },
    getters: {

    }
};
