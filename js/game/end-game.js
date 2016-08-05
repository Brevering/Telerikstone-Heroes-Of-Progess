(function () {
    'use strict';

    define(['jquery', 'TimelineMax', 'CSSPlugin'], function ($, TimelineMax, CSSPlugin) {
        function checkForEndGame(playersAvatars, allCards) {
            let playerAvatar = playersAvatars[0],
                playerCards = allCards.playerCards,
                enemyAvatar = playersAvatars[1],
                enemyCards = allCards.enemyCards;

            if (enemyAvatar.health <= 0) {
                console.log('GAME OVER: You win!');

                activateWinSceen()
            } else if (playerAvatar.health <= 0) {
                console.log('GAME OVER: You lose!');

                activateWinSceen()
            } else if (playerCards.length <= 1) {
                console.log('GAME OVER: You lose!');

                activateWinSceen()
            } else if (enemyCards.length <= 1) {
                console.log('GAME OVER: You win!');

                activateWinSceen()
            }
        }

        function activateWinSceen() {
            disableCanvas();
        }

        function disableCanvas() {
            let canvas = document.getElementById('playFieldCanvas');
            let animation = new TimelineMax({onComplete: enableEndGameButton});

            animation.to(canvas, 1, {width: 0, height: 0});
        }

        function enableEndGameButton() {
            let $button = $('<a>');

            $button.attr('href', '#')
                .attr('id', 'end-game');

            $button.css({
                background: 'url(images/buttons/endGame.png)',
                width: '256px',
                height: '256px'
            });

            $button.appendTo($('#playField'));
        }

        return {
            checkForEndGame: checkForEndGame
        };
    });
}());