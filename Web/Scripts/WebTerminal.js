//var signalRHub;
var connectionID = "";
var signalRHub;
var BackupCall = "";

var NextCallStatus = "";
var NextCallColor = "";

var EndStatus = "";
var EndStatusColor = "";

var gRecallStatus = "";
var gRecallStatusColor = "";

var ReadyStatus = "";
var ReadyColor = "";
var ReadyStatusID = 0;

var ExitStatus = "";
var ExitColor = "";
var ExitStatusID = 0;

var IsRecalled = false;
var IsVotebookEnabled = false;
var VotebookAvailability = true;
var MyVotebookID = 0;

var seconds = 0, minutes = 0, hours = 0, t;
var h1 = document.getElementById("ProcessTime");

function SetEndStatuses(gEndStatus, gEndStatusColor) {
    EndStatus = gEndStatus;
    EndStatusColor = gEndStatusColor;
}

function SetNextCallStatuses(gNextCall, gNextCallColor) {
    NextCallStatus = gNextCall;
    NextCallColor = gNextCallColor;
}

function SetReadyStatus(gReadyStatus, gReadyColor, gReadyID) {
    ReadyStatus = gReadyStatus;
    ReadyColor = gReadyColor;
    ReadyStatusID = gReadyID;
}

function SetExitStatus(gExitStatus, gExitColor, gExitID) {
    ExitStatus = gExitStatus;
    ExitColor = gExitColor;
    ExitStatusID = gExitID;
}

function SwitchTab(tabid) {

    if (tabid === 1) {
        RefleshWaitingList();
    }
    if (tabid === 2) {
        RefleshParkedList();
    }
    if (tabid === 3) {
        RefleshHistoryList();
    }
    if (tabid === 4) {
        RefleshOnlineList();
    }

    $(".tab-pane").hide();
    $("#tab" + tabid).show();

    $(".tab-pane").removeClass("active");
    $("#tab" + tabid).addClass("active");

    $(".tabsap").removeClass("active");
    $("#TabSap" + tabid).addClass("active");
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

$(document).ready(function () {
    $(".ctrlbutton").prop('disabled', true);
    $("#btnNextCall").prop("disabled", false);

    $("#genService").on('change', function () {
        var ServiceID = $("#genService").val();

        $(".SegmentItem").hide();
        $(".SegmentItem").removeAttr("selected");
        $(".SegmentItem").each(function () {
            if ($(this).attr("ServiceID") == ServiceID) {
                $(this).show();
                $(this).attr("selected","selected");
            }
        });
    });

    $(window).on('beforeunload', function () {
        signalRHub.server.interSend("ChangeStatus(" + ExitStatusID + "," + terminalID + ")");
    });
});

$(function () {
    signalRHub = $.connection.comHub;

    signalRHub.client.SendMessage = function (command) {

        // SOMEONE DISCONNECTED //
        if (command.includes("DISCONNECTED-")) {
            var conid = command.replace("DISCONNECTED-", "");
            if (conid === connectionID) {
                window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
            }

            $.get("/WebTerminal/OnlineList", { TerminalID: terminalID }, function (data) {
                $("#ListOfOnline").html(data);
            });
        }

        if (command.includes("ConnectionClosed")) {
            $.get("/WebTerminal/OnlineList", { TerminalID: terminalID }, function (data) {
                $("#ListOfOnline").html(data);
            });
        }
        ////////////////////////

        // SOMEONE CONNECTED //
        if (command.includes("TerminalOnline")) {
            $.get("/WebTerminal/OnlineList", { TerminalID: terminalID }, function (data) {
                $("#ListOfOnline").html(data);
            });
        }

        if (command.includes("ConnectionOpened")) {
            $.get("/WebTerminal/OnlineList", { TerminalID: terminalID }, function (data) {
                $("#ListOfOnline").html(data);
            });
        }
        ////////////////////////


        // GONE BREAK //

        if (command.includes("BreakStarted")) {
            var pFrom3 = command.indexOf("(");
            var pTo3 = command.indexOf(")");
            var Termid = command.substring(pFrom3 + 1, pTo3); 

            if (Termid === terminalID) {

                $.connection.hub.stop().done(function () {
                    swal({
                        title: "Enjoy your break !",
                        text: "Your break is started. We will redirect you to the login page to secure your terminal. You can continue after re-login. Do you want to proceed?",
                        icon: "question",
                        buttons: true,
                        dangerMode: false
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                window.location = "../Session/Logout";
                            } else {
                                swal({
                                    title: "Nothing changed",
                                    icon: "success"
                                });
                            }
                        });
                });
            }
        }
        

        //////////////////////


        // TICKET CALLED //
        if (command.includes("TicketCalled")) {
            var pFrom = command.indexOf("(");
            var pTo = command.indexOf(",");
            var cTicketID = command.substring(pFrom + 1, pTo);

            pFrom = command.indexOf(",");
            pTo = command.indexOf(")");
            var cTerminalID = command.substring(pFrom + 1, pTo);

            if (cTerminalID === terminalID) {
                $.get("/WebTerminal/InfoBoxTicket", { TicketID: cTicketID, TerminalID: cTerminalID }, function (data) {
                    if (data.includes("Username")) {
                        window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
                    }
                    else {
                        $("#InfoBox").html(data);

                        RefleshParkedList();
                        RefleshWaitingList();
                    }
                });

                RefleshParkedList();
                RefleshWaitingList();
            }
            else {
                if (typeof cTicketID !== "undefined" && cTicketID !== "" && cTicketID !== 0) {
                    $.get("/WebTerminal/CheckMacroForReflesh", { TerminalID: cTerminalID, TicketID: cTicketID }, function (data) {
                        var segm = data.replace(/\s/g, '');
                        if (segm !== "undefined") {
                            var segment = segm.substring(segm.indexOf("(") + 1, segm.indexOf(","));
                            //var calledmacroid = segm.substring(segm.indexOf(",") + 1, segm.indexOf(")"));
                            CheckSegment(segment);
                        }
                    });
                }
            }
        }
        //////////////////


        // TICKET MANUALLY CALLED //
        if (command.includes("CalledManually")) {
            var pFromM = command.indexOf("(");
            var pToM = command.indexOf(",");
            var cTicketIDM = command.substring(pFromM + 1, pToM);

            pFromM = command.indexOf(",");
            pToM = command.indexOf(")");
            var cTerminalIDM = command.substring(pFromM + 1, pToM);

            if (cTerminalIDM === terminalIDM) {
                RefleshParkedList();
                RefleshWaitingList();
            }
            else {
                $.get("/WebTerminal/CheckMacroForReflesh", { TerminalID: cTerminalIDM, TicketID: cTicketIDM }, function (data) {
                    var segm = data.replace(/\s/g, '');
                    if (segm !== "undefined") {
                        var segment = segm.substring(segm.indexOf("(") + 1, segm.indexOf(","));
                        //var calledmacroid = segm.substring(segm.indexOf(",") + 1, segm.indexOf(")"));
                        
                            CheckSegment(segment);
                    }
                });
            }
        }
        //////////////////


        // LoadBrokenTicket //
        if (command.includes("LoadBrokenTicket")) {
            var pFrom11 = command.indexOf("(");
            var pTo11 = command.indexOf(",");
            var cTicketID9 = command.substring(pFrom11 + 1, pTo11);

            pFrom11 = command.indexOf(",");
            pTo11 = command.indexOf(")");
            var cTerminalID9 = command.substring(pFrom11 + 1, pTo11);

            if (cTerminalID9 === terminalID) {
                $.get("/WebTerminal/InfoBoxTicket", { TicketID: cTicketID9, TerminalID: cTerminalID9 }, function (data) {
                    if (data.includes("Username")) {
                        window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
                    }
                    else {
                        $("#InfoBox").html(data);

                        RefleshParkedList();
                        RefleshWaitingList();
                    }
                });
            }
            else {
                $.get("/WebTerminal/CheckMacroForReflesh", { TerminalID: cTerminalID9, TicketID: cTicketID9 }, function (data) {
                    var segm = data.replace(/\s/g, '');
                    if (segm !== "undefined") {
                        var segment = segm.substring(segm.indexOf("(") + 1, segm.indexOf(","));
                        //var calledmacroid = segm.substring(segm.indexOf(",") + 1, segm.indexOf(")"));
                            CheckSegment(segment);
                    }
                });
            }
        }
        //////////////////


        // TICKET PRINTED //
        if (command.includes("PrintTicket")) {
            var pFrom2 = command.indexOf("(");
            var pTo2 = command.indexOf(",");
            var TicketNumber = command.substring(pFrom2 + 1, pTo2);

            pFrom2 = getPosition(command, ",", 1);
            pTo2 = getPosition(command, ",", 2);
            var ServiceID = command.substring(pFrom2+1, pTo2);

            pFrom2 = getPosition(command, ",", 2);
            pTo2 = getPosition(command, ",", 3);
            var SegmentID = command.substring(pFrom2+1, pTo2);

            pFrom2 = getPosition(command, ",", 3);
            pTo2 = command.indexOf(")");
            var BranchID = command.substring(pFrom2 + 1, pTo2);

            if (SegmentList.includes(SegmentID)) {
                RefleshWaitingList();
            }
            
        }
        //////////////////

        // I GOT A CHAT MESSAGE //

        if (command.includes("SendChatMessage")) {
            $.get("/WebTerminal/OnlineList", { TerminalID: terminalID }, function (data) {
                $("#ListOfOnline").html(data);
            });

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


            if (receiverterminalid === terminalID) {
                if ($("#CW_" + receiveruserid).length > 0) {
                    $.get("/WebTerminal/ChatBaloon", { UserID: receiveruserid, Message: themessage }, function (data) {
                        $("#ChatBaloons_" + receiveruserid).append(data);
                        $("#ChatBaloons_" + receiveruserid).animate({ scrollTop: $("#ChatBaloons_" + receiveruserid).prop('scrollHeight') });
                    });
                }
                else {
                    if ($("#CW_" + senderuserid).length) {
                        $.get("/WebTerminal/ChatBaloon", { UserID: senderuserid, Message: themessage }, function (data) {
                            $("#ChatBaloons_" + senderuserid).append(data);
                            $("#ChatBaloons_" + senderuserid).animate({ scrollTop: $("#ChatBaloons_" + senderuserid).prop('scrollHeight') });
                        });
                    }
                    else {
                        var rightspace = $(".PrivateChatWindow").length * 250;
                        rightspace = rightspace + $(".PrivateChatWindow").length * 10;
                        rightspace = rightspace + 280;
                        $.get("/WebTerminal/ChatWindow", { SenderTerminalID: receiverterminalid, SenderUserID: receiveruserid, ReceiverTerminalID: senderterminalid, ReceiverUserID: senderuserid, Message: themessage, rightlocation: rightspace }, function (data) {
                            $("body").append(data);
                        });
                    }
                }
            }
        }

        ////////////////////////


        // TICKET TERMINAL TRANSFERRED //
        if (command.includes("TransferredTerminal")) {
            var pFrom3 = command.indexOf("(");
            var pTo3 = command.indexOf(")");
            var Termid = command.substring(pFrom3 + 1, pTo3);

            if (Termid === terminalID) {
                RefleshWaitingList();
            }
        }
        //////////////////

        // TICKET SERVICE TRANSFERRED //
        if (command.includes("TransferredService")) {
            var pFrom4 = command.indexOf("(");
            var pTo4 = command.indexOf(")");
            var SegmID = command.substring(pFrom4 + 1, pTo4);

            if (SegmentList.includes(SegmID)) {
                RefleshWaitingList();
            }
        }
        //////////////////

        // READ RESPONSE FROM VOTEBOOK //

        //VotebookAvailability

        if (command.includes("VotebookStatus")) {
            var pFrom12 = command.indexOf("(");
            var pTo12 = command.indexOf(",");
            var cVotebookID = command.substring(pFrom12 + 1, pTo12);

            pFrom12 = command.indexOf(",");
            pTo12 = command.indexOf(")");
            var cVotebookAvailable = command.substring(pFrom12 + 1, pTo12);

            if (cVotebookID == MyVotebookID) {
                if (cVotebookAvailable == "true") {
                    VotebookAvailability = false;
                }
                else
                {
                    VotebookAvailability = true;
                }
            }
        }

        /////////////////
    }

    $.connection.hub.disconnected(function () {
        signalRHub.server.interSend("ChangeStatus(" + ExitStatusID + "," + terminalID + ")");
        setTimeout(function () {
            $.connection.hub.start();
        }, 5000);
        //window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
    });

    $.connection.hub.error(function (error) {
        swal({
            title: "Error Occurred",
            text: error,
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
        window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
    });

    $.connection.comHub.client.exceptionHandler = function (error) {
        swal({
            title: "Error Occurred",
            text: error,
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
        window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
    };

    var LongLoadTime;

    $.connection.hub.start().done(function () {
        connectionID = $.connection.hub.id;
        if (terminalID !== "" && connectionID !== "" && loginuserID !== "") {
            signalRHub.server.send("TerminalOnline(" + connectionID + ", " + loginuserID + " ," + terminalID + ")");
            RefleshWaitingList();
            if (BackupCall !== "") {
                BreakCall(BackupCall);
            }
            //ChangeStatus

            signalRHub.server.interSend("ChangeStatus(" + ReadyStatusID + "," + terminalID + ")");

            if ($("#TerminalLoadingMain").hasClass("LongLoad")) {
                $("#loadinf").show();
                LongLoadTime = setTimeout(StopLongLoad, 45000);
            }
            else {
                $("#TerminalLoadingMain").fadeOut("fast");
            }
        }
        else {
            swal({
                title: "Error Occurred",
                text: " Some of informations couldn't get. Please re-login. \n User ID : " + loginuserID + "\n Terminal ID : " + terminalID,
                icon: "error",
                buttons: false,
                dangerMode: true,
            });
        }
    });

    function StopLongLoad() {
        clearTimeout(LongLoadTime);
        $("#TerminalLoadingMain").fadeOut("fast");
    }
});

function CheckSegment(SegmentID) {
    if (SegmentList.includes(SegmentID)) {
        RefleshWaitingList();
    }
}

function SelfishCall(terminalID, loginuserID, gNextCallStatus, gNextCallStatusColor) {
    stopTimer();
    $("#InfoBox").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'></p></td></tr></table>");
    $.get("/WebTerminal/SelfNextCall", { TerminalID: terminalID, UserID: loginuserID }, function (calldata) {
        $("#InfoBox").html(calldata);
        RefleshWaitingList();
        RefleshStatisticBox();
        setTimeout(function () {
            SetStatus(terminalID, gNextCallStatus, gNextCallStatusColor);
        }, 2000);
    });
}

function NextCall(gNextCallStatus, gNextCallStatusColor) {
    var tickid = $("#InfoTicketID").val();

    if (IsVotebookEnabled === true) {
        signalRHub.server.send("IsVotebookAvailable(" + MyVotebookID + ")");
    }

    if (typeof tickid !== "undefined" && tickid !== "") {
        $("#InfoTicketID").val("");
        $(".ctrlbutton").prop('disabled', true);
        $("#btnNextCall").prop("disabled", false);

        $.get("/WebTerminal/SelfEndTicket", { TicketID: tickid }, function (data) {
            SetStatus(terminalID, EndStatus, EndStatusColor);

            if (IsVotebookEnabled === false) {
                SelfishCall(terminalID, loginuserID, gNextCallStatus, gNextCallStatusColor);
            }
            else {
                if (VotebookAvailability === true) {
                    SelfishCall(terminalID, loginuserID, gNextCallStatus, gNextCallStatusColor);
                }
                else {
                    swal({
                        title: "Voting continue...",
                        text: "Votebook is busy right now. If you click OK voting will be terminated. Do you want to proceed?",
                        icon: "info",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((doit) => {
                            if (doit) {
                                SelfishCall(terminalID, loginuserID, gNextCallStatus, gNextCallStatusColor);
                            }
                        });
                }
            }
        });
    }
    else {
        if (IsVotebookEnabled === false) {
            SelfishCall(terminalID, loginuserID, gNextCallStatus, gNextCallStatusColor);
        }
        else {
            if (VotebookAvailability === true) {
                SelfishCall(terminalID, loginuserID, gNextCallStatus, gNextCallStatusColor);
            }
            else {
                swal({
                    title: "Voting continue...",
                    text: "Votebook is busy right now. If you click OK voting will be terminated. Do you want to proceed?",
                    icon: "info",
                    buttons: true,
                    dangerMode: true,
                })
                .then((doit) => {
                    if (doit) {
                        SelfishCall(terminalID, loginuserID, gNextCallStatus, gNextCallStatusColor);
                    }
                });
            }
        }
    }
}

function ReCall(RecallStatus, RecallStatusColor) {
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined" && tickid !== "") {
        signalRHub.server.send("TicketCalled(" + tickid + "," + terminalID + ")");

        signalRHub.server.interSend("FlashNumber(" + tickid + "," + terminalID + ")");

        stopTimer();

        gRecallStatus = RecallStatus;
        gRecallStatusColor = RecallStatusColor;

        IsRecalled = true;

        var btn = $(".ctrlbutton");
        btn.prop('disabled', true);
        setTimeout(function () {
            btn.prop('disabled', false);
        }, 15000);
    }
    else {
        swal({
            title: "Error Occurred",
            text: "There is no ticket! Please check your information box and be sure you have called a ticket.",
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
    }
}

function BreakTime(TerminalID) {
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined" && tickid !== "") {
        swal({
            title: "Error Occurred",
            text: "Customers are waiting for your service. Please close the current ticket before leaving.",
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
    }
    else {
        signalRHub.server.interSend("BreakTime(" + terminalID + ")");
        swal({
            title: "Enjoy!",
            text: "Thank you for your service. Enjoy your break. We've notified your customers.",
            icon: "success",
            buttons: false,
            dangerMode: true,
        }).then((willdo) => {
            window.location.href = "../Home";
        });
    }
}

function RefleshWaitingList() {
    $("#tab1").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'></p></td></tr></table>");
    $.get("/WebTerminal/WaitingList", { TerminalID: terminalID }, function (data) {
        if (data.includes("Username")) {
            window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
        }
        else {
            $("#tab1").html(data);
        }
    });
    RefleshStatisticBox();
}

function RefleshStatisticBox() {
    var eskinumara = $("#WaitingStatistic").html();
    $("#StatisticBox").html("<center><img src='../assets/images/loading2.gif' height='32'/></center>");
    $.get("/WebTerminal/StatisticBox", { TerminalID: terminalID }, function (data) {
        if (data.includes("Username")) {
            window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
        }
        else {
            $("#StatisticBox").html(data);
            var yeninumara = $("#WaitingStatistic").html();
            eskinumara = eskinumara * 1;
            yeninumara = yeninumara * 1;

            if (yeninumara > eskinumara) {
                ShowNotification("QMagic", " New ticket printed for you !\n Total Waiting : " + yeninumara);
            }
        }
    });
}

function ToggleMainChat() {
    if ($("#ChatListWindow").css("bottom") === "-300px") {
        $("#ChatListWindow").animate({ bottom: "0px" }, 500);
        $("#ChatListWindow").addClass("chat-maximized-main");
    }
    else {
        $("#ChatListWindow").animate({ bottom: "-300px" }, 500);
        $("#ChatListWindow").removeClass("chat-maximized-main");
    }
}


function ShowNotification(theTitle, theContent) {
    if (!("Notification" in window)) {
        swal({
            title: "Error Occurred",
            text: "This browser does not support desktop notification",
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
    }

    else if (Notification.permission === "granted") {
        var options = {
            body: theContent,
            icon: "../../assets/images/qmagic.png"
        };
        var notification = new Notification(theTitle, options);
    }

    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                var options = {
                    body: theContent,
                    icon: "../../assets/images/qmagic.png"
                };
                var notification = new Notification(theTitle, options);
            }
        });
    }
}

function RefleshParkedList() {
    $("#tab2").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Please wait...</p></td></tr></table>");
    $.get("/WebTerminal/ParkedList", { TerminalID: terminalID }, function (data) {
        if (data.includes("Username")) {
            window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
        }
        else {
            $("#tab2").html(data);
        }
    });
    RefleshStatisticBox();
}

function ParkTicket(ParkStatus, ParkStatusColor) {
    var TicketID = $("#InfoTicketID").val();
    if ((TicketID !== undefined) && (TicketID !== "")) {

        $.get("/WebTerminal/SelfParkTicket", { TerminalID: terminalID, TicketID: TicketID }, function (data) {
            $("#InfoBox").html(data);

            stopTimer();
            RefleshParkedList();
            RefleshStatisticBox();
            SetStatus(terminalID, ParkStatus, ParkStatusColor);
            $("#InfoTicketID").val("");
            $(".ctrlbutton").prop('disabled', true);
            $("#btnNextCall").prop("disabled", false);
        });
    }
    else {
        swal({
            title: "Error Occurred",
            text: "This browser does not support desktop notification",
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
    }
}

function CallFromPark(TicketID) {
    $.get("/WebTerminal/SelfCallFromPark", { TerminalID: terminalID, TicketID: TicketID }, function (data) {
        $("#InfoBox").html(data);

        stopTimer();
        RefleshParkedList();
        RefleshStatisticBox();
        var btn = $(".ctrlbutton");
        btn.prop('disabled', true);
        setTimeout(function () {
            btn.prop('disabled', false);
        }, 15000);
    });
}

function ManualCall(TicketID) {
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined" && tickid !== "") {
        EndTicket(EndStatus, EndStatusColor);
    }
    $("#InfoBox").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Please wait while getting ticket informations.</p></td></tr></table>");
    $.get("/WebTerminal/SelfManualCall", { TicketID: TicketID, TerminalID: terminalID, UserID: loginuserID }, function (data) {
        $("#InfoBox").html(data);

        stopTimer();
        RefleshWaitingList();
        SetStatus(terminalID, NextCallStatus, NextCallColor);
        var btn = $(".ctrlbutton");
        btn.prop('disabled', true);
        setTimeout(function () {
            btn.prop('disabled', false);
        }, 15000);
    });
}

function BreakCall(TicketID) {
    signalRHub.server.send("LoadBrokenTicket(" + TicketID + "," + terminalID + ")").fail(function (e) {
        swal({
            title: "Error Occurred",
            text: e.message,
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
    });
    stopTimer();
    $("#InfoBox").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Please wait while getting ticket informations.</p></td></tr></table>");
    RefleshWaitingList();
    var btn = $(".ctrlbutton");
    btn.prop('disabled', true);
    setTimeout(function () {
        btn.prop('disabled', false);
    }, 15000);
}

function NoShow(NoShowStatus, NoShowStatusColor) {
    var TicketID = $("#InfoTicketID").val();
    if ((TicketID !== undefined) && (TicketID !== "")) {
        EndTicket(EndStatus, EndStatusColor);

        signalRHub.server.send("NoShow(" + TicketID + ")").fail(function (e) {
            swal({
                title: "Error Occurred",
                text: e.message,
                icon: "error",
                buttons: false,
                dangerMode: true,
            });
        });

        $("#InfoBox").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/bell.png' height='66'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Customer not showed up. You can continue with Next Call.</p></td></tr></table>");
        $("#InfoTicketID").val("");
        $(".ctrlbutton").prop('disabled', true);
        $("#btnNextCall").prop("disabled", false);
        stopTimer();

        SetStatus(terminalID, NoShowStatus, NoShowStatusColor);
    }
    else {
        swal({
            title: "Error Occurred",
            text: "There is no ticket! Please check your information box and be sure you have called a ticket.",
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
    }
}

function EndTicket(EndTicketStatus, EndTicketStatusColor) {
    var TicketID = $("#InfoTicketID").val();
    if ((TicketID !== undefined) && (TicketID !== "")) {
        stopTimer();
        $("#InfoBox").html("");
        $("#InfoTicketID").val("");
        $(".ctrlbutton").prop('disabled', true);
        $("#btnNextCall").prop("disabled", false);

        $.get("/WebTerminal/SelfEndTicket", { TicketID: TicketID }, function (data) {
            $("#InfoBox").html(data);
        });
        SetStatus(terminalID, EndTicketStatus, EndTicketStatusColor);
    }
}

function TerminalTransferList() {
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined" && tickid !== "") {
        $("#Lister1").show();
        $("#Loader1").hide();

        $("#TransferList").html("Fetching...");
        $("#TerminalTransfer").modal("show");
        
        $.get("/WebTerminal/TransferDynamicList", { TerminalID: terminalID }, function (data) {
            $("#TransferList").html(data);
        });
    }
    else {
        swal({
            title: "Error Occurred",
            text: "There is no ticket! Please check your information box and be sure you have called a ticket.",
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
    }
}

function ServiceTransferList() {
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined" && tickid !== "") {
        $("#Lister2").show();
        $("#Loader2").hide();

        $("#ServiceTransfer").modal("show");
    }
    else {
        swal({
            title: "Error Occurred",
            text: "There is no ticket! Please check your information box and be sure you have called a ticket.",
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
    }
}

function StatusList() {
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined" && tickid !== "") {
        $("#Lister3").show();
        $("#Loader3").hide();
        $("#StatusChanger").modal("show");
    }
    else {
        swal({
            title: "Error Occurred",
            text: "There is no ticket! Please check your information box and be sure you have called a ticket.",
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
    }
}

function GenerateTicket() {
    var sServiceID = $("#genService").val();
    var sSegmentID = $("#genSegment").val();
    var sATRID = $("#genATR").val();
    var sCustomer = $("#FictiveCustomerInfo").attr("custID");
    var genBranch = $("#genBranch").val();

    $("#GenerateResult").show();
    $("#GenerateResult").html("Please wait...");
    $.get("../Diagnose/RequestGenerateTicket", { ServiceID: sServiceID, SegmentID: sSegmentID, BranchID: genBranch, ATRID: sATRID, CustomerID: sCustomer }, function (data) {
        $("#GenerateResult").html(data);
    });
}

function FictiveTicketWindow() {
    //var tickid = $("#InfoTicketID").val();
    $("#FictiveTicketModal").modal("show");
    $("#FictiveCustomerInfo").attr("custID", "");
    $("#FictiveCustomerInfo").addClass("btn-default");
    $("#FictiveCustomerInfo").removeClass("btn-primary");
    $("#FictiveCustomerInfo").html("No Customer Selected");
    $("#GenerateResult").hide();
}

function CloseStatus() {
    $("#BlurBG").fadeOut("fast", function () {
        $("#StatusPane").fadeOut("fast");
    });
}

function CloseTransfer() {
    $("#BlurBG").fadeOut("fast", function () {
        $("#TransferPane").fadeOut("fast");
    });
}

function CloseTransferService() {
    $("#BlurBG").fadeOut("fast", function () {
        $("#ServicePane").fadeOut("fast");
    });
}

function TransferToService(segmentid, MyTerminalID, TransferStatus, TransferStatusColor) {
    $("#Lister2").hide();
    $("#Loader2").show();
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined") {
        $.get("/WebTerminal/TransferToService", {
            TerminalID : MyTerminalID, SegmentID : segmentid, TicketID : tickid
        }, function (data) {
            if (data.indexOf("OK++") > 0) {
                $("#Lister2").show();
                $("#Loader2").hide();

                $("#ServiceTransfer").modal("hide");

                $("#InfoBox").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/bell.png' height='66'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Ticket transferred. You can continue with Next Call.</p></td></tr></table>");

                signalRHub.server.send("TransferredService(" + segmentid + ")");
                $("#InfoTicketID").val("");
                $(".ctrlbutton").prop('disabled', true);
                $("#btnNextCall").prop("disabled", false);
                stopTimer();

                SetStatus(terminalID, TransferStatus, TransferStatusColor);
            }
        });
    }
}

function ServiceTransferAutoSelect(MyTerminalID, TransferStatus, TransferStatusColor) {
    $("#Lister2").hide();
    $("#Loader2").show();
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined") {
        $.get("/WebTerminal/AutoSelectTransferAgent", {
            TerminalID: MyTerminalID, IsTerminal: false, TicketID: tickid
        }, function (data) {
            if (data.indexOf("OK++") > 0) {

                data = data.replace(/\s/g, '');
                data = data.replace("OK++", "");

                var pFrom = data.indexOf("(");
                var pTo = data.indexOf(",");
                var NameOf = data.substring(pFrom + 1, pTo);

                pFrom = data.indexOf(",");
                pTo = data.indexOf(")");
                var IdOf = data.substring(pFrom + 1, pTo);

                $("#Lister2").show();
                $("#Loader2").hide();

                $("#ServiceTransfer").modal("hide");

                $("#InfoBox").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/bell.png' height='66'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Ticket transferred. You can continue with Next Call.</p><p>Transfer Location : " + NameOf + "</p></td></tr></table>");

                signalRHub.server.send("TransferredService(" + IdOf + ")");
                $("#InfoTicketID").val("");
                $(".ctrlbutton").prop('disabled', true);
                $("#btnNextCall").prop("disabled", false);
                stopTimer();

                SetStatus(terminalID, TransferStatus, TransferStatusColor);
            }
        });
    }
}

function TerminalTransferAutoSelect(MyTerminalID, TransferStatus, TransferStatusColor) {
    $("#Lister2").hide();
    $("#Loader2").show();
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined") {
        $.get("/WebTerminal/AutoSelectTransferAgent", {
            TerminalID: MyTerminalID, IsTerminal: true, TicketID: tickid
        }, function (data) {
            if (data.indexOf("OK++") > 0) {

                data = data.replace(/\s/g, '');
                data = data.replace("OK++", "");

                var pFrom = data.indexOf("(");
                var pTo = data.indexOf(",");
                var NameOf = data.substring(pFrom + 1, pTo);

                pFrom = data.indexOf(",");
                pTo = data.indexOf(")");
                var IdOf = data.substring(pFrom + 1, pTo);

                $("#Lister2").show();
                $("#Loader2").hide();

                $("#TerminalTransfer").modal("hide");

                $("#InfoBox").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/bell.png' height='66'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Ticket transferred. You can continue with Next Call.</p><p>Transfer Location : " + NameOf + "</p></td></tr></table>");

                signalRHub.server.send("TransferredTerminal(" + IdOf + ")");
                $("#InfoTicketID").val("");
                $(".ctrlbutton").prop('disabled', true);
                $("#btnNextCall").prop("disabled", false);
                stopTimer();

                SetStatus(terminalID, TransferStatus, TransferStatusColor);
            }
        });
    }
}

function SetStatus(TerminalID, StatusMessage, StatusColor) {
    $("#Lister3").hide();
    $("#Loader3").show();

    signalRHub.server.send('SetStatus(' + TerminalID + ',"' + StatusMessage + '",' + StatusColor + ')');

    $("#Lister2").show();
    $("#Loader2").hide();
    $("#StatusChanger").modal("hide");
}

function TransferToTerminal(TerminalID, MyIDofTerminal, TransferStatus, TransferStatusColor) {
    $("#Lister1").hide();
    $("#Loader1").show();
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined") {
        $.get("/WebTerminal/TransferToTerminal", {
                MyTerminalID : MyIDofTerminal, TransferTerminalID : TerminalID, TicketID : tickid
        }, function (data) {
            if (data.indexOf("OK++") > 0) {
                $("#Lister1").show();
                $("#Loader1").hide();

                $("#TerminalTransfer").modal("hide");

                $("#InfoBox").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/bell.png' height='66'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Ticket transferred. You can continue with Next Call.</p></td></tr></table>");
                signalRHub.server.send("TransferredTerminal(" + TerminalID + ")");
                $("#InfoTicketID").val("");
                $(".ctrlbutton").prop('disabled', true);
                $("#btnNextCall").prop("disabled", false);
                stopTimer();

                SetStatus(terminalID, TransferStatus, TransferStatusColor);
            }
        });
    }
}

function RefleshHistoryList() {
    $("#tab3").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Please wait...</p></td></tr></table>");
    $.get("/WebTerminal/HistoryList", { TerminalID: terminalID }, function (data) {
        if (data.includes("Username")) {
            window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
        }
        else {
            $("#tab3").html(data);
        }
    });
}

function RefleshOnlineList() {
    $("#tab4").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Please wait...</p></td></tr></table>");
    $.get("/WebTerminal/OnlineTerminalList", { TerminalID: terminalID }, function (data) {
        if (data.includes("Username")) {
            window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
        }
        else {
            $("#tab4").html(data);
        }
    });
}

function SendTicketNote() {
    var tickid = $("#InfoTicketID").val();
    var tnote = $("#txtTicketNote").val();

    if (typeof tickid !== "undefined") {
        $.get("/WebTerminal/SendTicketNote", {
            TicketID: tickid, TicketNote: tnote
        }, function (data) {
            if (data.indexOf("OK++") > 0) {
                swal({
                    title: "Saved",
                    text: "Your note has been saved to the ticket.",
                    icon: "success",
                    buttons: false,
                    dangerMode: true,
                });
            }
        });
    }
}

function CloseTicket(CloseStatus, CloseStatusColor) {
    EndTicket(CloseStatus, CloseStatusColor);
}

function Halas(TransferStatus, TransferStatusColor) {
    var AreaNumber = $("#AreaTicketNumber").html();
    var TicketID = $("#InfoTicketID").val();
    var ServiceID = $("#InfoServiceID").val();
    var SegmentID = $("#InfoSegmentID").val();

    if (typeof TicketID !== "undefined" && TicketID !== "") {
        AreaNumber = AreaNumber.split(" ");
        var TicketPrefix = AreaNumber[0];
        var TicketNumber = AreaNumber[1];

        $("#InfoBox").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Please wait while getting ticket informations.</p></td></tr></table>");
        $(".ctrlbutton").prop('disabled', true);
        $("#btnNextCall").prop("disabled", false);
        stopTimer();
    
        $.get("/WebTerminal/AutoTransferAgent", {
            TicketID: TicketID, TerminalID: terminalID
        }, function (data) {
            if (data.indexOf("<span>OK++</span>") > 0) {
                var segme = data.substring(data.indexOf("<service>") + 9, data.indexOf("</service>"));
                var segname = data.substring(data.indexOf("<name>") + 6, data.indexOf("</name>"));
                $("#InfoBox").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p><img src='../assets/images/bell.png' height='66'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Ticket automatically transferred. You can continue with Next Call.</p><p>Service : " + segname + "</p></td></tr></table>");

                signalRHub.server.send("TransferredService(" + segme + ")");
                $("#InfoTicketID").val("");
                $(".ctrlbutton").prop('disabled', true);
                $("#btnNextCall").prop("disabled", false);
                stopTimer();

                SetStatus(terminalID, TransferStatus, TransferStatusColor);
            }
            else {
                if (data.indexOf("<span>NONE</span>") > 0) {
                    EndTicket(EndStatus, EndStatusColor);
                }
            }
        });
    }
        else {
        swal({
            title: "Error Occurred",
            text: "There is no ticket! Please check your information box and be sure you have called a ticket.",
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
        }
}

function NoNe() { }

function AppointmentWindow() {

    $("#AppointmentContent").html("<center><img src='~/assets/images / loading.gif' /><br /><h4> Please wait while appointments loading...</h4></center >");

    $("#AppointmentModal").modal("show");

    $.get("/WebTerminal/AppointmentList", { TerminalID: terminalID }, function (data) {
        $("#AppointmentContent").html(data);
    });
}


function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    $("#ProcessTime").html((hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds));
}
function timer() {
    t = setInterval(add, 1000);
}

function stopTimer() {
    clearInterval(t);
    seconds = 0; minutes = 0; hours = 0;
}

function ToggleScreen() {
    if ($("#sidebar").is(':visible')) {
        $("#sidebar").fadeOut("slow");
        $("#navbar").fadeOut("slow");
        $("#MainContainer").animate({ "padding-left": "0px" },"slow");
        $("#MainContainer").animate({ "padding-top": "10px" }, "slow");
    }

    if ($("#sidebar").is(':hidden')) {
        $("#MainContainer").animate({ "padding-left": "180px" }, "slow");
        $("#MainContainer").animate({ "padding-top": "0px" }, "slow");
        $("#sidebar").fadeIn("slow");
        $("#navbar").fadeIn("slow");
    }
}


function ShowCustomerSelect() {
    $("#CustomerModal").modal("show");
}

function SearchCustomer() {
    $("#CustomerSearchResults").html("<center><img src='../assets/images/loading2.gif'/></center>");
    var qu = $("#txtCustomerSearchBox").val();

    $.get("/WebTerminal/CustomerSelect", { q: qu, t:"Default" }, function (data) {
        $("#CustomerSearchResults").html(data);
    });
}

function ToggleGeneratorCustomerSelector() {
    $("#genCustomerSelectorDiv").toggle();
}

function SearchFictiveCustomer() {
    $("#CustomerSearchResults").html("<center><img src='../assets/images/loading2.gif'/></center>");
    var qu = $("#genCustomerSearch").val();

    $.get("/WebTerminal/CustomerSelect", { q: qu, t:"Fictive" }, function (data) {
        $("#genCustomerFind").html(data);
    });
}

function SelectFictiveCustomer(customerID) {
    $("#FictiveCustomerInfo").attr("custID", customerID);
    $("#FictiveCustomerInfo").removeClass("btn-default");
    $("#FictiveCustomerInfo").addClass("btn-primary");
    $("#FictiveCustomerInfo").html("Customer Selected");
    $("#genCustomerSelectorDiv").toggle();
}


function SelectThisCustomer(cs) {
    var tc = $("#InfoTicketID").val();

    $.get("/WebTerminal/MergeCustomerTicket", { c: cs, t: tc }, function (data) {
        if (data.indexOf("Error") > 0) {
            swal({
                title: "Error Occurred",
                text: "Ticket couldn't merged with the customer. Please try again. If you are always seeing this message, Please contact with your local support.",
                icon: "error",
                buttons: false,
                dangerMode: true,
            });
        }
        else {
            $("#CustomerSearchResults").html(data);
        }
    });
}


function SendChatMessage(MyTerminalID, MyUserID, ToTerminalID, ToUserID, Message) {
    Message = Message.replace("(", "");
    Message = Message.replace(")", "");
    Message = Message.replace(";", "");
    Message = Message.replace(",", "");
    Message = Message.replace(".", "");
    Message = Message.replace(">", "");

    signalRHub.server.send("SendChatMessage(" + MyTerminalID + ";" + MyUserID + "," + ToTerminalID + "." + ToUserID + ">" + Message + ")");

    $.get("/WebTerminal/ChatBaloon", { UserID: MyUserID, Message: Message }, function (data) {
        $("#ChatBaloons_" + ToUserID).append(data);
        $("#ChatBaloons_" + ToUserID).animate({ scrollTop: $("#ChatBaloons_" + ToUserID).prop('scrollHeight') });
    });
}

function OpenChatWindow(myterminalid, myuserid, whoterminalid, whouserid) {
    if ($("#CW_" + whouserid).length < 1) {
        var rightspace = $(".PrivateChatWindow").length * 250;
        rightspace = rightspace + $(".PrivateChatWindow").length * 10;
        rightspace = rightspace + 280;

        $.get("/WebTerminal/ChatWindow", { SenderTerminalID: myterminalid, SenderUserID: myuserid, ReceiverTerminalID: whoterminalid, ReceiverUserID: whouserid, Message: "", rightlocation: rightspace }, function (data) {
            $("body").append(data);
        });
    }
}
function ToggleChatWindow(windowid) {
    if ($("#CW_" + windowid).css("bottom") === "0px") {
        $("#CW_" + windowid).animate({ bottom: "-320px" }, "slow");
    }
    else {
        $("#CW_" + windowid).animate({ bottom: "0px" }, "slow");
    }
}

function CloseChatWindow(who) {
    $("#CW_" + who).remove();
    //var windowcount = $(".PrivateChatWindow").length;
    var indis = 0;
    $('.PrivateChatWindow').each(function () {
        var currentElement = $(this);

        var rightspace = indis * 250;
        rightspace = rightspace + indis * 10;
        rightspace = rightspace + 280;

        $(this).animate({ right: rightspace + "px" }, "slow");

        indis++;
    });
}