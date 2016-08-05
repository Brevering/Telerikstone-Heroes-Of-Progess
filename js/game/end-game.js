(function () {
    'use strict';

    define(['jquery', 'TimelineMax', 'CSSPlugin', 'sammy'], function ($, TimelineMax, CSSPlugin, Sammy) {
        function checkForEndGame(playersAvatars, allCards) {
            let playerAvatar = playersAvatars[0],
                playerCards = allCards.playerCards,
                enemyAvatar = playersAvatars[1],
                enemyCards = allCards.enemyCards;

            if (enemyAvatar.health <= 0) {
                console.log('GAME OVER: You win!');

                activateWinSceen(playersAvatars)
            } else if (playerAvatar.health <= 0) {
                console.log('GAME OVER: You lose!');

                activateWinSceen(playersAvatars)
            } else if (playerCards.length <= 1) {
                console.log('GAME OVER: You lose!');

                activateWinSceen(playersAvatars)
            } else if (enemyCards.length <= 1) {
                console.log('GAME OVER: You win!');

                activateWinSceen(playersAvatars)
            }
        }

        function activateWinSceen(playersAvatars) {
            disableCanvas(playersAvatars);
        }

        function disableCanvas(playersAvatars) {
            let canvas = document.getElementById('playFieldCanvas');
            let animation = new TimelineMax({onComplete: enableEndGameButton.bind(null, playersAvatars)});

            animation.to(canvas, 1, {width: 0, height: 0});
        }

        function getChartData(playerAvatars) {
            return [
                {
                    "damageDealt": playerAvatars[0].damageDealt,
                    "healthStolen": playerAvatars[0].healthStolen,
                    "manaStolen": playerAvatars[0].manaStolen,
                    "attackStolen": localStorage.getItem('playerStolenAttack'),
                    "player": "You"
                },
                {
                    "damageDealt": playerAvatars[1].damageDealt,
                    "healthStolen": playerAvatars[1].healthStolen,
                    "manaStolen": playerAvatars[1].manaStolen,
                    "attackStolen": localStorage.getItem('enemyStolenAttack'),
                    "player": "Enemy"
                }
            ];
        }

        function enableEndGameButton(playersAvatars) {
            let $button = $('<button>');

            $button.attr('id', 'end-game');
            $button.css({
                background: 'url(images/buttons/endGame.png)',
                width: '256px',
                height: '256px'
            });
            $button.on('click', function () {
                Sammy(function () {
                    this.trigger('end-game-page', getChartData(playersAvatars));
                });
            });

            $button.appendTo($('#playField'));
        }

        return {
            checkForEndGame: checkForEndGame
        };
    });
}());