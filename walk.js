const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals: {GoalNear} } = require('mineflayer-pathfinder')
const bot = mineflayer.createBot({ host: 'localhost', port: 62641, username: 'Walker' })

const RANGE_GOAL = 1 
bot.loadPlugin(pathfinder)

bot.once('spawn', () =>{
    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)

    bot.on('chat', (username, message) =>{
        if (username === bot.username) return
        if (message !== 'come') return
        const target = bot.players[username]?.entity

        if(!target){
            bot.chat('Não acho o caminho')
        }

        const {x: playerX, y: playerY, z: playerZ} = target.position
        
        bot.pathfinder.setMovements(defaultMove)
        bot.pathfinder.setGoal(new GoalNear(10, 10, 10, RANGE_GOAL))
        bot.pathfinder.setGoal(new GoalNear(-10, 10, -10, RANGE_GOAL))
        
    })
})