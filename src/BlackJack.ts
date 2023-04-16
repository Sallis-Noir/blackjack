import {welcomeText, gameHitText, gameStandText} from "./assets/ASCII-styles";
import {returnToSender} from "./Menu";

interface deckDividers {
    playersCards?: string[], 
    bankersCards?: string[], 
    remainingDeck: string[]
}

const cardSuits = ["-♥", "-♦", "-♣", "-♠"];
const cardValues = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const cardIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

export function beginGame() {
    const playersCards = dealCards().slice(0, 2);
    const bankersCards = dealCards().slice(2, 4);
    const remainingDeck = dealCards().slice(4, dealCards().length);

    const props = {playersCards, bankersCards, remainingDeck};
    actionPhase(props);
}

function dealCards() {
    const completeDeck = cardSuits.map((i, idx) => cardValues.map(x => x + cardSuits[idx]));
    const shuffledCards = (completeDeck[0].concat(completeDeck[1], completeDeck[2], completeDeck[3])).sort(() => 0.5 - Math.random());
    return shuffledCards;
}

function actionPhase(props: deckDividers) {
     console.clear();
    console.log(
        welcomeText, '\n','\n','\n',
        "ＬＥＴＳ ＰＬＡＹ​​​​​", '\n',
        "_____________________", '\n',
        gameHitText,'\n',
        gameStandText,'\n',
        "_____________________",'\n',
        "Players Cards: " + props.playersCards,'\n',
        "Players Value: " + calculateIndex(props.playersCards!),'\n',
        "Bankers Cards: " + props.bankersCards![0] + ", ?",'\n',
        "Enter your Choice... \n"
    );

    process.stdin.once('data', function (name: string) { 
        if ((name === "hit\r\n") || (name === "3\r\n")){
            console.log('HIT!!');
            hit(props, true);
        }
        else if ((name === "stand\r\n") || (name === "4\r\n")) {
            console.log('STAND!!');
            stand(props);
        }
    });
}

function calculateIndex(newCards: string[]) {
    let playerCardIndex = 0;
    for (let i = 0; i < newCards.length; i++) {
        for (let l = 0; l < cardValues.length; l++) {
            if(newCards[i].includes(cardValues[l])){
                playerCardIndex = playerCardIndex + cardIndex[l];
            }
        }
    }
    return playerCardIndex;
}


function hit(props: deckDividers, playersTurn: boolean) {
    let playerOrBanker; playersTurn ? playerOrBanker = props.playersCards : playerOrBanker = props.bankersCards;
    const newCards = playerOrBanker!.concat(props.remainingDeck.slice(0, 1));
    let cardIndex = calculateIndex(newCards);
    props.remainingDeck.shift();

    if (playersTurn) {
        console.log(
            "Players Cards: " + newCards,'\n',
            "Total: " + cardIndex,'\n'
        );
        props.playersCards = newCards;
        cardIndex <= 21 ? actionPhase(props) : returnToSender(false);
    }
    else {
        props.bankersCards = newCards;
        stand(props);
    }
}


function stand(props: deckDividers) {
    const bankersValueIndex = calculateIndex(props.bankersCards!);
    const playersValueIndex = calculateIndex(props.playersCards!);

    if (bankersValueIndex > playersValueIndex) {
        endGame(props, playersValueIndex, bankersValueIndex);
    }
    else {
        bankersValueIndex >= 17 ? endGame(props, playersValueIndex, bankersValueIndex) : hit(props, false);
    }
}

function endGame(props: deckDividers, playersValueIndex: number, bankersValueIndex: number) {
    const gameEndReason = ["Banker Bust", "BlackJack!", "Banker BlackJack", "Banker Pays: ", "5 card trick!"]
    console.clear();
    console.log(
        welcomeText, '\n','\n','\n',
        "Players Hand: " + props.playersCards,'\n',
        "Players Value: " + playersValueIndex,'\n', '\n',
        "Bankers Hand: " + props.bankersCards,'\n',
        "Bankers Value: " + bankersValueIndex,'\n',
    );

    if (props.playersCards!.length >= 5){
        console.log(gameEndReason[4],'\n');
        returnToSender(true);
    }
    else if (bankersValueIndex === 21) {
        console.log(gameEndReason[2],'\n');
        returnToSender(false);
    }
    else if (playersValueIndex === 21) {
        console.log(gameEndReason[1],'\n');
        returnToSender(true);
    }
    else if (bankersValueIndex > 21) {
        console.log(gameEndReason[0],'\n');
        returnToSender(true);
    }
    else if (bankersValueIndex < playersValueIndex){
        console.log(gameEndReason[3] + (bankersValueIndex + 1),'\n');
        returnToSender(true);
    }
    else {
        console.log(gameEndReason[3] + (bankersValueIndex + 1),'\n');
        returnToSender(false);
    }
}