const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals: {GoalNear} } = require('mineflayer-pathfinder')
const bot = mineflayer.createBot({ host: 'localhost', port: 65393, username: 'Walker' })
const { Vec3 } = require('vec3')

const RANGE_GOAL = 1 
bot.loadPlugin(pathfinder)
var start = false

bot.once('spawn', () =>{
    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)

    bot.on('chat', (username, message) =>{
        if (username === bot.username) return
        if (message.includes('start')){
            var splits = message.split(' ')
            console.log(splits)
            start = true

        }
        console.log(bot.entity.position)

        
        bot.pathfinder.setMovements(defaultMove)

        if(start){
            bot.on('time', () =>{
                bot.pathfinder.setMovements(defaultMove)
                console.log(bot.entity.position)
                if(bot.entity.position.x > 0 && bot.entity.position.x < 1 && bot.entity.position.z > 0 && bot.entity.position.z < 1){
                    patrulha(splits[1], splits[2])
                }else if (bot.entity.position.x > 10 && bot.entity.position.x < 11 && bot.entity.position.z > 10 && bot.entity.position.z < 11){
                    patrulha(splits[3], splits[4])
                }else if (bot.entity.position.x > 10 && bot.entity.position.x < 11 && bot.entity.position.z > 20 && bot.entity.position.z < 21){
                    patrulha(0,0)
                }
            })
    
        }

        
        
    })
}) 



function patrulha(position1, position2){
    return bot.pathfinder.setGoal(new GoalNear(position1, 10,position2, RANGE_GOAL))
}
