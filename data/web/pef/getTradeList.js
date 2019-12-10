/*

  会员权益详情

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "data": {
        pageItems: {
            totalPage: 20,
            total: 1000
        },

        pageList: [{
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 9, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '', //弹框内容
                leftTopStatus: 5,
                leftTopStatusDesc: '',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '',
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 1, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '', //弹框内容
                leftTopStatus: 5,
                leftTopStatusDesc: '',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '',
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 0, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '大发水电费', //弹框内容
                leftTopStatus: 5,
                leftTopStatusDesc: '预约撤单',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '待理财师确认',
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 0, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '', //弹框内容
                leftTopStatus: 1,
                leftTopStatusDesc: '预约过期',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '',
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 0, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '', //弹框内容
                leftTopStatus: 5,
                leftTopStatusDesc: '',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '',
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 0, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '', //弹框内容
                leftTopStatus: 5,
                leftTopStatusDesc: '',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '',
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 2, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '', //弹框内容
                leftTopStatus: 5,
                leftTopStatusDesc: '',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '',
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 8, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '', //弹框内容
                leftTopStatus: 5,
                leftTopStatusDesc: '',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '',
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 0, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '', //弹框内容
                leftTopStatus: 5,
                leftTopStatusDesc: '',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '',
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 0, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '', //弹框内容
                leftTopStatus: 5,
                leftTopStatusDesc: '',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '',
            },
            {
                projectId: 1,
                projectName: '恒天稳谊16号私募投资基 ZYFG恒天稳谊16号私募投资基ZYFG申购', //项目名称
                businessCompareReference: '', //业绩比较基准(业务类型为 0:认购 1:申购时精确查找业绩比较基准)
                businessCompareReferenceMin: '', //业绩比较基准最小值
                businessCompareReferenceMax: '', //业绩比较基准最大值
                businessCompareReferenceMask: '', //(转受让 *%-*%)
                businessType: 0, //	0 认购；1申购；2 赎回；3 份额转让-转出；4份额转让-转入；5强增；6强减；7分红再投；9强制赎回；10内部转托管入；11内部转托管出
                confirmAmount: '10,000', //确认金额
                confirmShare: '1,000', //确认份额
                confirmDate: '2019-09-09', //确认日期
                reserveId: 111,
                reserveAmount: 1000, //预约金额
                reserveTime: '2019-09-09', //预约时间
                isQualified: 1, //是否满足合投限制
                redeemPortion: '10,000', //赎回份额
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
                assignStep: 1,
                assigneeStep: 1,
                isForElec: 1, //是否是电子合同产品
                operationNo: '2', //1 合格投资者确认 2 取消预约 3 重新预约 4 签署电子合同 5 查看电子合同 6 下载电子合同 7 转账及上传凭证
                //8 上传汇款凭证 9 签署追加申请书 10 查看追加申请书 11 下载追加申请书 12 网银转账
                reserveStatusTip: '', //弹框内容
                leftTopStatus: 5,
                leftTopStatusDesc: '',
                leftBottomStatus: 1,
                leftBottomStatusDesc: '',
            },
        ]
    },
    "message": "操作成功！",
    "status": "0000"
});
module.exports = data;