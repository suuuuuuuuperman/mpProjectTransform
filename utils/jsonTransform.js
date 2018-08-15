var fs = require('fs');

let JSON_MAP = require("../config/jsonMap");

// 期望map输出
function jsonMatching(type) {
    try {
        let fromType = type.split("2")[0];
        let toType = type.split("2")[1];

        let targetMap = {};

        for (let key in JSON_MAP[fromType]) {
            let fromItem = JSON_MAP[fromType][key];
            let toItem = JSON_MAP[toType][key];

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
        console.log("jsonMatching 异常。 type: ", type);
        console.log("=======================================");
        return false;
    }
}

let flag = true;

// JSON文件编译转换
function jsonTransform(to, file, type) {
    // 期望map关系
    let targetMap = jsonMatching(type);

    if (!targetMap) {
        console.log("=======================================");
        console.log("targetMap异常。type: ", type);
        return console.log("=======================================");
    }

    // 调试
    if (flag) {
        // console.log("targetMap: ", JSON.stringify(targetMap));
        flag = false;
    }

    // 转换
    for (let key in targetMap) {
        var regx = new RegExp(key, 'g');
        file = file.replace(regx, targetMap[key].target);
    }

    // 结束：文件写入
    fs.writeFile(to, file, function(err) {
        if (err) throw err;
    });
}

module.exports = jsonTransform;