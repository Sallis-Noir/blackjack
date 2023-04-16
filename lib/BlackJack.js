"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beginGame = void 0;
var ASCII_styles_1 = require("./assets/ASCII-styles");
var Menu_1 = require("./Menu");
var cardSuits = ["-♥", "-♦", "-♣", "-♠"];
var cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var cardIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
function beginGame(playerBalance, betTotal) {
    var balance;
    balance = playerBalance - betTotal;
    console.log("Current Balance:" + balance);
    var cards = dealCards();
    //Shuffle all cards and deal (take first 2 from top of index).
    var playersCards = cards.slice(0, 2);
    var bankersCards = cards.slice(2, 4);
    var remainingDeck = cards.slice(4, cards.length);
    var props = { playersCards: playersCards, bankersCards: bankersCards, remainingDeck: remainingDeck };
    actionPhase(props);
}
exports.beginGame = beginGame;
function dealCards() {
    //Creating an array of all cards.
    var completeDeck = cardSuits.map(function (i, idx) { return cardValues.map(function (x) { return x + cardSuits[idx]; }); });
    var shuffledCards = (completeDeck[0].concat(completeDeck[1], completeDeck[2], completeDeck[3])).sort(function () { return 0.5 - Math.random(); });
    return shuffledCards;
}
function actionPhase(props) {
    console.log("ＬＥＴＳ ＰＬＡＹ​​​​​");
    console.log("Ｈｉｔ");
    console.log("Ｓｔａｎｄ");
    console.log("Ｄｏｕｂｌｅ Ｄｏｗｎ");
    console.log("_____________________");
    console.log("Players Cards: " + props.playersCards);
    console.log("Bankers Cards: " + props.bankersCards);
    console.log("_____________________");
    console.log("");
    var expr = 'Hit';
    switch (expr) {
        case 'Hit':
            console.log('HIT!!');
            hit(props);
            break;
        //case 'Stand':
        //
        //    break;
        //case 'Hit':
        //    console.log('Oranges are $0.59 a pound.');
        //    break;
    }
}
function calculateIndex(newCards) {
    var playerCardIndex = 0;
    for (var i = 0; i < newCards.length; i++) {
        for (var l = 0; l < cardValues.length; l++) {
            if (newCards[i].includes(cardValues[l])) {
                playerCardIndex = playerCardIndex + cardIndex[l];
            }
        }
    }
    return playerCardIndex;
}
function checkValuePlayer(props, playerCardIndex) {
    if (playerCardIndex <= 21) {
        actionPhase(props);
    }
    else {
        console.log(ASCII_styles_1.loss);
        (0, Menu_1.returnToSender)(false);
    }
}
function hit(props) {
    var newPlayersCards = props.playersCards.concat(props.remainingDeck.slice(0, 1));
    var playerCardIndex = calculateIndex(newPlayersCards);
    console.log("Players Cards: " + newPlayersCards);
    console.log("Total: " + playerCardIndex);
    checkValuePlayer(props, playerCardIndex);
}
function stand(props) {
    var newPlayersCards = props.playersCards.concat(props.remainingDeck.slice(0, 1));
    var playerCardIndex = calculateIndex(newPlayersCards);
    console.log("Players Cards: " + newPlayersCards);
    console.log("Total: " + playerCardIndex);
    checkValuePlayer(props, playerCardIndex);
}
