var signalRHub;
var connectionID = "";

$(function () {
    signalRHub = $.connection.comHub;

    signalRHub.client.SendMessage = function (command) {
		
		$("#tab1").append(command+"<br/>");

        if (command.includes("TicketCalled(")) {
            $.get("Notifier/Index", { ActionName: "TicketCalled", Args:"" }, function (data) {
                data = data.replace(/\s/g, '');
                $("#tab1").append(data + "<br/>");
            });
        }

        if (command.includes("NoShow(")) {
            var pFrom10 = command.indexOf("(");
            var pTo10 = command.indexOf(")");
            var noshowticketid = command.substring(pFrom10 + 1, pTo10);

            $.get("WebKeeper/NoShow", { TicketID: noshowticketid }, function (data) {
                data = data.replace(/\s/g, '');
                $("#tab1").append(data + "<br/>");
            });
        }

        if (command.includes("SetStatus(")) {
            var OnlineFrom = command.indexOf("(");
            var OnlineTo = command.indexOf(",");
            var OnlineConnectionID = command.substring(OnlineFrom + 1, OnlineTo);

            OnlineFrom = command.indexOf(",");
            OnlineTo = command.lastIndexOf(",");
            var StatusName = command.substring(OnlineFrom + 1, OnlineTo);
            StatusName = StatusName.replace('"',"");

            $.get("Notifier/Index", { ActionName: "TerminalStatus", Args: StatusName }, function (data) {
                data = data.replace(/\s/g, '');
                $("#tab1").append(data + "<br/>");
            });
        }

        if (command.includes("SendSMS(")) {
            var SmsFrom = command.indexOf("(");
            var SmsTo = command.indexOf(",");
            var PhoneNum = command.substring(SmsFrom + 1, SmsTo);

            SmsFrom = command.indexOf(",");
            SmsTo = command.lastIndexOf(",");
            var SMSBody = command.substring(OnlineFrom + 1, OnlineTo);
            SMSBody = SMSBody.replace('"', "");

            var fullurl = "https://ictsmsgate.phc.gov.qa:9443/api?action=sendmessage&username=QMagicTicketing&password=xkpt6f2z77&recipient=" + PhoneNum + "messagetype=SMS:TEXT:UCS2&messagedata=" + SMSBody;

            $.get(fullurl, function (data) {
                sendCommand(data);
            });
        }

        if (command.includes("TerminalOnline(")) {
            var OnlineFrom = command.indexOf("(");
            var OnlineTo = command.indexOf(",");
            var OnlineConnectionID = command.substring(OnlineFrom + 1, OnlineTo);

            OnlineFrom = command.indexOf(",");
            OnlineTo = command.lastIndexOf(",");
            var OnlineUserID = command.substring(OnlineFrom + 1, OnlineTo);

            OnlineFrom = command.lastIndexOf(",");
            OnlineTo = command.indexOf(")");
            var OnlineTerminalID = command.substring(OnlineFrom + 1, OnlineTo);


            $.get("WebKeeper/TerminalOnline", { ConnectionID: OnlineConnectionID, UserID: OnlineUserID, TerminalID: OnlineTerminalID }, function (data) {
                data = data.replace(/\s/g, '');
                signalRHub.server.send(data).fail(function (e) {
                    $("#tab1").append(e.message + "<br/>");
                });
            });

            $.get("Notifier/Index", { ActionName: "TerminalOnline", Args: OnlineConnectionID }, function (data) {
                data = data.replace(/\s/g, '');
                $("#tab1").append(data + "<br/>");
            });
        }

        if (command.includes("DISCONNECTED-")) {
            var DisconnectedConnectionID = command.replace("DISCONNECTED-","");


            $.get("WebKeeper/DisconnectTerminal", { ConnectionID: DisconnectedConnectionID }, function (data) {
                data = data.replace(/\s/g, '');
                signalRHub.server.send(data).fail(function (e) {
                    $("#tab1").append(e.message + "<br/>");
                });
            });

            $.get("WebKeeper/DisconnectDevice", { ConnectionID: DisconnectedConnectionID }, function (data) {
                data = data.replace(/\s/g, '');
                signalRHub.server.send(data).fail(function (e) {
                    $("#tab1").append(e.message + "<br/>");
                });
            });

            $.get("Notifier/Index", { ActionName: "Disconnected", Args: DisconnectedConnectionID }, function (data) {
                data = data.replace(/\s/g, '');
                $("#tab1").append(data + "<br/>");
            });
        }

        if (command.includes("SendChatMessage")) {
            var pFrom8 = command.indexOf("(");
            var pTo8 = command.indexOf(";");
            var senderterminalid = command.substring(pFrom8 + 1, pTo8);

            var pFrom9 = command.indexOf(";");
            var pTo9 = command.indexOf(",");
            var senderuserid = command.substring(pFrom9 + 1, pTo9);

            var pFrom5 = command.indexOf(",");
            var pTo5 = command.indexOf(".");
            var receiverterminalid = command.substring(pFrom5 + 1, pTo5);

            var pFrom6 = command.indexOf(".");
            var pTo6 = command.indexOf(">");
            var receiveruserid = command.substring(pFrom6 + 1, pTo6);

            var pFrom7 = command.indexOf(">");
            var pTo7 = command.indexOf(")");
            var themessage = command.substring(pFrom7 + 1, pTo7);


            $.get("WebKeeper/SaveConversation", { qSenderTerminalID: senderterminalid, qSenderUserID: senderterminalid, qReceiverTerminalID: receiverterminalid, qReceiverUserID: receiveruserid, qMessage: themessage }, function (data) {
                data = data.replace(/\s/g, '');
                signalRHub.server.send(data).fail(function (e) {
                    $("#tab1").append(e.message + "<br/>");
                });
            });
        }

        

    }


    $.connection.hub.disconnected(function () {
        window.location.href = "../../WebKeeper";
    });

    $.connection.hub.error(function (error) {
        alert(error);
        window.location.href = "../../WebKeeper";
    });

    $.connection.comHub.client.exceptionHandler = function (error) {
        alert(error);
        window.location.href = "../../WebKeeper";
    };


    $.connection.hub.start().done(function () {
        connectionID = $.connection.hub.id;

    });
});


function SwitchTab(tabid) {

    $(".tab-pane").hide();
    $("#tab" + tabid).show();

    $(".tab-pane").removeClass("active");
    $("#tab" + tabid).addClass("active");

    $(".tabsap").removeClass("active");
    $("#TabSap" + tabid).addClass("active");
}

function sendCommand(cmd) {
    signalRHub.server.send(cmd).fail(function (e) {
        alert(e.message);
    });
}

