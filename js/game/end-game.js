(function () {
    'use strict';

    define(['jquery', 'TimelineMax', 'CSSPlugin', 'sammy', 'userModel'],
        function ($, TimelineMax, CSSPlugin, Sammy, UserModel) {
            function updateAccountInTheDB() {
                let userModel = new UserModel(),
                    data = {
                        wins: localStorage.currentWins,
                        defeats: localStorage.currentDefeats
                    };

                return userModel.sendUserData(data);
            }

            function checkForEndGame(playersAvatars, allCards) {
                let playerAvatar = playersAvatars[0],
                    playerCards = allCards.playerCards,
                    enemyAvatar = playersAvatars[1],
                    enemyCards = allCards.enemyCards;

                if (enemyAvatar.health <= 0) {
                    localStorage.currentWins = Number(localStorage.currentWins) + 1;
                    updateAccountInTheDB()
                        .then(function (success) {
                            disableCanvas(playersAvatars, true);
                        });
                } else if (playerAvatar.health <= 0) {
                    localStorage.currentWins = Number(localStorage.currentWins) - 1;
                    updateAccountInTheDB()
                        .then(function (success) {
                            disableCanvas(playersAvatars, false);
                        });
                } else if (playerCards.length <= 1) {
                    localStorage.currentWins = Number(localStorage.currentWins) - 1;
                    updateAccountInTheDB()
                        .then(function (success) {
                            disableCanvas(playersAvatars, false);
                        });
                } else if (enemyCards.length <= 1) {
                    localStorage.currentWins = Number(localStorage.currentWins) + 1;
                    updateAccountInTheDB()
                        .then(function (success) {
                            disableCanvas(playersAvatars, true);
                        });
                }
            }

            function disableCanvas(playersAvatars, isWin) {
                let canvas = document.getElementById('playFieldCanvas'),
                    animation = new TimelineMax({
                        onComplete: function () {
                            createEndContainer();

                            if (isWin) {
                                loadWinImage();
                            } else {
                                loadDefeatImage();
                            }

                            enableEndGameButton();
                        }
                    });

                animation.to(canvas, 1, { width: 0, height: 0 });
            }

            function createEndContainer() {
                let $endContainer = $('<div>');

                $endContainer.attr('id', 'endContainer');
                $endContainer.css({
                    display: 'flex',
                    'flex-flow': 'column',
                    'align-items': 'center',
                    'justify-content': 'center'
                });

                $endContainer.appendTo($('#playField'));
            }

            function loadWinImage() {
                let $winImage = $('<img>');

                $winImage.attr('src', 'images/end-images/victory.png');
                $winImage.css('display', 'block');
                $winImage.appendTo($('#endContainer'));
            }

            function loadDefeatImage() {
                let $defeatImage = $('<img>');

                $defeatImage.attr('src', 'images/end-images/defeat.png');
                $defeatImage.css('display', 'block');
                $defeatImage.appendTo($('#endContainer'));
            }

            function enableEndGameButton() {
                let $button = $('<a>');

                $button.attr('id', 'end-game');
                $button.attr('href', '#/end-game/');
                $button.css({
                    background: 'url(images/buttons/endGame.png)',
                    width: '256px',
                    height: '256px',
                    display: 'block',
                });
                $button.appendTo($('#endContainer'));
            }

            return {
                checkForEndGame: checkForEndGame
            };
        });
} ());