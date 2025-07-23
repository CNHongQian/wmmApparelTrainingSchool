document.addEventListener('DOMContentLoaded', function() {
    // 轮播图功能实现
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentIndex = 0;
    let slideInterval;
    const slideDelay = 15000; // 15秒自动播放

    // 初始化轮播
    function initCarousel() {
        showSlide(currentIndex);
        startSlideInterval();
    
        // 绑定事件监听
        if (prevBtn) {
            prevBtn.addEventListener('click', () => { prevSlide(); resetSlideInterval(); });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => { nextSlide(); resetSlideInterval(); });
        }
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => { goToSlide(index); resetSlideInterval(); });
        });
    
        // 窗口失去焦点时暂停自动播放，获得焦点时恢复
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(slideInterval);
            } else {
                startSlideInterval();
            }
        });
    }
    
    // 显示指定索引的幻灯片
    function showSlide(index) {
        // 隐藏所有幻灯片
        carouselItems.forEach(item => {
            item.classList.add('opacity-0');
            item.classList.remove('opacity-100');
            item.style.zIndex = '1';
            item.style.pointerEvents = 'none';
        });
    
        // 显示当前幻灯片
        carouselItems[index].classList.add('opacity-100');
        carouselItems[index].classList.remove('opacity-0');
        carouselItems[index].style.zIndex = '2';
        carouselItems[index].style.pointerEvents = 'auto';
    
        // 更新指示器状态
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('opacity-100', i === index);
            indicator.classList.toggle('opacity-50', i !== index);
        });
    
        currentIndex = index;
    }
    
    // 上一张幻灯片
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
    }
    
    // 下一张幻灯片
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    }
    
    // 跳转到指定幻灯片
    function goToSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }
    
    // 开始自动播放
    function startSlideInterval() {
        // 清除可能存在的计时器
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, slideDelay);
    }
    
    // 重置自动播放计时器
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // 初始化轮播图
    initCarousel();


    // 移动端菜单切换
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        // 切换图标
        const icon = menuBtn.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('py-2', 'shadow-md');
            navbar.classList.remove('py-3', 'shadow-sm');
        } else {
            navbar.classList.add('py-3', 'shadow-sm');
            navbar.classList.remove('py-2', 'shadow-md');
        }
    });

    // 课程选项卡切换
    const courseTabs = document.querySelectorAll('.course-tab');
    const courseContents = document.querySelectorAll('.course-content');

    courseTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除所有选项卡的active类
            courseTabs.forEach(t => {
                t.classList.remove('active', 'bg-accent1', 'text-white');
                t.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            });

            // 为当前选项卡添加active类
            this.classList.add('active', 'bg-accent1', 'text-white');
            this.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');

            // 隐藏所有内容
            courseContents.forEach(content => content.classList.add('hidden'));

            // 显示对应内容
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });

    // 表单提交处理
    const consultForm = document.getElementById('consultForm');
    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // 获取表单数据
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // 在实际项目中，这里会发送数据到服务器
            console.log('表单提交数据:', data);

            // 简单的表单验证
            if (!data.name || !data.phone) {
                alert('请填写姓名和电话');
                return;
            }

            // 显示提交成功消息
            alert('预约提交成功！我们的顾问将尽快与您联系。');
            this.reset();
        });
    }

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 考虑导航栏高度
                    behavior: 'smooth'
                });

                // 如果是移动端，点击后关闭菜单
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = menuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src;
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }
});