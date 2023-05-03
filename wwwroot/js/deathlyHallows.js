var cloakSpan = document.getElementById("cloakCounter");
var stoneSpan = document.getElementById("stoneCounter");
var wandSpan = document.getElementById("wandCounter");

//create connection
var connectionDeathlyHallows = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/deathlyhallows").build();

//connect to methods that hub inovkes => receive notifications from hub
connectionDeathlyHallows.on("updateDeathlyHallowsCount", (cloak, stone, wand) => { //value is our value
    cloakSpan.innerText = cloak.toString();
    stoneSpan.innerText = stone.toString();
    wandSpan.innerText = wand.toString();
});

//invoke hub methods => send notification to hub

//start connection
function fulfilled() {
    connectionDeathlyHallows.invoke("GetRacetatus").then((raceCounter) => {
        cloakSpan.innerText = raceCounter.cloak.toString();
        stoneSpan.innerText = raceCounter.stone.toString();
        wandSpan.innerText = raceCounter.wand.toString();
    });
    //do something on start
    console.log("Connection to User Hub Successful");
}

function rejected() {
    //rejected logs
}

connectionDeathlyHallows.start().then(fulfilled, rejected);