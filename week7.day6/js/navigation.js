$(window).scroll(function () {
    // 吸顶div 和 侧边栏,显示消失
    if ($(window).scrollTop() > 800) {
        $('header').slideDown(1000);
        $('.storeNav').fadeIn(1000);
    } else {
        $('header').slideUp(1000);
        $('.storeNav').fadeOut(1000);
    }

    // 3,通过位置的判断,实现页面滚动,侧边栏有不同的样式效果
    $('.storey li').each(function (key, item) {
        // 判断的是 滚动条滚动的位置
        // 比较的是 li标签 也就是 item 的位置
        // console.log( $(window).scrollTop() );   // 滚动条位置
        // console.log( $(item).offset().top );    // 每个li,与页面顶部的间距

        // 通过判断,判断 滚动条 到达的位置 和 哪个li标签匹配
        if ($(window).scrollTop() > $(item).offset().top - 500) {
            // 大于哪个区域的数值,就证明到达哪个区域了
            $('.storeNav li').eq(key)           // 找到当前索引匹配的li标签
                .addClass('active')               // 添加样式 
                .siblings().removeClass('active') // 给兄弟li清除样式
        }
    })

})
$('[name="back"]').click(function () {
    $('html').animate({ scrollTop: 0 }, 1000)
})

// 3,点击侧边栏li,到达对应区域
// 返回顶部的效果是,返回 滚动条为 0的位置
// 和其他几个效果不同
// 给 不是 返回顶部 的li,添加点击效果
$('.storeNav li').each(function(key,item){
    // 不是返回顶部li,添加事件
    if( $(item).attr('name') !== 'back' ){
        $(item).click(function(){
            // 让滚动条,到达 li 对应的 页面位置
            $('html').animate({scrollTop : $('.storey li').eq(key).offset().top - 200 } ,1000 )
        })
    }
})