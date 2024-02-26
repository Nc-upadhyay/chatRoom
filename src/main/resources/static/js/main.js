let stompClient =  null;
let isSender=null;
function connect() {
    localStorage.setItem("name",$("#name").val())
    let socket = new SockJS("/server1");
    stompClient = Stomp.over(socket);
    console.log("connect function call")
    stompClient.connect({},function(frame){
        setConnected(true);
        console.log("Connected " + frame);
        stompClient.subscribe("/topic/return-to",function (response){
            showMessage(JSON.parse(response.body));
        })
    })
}

function setConnected(connected) {
    $('#connect').prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    $("#name").val("")
    $("#t-heading").text("Welcome "+localStorage.getItem("name")+" to chat room")
    if (connected) {
        $("#conversation").show();
    } else
        $("#conversation").hide();
    $("#greetings").html("");
}
function disConnected() {
    stompClient.deactivate();
    setConnected(false);
    console.log("Disconnected");
}
function sendMessage() {
    let jsonOb = {
        name:localStorage.getItem("name") ,
        message: $("#message").val()
    }
    stompClient.send("/app/message", {}, JSON.stringify(jsonOb));
    $("#name").val("")
    $("#message").val("")

}
function showMessage(data) {
    const sender=data.name;
    const receiver=localStorage.getItem("name");
    isSender= sender===receiver
    console.log("isSender "+isSender)
    if(isSender){
        $("#greetings").append("<tr class='sender'><td> <b>"+ sender+" </b> <p> "+ data.message + "</p></td></tr>");
    }else{
        $("#greetings").append("<tr class='receiver'><td> <b>"+ sender+" </b>  <p >"+ data.message + "</p></td></tr>");

    }
    // $("#greetings").append("<tr><td> <b>"+ data.name+": </b>  "+ data.message + "</td></tr>");
}
$(document).ready(function(){
    console.log("runing...");
    $("form").on('submit', (e) => e.preventDefault());
    $( "#connect" ).click(() => connect());
    $( "#disconnect" ).click(() => disconnect());
    $( "#send" ).click(() => sendMessage());
}); 