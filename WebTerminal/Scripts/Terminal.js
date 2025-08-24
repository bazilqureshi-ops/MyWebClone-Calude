var signalRHub;
var loginUserID = "";
var loginTerminalID = "";
var elapsedtimer = "";
var BackupCall = "";
var OpenedAccordion = "";
var waitingCount = 0;
var previousWaiting = 0;

var ExitStatusID = 0;
var ReadyStatusID = 0;


$(function () {
    $.connection.hub.url = "http://localhost/SignalR";
    signalRHub = $.connection.comHub;

    signalRHub.client.SendMessage = function (command) {
        // TICKET CALLED //
        if (command.includes("TicketCalled")) {
            var pFrom = command.indexOf("(");
            var pTo = command.indexOf(",");
            var cTicketID = command.substring(pFrom + 1, pTo);

            pFrom = command.indexOf(",");
            pTo = command.indexOf(")");
            var cTerminalID = command.substring(pFrom + 1, pTo);

            if (cTerminalID === loginTerminalID) {
                $.get("/Terminal/InfoBox", { TicketID: cTicketID, TerminalID: cTerminalID }, function (data) {
                    if (data.includes("[EN]")) {
                        window.location.href = "../../Terminal/ThrowError?ErrorCode=2";
                    }
                    else {
                        $("#InfoBox").html(data);
                    }
                });

                ParkList();
                WaitingList();
            }
            else {
                if (typeof cTicketID !== "undefined" && cTicketID !== "" && cTicketID !== 0) {
                    $.get("/Terminal/CheckMacroForReflesh", { TerminalID: cTerminalID, TicketID: cTicketID }, function (data) {
                        var segm = data.replace(/\s/g, '');
                        if (segm !== "undefined") {
                            var segment = segm.substring(segm.indexOf("(") + 1, segm.indexOf(","));
                            //var calledmacroid = segm.substring(segm.indexOf(",") + 1, segm.indexOf(")"));
                            CheckSegment(segment);
                            if (waitingCount > previousWaiting) {
                                ShowNotification("QMagic", " New ticket printed for you !");
                            }
                            previousWaiting = waitingCount;
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
                ParkList();
                WaitingList();
            }
            else {
                $.get("/Terminal/CheckMacroForReflesh", { TerminalID: cTerminalIDM, TicketID: cTicketIDM }, function (data) {
                    var segm = data.replace(/\s/g, '');
                    if (segm !== "undefined") {
                        var segment = segm.substring(segm.indexOf("(") + 1, segm.indexOf(","));
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

            if (cTerminalID9 === loginTerminalID) {
                $.get("Terminal/InfoBox", { TicketID: cTicketID9, TerminalID: cTerminalID9 }, function (data) {
                    if (data.includes("[EN]")) {
                        window.location.href = "../../Terminal/ThrowError?ErrorCode=2";
                    }
                    else {
                        $("#InfoBox").html(data);

                        ParkList();
                        WaitingList();
                    }
                });

            }
            else {
                $.get("/Terminal/CheckMacroForReflesh", { TerminalID: cTerminalID9, TicketID: cTicketID9 }, function (data) {
                    var segm = data.replace(/\s/g, '');
                    if (segm !== "undefined") {
                        var segment = segm.substring(segm.indexOf("(") + 1, segm.indexOf(","));
                        CheckSegment(segment);
                    }
                });
            }
        }
        //////////////////

        // TICKET TERMINAL TRANSFERRED //
        if (command.includes("TransferredTerminal")) {
            var pFrom3 = command.indexOf("(");
            var pTo3 = command.indexOf(")");
            var Termid = command.substring(pFrom3 + 1, pTo3);

            if (Termid === loginTerminalID) {
                WaitingList();
                GenerateTicketInfo();
            }
        }
        //////////////////

        // TICKET SERVICE TRANSFERRED //
        if (command.includes("TransferredService")) {
            var pFrom4 = command.indexOf("(");
            var pTo4 = command.indexOf(")");
            var SegmID = command.substring(pFrom4 + 1, pTo4);

            if (SegmentList.includes(SegmID)) {
                WaitingList();
                GenerateTicketInfo();
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
            var ServiceID = command.substring(pFrom2 + 1, pTo2);

            pFrom2 = getPosition(command, ",", 2);
            pTo2 = getPosition(command, ",", 3);
            var SegmentID = command.substring(pFrom2 + 1, pTo2);

            pFrom2 = getPosition(command, ",", 3);
            pTo2 = command.indexOf(")");
            var BranchID = command.substring(pFrom2 + 1, pTo2);

            if (SegmentList.includes(SegmentID)) {
                WaitingList();
                if (waitingCount > previousWaiting) {
                    ShowNotification("QMagic", " New ticket printed for you !");
                }
                previousWaiting = waitingCount;
            }

        }
        //////////////////
    }


    $.connection.hub.start({ jsonp: true }).done(function () {
        connectionID = $.connection.hub.id;
        if (loginTerminalID !== "" && connectionID !== "" && loginUserID !== "") {
            signalRHub.server.send("TerminalOnline(" + connectionID + ", " + loginUserID + " ," + loginTerminalID + ")");
            signalRHub.server.interSend("ChangeStatus(" + ReadyStatusID + "," + loginTerminalID + ")");
            ParkList();
            WaitingList();
            elapsedtimer = setInterval(ElapsedTimer, 1000);
            if (BackupCall !== "") {
                BreakCall(BackupCall);
            }
            AutoRefreshWaiting();
            $("#TerminalLoadingMain").fadeOut("fast");
        }
    });

    $.connection.hub.disconnected(function () {
        setTimeout(function () {
            $.connection.hub.start();
        }, 5000);
    });

    $.connection.hub.error(function (error) {
        $.connection.hub.start();
        //window.location.href = "../../Terminal/ThrowError?ErrorCode=2" + error;
        clearInterval(elapsedtimer);
    });

    $.connection.comHub.client.exceptionHandler = function (error) {
        $.connection.hub.start();
        //window.location.href = "../../Terminal/ThrowError?ErrorCode=2" + error;
        clearInterval(elapsedtimer);
    };

    /*$(window).on('beforeunload', function () {
        signalRHub.server.interSend("ChangeStatus(" + ExitStatusID + "," + loginTerminalID + ")");
    });*/
});

function LogoutRequest() {
    signalRHub.server.interSend("ChangeStatus(" + ExitStatusID + "," + loginTerminalID + ")").done(function () {
        window.location.href = "Home/Logout";
    });
}

function CheckSegment(SegmentID) {
    if (SegmentList.includes(SegmentID)) {
        WaitingList();
    }
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

function SwitchTab(ShowTab) {
    $(".AllTabContents").hide();
    $("#" + ShowTab).show();
    $(".cTabs").removeClass("active");
    $(".cTabs").removeAttr("aria-current");
    $("#" + ShowTab + "Tab").addClass("active");
    $("#" + ShowTab + "Tab").attr("aria-current","true");
}

function toTimeString(totalSeconds) {
    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(11, 19);

    return result;
}

function ElapsedTimer() {
    $(".elapsedtime").each(function (index) {
        var current_second = $(this).attr("sec");
        var elapsed_time = (current_second*1) + 1;
        $(this).attr("sec", elapsed_time*1);
        $(this).html(toTimeString(elapsed_time*1));
    });
}

function NextCall() {
    var TicketID = $("#InfoTicketID").val();
    $("#InfoBox").html("<div class='d-flex text-center justify-content-center'><div class='spinner-border' role='status' style='margin-top:100px;'><span class='visually-hidden'>Loading...</span></div></div>");
    if ((TicketID !== undefined) && (TicketID !== "")) {

        $.get("/Terminal/CloseTicket", { TicketID: TicketID }, function (dx) {
            $.post("Terminal/NextCall", { TerminalID: loginTerminalID, UserID: loginUserID }, function (data) {
                $("#InfoBox").html(data);
                WaitingList();
                var btn = $(".ctrlbutton");
                btn.addClass('disabled');
                setTimeout(function () {
                    btn.removeClass('disabled');
                }, 10000);
            });
        });
    }
    else {
        $.post("Terminal/NextCall", { TerminalID: loginTerminalID, UserID: loginUserID }, function (data) {
            $("#InfoBox").html(data);
            WaitingList();
            var btn = $(".ctrlbutton");
            btn.addClass('disabled');
            setTimeout(function () {
                btn.removeClass('disabled');
            }, 10000);
        });
    }
}

function GenerateTicket(SegmentID) {
    var customerID = $("#InfoCustomerID").val();

    if (customerID != null && customerID != undefined) {
        $.post("Terminal/ChangeCustomerPhone", { CustomerID: customerID, SegmentID: SegmentID }, function (data) {
            if (data.includes("CONTINUEOK++")) {
                ProcessGenerateTicket(SegmentID);
            }
            else {
                $("#GenerateTicketModalBody").html(data);
            }
        });
    }
    else {
        $.post("Terminal/GenerateTicket", { SegmentID: SegmentID, TerminalID: loginTerminalID }, function (data) {
            $("#GenerateTicketModalBody").html(data);
            WaitingList();
            GenerateTicketInfo();
        });
    }
}

function ChangePhone() {
    var customerID = $("#InfoCustomerID").val();
    $.post("Terminal/ChangeCustomerPhone", { CustomerID: customerID, SegmentID: "" }, function (data) {
        $("#GenerateTicketModalBody").html(data);
        $("#GenerateTicketModal").modal("show");
        $("#MoreInformationModal").modal("hide");
    });
}

function SearchCustomer() {
    var keyword = $("#txtSearchCustomer").val();
    $("#SearchResult").html("<p style='color:#C00;' class='text-center'>Loading...</p>");
    $.get("Terminal/FindCustomer", { Keyword: keyword }, function (data) {
        $("#SearchResult").html(data);
    });
}

function AssignCustomer(CustomerID) {
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined" && tickid !== "") {
        $.post("Terminal/ProcessAssignCustomer", { CustomerID: CustomerID, TicketID: tickid }, function (data) {
                $.get("Terminal/InfoBox", { TicketID: tickid, TerminalID: loginTerminalID }, function (data) {
                    $("#InfoBox").html(data);

                    ParkList();
                    WaitingList();
                });
        });
    }
}

function ProcessGenerateTicket(SegmentID) {
    $("#GenerateTicketModalBody").html("<div class='d-flex text-center justify-content-center'><div class='spinner-border' role='status' style='margin-top:100px;'><span class='visually-hidden'>Generating...</span></div></div>");

    var customerID = $("#InfoCustomerID").val();
    $.post("Terminal/GenerateTicket", { SegmentID: SegmentID, TerminalID: loginTerminalID, CustomerID: customerID }, function (data) {
        $("#GenerateTicketModalBody").html(data);
        WaitingList();
        GenerateTicketInfo();
    });
}

function SaveNewPhone(SegmentID) {
    var customerID = $("#InfoCustomerID").val();
    var phoneNew = $("#txtNewPhone").val();

    $.post("Terminal/SaveNewPhone", { CustomerID: customerID, NewPhone: phoneNew }, function (data) {
        ProcessGenerateTicket(SegmentID);
    });
}

function SaveNewPhoneOnly() {
    var customerID = $("#InfoCustomerID").val();
    var phoneNew = $("#txtNewPhone").val();

    $.post("Terminal/SaveNewPhone", { CustomerID: customerID, NewPhone: phoneNew }, function (data) {
        $("#GenerateTicketModalBody").html("<center>Patient information saved. You can close this dialog now.</center>");
    });
}

function WaitingList() {
    $.post("Terminal/WaitingList", { TerminalID: loginTerminalID }, function (data) {
        $("#MyQueueContent").html(data);
    });
}

function ParkList() {
    $.post("Terminal/ParkList", { TerminalID: loginTerminalID }, function (data) {
        $("#MyParkedContent").html(data);
    });
}

function GenerateTicketInfo() {
    $.post("Terminal/InfoBoxGenerateTicket", { TerminalID: loginTerminalID }, function (data) {
        $("#InfoGenerateTicket").html(data);
    });
}

function ServiceTransferList(isDirect, tickID) {
    $.post("Terminal/ServiceTransferList", { TerminalID: loginTerminalID, Directly: isDirect, ticketID: tickID }, function (data) {
        $("#ServiceTransferListBody").html(data);
    });
}

function MoreInformation(TicketID) {
    $.post("Terminal/MoreInformation", { TicketID: TicketID }, function (data) {
        $("#MoreInformationModalBody").html(data);
    });
}

function SaveTicketNote() {
    var TicketNote = $("#txtTicketNote").val();
    var TicketID = $("#InfoTicketID").val();

    $.post("Terminal/SaveTicketNote", { TicketID: TicketID, TicketNote: TicketNote }, function (data) {
        if (data.includes("OK++")) {
            $("#txtTicketNote").css("opacity", "0");
            $("#txtTicketNote").animate({ opacity: '1' }, "slow");
        }
    });

}

function Recall() {
    var tickid = $("#InfoTicketID").val();
    if (typeof tickid !== "undefined" && tickid !== "") {
        signalRHub.server.send("TicketCalled(" + tickid + "," + loginTerminalID + ")");

        signalRHub.server.interSend("FlashNumber(" + tickid + "," + loginTerminalID + ")");

        var btn = $(".ctrlbutton");
        btn.addClass('disabled');
        setTimeout(function () {
            btn.removeClass('disabled');
        }, 10000);
    }
    else {
        alert("ERROR!");
    }
}

function Park() {
    var TicketID = $("#InfoTicketID").val();
    if ((TicketID !== undefined) && (TicketID !== "")) {

        $.get("/Terminal/ParkTicket", { TerminalID: loginTerminalID, TicketID: TicketID }, function (data) {
            $("#InfoBox").html(data);

            ParkList();
            $(".ctrlbutton").addClass('disabled');
            $("#btnNextCall").removeClass("disabled");
        });
    }
}

function CallFromPark(TicketID) {
    $.get("/Terminal/CallFromPark", { TicketID: TicketID, TerminalID: loginTerminalID }, function (data) {
        $("#InfoBox").html(data);

        ParkList();
        var btn = $(".ctrlbutton");
        btn.addClass('disabled');
        setTimeout(function () {
            btn.removeClass('disabled');
        }, 10000);
    });
}

function DirectTransferFromPark(TicketID, SegmentID) {
    $.get("/Terminal/DirectTransferFromPark", { TicketID: TicketID, SegmentID: SegmentID, TerminalID: loginTerminalID }, function (data) {
        $("#InfoBox").html(data);
        ParkList();
    });
}



function ServiceTransfer(SegmentID) {
    var TicketID = $("#InfoTicketID").val();
    if ((TicketID !== undefined) && (TicketID !== "")) {

        $.get("/Terminal/ServiceTransfer", { TerminalID: loginTerminalID, SegmentID: SegmentID, TicketID: TicketID }, function (data) {
            $("#InfoBox").html(data);

            WaitingList();
            GenerateTicketInfo();
            $(".ctrlbutton").addClass('disabled');
            $("#btnNextCall").removeClass("disabled");
        });
    }
}

function CloseTicket() {
    var TicketID = $("#InfoTicketID").val();
    if ((TicketID !== undefined) && (TicketID !== "")) {

        $.get("/Terminal/CloseTicket", { TicketID: TicketID }, function (data) {
            $("#InfoBox").html(data);

            WaitingList();
            $(".ctrlbutton").addClass('disabled');
            $("#btnNextCall").removeClass("disabled");
        });
    }
}

function NoShowTicket() {
    var TicketID = $("#InfoTicketID").val();
    if ((TicketID !== undefined) && (TicketID !== "")) {

        $.get("/Terminal/NoShowTicket", { TicketID: TicketID }, function (data) {
            $("#InfoBox").html(data);

            WaitingList();
            $(".ctrlbutton").addClass('disabled');
            $("#btnNextCall").removeClass("disabled");
        });
    }
}

function BreakCall(TicketID) {
    signalRHub.server.send("LoadBrokenTicket(" + TicketID + "," + loginTerminalID + ")").fail(function (e) {
        swal({
            title: "Error Occurred",
            text: e.message,
            icon: "error",
            buttons: false,
            dangerMode: true,
        });
    });
    $("#InfoBox").html("<div class='d-flex text-center justify-content-center'><div class='spinner-border' role='status' style='margin-top:100px;'><span class='visually-hidden'>Loading...</span></div></div>");
    WaitingList();
    var btn = $(".ctrlbutton");
    btn.addClass('disabled');
    setTimeout(function () {
        btn.removeClass('disabled');
    }, 10000);
}

function AutoRefreshWaiting() {
    setTimeout(function () {
        WaitingList();
        ParkList();
        AutoRefreshWaiting();
    }, 10000);
}

function SetOpenAccordion(GroupID, ButtonElement) {
    if ($(ButtonElement).hasClass("collapsed")) {
        OpenedAccordion = 0;
    }
    else {
        OpenedAccordion = GroupID;
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
            icon: "../../assets/client.png"
        };
        var notification = new Notification(theTitle, options);
    }

    else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(function (permission) {
            if (permission === "granted") {
                var options = {
                    body: theContent,
                    icon: "../../assets/client.png"
                };
                var notification = new Notification(theTitle, options);
            }
        });
    }
}