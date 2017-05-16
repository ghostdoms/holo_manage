import axios from 'axios';
import config from '../config/config';
import { encode } from '../config/config';
import {base} from '../router/index';
export function path(router, path) {
    if (router != undefined) {
        window.path = router;
    }
};
function goPath(path) {
    window.path.push({
        path: path
    });
};

const instance = axios.create({
    baseURL: config.baseUrl,
    //withCredentials: true
});
/*get device default list*/
export function getDeviceDefaultList(state) {
    instance({
        url: '/mg/device/listDefault',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data.data;
        state.getListData = response;
        state.loading=true;
    }).catch(

        function(error) {
            console.error(error.response);
        }
    );
}
/*get device list*/
export function getDeviceList(state) {
    instance({
        url: '/mg/device/list',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        state.deviceCount = response.data.data.device_count;
        var response = response.data.data.devices;
        state.getListData = response;
        state.loading = false;
    }).catch(
        function(error) {
            console.error(error.response);

        }
    );
}
/*device add*/
export function addDevice(state, data) {
    instance({
        url: '/mg/device/add',
        method: 'POST',
        data: encode(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            setTimeout(function() {
                goPath(base()+'/device')
            }, 0);
        } else {
            console.error(response.msg)
        }
    }).catch(
        function(error) {
            console.error(error);
        }
    );
}
/*device delete*/
export function deleteDevice(state, data) {
    instance({
        url: '/mg/device/delete',
        method: 'POST',
        data: encode(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            state.alertType = 'succ';
            state.alertInfo = 'operation completed.';
            getDeviceDefaultList(state);
            setTimeout(function() {
                state.alertType = '';
                getDeviceList(state);
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'delete failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000)
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'delete failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000)
            state.initNo = 0;
        }
    );
}
/*device for app list*/
// export function deviceAppList(state, data) {
//     instance({
//         url: '/mg/device/listAppsByDevice',
//         method: 'POST',
//         data: encode(data),
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         }
//     }).then(function(response) {
//         var response = response.data.data;
//         console.log(response);
//         //state.getListData = response;
//     }).catch(
//         function(error) {
//             console.error(error);
//         }
//     );
// }
/*pair device*/
export function pairDevice(state, data) {
    instance({
        url: '/mg/device/pair',
        method: 'POST',
        data: encode(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            setTimeout(function() {
                goPath(base()+'/device')
            }, 0);
        } else {
            console.error(response.msg)
        }
    }).catch(
        function(error) {
            console.error(error);
        }
    );
}
/*start pair device*/
export function startPairDevice(state, data) {
    instance({
        url: '/mg/device/isPair',
        method: 'POST',
        data: encode(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            if (response.data == true) {
                state.pinType = 0;
                state.initNo = 0;
            } else if (response.data == false) {
                state.pinType = 1;
                state.initNo = 0;
            }
        };
    }).catch(
        function(error) {
            // console.error(error.response);
            state.pinType = 2;
            state.initNo = 0;
        }
    );
}
/*restart device*/
export function restartDevice(state, data) {
    instance({
        url: '/mg/device/restart',
        method: 'POST',
        data: encode(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            state.alertType = 'succ';
            state.alertInfo = 'operation completed.';
            getDeviceDefaultList(state);
            setTimeout(function() {
                state.alertType = '';
                getDeviceList(state);
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'restart failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'restart failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    );
}
/*shutdown device*/
export function shutdownDevice(state, data) {
    instance({
        url: '/mg/device/shutdown',
        method: 'POST',
        data: encode(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            state.alertType = 'succ';
            state.alertInfo = 'operation completed.';
            getDeviceDefaultList(state);
            setTimeout(function() {
                state.alertType = '';
                getDeviceList(state);
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'shut down failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000)
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'shut down failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000)
            state.initNo = 0;
        }
    );
}
