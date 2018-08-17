/**
 * 对微信的异步api做了promise的二次包装
 * 参数的字段格式完全和微信api一样
 */

const newWx = () => {
    const _getPromise = (fn, options = {}, showLoading) => {
        if (showLoading) { wx.showLoading({ title: '加载中...' }); }

        return new Promise((resolve, reject) => {
            options.success = (res) => { resolve(res); };
            options.fail = (err) => { reject(err); };
            options.complete = () => { if (showLoading) { wx.hideLoading(); } };

            fn(options);
        });
    };

    return {
        /**
         * wx request
         * @type {[type]}
         */
        request: (options) => {
            return _getPromise(wx.request, options, true);
        },

        /**
         * request的get方法
         * @type {[type]}
         */
        get: (options) => {
            options.method = 'GET';

            return _getPromise(wx.request, options, true);
        },

        /**
         * request的post方法
         * @type {[type]}
         */
        post: (options) => {
            options.method = 'POST';

            return _getPromise(wx.request, options, true);
        },

        login: (options) => {
            return _getPromise(wx.login, options, true);
        },

        checkSession: (options) => {
            return _getPromise(wx.checkSession, options);
        },

        authorize: (options) => {
            return _getPromise(wx.authorize, options);
        },

        getSetting: (options) => {
            return _getPromise(wx.getSetting, options);
        },

        openSetting: (options) => {
            return _getPromise(wx.openSetting, options);
        },

        getUserInfo: (options) => {
            return _getPromise(wx.getUserInfo, options);
        },

        showModal: (options) => {
            return _getPromise(wx.showModal, options);
        },
        showErrorModal: () => {
            const options = {};
            options.titlle = '提示';
            options.content = '网络错误，是否重新请求？';
            return _getPromise(wx.showModal, options);
        },
        setStorage: (options) => {
            return _getPromise(wx.setStorage, options);
        }
    };
};

module.exports = newWx();
