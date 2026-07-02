require('dotenv').config();
const { Telegraf } = require('telegraf');
const { generate } = require('random-words');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Welcome message when someone types /start
bot.start((ctx) => {
    ctx.reply("👋 Welcome! I am your Random Word Generator Bot.\n\nType /word to get a single word, or /words to get a list of 3 words!");
});

// Command for a single random word
bot.command('word', (ctx) => {
    const word = generate();
    ctx.reply(`🎲 Your random word is: **${word}**`, { parse_mode: 'Markdown' });
});

// Command for multiple random words
bot.command('words', (ctx) => {
    const wordsList = generate(3).join(', ');
    ctx.reply(`🎲 Your 3 random words are: **${wordsList}**`, { parse_mode: 'Markdown' });
});

// Launch the bot
bot.launch().then(() => {
    console.log("Bot is running successfully!");
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
