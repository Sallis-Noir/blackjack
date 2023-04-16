"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnToSender = exports.SplashState = void 0;
var BlackJack_1 = require("./BlackJack");
var ASCII_styles_1 = require("./assets/ASCII-styles");
var initPlayerBalance = 1000;
var betTotal = 10;
var profit = 0;
var playerBalance = initPlayerBalance + profit;
var SplashState = /** @class */ (function () {
    function SplashState() {
    }
    SplashState.start = function () {
        console.log(ASCII_styles_1.welcomeText);
        console.log("");
        console.log(ASCII_styles_1.mainMenuBalanceText + JSON.stringify(playerBalance));
        console.log(ASCII_styles_1.mainMenuPlayText);
        console.log(ASCII_styles_1.mainMenuExitText);
        console.log('Enter your Choice: ');
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        //Await user input
        process.stdin.on('data', function (name) {
            console.log(name);
            debugger;
            if ((name === "play") || (name === "1")) {
                console.log("Hit");
                (0, BlackJack_1.beginGame)(playerBalance, betTotal);
            }
            else {
                (0, BlackJack_1.beginGame)(playerBalance, betTotal);
            }
        });
    };
    return SplashState;
}());
exports.SplashState = SplashState;
function returnToSender(win) {
    if (win) {
        profit = profit + betTotal;
    }
    else {
        profit = profit - betTotal;
    }
    SplashState.start();
}
exports.returnToSender = returnToSender;
