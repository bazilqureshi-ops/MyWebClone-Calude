var connectionID = "";
var signalRHub;
var BackupCall = "";


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

function RefleshWaitingList() {
    $("#tab1").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Please wait...</p></td></tr></table>");
    $.get("WaitingList", { TerminalID: terminalID }, function (data) {
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
    $.get("StatisticBox", { TerminalID: terminalID }, function (data) {
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

function RefleshParkedList() {
    $("#tab2").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Please wait...</p></td></tr></table>");
    $.get("ParkedList", { TerminalID: terminalID }, function (data) {
        if (data.includes("Username")) {
            window.location.href = "../../WebTerminal/ThrowError?ErrorCode=2";
        }
        else {
            $("#tab2").html(data);
        }
    });
    RefleshStatisticBox();
}

function RefleshHistoryList() {
    $("#tab3").html("<table width='100%' height='180'><tr><td align='center' valign='center'><p>&nbsp;</p><p><img src='../assets/images/loading2.gif'/></p><p style='font-size:24px; font-family:\"Segoe UI\"; font-weight:lighter;'>Please wait...</p></td></tr></table>");
    $.get("HistoryList", { TerminalID: terminalID }, function (data) {
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
    $.get("OnlineTerminalList", { TerminalID: terminalID }, function (data) {
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
        $.get("SendTicketNote", {
            TicketID: tickid, TicketNote: tnote
        }, function (data) {
            if (data.indexOf("OK++") > 0) {
                alert("Ticket note successfully saved.");
            }
        });
    }
}