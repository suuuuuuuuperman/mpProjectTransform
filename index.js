#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var shelljs = require('shelljs');
var fileTransform = require('./utils/fileTransform');
var DEFAULT_CONF = require("./config/DEFAULT_CONF");

var argv = process.argv;
const { CONSOLE_STYLE } = DEFAULT_CONF;

// 参数判断
if (argv.length < 4) {
    console.log('参数有误。标准：命令 源目录 目标目录 转换类型。');
    process.exit(1);
}

// 目录相关
var fromPath = path.resolve(argv[2]);
var toPath = path.resolve(argv[3]);
const rootDir = fromPath.split("/")[fromPath.split("/").length - 1];

// 转换类型
var type = argv[4] ? argv[4] : "ali2wx"; // 默认ali to wx
let fromType = type.split("2")[0];
let toType = type.split("2")[1];

// 遍历
function goThrough(fromPath, toPath) {
    var fileList = fs.readdirSync(fromPath);
    // console.log("文件名称：", fileList, fromPath);
    for (var index = 0; index < fileList.length; index++) {
        var name = fileList[index];
        var filePath = path.resolve(fromPath, name);

        var needIgnore = isIgnored(name);
        if (needIgnore) {
            // console.log("needIgnore: ", needIgnore, name);
            continue;
        }

        // 更换文件名称
        var toFilePath = path.resolve(toPath, name.replace(/\.axml$/, '.wxml').replace(/\.acss$/, '.wxss'));

        // 如果是目录，继续遍历
        if (fs.lstatSync(filePath).isDirectory()) {
            fs.mkdirSync(toFilePath);
            goThrough(filePath, toFilePath);
        }

        // 如果是文件，直接文件转换
        else {
            fileTransform(filePath, toFilePath, type, rootDir);
        }
    }
}

// 进入转化流程
function startTrip() {
    console.log("\n");
    console.log("\n");
    console.log("转换类型：", DEFAULT_CONF.typeTips[fromType], " 转 ", DEFAULT_CONF.typeTips[toType]);
    console.log('\x1B[33m%s\x1b[0m', "===============================================");
    console.log('\x1B[33m%s\x1b[0m', "=================== 转化开始 ==================");
    console.log("\n");
}

// 完成转化流程
function finishTrip() {
    console.log("\n");
    console.log('\x1B[33m%s\x1b[0m', "=================== 转化结束 ==================");
    console.log('\x1B[33m%s\x1b[0m', "===============================================");
    console.log("\n");
    console.log("\n");
}

// 转换文件
function transformFile(fromPath, toPath) {
    process.stdout.write("step 3: 开始转化文件");
    goThrough(fromPath, toPath);

    process.stdout.write('\x1B[32m');
    process.stdout.write('     √ \n');
    process.stdout.write('\x1b[0m');
}

// 创建目标目录
function createTargetDir(toPath) {
    process.stdout.write("step 2: 创建目标目录");

    // 判断输出文件夹路径
    if (fs.existsSync(toPath)) {
        // process.stdout.write(`\n     --文件夹已存在:${toPath}`);
        shelljs.rm('-rf', toPath);
        // process.stdout.write("\n     --直接删除; 等待转换");
    }
    try {
        fs.mkdirSync(toPath);
    } catch (e) {
        console.log("step : 创建目标目录失败");
    }

    process.stdout.write('\x1B[32m');
    process.stdout.write('     √ \n');
    process.stdout.write('\x1b[0m');
}

// 检测原文件目录
function checkSourceDir(fromPath, toPath) {
    process.stdout.write("step 1: 检测来源目录");

    // 判断输入文件夹路径
    if (!fs.existsSync(fromPath)) {
        let errorMsg = `文件夹不存在: ${fromPath}`;
        console.log("errorMsg: ", errorMsg);
        throw errorMsg;
    }

    if (fromPath == toPath) {
        let errorMsg = "来源与目标文件夹目录不能一致。";
        console.log("errorMsg: ", errorMsg);
        throw errorMsg;
    }

    process.stdout.write('\x1B[32m');
    process.stdout.write('     √ \n');
    process.stdout.write('\x1b[0m');
}

// 初始化转换
function initTransfer() {
    // 启动项目转换
    startTrip();

    try {
        // 检测来源目录
        checkSourceDir(fromPath, toPath);

        // 创建目标目录
        createTargetDir(toPath);

        // 开始转化文件
        transformFile(fromPath, toPath);
    } catch (error) {
        console.log("！！！转换异常：", error);
    }

    // 结束项目转换
    finishTrip();
}

// 忽略无需转化的文件及文件夹
function isIgnored(filename) {
    return /(?:\.DS_Store|\.git|node_modules|\.tea)$/i.test(filename);
}

// 初始化
initTransfer();