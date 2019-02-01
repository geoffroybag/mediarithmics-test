const axios = require("axios")
const rootUrl = "http://castles.poulpi.fr"
const entry = "http://castles.poulpi.fr/castles/1/rooms/entry"
let chestsFound = []
const EMPTY_CHEST = "This chest is empty :/ Try another one!";
const alreadyVisitedRooms = new Set();
const NUMBER_RETRY = 5;


function isChestEmpty(chest) { 
  return chest.status !== EMPTY_CHEST;
}

async function makeRequest(url, failures){
  try {
    let response = await axios({
        method: 'get',
        url: `${rootUrl}${url}`,
    });
    return response.data;
  }catch(e){
    failures++;
    if(failures > NUMBER_RETRY){
      throw e;
    }else{
      makeRequest(url, failures);
    }
  }
}

function checkAndVisitRoom(roomUrl) {
  if (alreadyVisitedRooms.has(roomUrl)) {
    return null;
  }
  alreadyVisitedRooms.add(roomUrl)
  return makeRequest(roomUrl);
}


async function openChest(chestUrl) {
  let chest = await makeRequest(chestUrl);

  if (isChestEmpty(chest)) {
    chestsFound.push(`http://castles.poulpi.fr/castles/1/chests/${chest.id}`);
  }
}

async function recursivelyExploreCastle(roomUrl){
  // we can recursively explore the castle without fearing a stackoverflow because since the exploration is asynchronous, all the function calls won't be in the stack together
  let room = checkAndVisitRoom(roomUrl);

  if(room === null){
    return;
  }

  const data = await room;
  console.log(data)
  await Promise.all(data.chests.map( (url) => openChest(url)));

  await Promise.all(data.rooms.map( (url) => recursivelyExploreCastle(url)));
  // the function won't return until every room has been explored
}

async function main(){
  try {
    await recursivelyExploreCastle("/castles/1/rooms/entry");
    console.log(chestsFound);
  } catch (e){
    console.log("an error occured", e);
  }
}


main().then(()=> console.log("task done"));
