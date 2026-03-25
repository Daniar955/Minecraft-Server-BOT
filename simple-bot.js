const mineflayer = require('mineflayer');

console.log('🚀 Бот запускается...');
console.log('Node.js версия:', process.version);

// НАСТРОЙКИ — ИЗМЕНИТЕ ПОД СЕБЯ!
const config = {
    host: 'lekpixel.aternos.me',  // ваш сервер
    port: 25565,                   // проверьте порт в Aternos!
    username: 'TestBot',
    auth: 'offline'
};

console.log('Подключаюсь к', config.host + ':' + config.port);

const bot = mineflayer.createBot(config);

bot.once('spawn', () => {
    console.log('✅ Бот подключился!');
    
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