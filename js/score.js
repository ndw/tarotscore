// According to the rules at http://www.pagat.com/tarot/frtarot.html

var pointsTakerNeeds = [56, 51, 41, 36];
var totalCards = 21 + (4 * 14) + 1;
var score;

function scoreTarot() {
    var bouts = parseInt($("#bouts").val(), 10);
    var roi = parseInt($("#roi").val(), 10);
    var dame = parseInt($("#dame").val(), 10);
    var cavalier = parseInt($("#cavalier").val(), 10);
    var valet = parseInt($("#valet").val(), 10);
    var cards = parseInt($("#cards").val(), 10);
    var poignee = parseInt($("#poignee").val(), 10);
    var bid = parseInt($("#bid").val(), 10);
    var petitaubout = parseInt($("#petitaubout").val(), 10);
    var cardPoints, pointsNeeded, cardCount, scoreMsg, cardCount;
    var player;
    var pt, pb, pg, ch, mu;

    say("cardmsg", "");
    say("message", "");

    cardCount = bouts + roi + dame + cavalier + valet + cards;

    // N.B. Although there are four cards per hand, we can't check
    // that the total number of cards is a multiple of four because
    // there are six extra cards that have been set aside. The best
    // we can do is make sure that the number is even and not in
    // excess of the total number of cards.

    if (cardCount > totalCards) {
        say("cardmsg", "That's too many cards!");
    } else if ((cardCount % 2 != 0) && (cards != 0)) {
        say("cardmsg", "Count again, invalid card count");
    }

    pointsNeeded = pointsTakerNeeds[bouts];

    cardPoints   = ((bouts+roi) * 4.5) + (dame * 3.5)
                   + (cavalier * 2.5) + (valet * 1.5) + (cards * 0.5);

    pt = cardPoints - pointsNeeded;

    pb = petitaubout

    pg = poignee

    mu = bid;

    cardCount = bouts + roi + dame + cavalier + valet + cards;

    ch = 0;
    $("#ex-chelem-succ").html("and failed");
    $("#ex-chelem-decl").html("did not declare");

    if (cardCount > totalCards) {
        // nop
    } else if (cardCount === totalCards) {
        if ($("#chelem").val() === "annonce") {
            $("#ex-chelem-succ").html("and succeeded");
            $("#ex-chelem-decl").html("declared");
            ch = 400;
        } else {
            $("#ex-chelem-succ").html("but succeeded");
            ch = 200;
        }
    } else {
        if ($("#chelem").val() === "annonce") {
            $("#ex-chelem-decl").html("declared");
            ch = -200;
        }
    }

    score = ((25 + Math.abs(pt) + pb) * mu) + pg + ch;

    player = $("#player :selected").text();

    if (pt >= 0) {
        scoreMsg = player + " wins " + score + " points from <em>each</em> player"
    } else {
        score = -score
        scoreMsg = player + " <em>loses</em> " + Math.abs(score)
                   + " points to <em>each</em> player"
    }

    $("#ex-bouts").html(bouts);
    $("#ex-pointsneeded").html(pointsNeeded);

    $("#ex-bouts2").html(bouts);
    $("#ex-bouts-score").html(Number(bouts * 4.5).toFixed(1));

    $("#ex-roi").html(roi);
    $("#ex-roi-score").html(Number(roi * 4.5).toFixed(1));

    $("#ex-dame").html(dame);
    $("#ex-dame-score").html(Number(dame * 3.5).toFixed(1));

    $("#ex-cavalier").html(cavalier);
    $("#ex-cavalier-score").html(Number(cavalier * 2.5).toFixed(1));

    $("#ex-valet").html(valet);
    $("#ex-valet-score").html(Number(valet * 1.5).toFixed(1));

    $("#ex-cards").html(cards);
    $("#ex-cards-score").html(Number(cards * 0.5).toFixed(1));

    $("#ex-cardpoints").html(Number(cardPoints).toFixed(1));

    $("#ex-poignee-trumps").html($("#poignee option:selected").text());
    $("#ex-poignee").html(poignee);
    if (poignee === 0) {
        $("#ex-poignee-p").hide();
    } else {
        $("#ex-poignee-p").show();
    }
    $("#ex-chelem").html(ch);
    if (ch > 0) {
        $("#ex-chelem-bonus").html("bonus")
    } else {
        $("#ex-chelem-bonus").html("penalty")
    }
    if (ch === 0) {
        $("#ex-chelem-p").hide();
    } else {
        $("#ex-chelem-p").show();
    }

    $("#ex-bid").html($("#bid option:selected").text().toString().toLowerCase());
    $("#ex-bid-mult").html(bid);
    if (bid === 1) {
        $("#ex-bid-p").hide();
    } else {
        $("#ex-bid-p").show();
    }

    $("#ex-pt").html(Math.abs(pt));
    $("#ex-pb").html(pb);
    $("#ex-mu").html(mu);
    $("#ex-pg").html(pg);
    $("#ex-ch").html(ch);

    $("#score").html(scoreMsg);
    $("#ex-score").html(score);

    $("#explain").html(
        "((25 + abs(" + cardPoints + " - " + pointsNeeded + ") + " + pb + ") * " + mu + " ) + " + pg + " + " + ch
    );
}

function playerName() {
    var pos = 1;
    var name;

    $("input.playername").each(function () {
        name = $(this).val();
        $("#player option[value='" + pos + "']").text(name)
        pos++;
    });

    updatePlayer();
}

function updatePlayer() {
    var player;

    player = $("#player :selected").text();

    $(".ex-current-player").each(function () {
        $(this).html(player);
    });

    scoreTarot();
}

function toggleDisplay() {
    var id, pos, display;

    id = $(this).attr("id");
    pos = id.indexOf("-");
    id = id.substring(0, pos) + "-div";

    display = $("#" + id).css("display");
    if (display === "none") {
        $("#" + id).css("display", "block");
    } else {
        $("#" + id).css("display", "none");
    }
}

function recordScore() {
    var pid, pos, id, curScore;

    pid = parseInt($("#player :selected").val(), 10);

    for (pos = 1; pos < 5; pos++) {
        id = "#player" + pos + "score";
        curScore = parseInt($(id).html(), 10);

        if (pos === pid) {
            curScore = curScore + (score * 3);
        } else {
            curScore = curScore - score;
        }

        $(id).html(curScore);
    }

    $("#bouts").val(0);
    $("#roi").val(0);
    $("#dame").val(0);
    $("#cavalier").val(0);
    $("#valet").val(0);
    $("#cards").val(0);
    $("#poignee").val(0);
    $("#bid").val(1);
    $("#petitaubout").val(0);

    say("cardmsg", "");
    say("score", "");
    say("message", "");
}

function say(id, html) {
    $("#"+id).html(html);
}

$(document).ready(function() {
    $("select.score").change(scoreTarot);
    $("select.player").change(updatePlayer);
    $("input.playername").change(playerName);
    $("input.score").change(scoreTarot);
    $("input.record").click(recordScore);
    $("input.button").click(toggleDisplay);
    updatePlayer();
    scoreTarot();
});
