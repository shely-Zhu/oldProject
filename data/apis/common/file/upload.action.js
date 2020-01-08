/*
 * @page: 附件上传（暂时用于投资者分类、合格投资者、可多文件上传）
 * @Author: songxiaoyu
 * @Date:   2018-07-20 10:34:41
 * @Last Modified by:   songxiaoyu
 * @Last Modified time: 2018-07-20 10:37:08
 * @description:
 */
// 使用 Mock
var Mock = require('mockjs');

// 请求参数
/*{
    "file": "选择上传文件"
    "businessType": "" //tzzfl 投资者分类,hgtzz 合格投资者
}
*/
var upload = Mock.mock({
    "hmac": "hmac",
    "status": "0",
    "code": "CS0000",
    "msg": "处理成功！",
    "data": {
        "fileId": ["001", "001"]
    }
});

module.exports = upload;