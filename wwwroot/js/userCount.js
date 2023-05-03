//create connection
//var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();
var connectionUserCount = new signalR.HubConnectionBuilder()
    //.configureLogging(signalR.LogLevel.Information)
    .withUrl("/hubs/userCount", signalR.HttpTransortType.WebSockets).build();
//signalR.HttpTransortType:
//.ServerSentEvents
//.LongPolling = loop requests
//.WebSockets
//.None = doesn't have sense to use

//connect to methods that hub inovkes => receive notifications from hub
connectionUserCount.on("updateTotalViews", (value) => { //value is our value
    var newCountSpan = document.getElementById("totalViewsCounter");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalUsers", (value) => { //value is our value
    var newCountSpan = document.getElementById("totalUsersCounter");
    newCountSpan.innerText = value.toString();
});

//invoke hub methods => send notification to hub
function newWindowLoadedOnClient() {
    //connectionUserCount.send("NewWindowLoaded"); //method name to invoke
    // .send doesn't wait the response from the server
    //connectionUserCount.invoke("NewWindowLoaded").then((value) => console.log(value)); //method name to invoke
    // .invoke wait the response from the server
    // with invoke you have to use .then() to do something
    // invoke accepted more arguments to pass to the server (the first argument is the methods name)
    connectionUserCount.invoke("NewWindowLoaded", "Pippo").then((value) => console.log(value)); //method name to invoke
}

//start connection
function fulfilled() {
    //do something on start
    console.log("Connection to User Hub Successful");
    newWindowLoadedOnClient();
}

function rejected() {
    //rejected logs
}

connectionUserCount.start().then(fulfilled, rejected);