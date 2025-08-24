var signalRHub;
var QuestionNumber = 0;
var IsVoting = false;
var SurveyFillID = 0;

function StartVoting() {
    var myVideo = document.getElementById("TheVideo");
    myVideo.pause();
    $(".FullWidthVideo").fadeOut(2000);
    if (ticketID !== "") {
        $.get("GetCustomerID", { TicketID: ticketID }, function (data) {
            $.get("StartSurvey", { SurveyID: SurveyID, CustomerID: data, TicketID: ticketID }, function (data) {
                SurveyFillID = data;
            });
        });

        $.get("GetCustomerName", { TicketID: ticketID }, function (data) {
            var preval = $(".CustomerName").val();
            $(".CustomerName").html(preval + " " + data);
        });

        $.get("GetBranchName", { TicketID: ticketID }, function (data) {
            $(".BranchName").html(data);
        });

        $.get("GetServiceName", { TicketID: ticketID }, function (data) {
            $(".ServiceName").html(data);
        });

        $.get("GetSegmentName", { TicketID: ticketID }, function (data) {
            $(".SegmentName").html(data);
        });

        $.get("GetTerminalName", { TicketID: ticketID }, function (data) {
            $(".TerminalName").html(data);
        });

        $.get("GetUsername", { TicketID: ticketID }, function (data) {
            $(".UserFullName").html(data);
        });

        signalRHub.server.send("VotingStarted(" + VotebookID + "," + ticketID + ")");
    }
    else {
        $.get("StartSurvey", { SurveyID: SurveyID, CustomerID: 0, TicketID: 0 }, function (data) {
            SurveyFillID = data;
        });

        $(".CustomerName").html("Visitor");
        $(".BranchName").html("No Branch");
        $(".ServiceName").html("No Service");
        $(".SegmentName").html("No Segment");
        $(".TerminalName").html("No Terminal");
        $(".UserFullName").html("No User");

        signalRHub.server.send("VotingStarted(" + VotebookID + ")");
    }
    $("#BackButton").css("filter", "grayscale(100%)");
    CheckTimeout();
    IsVoting = true;
}

function StopVoting() {
    var totalpoint = 0;
    $(".imgAnswerSelected").each(function () {
        var qpoint = $(this).attr("point") * 1;
        totalpoint += qpoint;
    });

    $(".slider").each(function () {
        var qpoint = $(this).val() * 1;
        totalpoint += qpoint;
    });

    $.get("StopSurvey", { SurveyFillID: SurveyFillID, TotalPoint: totalpoint }, function (data) {
        window.location.href = "../../VirtualVotebook";
    });
}

function NextPlay(PlayerID) {
    var playlist = $("#" + PlayerID).attr("playlist");
    playlist = playlist.replace(/'/g, "");
    playlist = playlist.split(";");
    var nowplaying = $("#" + PlayerID).attr("nowplaying");

    if (nowplaying < playlist.length - 2) {
        nowplaying++;
        $("#" + PlayerID).attr("nowplaying", nowplaying);
        $("#" + PlayerID).attr("src", playlist[nowplaying]);
        document.getElementById(PlayerID).play();
    }
    else {
        nowplaying = 0;
        $("#" + PlayerID).attr("nowplaying", nowplaying);
        $("#" + PlayerID).attr("src", playlist[nowplaying]);
        document.getElementById(PlayerID).play();
    }
}

function NextQuestion() {
    
    var isIMG = false;
    var isSLD = false;
    var isCHK = false;
    var isCMT = false;
    if ($("#Answers_" + questions[QuestionNumber]).children(".imgAnswerSelected").length > 0) {
        isIMG = true;
    }
    var selected = [];
    $("#Answers_" + questions[QuestionNumber]+" input:checked").each(function () {
        selected.push($(this).attr('id'));
        $(this).addClass("imgAnswerSelected");
    });
    if (selected.length > 0) {
        isCHK = true;
    }
    if ($("#slider_" + questions[QuestionNumber]).length > 0) {
        var sval = $("#slider_" + questions[QuestionNumber]).val();
        if (sval >= 0) {
            isSLD = true;
        }
    }
    if ($("#commentary_" + questions[QuestionNumber]).length > 0) {
        isCMT = true;
    }

    $(this).fadeOut();

    if (isIMG || isSLD || isCHK) {
        var answerID;
        if (selected.length > 0) {
            $("#Answers_" + questions[QuestionNumber] + " input:checked").each(function () {
                answerID = $(this).attr("answerid");
                $.get("SaveAnswer", { QuestionID: questions[QuestionNumber], AnswerID: answerID, SurveyFillID: SurveyFillID }, function (data) {
                    //debug.log(data);
                });
            });
            var q = $("#Question_" + questions[QuestionNumber]);
            var a = $("#Answers_" + questions[QuestionNumber]);
            a.animate({
                opacity: 0,
                top: "-=50"
            }, 750, function () {
                q.animate({
                    opacity: 0,
                    top: "-=50"
                }, 750, function () {
                    QuestionNumber++;
                    $("#Question_" + questions[QuestionNumber]).fadeIn("slow");
                    $("#Answers_" + questions[QuestionNumber]).fadeIn("slow");
                    $("#BackButton").css("filter", "none");
                    $(this).fadeIn("fast");
                });
            });

            if (QuestionNumber >= questions.length - 2) {
                // THIS WAS THE LAST QUESTION
                swal({
                    title: "شكراً لك",
                    text: "Thank you for voting.",
                    icon: "info"
                }).then(function () {
                    StopVoting();
                });
            }

        }
        else {
            if (isIMG) {
                answerID = $("#Answers_" + questions[QuestionNumber]).children(".imgAnswerSelected").attr("answerid");

                $.get("SaveAnswer", { QuestionID: questions[QuestionNumber], AnswerID: answerID, SurveyFillID: SurveyFillID }, function (data) {
                    var q = $("#Question_" + questions[QuestionNumber]);
                    var a = $("#Answers_" + questions[QuestionNumber]);
                    a.animate({
                        opacity: 0,
                        top: "-=50"
                    }, 750, function () {
                        q.animate({
                            opacity: 0,
                            top: "-=50"
                        }, 750, function () {
                            QuestionNumber++;
                            $("#Question_" + questions[QuestionNumber]).fadeIn("slow");
                            $("#Answers_" + questions[QuestionNumber]).fadeIn("slow");
                            $("#BackButton").css("filter", "none");
                            $(this).fadeIn("fast");
                        });
                    });

                    if (QuestionNumber >= questions.length - 2) {
                        // THIS WAS THE LAST QUESTION
                        swal({
                            title: "شكراً لك",
                            text: "Thank you for voting.",
                            icon: "info"
                        }).then(function () {
                            StopVoting();
                        });
                    }

                });
                //alert("this is image");
            }
            else {
                var sliderobject = $("#slider_" + questions[QuestionNumber]);
                if (sliderobject.length > 0) {
                    // IT IS SLIDER
                    answerID = sliderobject.attr("answerid");
                    pointget = sliderobject.val();

                    //alert("It's slider and the answer id is " + answerID + " question id : " + questions[QuestionNumber] + " survey fill id : " + SurveyFillID);

                    $.get("SaveAnswer", { QuestionID: questions[QuestionNumber], AnswerID: answerID, SurveyFillID: SurveyFillID, Point: pointget }, function (data) {
                        var q = $("#Question_" + questions[QuestionNumber]);
                        var a = $("#Answers_" + questions[QuestionNumber]);
                        a.animate({
                            opacity: 0,
                            top: "-=50"
                        }, 750, function () {
                            q.animate({
                                opacity: 0,
                                top: "-=50"
                            }, 750, function () {
                                QuestionNumber++;
                                $("#Question_" + questions[QuestionNumber]).fadeIn("slow");
                                $("#Answers_" + questions[QuestionNumber]).fadeIn("slow");
                                $("#BackButton").css("filter", "none");
                                $(this).fadeIn("fast");
                            });
                        });

                        if (QuestionNumber >= questions.length - 2) {
                            // THIS WAS THE LAST QUESTION
                            swal({
                                title: "شكراً لك",
                                text: "Thank you for voting.",
                                icon: "info"
                            }).then(function () {
                                StopVoting();
                            });
                        }

                    });
                }
                else {
                    alert("Nothing detected!");
                }
            }
        }
    }
    else {
        if (isCMT) {
            var comment_object = $("#commentary_" + questions[QuestionNumber]);
            var comment = comment_object.val();

            answerID = comment_object.attr("answerid");

            $.get("SaveAnswer", { QuestionID: questions[QuestionNumber], AnswerID: answerID, SurveyFillID: SurveyFillID, Comment: comment }, function (data) {
                var q = $("#Question_" + questions[QuestionNumber]);
                var a = $("#Answers_" + questions[QuestionNumber]);
                a.animate({
                    opacity: 0,
                    top: "-=50"
                }, 750, function () {
                    q.animate({
                        opacity: 0,
                        top: "-=50"
                    }, 750, function () {
                        QuestionNumber++;
                        $("#Question_" + questions[QuestionNumber]).fadeIn("slow");
                        $("#Answers_" + questions[QuestionNumber]).fadeIn("slow");
                        $("#BackButton").css("filter", "none");
                        $(this).fadeIn("fast");
                    });
                });

                if (QuestionNumber >= questions.length - 2) {
                    // THIS WAS THE LAST QUESTION
                    swal({
                        title: "شكراً لك",
                        text: "Thank you for voting.",
                        icon: "info"
                    }).then(function () {
                        StopVoting();
                    });
                }

            });
        }
        else {
            swal({
                title: "No Answer?",
                text: "Please select an answer to continue...",
                icon: "info"
            });
        }
    }
    TimeOutSec = TimeOutDef;
}

function PreviousQuestion() {
    if (QuestionNumber > 0) {
        $.get("RemoveLastAnswer", { SurveyFillID: SurveyFillID }, function (data) {
            if (data != "0") {
                var q = $("#Question_" + questions[QuestionNumber]);
                var a = $("#Answers_" + questions[QuestionNumber]);
                a.animate({
                    opacity: 0,
                    top: "-=50"
                }, 750, function () {
                    q.animate({
                        opacity: 0,
                        top: "-=50"
                    }, 750, function () {
                        QuestionNumber--;
                        var q2 = $("#Question_" + questions[QuestionNumber]);
                        var a2 = $("#Answers_" + questions[QuestionNumber]);
                        TimeOutSec = TimeOutDef;
                        q2.animate({
                            opacity: 1,
                            top: "+=50"
                        }, 750, function () {
                            a2.animate({
                                opacity: 1,
                                top: "+=50"
                            }, 750, function () {

                            });
                        });
                        
                    });
                });
            }
            else {
                swal({
                    title: "Oh sorry :/",
                    text: "We can't do that right now...",
                    icon: "error"
                });
            }
        });
    }
    else {
        $("#BackButton").css("filter", "grayscale(100%)");
    }
}

function SelectAnswer(AnswerID, SurveyID) {
    $("#Answers_" + SurveyID).children(".imgAnswerSelected").addClass("imgAnswer");
    $("#Answers_" + SurveyID).children(".imgAnswerSelected").removeClass("imgAnswerSelected");
    $("#Answer_" + AnswerID).removeClass("imgAnswer");
    $("#Answer_" + AnswerID).addClass("imgAnswerSelected");
}


$(function () {
    signalRHub = $.connection.comHub;

    signalRHub.client.SendMessage = function (command) {
        if (command.includes("WakeUpVotebook")) {
            var pFrom = command.indexOf("(");
            var pTo = command.indexOf(",");
            var cmdVotebookID = command.substring(pFrom + 1, pTo);

            pFrom = command.indexOf(",");
            pTo = command.indexOf(")");
            ticketID = command.substring(pFrom + 1, pTo);

            if (TriggerTerminalID != null) {
                if (cmdVotebookID == VotebookID) {
                    StartVoting();
                }
            }
        }
        if (command.includes("IsVotebookAvailable")) {
            var pFrom = command.indexOf("(");
            var pTo = command.indexOf(")");
            var cmdVotebookID = command.substring(pFrom + 1, pTo);

            if (cmdVotebookID == VotebookID) {
                signalRHub.server.send("VotebookStatus(" + cmdVotebookID + "," + IsVoting + ")");
            }
        }
        if (command.includes("CutVoting")) {
            var pFrom = command.indexOf("(");
            var pTo = command.indexOf(",");
            var cmdVotebookID = command.substring(pFrom + 1, pTo);

            pFrom = command.indexOf(",");
            pTo = command.indexOf(")");
            ticketID = command.substring(pFrom + 1, pTo);

            if (cmdVotebookID == VotebookID) {
                window.location.href = "../../VirtualVotebook?TicketID=" + ticketID;
            }
        }
    };

    $.connection.hub.disconnected(function () {

    });

    $.connection.hub.start().done(function () {
        var myconid = $.connection.hub.id;

        if (ticketID !== "") {
            StartVoting();
        }
    });
});

function CheckTimeout() {
    setTimeout(function () {
        CheckTimeout();
    }, 1000);

    if (TimeOutSec === 0) {
        StopVoting();
    }
    else {
        TimeOutSec--;
        //console.log(TimeOutSec);
    }
}

function VideoClicked() {
    if (trigger == "Click") {
        StartVoting();
    }
}