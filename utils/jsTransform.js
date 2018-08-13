var fs = require('fs');
let CONF_MAP = require("../config/jsMap");

// 文件限制
const promisePath = "utils/blueBird.js";
const runtimePath = "utils/regenerator-runtime/runtime-module.js";
const ofoTrackPath = "utils/ofotrack-app.js";
const ofoTrackPath2 = "utils/ofotrack-conf.js";

// 无需引入promise和async的文件
const noPromiseAndAsyncFiles = [
    promisePath,
    runtimePath,
    ofoTrackPath,
    ofoTrackPath2
];

// 期望map输出
function targetMatching(type) {
    try {
        let fromType = type.split("2")[0];
        let toType = type.split("2")[1];

        let targetMap = {};

        for (let key in CONF_MAP[fromType]) {
            let fromItem = CONF_MAP[fromType][key];
            let toItem = CONF_MAP[toType][key];

            if (fromItem && toItem) {
                let fromTag = fromItem.tag;
                let toTag = toItem.tag;
                targetMap[fromTag] = {
                    target: toTag
                }
            }
        }

        return targetMap;
    } catch (e) {
        console.log("=======================================");
        console.log("targetMatching 异常。 type: ", type);
        console.log("=======================================");
        return false;
    }
}

let flag = true;

// 文件编译转换
function jsTransform(from, to, file, type) {
    // 期望map关系
    let targetMap = targetMatching(type);

    if (!targetMap) {
        console.log("=======================================");
        console.log("targetMap异常。type: ", type);
        return console.log("=======================================");
    }

    // 调试
    if (flag) {
        console.log("targetMap: ", JSON.stringify(targetMap));
        flag = false;
    }

    // 转换
    for (let key in targetMap) {
        var regx = new RegExp(key, 'g');
        file = file.replace(regx, targetMap[key].target);
    }

    // ================================================
    // ================================================
    // 确认当前项目的根目录
    // let from1 = from.split("zhifubao_app/ofo/")[1];
    let from1 = from.split("weapp_ofo/ofo_common_mp/")[1];

    // 当前路径相对根目录的层级
    let length = from1.split('/').length - 1;

    // 相对路径
    let relativePath = "";
    if (length == 0) {
        relativePath = "./";
    } else {
        for (let i = 0; i < length; i++) {
            relativePath += "../";
        }
    }

    // 三方sdk不加入，不加入regenerator-runtime和promise等兼容包
    if (noPromiseAndAsyncFiles.indexOf(from1) == -1 && from1.indexOf("regenerator-runtime") == -1) {
        file = `import regeneratorRuntime from "${relativePath + runtimePath}";\n` + file;
        // file = `require("${relativePath + runtimePath}");\n` + file;
        file = file.replace(/my\./g, 'wx.');
    }

    // 结束：文件写入
    fs.writeFile(to, file, function(err) {
        if (err) throw err;
    });
}

module.exports = jsTransform;