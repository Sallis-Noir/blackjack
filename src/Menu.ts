import {welcomeText, mainMenuBalanceText, mainMenuPlayText, mainMenuExitText, mainMenuContinueText, loss, winner, youreDone} from "./assets/ASCII-styles"
import{beginGame} from "./BlackJack"

const initPlayerBalance = 50;
let buyIn = 10;
let profit = 0;


export class SplashState {
    static start() {
        process.stdin.resume();
        process.stdin.setEncoding('utf8');

        console.clear();
        console.log(
            welcomeText,'\n','\n','\n',
            mainMenuBalanceText + "£" + JSON.stringify(initPlayerBalance + profit),'\n', '\n',
            "Buy in: £10", '\n',
            mainMenuPlayText, '\n',
            mainMenuExitText, '\n','\n',
            "Enter your Choice... \n"
        );
        process.stdin.once('data', function (name: string) { 
            if((name === "play\r\n") || (name === "1\r\n")){
                beginGame();
            }
            else if((name === "play\r\n") || (name === "2\r\n")){
                process.exit();
            }
        });
    
    }
}

export function returnToSender(win: boolean){
    if (win){
        profit = profit + buyIn;
        console.log(winner);
    }
    else {
        profit = profit - buyIn;
        ((initPlayerBalance + profit) < buyIn) ? timeToStop() : console.log(loss);
    }

    console.log(
        "New Balance:" + "£" + (initPlayerBalance + profit), '\n',
        '\n', '\n',
        mainMenuContinueText, '\n',
        mainMenuExitText, '\n'
    );

    process.stdin.once('data', function (name: string) { 
        if((name === "play\r\n") || (name === "5\r\n")){
           SplashState.start();
        }
    });
}

function timeToStop(){
    console.log(youreDone)
    process.exit();
}

