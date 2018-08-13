/**
 * @ JSON_MAP
 * @ decription 针对不同小程序mp 匹配对应的配置说明。
 * @ version 0.0.1 主要是window相关，tab相关未处理
 * @ warning 部分属性不支持，部分属性类型不统一，部分属性可能会出现「局部」匹配，需要注意。
 */

console.log("jsonMap running");
// 默认 JSON 配置及描述
const DEFAULT_JSON_CONF = {
    "navigationBarTitleText": {
        name: "头部说明",
        type: "#ffffff",
        support: ["wx", "ali"],
    },
    "navigationBarBackgroundColor": {
        name: "头部导航背景",
        type: "black",
        support: ["wx", "ali"],
    },
    "navigationBarTextStyle": {
        name: "头部导航字体颜色",
        type: String,
        support: ["wx"],
    },
    "backgroundColor": {
        name: "窗口的背景色",
        type: "#eeeeee",
        support: ["wx"],
    },
    "backgroundTextStyle": {
        name: "下拉 loading 的样式",
        type: "light",
        support: ["wx"],
    },
    "enablePullDownRefresh": {
        name: "是否开启下拉刷新",
        type: Boolean,
        support: ["wx", "ali"],
    },
    "disableScroll": {
        name: "页面是否可以上下滚动",
        type: Boolean, // 设置为 true 则页面整体不能上下滚动；只在 page.json 中有效，无法在 app.json 中设置该项
        support: ["wx"],
    },
    "onReachBottomDistance": {
        name: "页面上拉触底事件触发时距页面底部距离，单位为px",
        type: Number,
        support: ["wx"],
    },
    "allowsBounceVertical": {
        name: "页面是否支持纵向拽拉超出实际内容。默认 YES",
        type: String,
        support: ["ali"],
    }
}

// 微信 JSON 配置
const WX_JSON_CONF = {
    "navigationBarTitleText": {
        name: "头部说明",
        tag: "navigationBarTitleText",
        type: "#ffffff", // 如"#000000"
    },
    "navigationBarBackgroundColor": {
        name: "头部导航背景",
        tag: "navigationBarBackgroundColor",
        type: "black", // 仅支持 black/white
    },
    "navigationBarTextStyle": {
        name: "头部导航字体颜色",
        tag: "navigationBarTextStyle",
        type: String,
    },
    "backgroundColor": {
        name: "窗口的背景色",
        tag: "backgroundColor",
        type: "#eeeeee",
    },
    "backgroundTextStyle": {
        name: "下拉 loading 的样式",
        tag: "backgroundTextStyle",
        type: "light", // 仅支持 dark/light
    },
    "enablePullDownRefresh": {
        name: "是否开启下拉刷新",
        tag: "enablePullDownRefresh",
        type: Boolean,
    },
    "disableScroll": {
        name: "页面是否可以上下滚动",
        tag: "disableScroll",
        type: Boolean, // 设置为 true 则页面整体不能上下滚动；只在 page.json 中有效，无法在 app.json 中设置该项
    },
    "onReachBottomDistance": {
        name: "页面上拉触底事件触发时距页面底部距离，单位为px",
        tag: "onReachBottomDistance",
        type: Number,
    }
}

// 支付宝 JSON 配置
const ALI_JSON_CONF = {
    "navigationBarTitleText": {
        name: "头部说明",
        tag: "defaultTitle",
        type: "#ffffff"
    },

    "navigationBarBackgroundColor": {
        name: "头部导航背景",
        tag: "titleBarColorMock", // 转换时用了 titleBarColorMock
        officialTag: "titleBarColor", // 官方导航背景颜色参数 titleBarColor
        type: "十进制",
    },

    "navigationBarTextStyle": {
        name: "头部导航字体颜色",
        tag: "titleBarTextColor",
        isOfficial: false,
        type: String,
    },

    "enablePullDownRefresh": {
        name: "是否开启下拉刷新",
        tag: "pullRefresh",
        type: Boolean,
    },

    "allowsBounceVertical": {
        name: "页面是否支持纵向拽拉超出实际内容。默认 YES",
        tag: "allowsBounceVertical",
        type: String, // 仅支持 Yes/No
    }
}

module.exports = {
    DEFAULT_JSON_CONF,
    wx: WX_JSON_CONF,
    ali: ALI_JSON_CONF
}