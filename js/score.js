// According to the rules at http://www.pagat.com/tarot/frtarot.html

var pointsTakerNeeds = [56, 51, 41, 36];
var totalCards = 21 + (4 * 14);

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
    var cardPoints, pointsNeeded, cardCount, score, scoreMsg;
    var pt, pb, pg, ch, mu;

    pointsNeeded = pointsTakerNeeds[bouts];

    cardPoints   = ((bouts+roi) * 4.5) + (dame * 3.5)
                   + (cavalier * 2.5) + (valet * 1.5) + (cards * 0.5);

    pt = cardPoints - pointsNeeded;

    pb = petitaubout

    pg = poignee

    mu = bid;

    cardCount = bouts + roi + dame + cavalier + valet + cards;

    ch = 0;
    $("#ex-chelem-succ").html("failed");
    $("#ex-chelem-decl").html("did not declare");
    if (cardCount > totalCards) {
        message("That's too many cards!");
    } else if (cardCount === totalCards) {
        $("#ex-chelem-succ").html("succeeded");
        if ($("#chelem").val() === "annonce") {
            $("#ex-chelem-decl").html("declared");
            ch = 400;
        } else {
            ch = 200;
        }
    } else {
        if ($("#chelem").val() === "annonce") {
            $("#ex-chelem-decl").html("declared");
            ch = -200;
        }
    }

    score = ((25 + pt + pb) * mu) + pg + ch;

    if (pt >= 0) {
        scoreMsg = "You win " + score + " points from <em>each</em> player"
    } else {
        scoreMsg = "You <em>lose</em> " + Math.abs(score)
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

    $("#ex-pt").html(pt);
    $("#ex-pb").html(pb);
    $("#ex-mu").html(mu);
    $("#ex-pg").html(pg);
    $("#ex-ch").html(ch);

    $("#score").html(scoreMsg);
    $("#ex-score").html(score);

    $("#explain").html(
        "((25 + (" + cardPoints + " - " + pointsNeeded + ") + " + pb + ") * " + mu + " ) + " + pg + " + " + ch
    );
}

function message(msg) {
        $("#message").html("That's too many cards.");
}

$(document).ready(function() {
    $("select").change(scoreTarot);
    $("input").change(scoreTarot);
    scoreTarot();
});
