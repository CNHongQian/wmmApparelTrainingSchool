document.addEventListener('DOMContentLoaded', function() {
    // 获取轮播图元素
    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    let slideInterval;

    // 初始化轮播图
    function initCarousel() {
        // 设置第一张轮播图为活动状态
        carouselItems[0].classList.add('active');
        // 启动自动轮播
        startSlideInterval();

        // 添加指示器点击事件
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });

        // 添加按钮点击事件
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);

        // 鼠标悬停时暂停轮播
        document.getElementById('carousel').addEventListener('mouseenter', stopSlideInterval);
        // 鼠标离开时恢复轮播
        document.getElementById('carousel').addEventListener('mouseleave', startSlideInterval);
    }

    // 切换到指定轮播图
    function goToSlide(index) {
        // 移除所有轮播图的活动状态
        carouselItems.forEach(item => item.classList.remove('active'));
        // 移除所有指示器的活动状态
        indicators.forEach(indicator => indicator.style.opacity = '0.5');

        // 设置当前轮播图为活动状态
        carouselItems[index].classList.add('active');
        // 设置当前指示器为活动状态
        indicators[index].style.opacity = '1';

        // 更新当前索引
        currentIndex = index;
    }

    // 切换到上一张轮播图
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        goToSlide(currentIndex);
    }

    // 切换到下一张轮播图
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        goToSlide(currentIndex);
    }

    // 启动自动轮播
    function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 5000); // 每5秒切换一次
    }

    // 停止自动轮播
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    // 初始化轮播图
    initCarousel();
});