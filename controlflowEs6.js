'use strict';

// returns a random integer in the range [m, n] (inclusive)
function random(m, n) {
    return m + Math.floor((n - m + 1) * Math.random());
}

//randomly returns a string representation one of the six
// Crown and Anchor faces
function randomFace() {
    return["crown", "anchor", "heart", "spade", "club", "diamond"][random(0,5)];
}

//Starting conditions
let funds = 50; 
let round = 0;

while (funds > 1 && funds < 100) {
    round++;
    console.log(`round ${round}:`);
    console.log(`\tstarting funds: ${funds}p`);
    // place bets
    let bets =  { crown: 0, anchor: 0, heart: 0,
        spade: 0, club: 0, diamond: 0 };
    let totalBet = random(1, funds);
    
    if (totalBet == 7) {
        totalBet = funds;
        bets.heart = totalBet;
    } else {
        // distribute total bet
        let remaining = totalBet;
        do {
            let bet = random(1, remaining);
            let face = randomFace();
            bets[face] = bets[face] + bet;
            remaining = remaining - bet;
        } while (remaining > 0);
    }
    funds = funds - totalBet;
    console.log('\tbets: ' + 
        Object.keys(bets).map(face => `${face}: ${bets[face]} pence`).join(', ') +
        ` (total: ${totalBet} pence)`);

    // simulate dice roll
    const hand = [];
    for (let roll = 0; roll < 3; roll++) {
        hand.push(randomFace());
    }
    console.log(`\thand: ${hand.join(', ')}`);

    // collect winnings
    let winnings = 0;
    for (let die = 0; die < hand.length; die++) {
        let face = hand[die];
        if(bets[face] > 0) winnings = winnings + bets[face];
    }
    funds = funds + winnings;
    console.log(`\twinnings: ${winnings}`);
}
console.log(`\tendings funds: ${funds}`);