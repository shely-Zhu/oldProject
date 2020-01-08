/*
 * @page: 基金诊断-综合定性评价
 * @Author: songxiaoyu
 * @Date:   2019-08-16 15:17:35
 * @Last Modified by:   songxiaoyu
 * @description:
 */

var Mock = require('mockjs');


//开始造假数据…………………………………………………………………………………………………………………………………………………………


//1. 接口数据
var data = Mock.mock({
    "data": {
        "standardDate":'2019-08-22',
        "content": "<p><strong><span style=\";font-family:宋体;font-size:14px\">1. &nbsp;<span style=\"font-family:宋体\">风险收益能力：基金近一年收益战胜</span></span></strong><strong><span style=\"font-family: 宋体;letter-spacing: 0;font-size: 14px\">0.66%</span></strong><strong><span style=\";font-family:宋体;font-size:14px\">的同类基金，收益能力<span style=\"font-family:Calibri\"></span></span></strong></p><p><strong><span style=\"font-family: 宋体;letter-spacing: 0;font-size: 14px\">较强</span></strong><strong><span style=\";font-family:宋体;font-size:14px\">，风险控制能力</span></strong><strong><span style=\"font-family: 宋体;letter-spacing: 0;font-size: 14px\">较强</span></strong><strong><span style=\";font-family:宋体;font-size:14px\">；</span></strong></p><p><strong><span style=\";font-family:宋体;font-size:14px\">2. &nbsp;<span style=\"font-family:宋体\">行业配置：基金长期重仓</span></span></strong><strong><span style=\"font-family: 宋体;letter-spacing: 0;font-size: 14px\">银行</span></strong><strong><span style=\";font-family:宋体;font-size:14px\">行业，其余行业配置灵活；</span></strong></p><p><strong><span style=\";font-family:宋体;font-size:14px\">3. &nbsp;<span style=\"font-family:宋体\">基金操作：股票仓位控制在</span></span></strong><strong><span style=\"font-family: 宋体;letter-spacing: 0;font-size: 14px\">77.0000%</span></strong><strong><span style=\";font-family:宋体;font-size:14px\">左右，基金操作建议；</span></strong></p><p><strong><span style=\";font-family:宋体;font-size:14px\">4. &nbsp;<span style=\"font-family:宋体\">场景分析：基金在</span></span></strong><strong><span style=\"font-family: 宋体;letter-spacing: 0;font-size: 14px\">熊市市场</span></strong><strong><span style=\";font-family:宋体;font-size:14px\">市场中具有优势；</span></strong></p><p><strong><span style=\";font-family:宋体;font-size:14px\">5. &nbsp;<span style=\"font-family:宋体\">基金风格：基金</span></span></strong><strong><span style=\"font-family: 宋体;letter-spacing: 0;font-size: 14px\">套期保值</span></strong><strong><span style=\";font-family:宋体;font-size:14px\">。</span></strong></p>"
    },
    "message": "操作成功！",
    "status": "0000"
});





//根据传参数的不同进行处理

module.exports = data;