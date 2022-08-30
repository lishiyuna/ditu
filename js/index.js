
var date = new Date()
date.getHours(); //获取当前小时数(0-23)
// 当日最高最低温度
let wenduLineMin = []
let wenduLineMax = []
// 热门城市
var dataHotCity = [
    { show: '北京', province: '北京', city: '北京' },
    { show: '上海', province: '上海', city: '上海' },
    { show: '广州', province: '广东', city: '广州' },
    { show: '深圳', province: '广东', city: '深圳' },
    { show: '天津', province: '天津', city: '天津' },
    { show: '西安', province: '陕西', city: '西安' },
    { show: '武汉', province: '湖北', city: '武汉' },
    { show: '成都', province: '四川', city: '成都' },
    { show: '石家庄', province: '河北', city: '石家庄' },
    { show: '郑州', province: '河南', city: '郑州' },
    { show: '哈尔滨', province: '黑龙江', city: '哈尔滨' },
    { show: '太原', province: '山西', city: '太原' },
    { show: '乌鲁木齐', province: '新疆', city: '乌鲁木齐' },
    { show: '济南', province: '山东', city: '济南' },
    { show: '福州', province: '福建', city: '福州' },
    { show: '日喀则', province: '西藏', city: '日喀则' },
    { show: '厦门', province: '福建', city: '厦门' },
    { show: '青岛', province: '山东', city: '青岛' },
    { show: '扬州', province: '江苏', city: '扬州' },
    { show: '合肥', province: '安徽', city: '合肥' },
    { show: '重庆', province: '重庆', city: '重庆' },
    { show: '南昌', province: '江西', city: '南昌' },
    { show: '唐山', province: '河北', city: '唐山' },
    { show: '杭州', province: '浙江', city: '杭州' },
    { show: '邢台', province: '河北', city: '邢台' },
    { show: '沈阳', province: '辽宁', city: '沈阳' },
    { show: '邯郸', province: '河北', city: '邯郸' },
    { show: '昆明', province: '云南', city: '昆明' }

]
// 动态创建热门城市每项
for (let i = 0; i < 28; i++) {
    let hotCityLi = document.createElement('li')
    hotCityLi.classList.add('opts')
    let hotCityLiSpan = document.createElement('span')
    // hotCityLiSpan.innerText()=dataHotCity[i]
    hotCityLi.appendChild(hotCityLiSpan)
    $('#hotCity-content').append(hotCityLi)
}
// 获取热门城市每项
let hotCityOptis = document.querySelectorAll('#hotCity-content .opts span')
for (let i = 0; i < dataHotCity.length; i++) {
    hotCityOptis[i].innerText = dataHotCity[i].city
}
// 光标事件
$(document).ready(function () {
    $(".had-sch").focus(function () {
        $("#hot-city").css('display', 'block')
        $(".had-sch").blur(function () {
            setTimeout(function () {
                $("#hot-city").css('display', 'none')
                $('#ls-match').css('display', 'none')
                $(".had-sch").val('');
            }, 200);
        })
    })
});


// 根据ip获取定位信息
$.get(
    "https://restapi.amap.com/v3/ip",
    {
        key: "319afb591a6f99aad078d4666d9906dc",
    },
    function (result) {
        $('.city-dingwei span').eq(0).text(result.province + ' ' + result.city)
        $('#hot-city span').eq(0).text(result.city + ' ')
        getWeather(result.province, result.city)
    }
)
// 将点击的城市赋给定位
$('#hot-city').on('click', 'span', function () {
    getGeo($(this).text())
})

// 封装点击获取城市
function getGeo(address) {
    $.get(
        "https://restapi.amap.com/v3/geocode/geo?parameters",
        {
            key: "319afb591a6f99aad078d4666d9906dc",
            address: address,
        },
        function (result) {
            let a = result.geocodes[0].province
            let b = result.geocodes[0].city
            // 定位城市赋值
            $('.city-dingwei span').eq(0).text(a + ' ' + b)
            // 清空48小时天气
            $(".weth-content-24 .weth-hover").html('')
            // 调用天气
            getWeather(a, b)
        }
    )
}

// 将input点击的城市赋给定位
$(".had-sch").bind('input propertychange', function () {
    $('#ls-match').css('display', 'block')
    $("#hot-city").css('display', 'none')
    getInputGeo(this.value)

});

// 将点击的城市赋给定位
$('#ls-match').on('click','li' ,function () {
    getGeo($(this).text())
    $(this).css('display', 'none')
})

// 封装inupt输入获取城市
function getInputGeo(address) {
    $.get(
        "https://restapi.amap.com/v3/geocode/geo?parameters",
        {
            key: "319afb591a6f99aad078d4666d9906dc",
            address: address,
        },
        function (result) {
            // console.log(result);
            if (result.status==1) {
                let a = result.geocodes[0].province
                let b = result.geocodes[0].city
                let c = result.geocodes[0].district
                $("#ls-match").html(`<li>${a},${b},${c}</li>`)
            }else{
                $("#ls-match").text('抱歉未找到相关位置')
            }
        }
    )
}



// function a(address) {
//     $.get(
//         "https://restapi.amap.com/v3/assistant/inputtips?parameters",
//         {
//             key: "319afb591a6f99aad078d4666d9906dc",
//             keywords: address,
//         },
//         function (result) {
            // let a = result.geocodes[0].province
            // let b = result.geocodes[0].city
            // let c = result.geocodes[0].district
            // console.log(a,b,c);
            // $("#ls-match").text(a +','+b+','+c)
            // console.log(result);
            // 定位城市赋值
            // $('.city-dingwei span').eq(0).text(a + ' ' + b)
            // 清空48小时天气
            // $(".weth-content-24 .weth-hover").html('')
            // 调用天气
            // getWeather(a, b)
//         }
//     )
// }
// a('龙')




// 根据定位城市查询天气
function getWeather(province, city) {
    $.ajax("https://wis.qq.com/weather/common", {
        dataType: "jsonp",
        data: {
            source: "pc",
            weather_type:
                "observe|forecast_1h|forecast_24h|index|alarm|limit|tips|rise|air",
            province: province,
            city: city,
        },
        success: function (data) {
            console.log(data.data);
            // 关注城市

            $.each($('#ls-attention img'), function (idx, item) {
                $(item).attr({ src: `./images/小天气/${data.data.forecast_1h[0].weather_code}.png` })
            })
            // 发布时间
            $('#txt-time').text('中央气象台' + data.data.observe.update_time.slice(8, 10) + ':' + data.data.observe.update_time.slice(10, 12) + '发布')
            // 温度
            $('#txt-wendu').text(data.data.observe.degree + '°')
            // 天气
            $('#txt-tianqi').text(data.data.observe.weather)
            // 天气大图片
            $('.weather-pic>img').attr({ src: `./images/晚上大天气/${data.data.observe.weather_code}.png` })

            // pressure 气压
            $('#txt-kPa').text('气压' + ' ' + data.data.observe.pressure + ' ' + 'hPa')
            // 风力
            if (data.data.observe.wind_direction == 0) {
                $("#txt-wind").text("无持续风向" + ' ' + data.data.observe.wind_power + "级")
            }
            else if (data.data.observe.wind_direction == 1) {
                $("#txt-wind").text("东北风" + ' ' + data.data.observe.wind_power + "级")
            }
            else if (data.data.observe.wind_direction == 2) {
                $("#txt-wind").text("东风" + ' ' + data.data.observe.wind_power + "级")
            }
            else if (data.data.observe.wind_direction == 3) {
                $("#txt-wind").text("东南风" + ' ' + data.data.observe.wind_power + "级")
            }
            else if (data.data.observe.wind_direction == 4) {
                $("#txt-wind").text("南风" + ' ' + data.data.observe.wind_power + "级")
            }
            else if (data.data.observe.wind_direction == 5) {
                $("#txt-wind").text("西南风" + ' ' + data.data.observe.wind_power + "级")
            }
            else if (data.data.observe.wind_direction == 6) {
                $("#txt-wind").text("西风" + ' ' + data.data.observe.wind_power + "级")
            }
            else if (data.data.observe.wind_direction == 7) {
                $("#txt-wind").text("西北风" + ' ' + data.data.observe.wind_power + "级")
            }
            else if (data.data.observe.wind_direction == 8) {
                $("#txt-wind").text("北风" + ' ' + data.data.observe.wind_power + "级")
            }
            else if (data.data.observe.wind_direction == 9) {
                $("#txt-wind").text("旋转风" + ' ' + data.data.observe.wind_power + "级")
            }

            // 湿度
            $('#txt-humidity').text('湿度' + ' ' + data.data.observe.humidity + '%')

            // 空气质量
            let air = data.data.air
            $('#aqi .info-aqi').text(air.aqi + ' ' + air.aqi_name)
            $('#air-window .header').text('空气质量指数'+" "+air.aqi+' '+air.aqi_name)
            $('#tb-detail .val').eq(0).text(air['pm2'+'.'+'5'])
            $('#tb-detail .val').eq(1).text(air.pm10)
            $('#tb-detail .val').eq(2).text(air.so2)
            $('#tb-detail .val').eq(3).text(air.no2)
            $('#tb-detail .val').eq(4).text(air.o3)
            $('#tb-detail .val').eq(5).text(air.co)


            // 强对流预警
            let tag = data.data.alarm
            if (!tag[0]) {
                $('#ls-warning').css('display', 'none')
            } else {
                $('#ls-warning .leve101').css('display', 'block')
                $('.warning-window .header').text(tag[0].type_name + tag[0].level_name+'预警')
                $('.warning-window .inner p').text(tag[0].detail)
            }

            // 限行
            let txtLimit = data.data.limit.tail_number
            if (txtLimit.indexOf('限行') != -1) {
                $('#txt-limit').text('限行' + ' ' + txtLimit)
            } else {
                $('#txt-limit').text(txtLimit)
            }

            // 小句子
            let tipIdx = 1
            $('.tips .txt-tips').text(data.data.tips.observe[tipIdx])

            $('.tips .switch').click(function () {
                if (tipIdx == 1) {
                    tipIdx = 0
                    $('.tips .txt-tips').text(data.data.tips.observe[tipIdx])
                } else {
                    tipIdx = 1
                    $('.tips .txt-tips').text(data.data.tips.observe[tipIdx])
                }
            })
            // 创建46小时天气
            function create46Weather() {
                for (let i = 0; i < 46; i++) {
                    let li = document.createElement('li')
                    li.classList = ('item')
                    let p1 = document.createElement('p')
                    p1.classList = ('text-time')
                    let img = document.createElement('img')
                    img.src = './images/小天气/' + data.data.forecast_1h[i].weather_code + '.png'
                    let p2 = document.createElement('p')
                    p2.classList = ('text-tem')
                    li.appendChild(p1)
                    li.appendChild(img)
                    li.appendChild(p2)
                    $(".weth-content-24 .weth-hover").append(li)
                }
                let time48Arr = []
                let textTime = document.querySelectorAll('.text-time')
                let textTem = document.querySelectorAll('.text-tem')
                let item48 = document.querySelectorAll('.weth-hover .item')
                // let textTime = document.querySelectorAll('.text-time')
                for (let i = 0; i < 46; i++) {
                    let time48 = data.data.forecast_1h[i].update_time
                    textTime[i].innerText = time48.slice(8, 10) + ':00'

                    let text48 = data.data.forecast_1h[i].degree
                    textTem[i].innerText = text48 + '°'
                    time48Arr[i] = time48.slice(8, 10)
                }
                // 日出
                function createRichuLi() {
                    let li = document.createElement('li')
                    li.classList = ('item richu')
                    let p1 = document.createElement('p')
                    p1.classList = ('text-time')
                    p1.innerHTML = data.data.rise[0].sunrise
                    let img = document.createElement('img')
                    img.src = './images/日出.png'
                    let p2 = document.createElement('p')
                    p2.classList = ('text-tem')
                    p2.innerHTML = '日出'
                    li.appendChild(p1)
                    li.appendChild(img)
                    li.appendChild(p2)
                    let riluoIdx = time48Arr.indexOf(data.data.rise[0].sunrise.slice(0, 2));
                    // console.log(riluoIdx);
                    let item48Parient = document.querySelector('.weth-content-24 .weth-hover')
                    item48Parient.insertBefore(li, item48[riluoIdx + 1])
                }

                // 日落
                function createRiluoLi() {
                    let li = document.createElement('li')
                    li.classList = ('item riluo')
                    let p1 = document.createElement('p')
                    p1.classList = ('text-time')
                    p1.innerHTML = data.data.rise[0].sunset
                    let img = document.createElement('img')
                    img.src = './images/日落.png'
                    let p2 = document.createElement('p')
                    p2.classList = ('text-tem')
                    p2.innerHTML = '日落'
                    li.appendChild(p1)
                    li.appendChild(img)
                    li.appendChild(p2)

                    let riluoIdx = time48Arr.indexOf(data.data.rise[0].sunset.slice(0, 2));
                    // console.log(riluoIdx);
                    let item48Parient = document.querySelector('.weth-content-24 .weth-hover')
                    item48Parient.insertBefore(li, item48[riluoIdx + 1])
                }
                createRichuLi()
                createRiluoLi()
            }
            create46Weather()

            // 七日天气预报
            let time = document.querySelectorAll('.ls-weather .date')
            // console.log(time);
            let weatherDay = document.querySelectorAll('.ct-daytime .weather')
            let weatherNight = document.querySelectorAll('.ct-night .weather')
            let wind = document.querySelectorAll('#ls-weather-day .wind')
            let dayImg = document.querySelectorAll('.ct-daytime img')
            let nightImg = document.querySelectorAll('.ct-night img')
            // console.log(dayImg);
            for (let i = 0; i < 8; i++) {
                // 日期
                time[i].innerHTML = data.data.forecast_24h[i].time.slice(5, 7) + '月' + data.data.forecast_24h[i].time.slice(8, 10) + '日'
                // 白天天气
                weatherDay[i].innerText = data.data.forecast_24h[i].day_weather_short
                // 晚上天气
                weatherNight[i].innerText = data.data.forecast_24h[i].night_weather_short
                // 风向 风力
                wind[i].innerText = data.data.forecast_24h[i].day_wind_direction + ' ' + data.data.forecast_24h[i].day_wind_power + '级'
                // 七天小图片
                // 白天
                dayImg[i].src = `./images/小天气/7天小图片/${data.data.forecast_24h[i].day_weather_code}.png`
                // 晚上
                nightImg[i].src = `./images/小天气/${data.data.forecast_24h[i].night_weather_code}.png`
                // 温度变化折线图
                wenduLineMin[i] = data.data.forecast_24h[i].min_degree
                wenduLineMax[i] = data.data.forecast_24h[i].max_degree
            }
            console.log();
            for (let i = 0; i < $("#ls-weather-day .item:gt(3)").length; i++) {
                $("#ls-weather-day .item .day:gt(3)")[i].innerHTML = incomeDetail(data.data.forecast_24h[i + 4].time)
            }
            // ajax是异步数据 调用保存折线图
            zheXianPic()
            // 生活指数
            let pagesItemSub = document.querySelectorAll('.pages-box .ct-sub')
            let pagesItemContent = document.querySelectorAll('.pages-box .content')
            let pagesItemDetail = document.querySelectorAll('.pages-box .detail')
            console.log(data.data);
            let liveIndex = data.data.index
            // 穿衣
            pagesItemContent[0].innerText = liveIndex.clothes.name + ' ' + liveIndex.clothes.info
            pagesItemDetail[0].innerHTML = liveIndex.clothes.detail
            // 雨伞
            pagesItemContent[1].innerText = liveIndex.umbrella.name + ' ' + liveIndex.umbrella.info
            pagesItemDetail[1].innerHTML = liveIndex.umbrella.detail
            // 感冒
            pagesItemContent[2].innerText = liveIndex.cold.name + ' ' + liveIndex.cold.info
            pagesItemDetail[2].innerHTML = liveIndex.cold.detail
            // 洗车
            pagesItemContent[3].innerText = liveIndex.carwash.name + ' ' + liveIndex.carwash.info
            pagesItemDetail[3].innerHTML = liveIndex.carwash.detail
            // 运动
            pagesItemContent[4].innerText = liveIndex.sports.name + ' ' + liveIndex.sports.info
            pagesItemDetail[4].innerHTML = liveIndex.sports.detail
            // 防晒
            pagesItemContent[5].innerText = liveIndex.sunscreen.name + ' ' + liveIndex.sunscreen.info
            pagesItemDetail[5].innerHTML = liveIndex.sunscreen.detail
            // 钓鱼
            pagesItemContent[6].innerText = liveIndex.fish.name + ' ' + liveIndex.fish.info
            pagesItemDetail[6].innerHTML = liveIndex.fish.detail
            // 旅游
            pagesItemContent[7].innerText = liveIndex.tourism.name + ' ' + liveIndex.tourism.info
            pagesItemDetail[7].innerHTML = liveIndex.tourism.detail
            // 交通
            pagesItemContent[8].innerText = liveIndex.traffic.name + ' ' + liveIndex.traffic.info
            pagesItemDetail[8].innerHTML = liveIndex.traffic.detail
            // 空气污染扩散条件
            pagesItemContent[9].innerText = liveIndex.diffusion.name + ' ' + liveIndex.diffusion.info
            pagesItemDetail[9].innerHTML = liveIndex.diffusion.detail
            // 舒适度
            pagesItemContent[10].innerText = liveIndex.comfort.name + ' ' + liveIndex.comfort.info
            pagesItemDetail[10].innerHTML = liveIndex.comfort.detail
            // 晾晒
            pagesItemContent[11].innerText = liveIndex.drying.name + ' ' + liveIndex.drying.info
            pagesItemDetail[11].innerHTML = liveIndex.drying.detail
            // 晚上天气
            // pagesItemContent[0].innerText = data.data.forecast_24h[i].night_weather_short
        },
    });
}


// 48小时天气按钮
$(".btn-24>#btn-left").click(function () {
    $(".weth-hover").css('margin-left', '0')
})
$(".btn-24>#btn-right").click(function () {
    $(".weth-hover").css('margin-left', '-1200px')
})

// 七日天气live左右切换
$('.btn-live>#btn-left').click(function () {
    $('.pages-box').css('margin-left', '0')
})
$('.btn-live>#btn-right').click(function () {
    $('.pages-box').css('margin-left', '-440px')
})

// 七日天气live上下切换
$('.pages-box .item').hover(
    function () {
        let a = this.querySelector('.ct-sub');
        $(a).css('margin-top', '-140px')
    },
    function () {
        let a = this.querySelector('.ct-sub');
        $(a).css('margin-top', '0px')
    }
);


// 封装折线图
function zheXianPic() {
    var dom = document.getElementById('container');
    var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};

    var option;

    option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            show: false,
        },
        yAxis: {
            type: 'value',
            show: false,
            splitNumber: 50,
        },
        series: [
            {
                color: '#FCC370',
                symbol: 'circle',
                symbolSize: 8,
                smooth: true,
                type: 'line',
                data: wenduLineMax,
                lineStyle: {
                    color: '#FCC370',
                    width: 3
                },
                label: {
                    show: true,
                    formatter: function (data) {
                        return data.value + '°';
                    },
                    textStyle: {// 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                        fontSize: 20
                    },
                    rich: {
                        first: {
                            fontSize: "18",
                            fontFamily: "微软雅黑",
                            color: "#C2C2C2",
                        },
                    },
                },
            },
            {
                color: '#94CCF9',
                symbol: 'circle',
                symbolSize: 8,
                smooth: true,
                type: 'line',
                data: wenduLineMin,
                lineStyle: {
                    color: '#94CCF9',
                    width: 3
                },
                label: {
                    normal: {
                        show: true,
                        formatter: function (data) {
                            return data.value + '°';
                        },
                        textStyle: {// 用 itemStyle.normal.label.textStyle.fontSize 來更改餅圖上項目字體大小
                            fontSize: 20
                        },
                        rich: {
                            first: {
                                fontSize: "18",
                                fontFamily: "微软雅黑",
                                color: "#C2C2C2",
                            },
                        },

                    }
                }
            }
        ]
    };
    myChart.setOption(option);
    window.addEventListener('resize', myChart.resize);
}
// 封装转换星期
function incomeDetail(date) {
    let dateStr = date.substring(0, 4) + "/" + date.substring(5, 7) + "/" + date.substring(8, 10);
    return `周${"日一二三四五六".charAt(new Date(dateStr).getDay())}`
}






