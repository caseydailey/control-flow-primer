'use strict';

// returns a random integer in the range [m, n] (inclusive)

function random(m, n) {
    return m + Math.floor((n - m + 1) * Math.random());
}

//randomly returns a string representation one of the six
// Crown and Anchor faces
function randomFace() {
    return ["crown", "anchor", "heart", "spade", "club", "diamond"][random(0, 5)];
}

//Starting conditions
var funds = 50;
var round = 0;

var _loop = function _loop() {
    round++;
    console.log("round " + round + ":");
    console.log("\tstarting funds: " + funds + "p");
    // place bets
    var bets = { crown: 0, anchor: 0, heart: 0,
        spade: 0, club: 0, diamond: 0 };
    var totalBet = random(1, funds);

    if (totalBet == 7) {
        totalBet = funds;
        bets.heart = totalBet;
    } else {
        // distribute total bet
        var remaining = totalBet;
        do {
            var bet = random(1, remaining);
            var face = randomFace();
            bets[face] = bets[face] + bet;
            remaining = remaining - bet;
        } while (remaining > 0);
    }
    funds = funds - totalBet;
    console.log('\tbets: ' + Object.keys(bets).map(function (face) {
        return face + ": " + bets[face] + " pence";
    }).join(', ') + (" (total: " + totalBet + " pence)"));

    // simulate dice roll
    var hand = [];
    for (var roll = 0; roll < 3; roll++) {
        hand.push(randomFace());
    }
    console.log("\thand: " + hand.join(', '));

    // collect winnings
    var winnings = 0;
    for (var die = 0; die < hand.length; die++) {
        var _face = hand[die];
        if (bets[_face] > 0) winnings = winnings + bets[_face];
    }
    funds = funds + winnings;
    console.log("\twinnings: " + winnings);
};

while (funds > 1 && funds < 100) {
    _loop();
}
console.log("\tendings funds: " + funds);