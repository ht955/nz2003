class SetBanner {
    // 在构造器中定义参数
    constructor(element) {
        // 存储形参
        // 在构造其中,可以直接使用形参
        // 在下面的方法中,不能直接使用 element 形参
        // 只能使用过 this.ele 属性中存储的 形参数值,调用形参
        this.ele = element;
        // 获取标签对象,设定参数
        // 将let const 声明,改成 this定义属性和属性值
        // document获取,改成 传参标签对象中获取,获取范围更加精确
        this.oUllis = element.querySelectorAll('ul>li');
        this.oUl = element.querySelector('ul');
        this.oOl = element.querySelector('ol');
        // 定义参数,以对象的属性属性值方式定义
        this.oLiWidth = this.oUllis[0].offsetWidth;
        this.index = 1;
        this.time;
        this.bool = '原始值';
        this.oldThis = this;
    }

    // 方法直接定义,自动存储在 prototype 公共空间中
    // 之前直接调用的数据,现在要通过 this.属性 调用 实例化对象中的 属性值

    // 一般在 类/构造函数 中 定义一个专门的函数
    // 用调用所有需要 执行 的 内部函数
    // 调用方式也是 使用 this.函数名称()
    // 在html中,对象.init() 就等于调用了这些所有的函数
    init() {
        this.setFocus();
        this.cloneLi();
        this.autoLoop();
        this.inOut();
        this.leftRight();
        this.setFocusClick();
        this.hid();
    }


    // 定义焦点函数方法
    setFocus() {
        let str = '';
        this.oUllis.forEach((v, k) => {
            if (k === 0) {
                str += `<li class="active" index="${k + 1}"></li>`;
            } else {
                str += `<li index="${k + 1}"></li>`;
            }
        })
        this.oOl.innerHTML = str;
    }


    // 克隆原始轮播图片
    cloneLi() {
        // 获取第一个和最后一个ul中的li
        const firstLi = this.oUllis[0];
        const lastLi = this.oUllis[this.oUllis.length - 1];

        // 克隆第一个和最后一个
        const cloneFirstLi = firstLi.cloneNode(true);
        const cloneLastLi = lastLi.cloneNode(true);

        // 克隆的第一个写最后,克隆的最后一个写第一个
        this.oUl.appendChild(cloneFirstLi);
        this.oUl.insertBefore(cloneLastLi, firstLi);

        // 重新ul定义宽度
        this.oUl.style.width = (this.oUllis.length + 2) * this.oLiWidth + 'px';

        // ul的定位
        this.oUl.style.left = -this.oLiWidth + 'px';
    }

    // 自动轮播
    autoLoop() {
        this.time = setInterval(() => {
            this.index++;
            // move() 第三个参数 是 回调函数
            // 理论上应该是写一个函数名称 loopEnd
            // 构造函数/类 中 必须 写成 this.loopEnd 
            // 但是 构造函数/类 中 只能 只  this.loopEnd() 调用函数
            // 不能  this.loopEnd 写函数名称
            // 只能通过 匿名函数 调用  this.loopEnd() 回调函数
            // function(){ this.loopEnd(); } 
            // 匿名函数的this 指向 是 调用时之前写的内容
            // 当前 这个 匿名函数的this 指向是 undefined 
            // 应该变成 实例化对象 将 function 改成匿名函数

            // 方法1: 定义匿名 箭头函数 ()=>{}  在其中调用 回调函数 ()=>{ this.loopEnd() }
            // 方法2: 通过 bind() 来改变this指向 this.loopEnd.bind( this指向可以是提前存储好的实例化对象指向 , 还可以定义形参 )


            // move是定义在构造函数之外的独立的函数方法
            // 是可以直接调用的
            move(this.oUl, { left: -this.index * this.oLiWidth }, this.loopEnd.bind(this.oldThis));
            // 自动轮播,运动一开始就切换焦点
            // setFocusStyle();
        }, 4000);
    }




    // 运动停止时的回调函数
    loopEnd() {
        // 1,切换轮播图片
        if (this.index === this.oUllis.length + 1) {
            this.index = 1;
            this.oUl.style.left = -this.index * this.oLiWidth + 'px';
        } else if (this.index === 0) {
            this.index = this.oUllis.length;
            this.oUl.style.left = -this.index * this.oLiWidth + 'px';
        }

        // 2,设定 焦点按钮样式 
        // 图片完成切换,才会切换焦点样式
        this.setFocusStyle();

        // 3,给bool变量赋值原始值
        this.bool = '原始值';
    }


    // 设定焦点按钮样式函数
    setFocusStyle() {

        // 1,获取所有的焦点按钮
        this.oOllis = this.ele.querySelectorAll('ol>li');

        // 2,循环遍历所有的ol>li
        this.oOllis.forEach((v, k) => {
            v.className = '';
            if (v.getAttribute('index') == this.index) {
                v.className = 'active';
            }
        })
    }


    // 鼠标移入移出
    inOut() {
        this.ele.addEventListener('mouseenter', () => {
            clearInterval(this.time);
        })

        this.ele.addEventListener('mouseleave', () => {
            this.autoLoop();
        })
    }

    // 左右切换
    leftRight() {
        this.ele.addEventListener('click', e => {
            e = e || window.event;
            if (e.target.getAttribute('name') === 'left') {
                if (this.bool !== '原始值') {
                    return;
                }
                this.bool = '随便,不是原始值就行';
                this.index--;
                move(this.oUl, { left: -this.index * this.oLiWidth }, () => {
                    this.loopEnd();
                });

            } else if (e.target.getAttribute('name') === 'right') {
                if (this.bool !== '原始值') {
                    return;
                }
                this.bool = '随便,不是原始值就行';
                this.index++;
                move(this.oUl, { left: -this.index * this.oLiWidth }, () => {
                    this.loopEnd();
                });
            }
        })
    }

    // 焦点切换
    setFocusClick() {
        this.oOl.addEventListener('click', e => {
            e = e || window.event;
            if (e.target.tagName === 'LI') {
                if (this.bool !== '原始值') {
                    return;
                }
                this.bool = '随便,不是原始值就行';
                this.index = e.target.getAttribute('index') - 0;
                move(this.oUl, { left: -this.index * this.oLiWidth }, () => {
                    this.loopEnd()
                });
            }
        })
    }

    // 防止点击过快
    // 定义判断,判断是否是原始值
    // 不是执行 return


    // 浏览器最小化
    hid(){
        // 这里的监听浏览器切换,是监听的整个文档,这里不能改成this.ele
        document.addEventListener( 'visibilitychange' , ()=>{
            if(document.visibilityState === 'visible'){
                this.autoLoop();
            }else if(document.visibilityState === 'hidden'){
                clearInterval(this.time);
            }
        } )
    }
}

// 运动函数
// 参数1:执行运动的标签对象
// 参数2:执行运动的属性和最终坐标数据 必须是对象的形式
// 参数3:执行运动终止,执行的回调函数

function move(element, type, callback) {
    // 创建对象存储定时器
    const obj = {};

    // for...in循环参数2
    for (let key in type) {
        // 创建定时器,使用对象存储
        obj[key] = setInterval(() => {
            // 1,获取 key 属性的原始数据
            let iniVal = key === 'opacity' ? myGetStyle(element, key) * 100 : parseInt(myGetStyle(element, key));

            // 2,计算步长
            let speed = key === 'opacity' ? (type[key] * 100 - iniVal) / 5 : (type[key] - iniVal) / 5;

            // 3,步长取整
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            // 4,初始值累加步长
            iniVal += speed;

            // 5,将新的初始值,赋值给标签属性
            element.style[key] = key === 'opacity' ? iniVal / 100 : `${iniVal}px`;

            // 6,判断是否已经达到目标位置
            if (key === 'opacity') {
                if (iniVal === type[key] * 100) {
                    // 终止定时器
                    clearInterval(obj[key]);
                    // 删除对象中的数据单元
                    delete (obj[key]);
                }
            } else {
                if (iniVal === type[key]) {
                    // 终止定时器
                    clearInterval(obj[key]);
                    // 删除对象中的数据单元
                    delete (obj[key]);
                }
            }

            // 7,判断运动是否终止,也就是对象是否是空对象
            let arr = Object.keys(obj);
            if (arr.length === 0) {
                // 数组长度为0,对象为空,运动停止,执行回到函数
                callback();
            }

        }, 100)

    }
}












function myGetStyle(element, type) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[type];
    } else {
        return element.currentStyle[type];
    }
}

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
