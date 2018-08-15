/**
 * @ CSS_MAP
 * @ decription 针对不同小程序mp 匹配对应的CSS样式。
 * @ version 0.0.1 主要是引入css名称，以及backgroundurl检测
 * @ warning 
 */

// 默认 JSON 配置及描述
const DEFAULT_CSS_CONF = {
    "fileSuffix": {
        name: "文件后缀",
        type: String,
        support: ["wx", "ali"],
    }
}

// 微信 JSON 配置
const WX_CSS_CONF = {
    "fileSuffix": {
        name: "文件后缀",
        tag: ".wxss",
        type: String,
    },

    // "fileSuffix1": {
    //     name: "文件引入后缀",
    //     tag: ".wxss\"",
    //     type: String,
    // },

    // "fileSuffix2": {
    //     name: "文件引入后缀",
    //     tag: ".wxss\'",
    //     type: String,
    // },
}

// 支付宝 JSON 配置
const ALI_CSS_CONF = {
    "fileSuffix": {
        name: "文件后缀",
        tag: ".acss",
        type: String,
    },

    // "fileSuffix1": {
    //     name: "文件引入后缀",
    //     tag: ".acss\"",
    //     type: String,
    // },

    // "fileSuffix2": {
    //     name: "文件引入后缀",
    //     tag: ".acss\'",
    //     type: String,
    // },
}

module.exports = {
    DEFAULT_CSS_CONF,
    wx: WX_CSS_CONF,
    ali: ALI_CSS_CONF
}