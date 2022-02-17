const mineflayer = require('mineflayer')
const { mineflayer: mineflayerViewer } = require('prismarine-viewer')
const { pathfinder, Movements, goals: {GoalNear} } = require('mineflayer-pathfinder')
const bot = mineflayer.createBot({ host: 'localhost', port: 65393, username: 'Path' })
const { Vec3 } = require('vec3')


let mcData
bot.on('inject_allowed', () => {
  mcData = require('minecraft-data')(bot.version)
})


bot.loadPlugin(pathfinder)

const RANGE_GOAL = 1 
path = []
start = false

bot.once('spawn', () => {
    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)
})

bot.on('chat', (username, message) => {
    path = []
    if (message.includes('start')){
        var splits = message.split(' ')
        for (var i = 0; i < splits.length; i++){
            path.push(splits[i])
        }
        bot.pathfinder.setGoal(new GoalNear(splits[1], 10,splits[2], RANGE_GOAL))
        bot.on('time', ()  =>{

            bot_x = Math.floor(bot.entity.position.x) 
            bot_y = Math.floor(bot.entity.position.z) 

            if(bot_x == splits[1] && bot_y == splits[2]){
                bot.pathfinder.setGoal(new GoalNear(splits[3], 10,splits[4], RANGE_GOAL))
                const toSow = blockToSow()
                if (toSow) {
                   bot.equip(mcData.itemsByName.wheat_seeds.id, 'hand')
                   bot.placeBlock(toSow, new Vec3(0, 1, 0))
                }
            }else if(bot_x == splits[3] && bot_y == splits[4]){
                bot.pathfinder.setGoal(new GoalNear(splits[5], 10,splits[6], RANGE_GOAL))
            }else if(bot_x == splits[5] && bot_y == splits[6]){
                bot.pathfinder.setGoal(new GoalNear(splits[1], 10,splits[2], RANGE_GOAL))
            }
            
        })

    }
})



function blockToSow () {
    return bot.findBlock({
      point: bot.entity.position,
      matching: mcData.blocksByName.farmland.id,
      maxDistance: 6,
      useExtraInfo: (block) => {
        const blockAbove = bot.blockAt(block.position.offset(0, 1, 0))
        return !blockAbove || blockAbove.type === 0
      }
    })
  }