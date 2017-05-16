import { addLicense, deleteLicense, licensenfo, isValid, exist,  } from '../../api/license-api';
export const ADD_LICENSE = 'ADD_LICENSE'; 
export const DELETE_LICENSE = 'DELETE_LICENSE'; 
export const LICENSE_INFO = 'LICENSE_INFO'; 
export const IS_VALID = 'IS_VALID'; 
export const EXIST = 'EXIST'; 
export default{
	state:{
		isBase: true,
		hasValid:true,
		info:'',
        alertType:'',
        alertInfo:'',
        initNo:0,
        userCount:'',
	},
	actions:{
		addLicense({ commit },data) {
            commit(ADD_LICENSE,data);
        },
        deleteLicense({ commit }) {
            commit(DELETE_LICENSE);
        },
        licensenfo({ commit }) {
            commit(LICENSE_INFO);
        },
        isValid({ commit }) {
            commit(IS_VALID);
        },
        exist({ commit }) {
            commit(EXIST);
        },
	},
	mutations:{
		[ADD_LICENSE](state,data) {
            addLicense(state,data);
        },
        [DELETE_LICENSE](state) {
            deleteLicense(state);
        },
        [LICENSE_INFO](state) {
            licensenfo(state);
        },
        [IS_VALID](state) {
            isValid(state);
        },
        [EXIST](state) {
            exist(state);
        },
	}

}