/*

  会员权益详情

*/

// 使用 Mock
var Mock = require('mockjs');

var data = Mock.mock({
    "data":[
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"金融产品诊断",//权益名称
            iconUnlock:"/mine/static/img/home_icon_rxsm@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。1",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"SPA护理",//权益名称
            iconUnlock:"/mine/static/img/home_icon_gmzt@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。2",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"私人牙医",//权益名称
            iconUnlock:"/mine/static/img/home_icon_xejx@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。3",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"高尔夫畅打",//权益名称
            iconUnlock:"/mine/static/img/home_icon_gmzh@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。4",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"运动至上",//权益名称
            iconUnlock:"/mine/static/img/mine_icon_wdhd@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。5",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"生日积分",//权益名称
            iconUnlock:"/mine/static/img/mine_icon_bzzx@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。6",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"折扣换礼",//权益名称
            iconUnlock:"/mine/static/img/mine_icon_dzd@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。7",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"感恩礼遇",//权益名称
            iconUnlock:"/mine/static/img/home_icon_rxsm@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。8",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"生日礼遇",//权益名称
            iconUnlock:"/mine/static/img/mine_icon_zcpz@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。9",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"荣耀年会",//权益名称
            iconUnlock:"/mine/static/img/mine_icon_wdyq@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。10",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"积分定制",//权益名称
            iconUnlock:"/mine/static/img/home_icon_rxsm@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。11",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
        {
            id:"1",//权益唯一编号
            enjoy:"0",//是否享有 0否 1是
            rightName:"积分定制",//权益名称
            iconUnlock:"/mine/static/img/financing_icon_rxgm@2x.png",//解锁图标链接
            iconLocked:"1",//锁定图标链接
            content:"集休闲、疗养、观光于一身的健康之旅,精选国内外空气清新,风景优美,各具特色的疗养圣地,配以调理方案,使客户身心放松,消除疲劳、增强体质。恒天财富恒乐汇帮您一键式预约国内外精选酒店及机票,让您在另一座城市,找到家的温馨。12",//富文本
            linkUrl:"www.baidu.com",//跳转链接
        },
    ],
    "message":"操作成功！",
    "status":"0000"
});
module.exports=data;
