(function () {
    'use strict';

    define([], function () {
        function checkForEndGame(playersAvatars, allCards) {
            let playerAvatar = playersAvatars[0],
                playerCards = allCards.playerCards,
                enemyAvatar = playersAvatars[1],
                enemyCards = allCards.enemyCards;

            if (enemyAvatar.health <= 0) {
                console.log('GAME OVER: You win!');
            } else if (playerAvatar.health <= 0) {
                console.log('GAME OVER: You lose!');
            } else if (playerCards.length <= 1) {
                console.log('GAME OVER: You lose!');
            } else if (enemyCards.length <= 1) {
                console.log('GAME OVER: You win!');
            }
        }

        return {
            checkForEndGame: checkForEndGame
        };
    });
}());