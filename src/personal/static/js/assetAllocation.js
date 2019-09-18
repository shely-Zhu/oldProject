/*
 * @page: 资产配置建议书
 * @Author: songxiaoyu
 * @Date:   2019-09-03 15:39:26
 * @Last Modified by:   songxiaoyu
 * @description:
 */

require("@pathIncludJs/vendor/config.js");
require("@pathIncludJs/vendor/zepto/callback.js");
require("@pathIncludJs/vendor/zepto/deferred.js");
require("@pathCommonJs/components/utils.js");
require("@pathCommonJs/ajaxLoading.js");
require("@pathCommonJs/components/elasticLayer.js");
require("@pathIncludJs/vendor/echarts.min.js");
require("@pathCommonJs/getEchartsData.js");
var tipAction = require("@pathCommonJs/components/tipAction.js");
var splitUrl = require("@pathCommonJs/components/splitUrl.js");
// debugger
// var splitUrl = require('../../../common/js/components/splitUrl.js');

$(function() {
  //url上参数
  var arg = splitUrl();
  var argType = arg['type'];
  var argId = arg['id']; //上一步带过来的资产配置id
  var somePage = {
    $e: {},
    gV: {},
    data: {
      listTable1: {
        columns: [
          {
            title: "资产分类",
            key: "zcfl",
            hasrowspan: true
          },
          {
            title: "投资比例",
            key: "tzbl",
            hasrowspan: true
          },
          {
            title: "投资金额（万元）",
            key: "tzje",
            hasrowspan: true
          },
          {
            title: "资产类别",
            key: "zclb",
            hasrowspan: true
          },
          {
            title: "产品类型",
            key: "cplx",
            hasrowspan: true
          },
          {
            title: "产品类别",
            key: "cplb",
            hasrowspan: true
          },
          // {
          //   title: "产品名称",
          //   key: "cpmc",
          //   hasrowspan: true
          // },
          // {
          //   title: "金额（万元）",
          //   key: "je"
          // },
          {
            title: "配置比例",
            key: "pzbl"
          }
        ],
        dataList: [] //tbody具体数据
      },
      columns: [], //表头原始参数
      newArr: [[]], //表头
      maxHeight: 1, //表头总共占的行数
      colKeyList: [], //所有的key
      dataList: [], //tbody具体数据
      needRowSpan: [], //tbody需要跨行的key
      span: {} ,//所跨的行数
      echartsData:{
        descArr: {      
          lifeTermDic: null, //生命周期
          riskTypeDic: null, //风险偏好
          assetClassifyDic: null, //资产分类
          assetTypeDic: null, //资产类别
        },
        title:""
      },
      
    },
    getElements: {
      tableOneThead: $(".tableOne .table thead tr"),
      tableOneTbody: $(".tableOne .table tbody"),
      tableTwoThead: $(".tableTwo .table thead tr"),
      tableTwoTbody: $(".tableTwo .table tbody")
    },
    init: function() {
      var that = this;
      that.getData();
      that.getDrawData();
    },
    getData: function() {
      var that = this;
      var obj = [
        {
          url: site_url.ReportData_api,
          data: {
            hmac: "", //预留的加密信息
            params: {
              //请求的参数信息
            }
          },
          needDataEmpty: true,
          needLoading: true,
          callbackDone: function(json) {
            var jsonData = json.data;
            $(".statementTit span.name").html(jsonData.customerName);
            $(".statementTit span.telephone").html(jsonData.telephone);
            $(".statementTit span.email").html(jsonData.email);
            $(".statementTime span.reportDate").html(jsonData.reportDate);
            $(".dimensionTxt1 span.assetClass").html(jsonData.assetClass);
            $(".dimensionTxt1 span.assetClassRange").html(
              jsonData.assetClassRange
            );
            $(".dimensionTxt1 span.lifeCycle").html(jsonData.lifeCycle);
            $(".fontRed span.lifeTermContent").html(jsonData.lifeTermContent);
            $(".dimensionTxt1 span.investmentType").html(
              jsonData.investmentType
            );
            $(".fontRed div").html(jsonData.riskTypeContent);
            $(".appendix .appendixTxt").html(jsonData.macroEconomyContent);
            if(jsonData.assetConfigReportProduct){
              that.data.columns = that.data.listTable1.columns;
              that.data.dataList = jsonData.assetConfigReportProduct.products;
              that.data.maxHeight = that.getMaxFloor(that.data.columns); //1. 计算出表头一共需要多少行
              that.columnsHandle(that.data.columns); //2. 对表头进行处理
              that.dataHandle(that.data.dataList, that.data.needRowSpan); // 3. 对数据进行处理（传入参数： 具体数据，需要跨行列的（key））

              var tableOneThead = jsonData.assetConfigReportProduct.titles;
              var tableOneTbody = jsonData.assetConfigReportProduct.products;
              if (tableOneThead.length > 0) {
                that.setThead(that.data.newArr, that.getElements.tableOneThead);
                that.setTbody(tableOneTbody, that.getElements.tableOneTbody);
              }
              var tableTwoThead = jsonData.assetConfigReportProduct.hwTitles;
              var tableTwoTbody = jsonData.assetConfigReportProduct.hwProducts;
              that.data.listTable1.dataList = tableTwoTbody;
              if (tableTwoThead.length > 0) {
                that.setThead(that.data.newArr, that.getElements.tableTwoThead);
                that.setTbody(tableTwoTbody, that.getElements.tableTwoTbody);
                let timer = setTimeout(function() {
                  let wrapperHeight = $(".proposalTableContent").height();
                  $(".proposalTableTop").height(wrapperHeight + 30);
                  $(".wrapper").height(wrapperHeight + 30);
                  clearTimeout(timer);
                }, 500);
              }
            }else {
              $(".proposalTable").hide()
            }
          },
          callbackFail: function(json) {
            tipAction(json.msg);
          }
        }
      ];
      $.ajaxLoading(obj);
    },
    setThead: function(data, el) {
      var ths = "";
      for (var i = 0; i < data[0].length; i++) {
        ths +=
          "<th rowspan=" +
          data[0][i].rowspan +
          " colspan=" +
          data[0][i].colspan +
          ">" +
          data[0][i].title +
          "</th>";
      }
      el.append(ths);
    },
    setTbody: function(data, el) {
      var that = this;
      var trs = "";
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          trs += "<tr>";
          for (var j = 0; j < data[i].tdList.length; j++) {
            trs +=
              "<td rowspan=" +
              that.resetRowSpan(i, data[i].tdList[j]) +
              ">" +
              data[i][data[i].tdList[j]] +
              "</td>";
          }
          trs += "</tr>";
        }
      } else {
        el.parent().hide();
      }

      el.append(trs);
    },
    resetRowSpan(row, key) {
      if (this.data.span[key] && this.data.span[key][row]) {
        if (
          this.data.dataList[row] &&
          this.data.dataList[row + 1] &&
          this.data.dataList[row]["zcfl"] == this.data.dataList[row + 1]["zcfl"]
        ) {
          var zcfl = this.data.dataList[row]["zcfl"];
          var list = this.data.dataList.filter(function(item) {
            return item["zcfl"] == zcfl;
          });

          if (this.data.span[key][row] > list.length) {
            this.data.span[key][row + list.length] =
              this.data.span[key][row] - list.length;
            return list.length;
          } else {
            return this.data.span[key][row];
          }
        } else {
          if (this.data.span[key][row] > 1) {
            this.data.span[key][row + 1] = this.data.span[key][row] - 1;
          }
          return 1;
        }
      }else{
        return 1
      }
    },
    gerMaxCol(items) {
      var max = 0;
      function each(data) {
        if (max < data.length) {
          max = data.length;
        }
        data.forEach(function(item) {
          if (item.children) {
            each(item.children);
          }
        });
      }
      each(items);
      return max;
    },
    getMaxFloor(treeData) {
      var that = this;
      var max = 0;
      function each(data, floor) {
        data.forEach(function(e) {
          if (floor > max) {
            max = floor;
          }
          if (e.children && e.children.length > 0) {
            each(e.children, floor + 1);
          }
        });
      }
      each(treeData, 1);
      return max;
    },
    columnsHandle(treeData) {
      var that = this;
      var maxFloor = this.data.maxHeight;
      var keyList = [];
      function each(data, index) {
        if (that.data.newArr[index] === undefined) {
          that.data.newArr[index] = [];
        }
        data.forEach(function(e) {
          var obj = {
            title: e.title,
            key: e.key,
            rowspan: maxFloor,
            colspan: 1
          };
          // debugger
          if (e.children) {
            obj.colspan = that.gerMaxCol(e.children);
            obj.rowspan = maxFloor - that.getMaxFloor(e.children);
          } else {
            that.data.colKeyList.push(e.key);
            if (e.hasrowspan) {
              //  如果存在hasrowspan属性并且值为true，则表明该key列存在跨行
              that.data.needRowSpan.push(e.key);
            }
          }
          that.data.newArr[index].push(obj);
          if (e.children && e.children.length > 0) {
            each(e.children, index + 1);
          }
        });
      }
      each(treeData, 0);
    },
    dataHandle(dataList, needRowSpan) {
      var that = this;
      needRowSpan.forEach(function(key) {
        var sum = {};
        var i = 0;
        var k = 0;
        for (var j = 0; j < dataList.length; j += 1) {
          i += 1;
          var tdList = [];
          if (dataList[j].tdList) {
            dataList[j].tdList.forEach(function(item) {
              tdList.push(item);
            });
          } else {
            that.data.colKeyList.forEach(function(item) {
              tdList.push(item);
            });
          }
          if (
            dataList[j - 1] &&
            (dataList[j][key] === dataList[j - 1][key] || !dataList[j][key])
          ) {
            if (dataList[j]["zcfl"] == dataList[j - 1]["zcfl"]) {
              var index = tdList.indexOf(key);
              if (index > -1) {
                tdList.splice(index, 1);
              }
            }
          }
          dataList[j].tdList = tdList;

          if (dataList[j + 1] && dataList[j + 1][key]) {
            if (dataList[j][key] !== dataList[j + 1][key]) {
              sum[k] = i;
              i = 0;
              k = j + 1;
            }
          } else if (!dataList[j + 1]) {
            sum[k] = i;
          }
        }
        that.data.span[key] = sum;
      });
    },
    getDrawData: function() {
      var that=this;
      var obj = [
        {
          name:'获取字典',
          url: site_url.getCustomerAssetDictionary_api, 
          data:["1001", "1002","1003", "1004"], 
          needLogin: true, //需要判断是否登陆
          async: false, //同步
          //needDataEmpty: false,//不需要判断data是否为空
          callbackDone: function(res) {
           /* 1000是与否
          `1001生命周期阶段
            1002客户风险承受能力
            1003资产分类
            1004资产类别
            1005项目类型
            1006细分策略
            1007家庭未来现金流稳定性*/
            //1001生命周期阶段
            that.data.echartsData.descArr.lifeTermDic=res.data[1001];
            that.data.echartsData.descArr.riskTypeDic = res.data[1002];  //风险承受能力字典值
            that.data.echartsData.descArr.assetClassifyDic = res.data[1003]; //资产分类
            that.data.echartsData.descArr.assetTypeDic = res.data[1004]; //资产类别`
            var objx=[
              {
                url: site_url.getCustomerAssetDetailById_api, //
                data: {
                  // id: argId //资产配置id
                },
                needLogin: true, //需要判断是否登陆
                //needDataEmpty: false,//不需要判断data是否为空
                callbackDone: function(res) {
                  //成功后执行的函数
                  var data = res.data;
                  //资产量级
                  var name =
                    $.util.toThousand(Number(data.canConfigAssets)) + "万元";
        
                  //生命周期
                  var lifeTerm = that.data.echartsData.descArr.lifeTermDic.filter(function(el) {
                    return el.keyNo == data.lifeTerm;
                  });
                  var lifeName = lifeTerm.length ? lifeTerm[0].keyValue : "";
        
                  //风险承受能力
                  var riskType = that.data.echartsData.descArr.riskTypeDic.filter(function(el) {
                    return el.keyNo == data.riskType;
                  });
                  var riskName = riskType.length ? riskType[0].keyValue : "";
        
                  //设置传递给画图组件的title
                  that.data.echartsData.title = name + "+" + lifeName + "+" + riskName;
                }
              }
            ];
            $.ajaxLoading(objx);
            var echartsData= {
              url: "getCustomerAssetCharts_api",
              data:that.data.echartsData
            };
            $.getEchartsData(echartsData);
          }
        },
        
      ];
      $.ajaxLoading(obj);
     
    },
    events: function() {}
  };
  somePage.init();
});
