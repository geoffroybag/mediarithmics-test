const http = require('http')
const rp = require('request-promise')
const myAgent = new http.Agent()
myAgent.maxSockets = 500


const rootUrl = "http://castles.poulpi.fr"
let chestsFound = []
const roomsChecked = new Set();


// entry point
async function enterCastle () {
    try {
        await checkRoom("/castles/1/rooms/entry")
        console.log("chests found", chestsFound.length)
        console.log("rooms visited", roomsChecked.size)
    } catch(err) {
        console.log(err.message);
    }
}

async function enterRoom(oneRoom){
    if(!roomsChecked.has(oneRoom)){
        roomsChecked.add(oneRoom)
        console.log("rooms visited", roomsChecked.size)
        const res = await loadRoomInfo(oneRoom)
        return res
    }
}

async function loadRoomInfo(oneRoom){
    try {
        let response = await rp({ url: rootUrl + oneRoom, agent: myAgent, json: true})
        return response;
      }catch(e){
        // console.error(e.message)
      }
}

// recursive function to check all Rooms in castle
async function checkRoom (oneRoom) {

    try{
        const data = await enterRoom(oneRoom)
        if(data){
            await Promise.all(data.chests.map(oneChest => checkChest(oneChest)));
            await Promise.all(data.rooms.map(oneRoom => checkRoom(oneRoom)));
        }
    }
    catch(err){
        // console.log(err.message)
    }
}

async function checkChest(oneChest){
    try{
        const response = await rp({ url: rootUrl + oneChest, agent: myAgent, json: true })
        if(response.status !== "This chest is empty :/ Try another one!"){
            chestsFound.push(response.id)
            console.log("chests found", chestsFound.length)
        }
    }
    catch(err){
        // console.log(err.message);
    }
}

enterCastle()



