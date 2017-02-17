/*
* 需要对内容进行修改，请修改并更新此文件，建议不要修改html文件
* 所有图片请放在img/dataImg目录下，命名规则按从上到下、从左到右的顺序为：ＮＢＡ：1.1.1,1.1.2、1.2.1,1.2.2、1.3.1,1.3.2；电影：2.1 2.2 2.3 2.4 2.5 2.6；明星 3.1 3.2 3.3 3.4
*需要填入的有狂欢直播show、历年跨年精彩晚会部分、四大卫视晚会PK部分、四热播大剧日日看部分、午夜影院大放映部分、活动攻略、其他外部链接
*图片建议尺寸分别为：284*160,195*260
* */
//狂欢直播show区块，图片和链接地址
var data= {//直播show
    'name':'跨年狂欢直播Show',//大标题
    'cont':'2017央视跨年狂欢直播',//图片下的内容标题
    'img':'1.1.jpg',//直播show图片名+后缀
    'url':'http://www.w3school.com.cn&a=more1',//直播show链接地址
    "moreUrl":"http://www.w3school.com.cn&a=more2"//点击更多精彩跳转地址
};
var list1={//历年跨年精彩晚会部分
    "name":"明星齐聚陪你跨年",
    "moreUrl":"http://www.w3school.com.cn&a=more2",//点击更多精彩跳转地址
    "data":[
        {
            "img":"1.2.1.jpg",//图片
            'title':'李玉刚混搭维塔斯合作默契十足',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"1.2.2.jpg",//图片
            'title':'韩国人气天团EXO嗨唱引爆全场',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"1.2.3.jpg",//图片
            'title':'火风霍尊父子档温暖跨年夜',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"1.2.4.jpg",//图片
            'title':'安七炫联手梅葆玖上演创意京剧',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        }
    ]
};
var list3={//热播大剧日日看部分
    "name":"热播大剧日日看",
    "moreUrl":"http://www.w3school.com.cn&a=more2",//点击更多精彩跳转地址
    "data":[
        {
            "img":"2.1.jpg",//图片
            'title':'如果我爱你',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"2.2.jpg",//图片
            'title':'爱在春天',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"2.3.jpg",//图片
            'title':'借用一下你的爱',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"2.4.jpg",//图片
            'title':'爱可以重来',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"2.5.jpg",//图片
            'title':'好想好想爱上你',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"2.6.jpg",//图片
            'title':'冰与火的青春',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        }
    ]
};
var list4={//午夜影院大放映部分
    "name":"午夜影院大放映",
    "moreUrl":"http://www.w3school.com.cn&a=more2",//点击更多精彩跳转地址
    "data":[
        {
            "img":"3.1.jpg",//图片
            'title':'女汉子真爱公式',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"3.2.jpg",//图片
            'title':'购物女王',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"3.3.jpg",//图片
            'title':'煎饼侠',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"3.4.jpg",//图片
            'title':'唐人街探案',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"3.5.jpg",//图片
            'title':'致我们终将到来的爱情',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        },
        {
            "img":"3.6.jpg",//图片
            'title':'万万没想到',//标题
            "url":"http://www.w3school.com.cn/"//点击跳转链接地址
        }
    ]
};
var rule={//活动攻略
    'name':'活动攻略',
    'time':'2016.12.20-2016.12.25',//活动时间
    'cont':[//内容：每一句话一个分隔，需要显示时间的位置，加上（<span class="active-time"></span>）
        '1.客户完成登录后，即可参加。。。。。。。。',
        '2.活动期间（<span class="active-time"></span>），单个用户每天都可以。。。。',
        '3.活动期间，单个用户每天都可以。。。。',
        '4.活动期间，单个用户每天都可以。。。。'
    ]
};
var url={
    'activeUrl':'http://wap.gs.10086.cn/migu_data.html',//800M免费领的图标放到右下角
    'returnHomePageUrl':'http://www.w3school.com.cn'//返回首页链接地址
};

