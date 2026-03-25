const mineflayer = require('mineflayer');

console.log('🚀 Бот запускается...');
console.log('Node.js версия:', process.version);

// НАСТРОЙКИ — ИЗМЕНИТЕ ПОД СЕБЯ!
const config = {
    host: 'minecart-1Dee.aternos.me',  // ваш сервер
    port: 13143,                   // проверьте порт в Aternos!
    username: 'TestBot',
    auth: 'offline'
};

console.log('Подключаюсь к', config.host + ':' + config.port);

const bot = mineflayer.createBot(config);

bot.once('spawn', () => {
    console.log('✅ Бот подключился!');
    
    // Ждем 3 секунды и вводим пароль
    setTimeout(() => {
        bot.chat('/login ВашПароль');  // Вместо ВашПароль — реальный пароль
        // Если бот еще не зарегистрирован, используйте:
        // bot.chat('/register Пароль Пароль');
    }, 3000);
    
    // Остальной код...
    
    // Простое движение, чтобы не выкинуло
    setInterval(() => {
        bot.setControlState('forward', true);
        setTimeout(() => bot.setControlState('forward', false), 1000);
    }, 30000);
});

bot.on('error', (err) => {
    console.error('❌ Ошибка:', err.message);
});

bot.on('end', () => {
    console.log('🔌 Отключились');
});

console.log('Бот создан, ждем подключения...');