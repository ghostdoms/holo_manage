import axios from 'axios';
import config from '../config/config';
import { encode } from '../config/config';
import {base} from '../router/index';
function goPath(path) {
    window.path.push({
        path: path
    });
};
const instance = axios.create({
    baseURL: config.baseUrl,
    //withCredentials: true
});
/* add license || update license*/
export function addLicense(state, data) {
    instance({
        url: '/license/update',
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        if (response.status == 200) {
            state.alertType = 'succ';
            state.alertInfo = 'operation completed.';
            setTimeout(function() {
                state.alertType = '';
                if (location.pathname.indexOf('device') > -1) {
                    state.isBase = false;
                } else {
                    goPath(base()+'/device')
                }
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'Wrong license，please select the correct license';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            if (location.pathname == '/device') {
                state.alertInfo = 'Wrong license，please select the correct license';
                setTimeout(function() {
                    state.alertInfo = '';
                }, 2000);
            } else {
                state.alertType = 'err';
                state.alertInfo = 'Wrong license，please select the correct license';
                setTimeout(function() {
                    state.alertType = '';
                }, 2000);
                state.initNo = 0;
            }
        }
    );
}

/* delete license */
export function deleteLicense(state) {
    instance({
        url: '/license/delete',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        if (response.status == 200) {
            state.alertType = 'succ';
            state.alertInfo = 'operation completed.';
            setTimeout(function() {
                state.alertType = '';
                state.isBase=true;
                goPath(base()+'/device');
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'delete failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }


    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'delete failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    );
}
/* licensenfo */
export function licensenfo(state) {
    instance({
        url: '/license/info',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        if (response.status == 200) {
            state.info = response.data.data;
            state.userCount=response.data.data.user_count;
        }
    }).catch(
        function(error) {
            console.error(error);
        }
    );
}
/* isValid */
export function isValid(state) {
    instance({
        url: '/license/isValid',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        if (response.status == 200) {
            var response = response.data;
            if (response.data == true) {
                state.hasValid = true;
            } else {
                state.hasValid = false;
                if (location.pathname != '/license') {
                    setTimeout(function() {
                        goPath(base()+'/license');
                    }, 0);
                }

            }
        };
    }).catch(
        function(error) {
            console.error(error);
        }
    );
}
/* exist */
export function exist(state) {
    instance({
        url: '/license/exist',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        if (response.status == 200) {
            var response = response.data;
            if (response.data == true) {
                console.log(response.data)
                state.isBase = false;
                isValid(state);
            } else {
                state.isBase = true;
            }
        }
    }).catch(
        function(error) {
            state.isBase = true;
        }
    );
}
