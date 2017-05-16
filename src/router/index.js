import Vue from 'vue';
import Router from 'vue-router';
/*device module*/
import Device from '@/components/device/Device';
import MoreDevice from '@/components/device/More';
import Add from '@/components/device/Add';
/*app module*/
import Application from '@/components/app/Application';
import Addapp from '@/components/app/Add';
import Uploadapp from '@/components/app/Upload';
import MoreApp from '@/components/app/More';
/*license module*/
import License from '@/components/license/License';

Vue.use(Router);
export function base(){
    const base='/admin';
    return base;
};
const routes = [{
    path: base()+'/',
    redirect: base()+'/device',
    component: Device
}, {
    path: base()+'/device',
    component: Device,
    children: [{
        path: base()+'more/:id',
        component: MoreDevice
    }, {
        path: base()+'add',
        component: Add
    }]
}, {
    path: base()+'/application',
    component: Application,
    children: [{
        path: base()+'add',
        component: Addapp
    }, {
        path: base()+'upload/:id',
        component: Uploadapp
    }, {
        path: base()+'more/:id',
        component: MoreApp
    }]
}, {
    path: base()+'/license',
    component: License
}]

export default new Router({
    mode: 'history',
    base: __dirname,
    routes
});
