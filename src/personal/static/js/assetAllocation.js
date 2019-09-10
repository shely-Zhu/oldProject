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
var tipAction = require("@pathCommonJs/components/tipAction.js");
var splitUrl = require("@pathCommonJs/components/splitUrl.js")();

$(function() {
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
          {
            title: "产品名称",
            key: "cpmc",
            hasrowspan: true
          },
          {
            title: "金额（万元）",
            key: "je"
          },
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
      span: {} //所跨的行数
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
      that.events();
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
          //async: false,
          // needLogin:true,
          needDataEmpty: true,
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

            that.data.columns = that.data.listTable1.columns;
            that.data.dataList = jsonData.assetConfigReportProduct.products;;
            that.data.maxHeight = that.getMaxFloor(that.data.columns); //1. 计算出表头一共需要多少行
            that.columnsHandle(that.data.columns); //2. 对表头进行处理
            that.dataHandle(that.data.dataList, that.data.needRowSpan); // 3. 对数据进行处理（传入参数： 具体数据，需要跨行列的（key））
            
            var tableOneThead = jsonData.assetConfigReportProduct.titles;
            var tableOneTbody = jsonData.assetConfigReportProduct.products;
            if (tableOneThead.length > 0) {
              that.setThead(
                that.data.newArr,
                that.getElements.tableOneThead
              );
              that.setTbody(
                tableOneTbody,
                that.getElements.tableOneTbody
              );
            }
            var tableTwoThead = jsonData.assetConfigReportProduct.hwTitles;
            var tableTwoTbody = jsonData.assetConfigReportProduct.hwProducts;
            that.data.listTable1.dataList=tableTwoTbody
            if (tableTwoThead.length > 0) {
              that.setThead(
                that.data.newArr,
                that.getElements.tableTwoThead
              );
              that.setTbody(
                tableTwoTbody,
                that.getElements.tableTwoTbody
              );
              let timer = setTimeout(function() {
                let wrapperHeight = $(".proposalTableContent").height();
                $(".proposalTableTop").height(wrapperHeight + 30);
                $(".wrapper").height(wrapperHeight + 30);
                clearTimeout(timer);
              }, 500);
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
          console.log('2222',data)
        var ths = "";
        for (var i = 0; i < data[0].length; i++) {
          ths += "<th rowspan="+data[0][i].rowspan+" colspan="+data[0][i].colspan+">" + data[0][i].title + "</th>";
        }
        console.log("ths", ths);
        el.append(ths);
      },
      setTbody: function(data, el) {
        var that = this;
        var trs = "";
        var tds="";
        console.log('data',data)
        for (var i = 0; i < data.length; i++) {
          trs +=
            "<tr>" +
            "<td rowspan="+that.resetRowSpan(i,data[i])+">"
            + data[i].zcfl +
            "</td>" +
            "<td rowspan="+that.resetRowSpan(i,data[i])+">" 
            + data[i].tzbl +
            "</td>" +
            "<td rowspan="+that.resetRowSpan(i,data[i])+">" 
            +data[i].tzje +
            "</td>" +
            "<td rowspan="+that.resetRowSpan(i,data[i])+">" 
            +data[i].zclb +
            "</td>" +
            "<td rowspan="+that.resetRowSpan(i,data[i])+">" 
            +data[i].cplx +
            "</td>" +
            "<td rowspan="+that.resetRowSpan(i,data[i])+">" 
            +data[i].cplb +
            "</td>" +
            "<td rowspan="+that.resetRowSpan(i,data[i])+">"
             +data[i].cpmc +
            "</td>" +
            "<td rowspan="+that.resetRowSpan(i,data[i])+">" 
            +data[i].je +
            "</td>" +
            "<td rowspan="+that.resetRowSpan(i,data[i])+">" 
            +data[i].pzbl +
            "</td>" +
            "</tr>";

        }

        console.log(trs);
        el.append(trs);
      },
      resetRowSpan(row, keys) {
          debugger
          for(var key in keys){
          if (this.data.span[key] && this.data.span[key][row]) {
              
            if (
              this.data.dataList[row] &&
              this.data.dataList[row + 1] &&
              this.data.dataList[row]["zcfl"] == this.data.dataList[row + 1]["zcfl"]
            ) {
              //不能直接返回 this.span[key][row]
              //计算this.dataList里
              var zcfl = this.data.dataList[row]["zcfl"];
            //   let list = this.dataList.filter(item => item["zcfl"] == zcfl);
              var list = this.data.dataList.filter(function(item){
                  return item["zcfl"] == zcfl
              });

              if (this.data.span[key][row] > list.length) {
                this.data.span[key][row + list.length] =
                  this.data.span[key][row] - list.length;
                return list.length;
              } else {
                return this.data.span[key][row];
              }
            } else {
              //修改当前一行的span[key]
              //console.log(key, this.span  );
              if (this.data.span[key][row] > 1) {
                this.data.span[key][row + 1] = this.data.span[key][row] - 1;
              }
              return 1;
            }
          }
        }
        
      },
      gerMaxCol(items) {
        var max = 0;
        function each(data) {
          if (max < data.length) {
            max = data.length;
          }
        //   data.forEach((item) => {
        //     if (item.children) {
        //       each(item.children);
        //     }
        //   });
          data.forEach(function(item){
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
        //   data.forEach((e) => {
        //     if (floor > max) {
        //       max = floor;
        //     }
        //     if (e.children && e.children.length > 0) {
        //       each(e.children, floor + 1);
        //   }
        //   });
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
        //   data.forEach((e) => {
        //     const obj = {
        //       title: e.title,
        //       key: e.key,
        //       rowspan: maxFloor,
        //       colspan: 1,
        //     };
        //     if (e.children) {
        //       obj.colspan = that.gerMaxCol(e.children);
        //       obj.rowspan = maxFloor - that.getMaxFloor(e.children);
        //     } else {
        //       that.colKeyList.push(e.key);
        //       if (e.hasrowspan) {             //  如果存在hasrowspan属性并且值为true，则表明该key列存在跨行
        //         that.needRowSpan.push(e.key);
        //       }
        //     }
        //     that.newArr[index].push(obj);
        //     if (e.children && e.children.length > 0) {
        //       each(e.children, index + 1);
        //     }
        //   });
          data.forEach(function(e) {
            var obj = {
                title: e.title,
                key: e.key,
                rowspan: maxFloor,
                colspan: 1,
            };
            // debugger
            if (e.children) {
                obj.colspan = that.gerMaxCol(e.children);
                obj.rowspan = maxFloor - that.getMaxFloor(e.children);
            } else {
                that.data.colKeyList.push(e.key);
                if (e.hasrowspan) {             //  如果存在hasrowspan属性并且值为true，则表明该key列存在跨行
                that.data.needRowSpan.push(e.key);
                }
            }
            that.data.newArr[index].push(obj);
            if (e.children && e.children.length > 0) {
                each(e.children, index + 1);
            }
          });
        }
        console.log('that.data.newArr',that.data.newArr)
        each(treeData, 0);
      },
      dataHandle(dataList, needRowSpan) {
        console.log('dataList',dataList)
        console.log('needRowSpan',needRowSpan)
        var that = this;
        // needRowSpan.forEach((key) => {
        //   const sum = {};
        //   let i = 0; let k = 0;
        //   const that = this;
        //   for (let j = 0; j < dataList.length; j += 1) {
        //     i += 1;
        //     let tdList = [];
        //     if (dataList[j].tdList) {
        //       tdList = [...dataList[j].tdList];
        //     } else {
        //       tdList = [...that.colKeyList];
        //     }
        //     if (dataList[j - 1] && (dataList[j][key] === dataList[j - 1][key] || !dataList[j][key])) {
        //       if( window.location.href.indexOf('/zcpz/assetReport/assetReport.html') != -1){
        //         //console.log( '第'+ j + '条：' + dataList[j]['zcfl'], dataList[j-1]['zcfl'])

        //         if (  dataList[j]['zcfl'] == dataList[j-1]['zcfl'])  {
        //           const index = tdList.indexOf(key);
        //           if (index > -1) {
        //             tdList.splice(index, 1);
        //           }
        //         }
        //       }else{
        //         const index = tdList.indexOf(key);
        //         if (index > -1) {
        //           tdList.splice(index, 1);
        //         }
        //       }
        //     }
        //     dataList[j].tdList = tdList;

        //     if (dataList[j + 1] && dataList[j + 1][key]) {
        //         if (dataList[j][key] !== dataList[j + 1][key]) {
        //           sum[k] = i;
        //           i = 0; k = j + 1;
        //         }
              
        //     } else if (!dataList[j + 1]) {
        //       sum[k] = i;
        //     }
        //   }
        //   this.span[key] = sum;
        // });
        needRowSpan.forEach(function(key) {
          var sum = {};
          var i = 0; 
          var k = 0;
          
          for (var j = 0; j < dataList.length; j += 1) {
            i += 1;
            var tdList = [];
            if (dataList[j].tdList) {
              tdList = [...dataList[j].tdList];
            } else {
              tdList = [...that.data.colKeyList];
            }
            if (dataList[j - 1] && (dataList[j][key] === dataList[j - 1][key] || !dataList[j][key])) {
                if (  dataList[j]['zcfl'] == dataList[j-1]['zcfl'])  {
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
                  i = 0; k = j + 1;
                }
              
            } else if (!dataList[j + 1]) {
              sum[k] = i;
            }
          }
          that.data.span[key] = sum;
        });
      },
    events: function() {
        // this.data.columns = this.data.listTable1.columns;
        // this.data.dataList = this.data.listTable1.dataList;
        // this.data.maxHeight = this.getMaxFloor(this.data.columns); //1. 计算出表头一共需要多少行
        // this.columnsHandle(this.data.columns); //2. 对表头进行处理
        // this.dataHandle(this.data.dataList, this.data.needRowSpan); // 3. 对数据进行处理（传入参数： 具体数据，需要跨行列的（key））
    }
  };
  somePage.init();
});
