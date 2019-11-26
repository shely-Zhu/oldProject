/*

  会员权益详情

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "data": {
        totalPage: 20,
        total: 1000,
        tradeList: [{
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessType: 3, //业务类型 1:申购 2：赎回 3：转让已完成 4：受让已完成 5：分红 6：预约撤单 7：预约过期
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                assignOperationNo: '1', //取消转让按钮
                assignStep: 1,
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 5, //预约状态 1：排队中，2：排队成功，3：已签约，4：合同审核成功，5：合同审核失败
                reserveStatusDesc: '排队中', //1：排队中，2：排队成功，3：已签约，4：合同审核成功，5：合同审核失败
                reserveSubStatus: 3, //预约状态的子状态 1：待理财师确认 2：待合格投资者认证 3：待签署电子合同 4：待上传汇款凭证
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveSubStatusDesc: '待签署电子合同',
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '理财师1', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG赎回', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessType: 2, //业务类型 1:申购 2：赎回 3：分红 4：预约撤单 5：预约过期 6：转让已完成 7：受让已完成
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 1, //预约状态 0:待确认，1：排队中，2：排队成功，3：到账中，4：已到帐，5：预约成功，21：已撤销，22：已过期，23：预约失败
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
            {
                projectId: 3,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG分红', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessType: 3, //业务类型 1:申购 2：赎回 3：分红 4：预约撤单 5：预约过期 6：转让已完成 7：受让已完成
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 1, //预约状态 0:待确认，1：排队中，2：排队成功，3：到账中，4：已到帐，5：预约成功，21：已撤销，22：已过期，23：预约失败
                reserveStatusDesc: '预约撤单',
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
            {
                projectId: 4,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG分红', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessType: 4, //业务类型 1:申购 2：赎回 3：分红 4：预约撤单 5：预约过期 6：转让已完成 7：受让已完成
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 1, //预约状态 0:待确认，1：排队中，2：排队成功，3：到账中，4：已到帐，5：预约成功，21：已撤销，22：已过期，23：预约失败
                reserveStatusDesc: '预约撤单',
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '范星星', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
            {
                projectId: 5,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG分红', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessType: 4, //业务类型 1:申购 2：赎回 3：分红 4：预约撤单 5：预约过期 6：转让已完成 7：受让已完成
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 1, //预约状态 0:待确认，1：排队中，2：排队成功，3：到账中，4：已到帐，5：预约成功，21：已撤销，22：已过期，23：预约失败
                reserveStatusDesc: '预约过期',
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '范星星', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
            {
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG分红', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '3.6', //业绩比较基准最小值
                businessCompareReferenceMax: '5.6', //业绩比较基准最大值
                businessType: 6, //业务类型 1:申购 2：赎回 3：分红 4：预约撤单 5：预约过期 6：转让已完成 7：受让已完成
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 1, //预约状态 0:待确认，1：排队中，2：排队成功，3：到账中，4：已到帐，5：预约成功，21：已撤销，22：已过期，23：预约失败
                reserveStatusDesc: '预约过期',
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '范星星', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG分红', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '3.6', //业绩比较基准最小值
                businessCompareReferenceMax: '5.6', //业绩比较基准最大值
                businessType: 6, //业务类型 1:申购 2：赎回 3：分红 4：预约撤单 5：预约过期 6：转让已完成 7：受让已完成
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 1, //预约状态 0:待确认，1：排队中，2：排队成功，3：到账中，4：已到帐，5：预约成功，21：已撤销，22：已过期，23：预约失败
                reserveStatusDesc: '预约过期',
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '范星星', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
            {
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG分红', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '3.6', //业绩比较基准最小值
                businessCompareReferenceMax: '5.6', //业绩比较基准最大值
                businessType: 6, //业务类型 1:申购 2：赎回 3：分红 4：预约撤单 5：预约过期 6：转让已完成 7：受让已完成
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 1, //预约状态 0:待确认，1：排队中，2：排队成功，3：到账中，4：已到帐，5：预约成功，21：已撤销，22：已过期，23：预约失败
                reserveStatusDesc: '预约过期',
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '范星星', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
            {
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG分红', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '3.6', //业绩比较基准最小值
                businessCompareReferenceMax: '5.6', //业绩比较基准最大值
                businessType: 6, //业务类型 1:申购 2：赎回 3：分红 4：预约撤单 5：预约过期 6：转让已完成 7：受让已完成
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 1, //预约状态 0:待确认，1：排队中，2：排队成功，3：到账中，4：已到帐，5：预约成功，21：已撤销，22：已过期，23：预约失败
                reserveStatusDesc: '预约过期',
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '范星星', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
            {
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG分红', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '3.6', //业绩比较基准最小值
                businessCompareReferenceMax: '5.6', //业绩比较基准最大值
                businessType: 6, //业务类型 1:申购 2：赎回 3：分红 4：预约撤单 5：预约过期 6：转让已完成 7：受让已完成
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 1, //预约状态 0:待确认，1：排队中，2：排队成功，3：到账中，4：已到帐，5：预约成功，21：已撤销，22：已过期，23：预约失败
                reserveStatusDesc: '预约过期',
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '范星星', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
            {
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG分红', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '3.6', //业绩比较基准最小值
                businessCompareReferenceMax: '5.6', //业绩比较基准最大值
                businessType: 6, //业务类型 1:申购 2：赎回 3：分红 4：预约撤单 5：预约过期 6：转让已完成 7：受让已完成
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                reserveStatus: 1, //预约状态 0:待确认，1：排队中，2：排队成功，3：到账中，4：已到帐，5：预约成功，21：已撤销，22：已过期，23：预约失败
                reserveStatusDesc: '预约过期',
                redeemPortion: '10,000', //赎回份额
                redeemStatus: 7, //赎回审核状态 0草稿 1待审核2  撤销3 审核通过 4审核失败  5再次驳回 6待确认 7确认成功8 确认失败
                redeemStatusDesc: '', //赎回审核状态描述
                redeemDate: '2019-08-09', //赎回申请时间
                empNo: 'H0178999', //理财师编号
                empName: '范星星', //理财师名称
                assignShare: '', //转让份额
                assigneeShare: '', //受让份额
                assignAmount: '', //拟转让价格
                assigneeAmount: '', //拟成交价格
                doneAmount: 1000, //成交价格
                assignDate: '', //转让申请时间
                assigneeDate: '', //受让申请时间
                assignStatus: '', //转让状态0-审核中 1-审核驳回 2-已发布 3-待撮合 4-撮合中 5-交易中 6-交易成功 7-交易终止 8-过期 9-撤销发布
                assigneeStatus: 3, //受让状态0:待撮合 1:撮合中 2:撮合驳回 3:交易中 4交易成功 5:交易终止 6:过期 7:撤销发布 8:取消受让
                assignVideoStatus: 1, //转让视频状态（转让方双录状态） 0：否，1：是
                assigneeVideoStatus: 2, //受让视频状态（受让方双录状态）0：否，1：是
                queueingStatus: '', //排队中状态 1：待理财师确认 2：待合格投资者认证
                queueingStatusDesc: '', //排队中状态描述
                queuedStatus: '', //排队成功状态 1：待签署合同 2：待上传汇款凭证
                queuedStatusDesc: '', //排队成功状态描述
                rollOutStatus: '', //转让状态 未确认：01：转受让审核中02：转让申请成功03：待选择受让方04：转受让撮合审核中05：签约中 已确认： 11：转受让已成功12：转让申请驳回13：自主取消转让14：转让申请已过期15：转受让申请已撤销
                rollOutStatusDesc: '', //转让状态描述
                rollInStatus: '', //受让状态 未确认：01：待转让方选择撮合 02：转受让撮合审核中 03：签约中  已确认：11：转受让已成功 12：转受让撮合驳回 13：自主取消转让 14：转让申请已过期 15：转受让申请已取消
                rollInStatusDesc: '', //受让状态描述
            },
        ]
    },
    "message": "操作成功！",
    "status": "0000"
});
module.exports = data;