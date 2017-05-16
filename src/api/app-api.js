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
/*-------------------------------device about app-----------------------------------------------------*/
/*device for app ip list */
export function deviceAppListIp(state, data) {
    instance({
        url: '/mg/device/listAppsByIp',
        method: 'POST',
        data: encode(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data.data;
        state.getAppData = response;
    }).catch(
        function(error) {
            console.error(error.response);
        }
    );
}
/*update app*/
export function updateApp(state, data) {
    instance({
        url: '/mg/application/update',
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
            setTimeout(function() {
                state.alertType = '';
                refrsh(state, 0);
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'update failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'update failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    );
};
/*install app*/
export function installApp(state, data) {
    state.alertType = 'succ';
    state.alertInfo = 'installing';
    state.initNo = 0;
    instance({
        url: '/mg/application/install',
        method: 'POST',
        data: encode(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            checkApp(data.device_id, state);
        } else {
            state.alertType = 'err';
            state.alertInfo = 'install failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'install failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    );
};
/*checkout state*/
export function checkApp(id, state) {
    instance({
        url: '/mg/application/checkInstallState?id=' + id,
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        if (response.data.data == '200') {
            state.alertInfo = 'operation completed.';
            setTimeout(function() {
                state.alertType = '';
                refrsh(state, 0);
            }, 2000);
        } else if (response.data.data == '204') {
            setTimeout(function() {
                checkApp(id, state);
            }, 2000)
        }
    }).catch(
        function(error) {
            console.error(error);
        }
    );
};
/*restart app*/
export function restartApp(state, data) {
    instance({
        url: '/mg/application/restart',
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
            setTimeout(function() {
                state.alertType = '';
                refrsh(state, 0);
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
};
/*start app*/
export function startApp(state, data) {
    instance({
        url: '/mg/application/start',
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
            setTimeout(function() {
                state.alertType = '';
                refrsh(state, 0);
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'start failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'start failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    );
};
/*stop app*/
export function stopApp(state, data) {
    instance({
        url: '/mg/application/stop',
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
            setTimeout(function() {
                state.alertType = '';
                refrsh(state, 0);
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'stop failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'stop failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    );
};
/*uninstall app*/
export function uninstallApp(state, data) {
    state.alertInfo = 'uninstallApp ...';
    instance({
        url: '/mg/application/uninstall',
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
            setTimeout(function() {
                state.alertType = '';
                refrsh(state, 0);
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'uninstall failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'uninstall failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    );
};
/*-------------------------------------only app---------------------------------------------------------*/
/*get-APP-list*/
export function getAppList(state) {
    instance({
        url: '/mg/application/list',
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            state.appListData = response.data;
        } else {
            console.error(response);
        }
    }).catch(
        function(error) {
            console.error(error.response);
        }
    );
};

/*update app*/
export function updateOfApp(state, data) {
    instance({
        url: '/mg/application/update',
        method: 'POST',
        data: data,
        headers: {
            // 'Content-Type': 'application/x-www-form-urlencoded'
        },
        onUploadProgress: function(progressEvent) {
            console.log(data);
            var percent = progressEvent.loaded / progressEvent.total; //计算百分比
            state.Progress = percent;
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            state.alertType = 'succ';
            state.alertInfo = 'update succ';
            state.go = 'Go';
            setTimeout(function() {
                state.alertType = '';
                goPath(base()+'/application')
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'update failed,please check your device and try again.';
            state.go = 'Go';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'update failed,please check your device and try again.';
            state.go = 'Go';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    );
};
/*add app || upload*/
export function addApp(state, data) {
    var percent;
    instance({
        url: '/mg/application/upload',
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        onUploadProgress: function(progressEvent) {
            percent = progressEvent.loaded / progressEvent.total; //计算百分比
            state.Progress = percent;
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            state.Progress = -1;
            state.alertType = 'succ';
            state.alertInfo = 'operation completed.';
            state.go = 'Go';
            setTimeout(function() {
                state.alertType = '';
                goPath(base()+'/application');
            }, 2000);
            state.initNo = 0;
        } else {
            state.Progress = -1;
            state.alertType = 'err';
            state.alertInfo = 'add failed,please check your device and try again.';
            state.go = 'Go';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.Progress = -1;
            state.alertType = 'err';
            state.alertInfo = 'add failed,please check your device and try again.';
            state.go = 'Go';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    );
};
/*delete app*/
export function delApp(state, data) {
    instance({
        url: '/mg/application/delete',
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
            setTimeout(function() {
                state.alertType = '';
                refrshApp(state, 0);
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
export function appDetailList(state, data) {
    instance({
        url: '/mg/application/listDetail',
        method: 'POST',
        data: encode(data),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(response) {
        var response = response.data;
        if (response.code == 10200) {
            state.listDetail = response.data;
        } else {
            console.error(response)
        }
    }).catch(
        function(error) {
            console.error(error.response);
        }
    );
}

/*config ip*/
export function configIp(state, data) {
    instance({
        url: '/mg/application/configure',
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
            setTimeout(function() {
                state.alertType = '';
                refrsh(state, 0);
            }, 2000);
            state.initNo = 0;
        } else {
            state.alertType = 'err';
            state.alertInfo = 'configure failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    }).catch(
        function(error) {
            state.alertType = 'err';
            state.alertInfo = 'configure failed,please check your device and try again.';
            setTimeout(function() {
                state.alertType = '';
            }, 2000);
            state.initNo = 0;
        }
    );
}
/*-----------------------------------common Fn---------------------------------------------------*/
/*return id*/
export function getPathId() {
    var id = '';
    var path = location.pathname;
    var len = path.split('/').length;
    id = path.split('/')[len - 1];
    return id;
}
/*refrsh list about device app*/
export function refrsh(state, time) {
    setTimeout(function() {
        if (location.pathname.indexOf('application') > -1) {
            appDetailList(state, {
                appId: getPathId()
            })
        } else {
            deviceAppListIp(state, {
                id: getPathId()
            })
        }
    }, time);
}
/**/
/*refrsh list about only app*/
export function refrshApp(state, time) {
    setTimeout(function() {
        getAppList(state)
    }, time);
}
