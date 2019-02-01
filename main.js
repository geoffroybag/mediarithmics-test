const axios = require("axios")
const rootUrl = "http://castles.poulpi.fr"
const entry = "http://castles.poulpi.fr/castles/1/rooms/entry"
let chestsFound = []

// entry point
async function enterCastle () {
    try {
        let {data} = await fetch(entry);
        const res = checkRoom(data)
    } catch(err) {
            console.error(err.message);
    }
}

// recursive function to check all Rooms in castle
async function checkRoom (oneRoom) {
    try{
        oneRoom.chests.forEach(async function findChest(oneChest){
            try{
                const {data} = await fetch(rootUrl+oneChest)
                if(data.status !== "This chest is empty :/ Try another one!"){
                    chestsFound.push(data.id)
                }
            }
            catch(err){
                console.error(err.message);
            }
        })
        
        if(oneRoom.rooms.length>0){
            oneRoom.rooms.forEach(async function (oneAdjacentRoom) {
                try {
                    let {data} = await fetch(rootUrl + oneAdjacentRoom);
                    checkRoom(data);
                } catch(err) {
                    console.error(err.message);
                }
            });
        }

    }
    catch(err){
        console.error(err.message)
    }
}


enterCastle().then(() => console.log(chestsFound))



