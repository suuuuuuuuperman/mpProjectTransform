var MP_XML_TRANSFORM = require('mp_xml_transform');
var fs = require('fs');
var shelljs = require('shelljs');
var jsonTransform = require("./jsonTransform");
var cssTransform = require("./cssTransform");
var jsTransform = require("./jsTransform");

function to(from, to, type) {
    file = fs.readFileSync(from, 'utf8');

    // xml文件内容替换
    if (/\.axml$/i.test(from)) {
        // console.log(from)
        file = MP_XML_TRANSFORM.transform(file);
        fs.writeFile(to, file, function(err) {
            if (err) throw err;
        });
    }

    // js文件内容替换
    else if (/\.js$/i.test(from)) {
        return jsTransform(from, to, file, type);
    }

    // json文件内容配置
    else if (/\.json$/i.test(from)) {
        return jsonTransform(to, file, type);
    }

    // css文件内容替换
    else if (/\.acss$/i.test(from)) {
        return cssTransform(to, file, type);
    }

    // 其他直接写入复制
    else {
        shelljs.cp(from, to);
    }
}
module.exports = {
    to: to
}