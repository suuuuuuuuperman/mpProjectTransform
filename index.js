#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var argv = process.argv;
var fileTransform = require('./utils/fileTransform');
var shelljs = require('shelljs');

if (argv.length < 4) {
    console.log('请输入正确的参数，a2w 支付宝小程序目录 微信小程序目录 如： a2w antmp wxmp');
    process.exit(1);
}
var fromPath = path.resolve(argv[2]);
var toPath = path.resolve(argv[3]);
var type = argv[4] ? path.resolve(argv[4]) : "ali2wx"; // 默认ali to wx

const typeTips = {
    ali: "支付宝小程序",
    wx: "微信小程序",
}
let fromType = type.split("2")[0];
let toType = type.split("2")[1];

let category = {};

function walk(fromPath, toPath) {
    var fileList = fs.readdirSync(fromPath);
    // console.log("文件名称：", fileList, fromPath);
    for (var index = 0; index < fileList.length; index++) {
        var name = fileList[index];
        var filePath = path.resolve(fromPath, name);

        // 更换文件名称
        var toFilePath = path.resolve(toPath, name.replace(/\.axml$/, '.wxml').replace(/\.acss$/, '.wxss'));
        if (isUnwanted(name)) {
            continue;
        }
        if (fs.lstatSync(filePath).isDirectory()) {
            fs.mkdirSync(toFilePath);
            walk(filePath, toFilePath);
        } else {
            fileTransform.to(filePath, toFilePath, type)
                // fs.createReadStream(filePath).pipe(fs.createWriteStream(toFilePath));
        }
    }
}

function initTransfer() {
    console.log("\n");
    console.log("\n");
    console.log("转换类型：", typeTips[fromType], " 转 ", typeTips[toType]);
    console.log("===============================================");
    console.log("=================== 转化开始 ==================");
    // 判断输入文件夹路径
    if (!fs.existsSync(fromPath)) {
        return console.log(`文件夹不存在: ${fromPath}`);
    }

    if (fromPath == toPath) {
        return console.log("来源与目标文件夹目录不能一致。");
    }

    // 判断输出文件夹路径
    if (fs.existsSync(toPath)) {
        console.log(`文件夹已存在:${toPath}`);
        shelljs.rm('-rf', toPath);
        console.log("直接删除; 等待转换");
    }
    console.log(`正常转换...`);
    fs.mkdirSync(toPath);
    walk(fromPath, toPath);
    console.log("=================== 转化结束 ==================");
    console.log("===============================================");
    console.log("\n");
    console.log("\n");
}

function isUnwanted(filename) {
    return /(?:Thumbs\.db|\.DS_Store|\.git|node_modules)$/i.test(filename);
}

// 初始化
initTransfer();


// 命令 node index /Users/huangchao/Desktop/ofo/weapp_ofo/zhifubao_app/ofo /Users/huangchao/Desktop/ofo/weapp_ofo/zhifubao_app/ofo_wx