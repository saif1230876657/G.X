document.addEventListener('DOMContentLoaded', () => {

    const container = document.querySelector('.projects-container');
    const navLinks = document.querySelectorAll('.top-nav a');

    // دالة مركزية لتحديث الأيقونة النشطة
    function setActiveLink(activeIndex) {
        navLinks.forEach((link, index) => {
            if (index === activeIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // --- الحل النهائي لمشكلة الضغط المباشر ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // منع أي سلوك افتراضي للرابط

            const index = parseInt(link.dataset.index);
            
            // 1. قم بتلوين الأيقونة فورًا
            setActiveLink(index);

            // 2. انتقل إلى القسم المطلوب بسلاسة
            const frameWidth = container.clientWidth;
            container.scrollTo({
                left: frameWidth * index,
                behavior: 'smooth'
            });
        });
    });

    // --- هذا الجزء ليظل السحب يعمل بشكل صحيح ---
    let scrollTimer = null;
    container.addEventListener('scroll', () => {
        // ننتظر حتى يتوقف المستخدم عن السحب لتحديث الأيقونة
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            const frameWidth = container.clientWidth;
            const currentIndex = Math.round(container.scrollLeft / frameWidth);
            setActiveLink(currentIndex);
        }, 100); // تأخير بسيط لضمان الدقة
    });
    
    // تأكد من تفعيل الأيقونة الأولى عند تحميل الصفحة
    setActiveLink(0); 
});
