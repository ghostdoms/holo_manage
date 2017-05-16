/**
 * Created by admin on 2017/1/10.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import device from './modules/device';
import app from './modules/app';
import license from './modules/license';
import 'babel-polyfill';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        device:device,
        app:app,
        license:license,
    },
});
