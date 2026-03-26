const mineflayer = require('mineflayer');

console.log('🚀 Бот запускается...');

const config = {
    host: 'minecart-1Dee.aternos.me',
    port: 13143,
    username: 'TestBot',
    auth: 'offline',
    version: '1.16.5',
    loginTimeout: 60000
};

console.log('Подключаюсь к', config.host + ':' + config.port);

const bot = mineflayer.createBot(config);

let loginAttempted = false;
const PASSWORD = 'TestBot938';  // ← ПРИДУМАЙТЕ ПАРОЛЬ (любой, например TestBot123)

bot.once('spawn', () => {
    console.log('✅ Бот подключился!');
    
    // Пытаемся войти через 3 секунды
    setTimeout(() => {
        bot.chat('/login ' + PASSWORD);
        loginAttempted = true;
    }, 3000);
    
    // Движение
    setInterval(() => {
        bot.setControlState('forward', true);
        setTimeout(() => bot.setControlState('forward', false), 1000);
    }, 30000);
    
    // Повороты головы
    setInterval(() => {
        bot.look(Math.random() * Math.PI * 2, 0);
    }, 15000);
});

// Слушаем сообщения от сервера (если просит зарегистрироваться)
bot.on('chat', (username, message) => {
    // Если сервер пишет, что нужно зарегистрироваться
    if (message.includes('register') || message.includes('зарегистрируйся') || message.includes('/register')) {
        console.log('📝 Сервер просит регистрацию, регистрируюсь...');
        bot.chat('/register ' + PASSWORD + ' ' + PASSWORD);
    }
    
    // Если сервер пишет, что пароль неверный
    if (message.includes('wrong password') || message.includes('неверный пароль')) {
        console.log('⚠️ Неверный пароль, пробую зарегистрироваться...');
        bot.chat('/register ' + PASSWORD + ' ' + PASSWORD);
    }
});

bot.on('error', (err) => {
    console.error('❌ Ошибка:', err.message);
});

bot.on('end', (reason) => {
    console.log('🔌 Отключились. Причина:', reason);
    setTimeout(() => {
        console.log('🔄 Переподключаюсь...');
        const newBot = mineflayer.createBot(config);
    }, 10000);
});

bot.on('kicked', (reason) => {
    console.log('👢 Бота выгнали. Причина:', reason);
    setTimeout(() => {
        console.log('🔄 Переподключаюсь...');
        const newBot = mineflayer.createBot(config);
    }, 10000);
});

console.log('Бот создан, ждем подключения...');