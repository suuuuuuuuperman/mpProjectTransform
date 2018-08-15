var fs = require('fs');
let CSS_MAP = require("../config/cssMap");

// 期望map输出
function targetMatching(type) {
    try {
        let fromType = type.split("2")[0];
        let toType = type.split("2")[1];

        let targetMap = {};

        for (let key in CSS_MAP[fromType]) {
            let fromItem = CSS_MAP[fromType][key];
            let toItem = CSS_MAP[toType][key];

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

// CSS 文件编译转换
function cssTransform(to, file, type) {
    // 期望map关系
    let targetMap = targetMatching(type);

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


    file = file.replace('.acss"', '.wxss"').replace('.acss\'', '.wxss\'');

    // 结束：文件写入
    fs.writeFile(to, file, function(err) {
        if (err) throw err;
    });
}

module.exports = cssTransform;