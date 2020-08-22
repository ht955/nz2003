// 生成验证码函数
function mySetVc() {
    var str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXUZ';
    var newStr = '';
    for (var i = 1; i <= 6; i++) {
        var num = parseInt(Math.random() * str.length)

        if (newStr.indexOf(str[num]) === -1) {
            newStr += str[num];
        } else {
            i--;
        }
    }

    return newStr;
}

// 获取地址栏数据信息
function getUrlVal(){
    // 获取地址栏参数字符串
    let str = decodeURI(window.location.search).substr(1);
    // 创建存储结果的对像
    let obj = {};
    // 转化数组以分号为空格
    const arr = str.split('&');
    // 循环数组 将数据字符串根据=等号分割数组
    arr.forEach( v => {
        let arr2 = v.split('=');
        obj[arr2[0]] = arr2[1];
    })
    return obj;
}

// 生成table表格函数
// 参数1:数组,需要参照的数据数组
// 参数2:标签,需要写入内容的标签对象
function mySetTable(array, element) {
    var str = '';
    array.forEach(function (v, k) {
        str += '<tr>';
        for (var key in v) {
            str += `<td>${v[key]}</td>`;
        }
        str += `<td><button index="${k}">删除</button></td>`
        str += '</tr>';
    });
    element.innerHTML = str;
    var oBtns = document.querySelectorAll('button');

    mySetButton(oBtns, array, element);
}

// 给button按钮绑定删除效果函数
// 参数1,button按钮数组
// 参数2,数据数组
// 参数3,写入内容的标签对象
function mySetButton(BtnArray, array, element) {
    BtnArray.forEach(function (v) {
        v.onclick = function () {
            var bool = window.confirm('确定,是否删除');
            if (bool) {
                var index = v.getAttribute('index');
                array.splice(index, 1);
                mySetTable(array, element);
            }
        }
    })
}


// 处理监听事件兼容性函数
// 参数1:需要绑定事件的标签对象
// 参数2:需要绑定的事件类型,没有on
// 参数3:需要绑定的事件处理函数
function myAddEvent(element, type, fun) {
    if (element.addEventListener) {
        // 普通浏览器
        element.addEventListener(type, fun);
    } else {
        // 低版本IE浏览器
        element.attachEvent('on' + type, fun);
    }
}


// 获取css样式函数
// 参数1,需要属性的标签对象
// 参数2,需要属性的属性名称

function myGetStyle(element, type) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[type];
    } else {
        return element.currentStyle[type];
    }
}


// 轮播图,运动函数
// 参数1:运动的对象
// 参数2:运动的属性和属性值
// 参数3:运动结束的回调函数  函数名称 / 匿名函数
function move(element , type , fun){
    // 1,定翻译对象,存储定时器
    const timeObj = {};

    // 2,通过for...in循环,参数2
    for(let key in type){
        // 定义定时器,根据时间间隔,执行程序,到达运动效果
        // 定时器存储在对象中
        timeObj[key] = setInterval( ()=>{
            // 1,获取 key 中存储的属性,对应的原始属性值
            // 区分 特殊属性 opacity
            // let iniVal ;
            // if(key === 'opacity'){
            //     // 是透明度,直接获取数值,并且*100
            //     iniVal = myGetStyle(element,key) *100;
            // }else{
            //     // 不是透明度,parseInt获取整数部分,不要px单位
            //     iniVal = parseInt( myGetStyle(element,key) );
            // }

            let iniVal = key === 'opacity' ? myGetStyle(element,key) *100 : parseInt( myGetStyle(element,key) );

            // 2, 计算步长
            // let speed;
            // if(key === 'opacity'){
            //     // 透明度的初始值*100 了 最终数值也要 * 100 计算 步长
            //     speed = (type[key]*100 - iniVal) / 5 ;
            // }else{
            //     // (最终数值 - 初始数值) / 次数
            //     speed = (type[key] - iniVal) / 5 ;
            // }
            let speed = key === 'opacity' ? (type[key]*100 - iniVal) / 5 : (type[key] - iniVal) / 5 ;

            // 3,对步长取整   大于0向上取整  小于零向下取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            
            // 4,初始值累加步长
            iniVal += speed;

            // 5,将修改数值之后的初始值,赋值给标签对象
            // if(key === 'opacity'){
            //     // 除以100,直接赋值,不要px单位
            //     element.style[key] = iniVal/100 ;
            // }else{
            //     element.style[key] = `${iniVal}px` ;
            // }
            
            element.style[key] =  key === 'opacity' ? iniVal/100 : `${iniVal}px`;
            
            // 6,判断是否已经是最终数值
            if(key === 'opacity'){
                // 最终数值 *100 与 初始数值判断
                // 初始数值 /100 与 最终数值判断
                if(iniVal / 100 === type[key]){
                    // 清除定时器
                    clearInterval(timeObj[key]);
                    // 删除对象中的数据单元
                    delete(timeObj[key]);
                }
            }else{
                // 不是透明度,直接比较当前数值和最终数值
                if(iniVal  === type[key]){
                    // 清除定时器
                    clearInterval(timeObj[key]);
                    // 删除对象中的数据单元
                    delete(timeObj[key]);
                }
            }

            // 7,判断 对象 是否是 空对象
            let arr = Object.keys(timeObj);
            if(arr.length === 0){
                // 当所有定时器都被清除停止,对象中存储的单元为空
                // 此时,move()运动函数,所有的定时器都执行完毕,运动结束
                // 执行运动结束时,要执行的程序
                fun();
            }

        } , 50)
    }
}

// 设定cookie函数
// 参数1；cookie的键值名
// 参数2；cookie的键值
// 参数3；cookie的时效（秒数）
function mySetCookie(key,value,time){
    // 1获取当前时间对象
    const nowTime = new Date();
    // 2获取当前时间的时间戳  单位是毫秒
    let timeStamp = nowTime.getTime();
    // 计算时间戳 当前时间 - 8小时 + 时效的时间（秒）
    // 获取带有时效的时间戳 是世界标准时间
    let newTimeStamp = timeStamp - 8 * 60 * 60 * 1000 + time * 1000;
    // 4，将时间戳设定回时间对象
    nowTime.setTime(newTimeStamp);
    // 5,兼容没有传第三个参数的情况
    // 如果time是nudefined证明没有第三个参数，执行会话时效赋值，赋值空字符串
    // 如果time不是undefined，证明有第三个参数，执行nowTime时间对象中的时间戳时效
    let endTime = time === undefined ? '' : nowTime;
    // 6,设定cookie
    // 给cookie多设定一个属性，path=/
    // rangwww中的所有文件都可以使用设定的cookie
    document.cookie = `${key}=${value};expires=${endTime};path=/`;
}

// 获取cookie的具体数据
function myGetCookie(){
    // 创建存储结果的对象
    let obj = {};
    // 2，转化为数组 根据分号空格转化
    const arr1 = str.split('; ');
    // 3,循环变量数组，将数据字符串，根据=等号分割为数组
    arr1.foreach(v=>{
        let arr2 = v.split('=');
        obj[arr2[0]] = arr2[1];
    })
    return obj;
}