const SERVER_IP = "191.96.231.10:10670";

// تحديث إحصائيات السيرفر
function updateServerStats() {
    fetch(`https://api.mcsrvstat.us/2/${SERVER_IP}`)
        .then(response => {
            if (!response.ok) throw new Error('خطأ في الشبكة');
            return response.json();
        })
        .then(data => {
            if (data.online) {
                document.getElementById('players-online').textContent = data.players.online;
                document.getElementById('players-max').textContent = `/ ${data.players.max}`;
                document.getElementById('server-version').textContent = data.version;
                document.getElementById('server-protocol').textContent = `بروتوكول: ${data.protocol}`;
                document.getElementById('server-uptime').textContent = formatUptime(data.debug.ping);
                document.getElementById('server-status').textContent = "متصل";
            } else {
                document.getElementById('server-status').textContent = "غير متصل";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('server-status').textContent = "خطأ في الاتصال";
        });
}

function formatUptime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// التحديث التلقائي كل 5 ثوانٍ
setInterval(updateServerStats, 5000);
updateServerStats();
const translations = {
    en: {
        stats: "Statistics",
        map: "Map",
        ranks: "Ranks",
        players_now: "Players Online",
        server_performance: "Server Performance",
        version: "Version",
        uptime: "Uptime",
        status_online: "Online",
        status_offline: "Offline",
        connection_error: "Connection Error",
        rank: "Rank",
        price: "Price",
        payment_method: "Payment Method",
        step1: "Transfer the amount to: 07712298697",
        step2: "Send a ticket on Discord with: Rank name and proof of payment",
        step3: "Rank will be activated within 24 hours ⏳",
    },
    ar: {
        stats: "الإحصائيات",
        map: "الخريطة",
        ranks: "الرتب",
        players_now: "اللاعبون الآن",
        server_performance: "أداء السيرفر",
        version: "الإصدار",
        uptime: "وقت التشغيل",
        status_online: "متصل",
        status_offline: "غير متصل",
        connection_error: "خطأ في الاتصال",
        rank: "الرتبة",
        price: "السعر",
        payment_method: "طريقة الشراء",
        step1: "قم بتحويل المبلغ إلى الرقم: 07712298697",
        step2: "أرسل تذكرة على الديسكورد تحتوي على: اسم الرتبة وصورة إثبات التحويل",
        step3: "سيتم تفعيل الرتبة خلال 24 ساعة ⏳",
    },
    ru: {
        stats: "Статистика",
        map: "Карта",
        ranks: "Ранги",
        players_now: "Игроки онлайн",
        server_performance: "Производительность",
        version: "Версия",
        uptime: "Время работы",
        status_online: "Онлайн",
        status_offline: "Оффлайн",
        connection_error: "Ошибка подключения",
        rank: "Ранг",
        price: "Цена",
        payment_method: "Способ оплаты",
        step1: "Переведите сумму на номер: 07712298697",
        step2: "Отправьте тикет в Discord с: названием ранга и подтверждением оплаты",
        step3: "Ранг будет активирован в течение 24 часов ⏳",
    }
};

// دالة تغيير اللغة
function changeLanguage(lang) {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // تحديث كل العناصر التي تحتوي على بيانات الترجمة
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[lang][key];
    });
}

// حدث النقر على أزرار تغيير اللغة
document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;
        changeLanguage(lang);
    });
});

// التهيئة الأولية باللغة العربية
changeLanguage('ar');

// باقي الكود...