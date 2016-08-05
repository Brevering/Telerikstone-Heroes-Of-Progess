(function () {
    'use strict';

    define([], function () {
        function checkForEndGame(playersAvatars, allCards) {
            let playerAvatar = playersAvatars[0],
                playerCards = allCards.playerCards,
                enemyAvatar = playersAvatars[1],
                enemyCards = allCards.enemyCards,
                isEndGame = false;

            if (enemyAvatar.health <= 0) {
                isEndGame = true;
            } else if (playerAvatar.health <= 0) {
                isEndGame = true;
            } else if (playerCards.length <= 1) {
                isEndGame = true;
            } else if (enemyCards.length <= 1) {
                isEndGame = true;
            }
        }

        return {
            checkForEndGame: checkForEndGame
        };
    });
}());