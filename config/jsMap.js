/**
 * @ JS_MAP
 * @ decription 针对不同小程序mp 匹配对应的JS。
 * @ version 0.0.1
 * @ warning 
 */

// 默认 JS 配置及描述
const DEFAULT_JS_CONF = {
    "customTagEvtPrefix": {
        name: "自定义组件绑定事件名称前缀",
        type: String,
        support: ["wx", "ali"],
    },

    "MINIAPP_CONF_PLATFORM_NAME": {
        name: "小程序平台配置平台名称",
        type: String,
        support: ["wx", "ali"],
    },

    "OFO_MINIMP_CONFIG": {
        name: "小程序平台环境配置",
        type: String,
        support: ["wx", "ali"],
    },
}

// 微信 JS 配置
const WX_JS_CONF = {
    "customTagEvtPrefix": {
        name: "自定义组件绑定事件名称前缀",
        tag: "onEvt",
        type: String,
    },

    "MINIAPP_CONF_PLATFORM_NAME": {
        name: "小程序平台配置平台名称",
        tag: "WECHAT_MINIAPP_PLATFORM",
        type: String,
    },

    "OFO_MINIMP_CONFIG": {
        name: "小程序平台环境配置",
        tag: "OFO_WECHAT_CONFIG",
        type: String,
    }
}

// 支付宝 JS 配置
const ALI_JS_CONF = {
    "customTagEvtPrefix": {
        name: "自定义组件绑定事件名称前缀",
        tag: "onevt",
        type: String,
    },

    "MINIAPP_CONF_PLATFORM_NAME": {
        name: "小程序平台配置平台名称",
        tag: "ALIPAY_MINIAPP_PLATFORM",
        type: String,
    },

    "OFO_MINIMP_CONFIG": {
        name: "小程序平台环境配置",
        tag: "OFO_ALIPAY_CONFIG",
        type: String,
    }
}

module.exports = {
    DEFAULT_JS_CONF,
    wx: WX_JS_CONF,
    ali: ALI_JS_CONF
}