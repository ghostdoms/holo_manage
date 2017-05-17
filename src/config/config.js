const config = {
	//'baseUrl':'http://192.168.2.60:8823',
	//'baseUrl':'http://192.168.1.194:8823',
	//'baseUrl':'http://192.168.8.250:8823',
	'baseUrl':'/holocenter/',
};
export default config;

export function encode(data) { //序列化表单
    let ret = ''
    for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret;
};