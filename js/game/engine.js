(function () {
    'use strict';

    define(['cardCreator', 'globalValues', 'card', 'minionCard', 'ai', 'player', 'decks'],
        function (cardCreator, globalValues, Card, MinionCard, AI, player, Decks) {
            let stage = new PIXI.Container();
            let widthOnePercent = globalValues.widthOnePercent;
            let heightOnePercent = globalValues.heightOnePercent;
            let decks = new Decks();

            function initializeCard(stage, deck, isPlayerCard) {
                for (let i = 0; i < deck.length - 3; i += 1) {
                    cardCreator.initializeCard(stage, deck[i]);
                }
            }

            function getPlayerImageUrl(playerName) {
                switch (playerName) {
                    case 'koce':
                        return 'images/koce.png';
                    case 'cuki':
                        return 'images/cuki.png';
                    case 'doncho':
                        return 'images/doncho.png';
                    case 'evlogi':
                        return 'images/evlogi.png';
                }
            }

            function getBotPlayerImageUrl(realPlayerName) {
                let botPlayerName;

                if (realPlayerName === 'koce') {
                    botPlayerName = ['doncho', 'cuki', 'evlogi'][Math.floor(Math.random() * 3)];
                } else if (realPlayerName === 'cuki') {
                    botPlayerName = ['doncho', 'koce', 'evlogi'][Math.floor(Math.random() * 3)];
                } else if (realPlayerName === 'doncho') {
                    botPlayerName = ['cuki', 'koce', 'evlogi'][Math.floor(Math.random() * 3)];
                } else {
                    botPlayerName = ['cuki', 'koce', 'doncho'][Math.floor(Math.random() * 3)];
                }

                return getPlayerImageUrl(botPlayerName);
            }

            function loadAvatars(playerName) {
                let playerAvatar = new PIXI.Sprite(PIXI.Texture.fromImage(getPlayerImageUrl(playerName)));
                let enemyAvatar = new PIXI.Sprite(PIXI.Texture.fromImage(getBotPlayerImageUrl(playerName)));

                playerAvatar.width = 8.5 * widthOnePercent;
                playerAvatar.height = 20 * heightOnePercent;

                enemyAvatar.width = 8.5 * widthOnePercent;
                enemyAvatar.height = 20 * heightOnePercent;

                playerAvatar.position.x = 39.3 * widthOnePercent;
                playerAvatar.position.y = 59.5 * heightOnePercent;

                enemyAvatar.position.x = 39.3 * widthOnePercent;
                enemyAvatar.position.y = 8.8 * heightOnePercent;

                return [playerAvatar, enemyAvatar];
            }

            function setUpTable() {
                let renderer = PIXI.autoDetectRenderer(globalValues.canvasWidth, globalValues.canvasHeight);
                $('#playFieldCanvas').append(renderer.view);
                let background = new PIXI.Sprite(PIXI.Texture.fromImage('images/table.png'));

                background.width = globalValues.canvasWidth;
                background.height = globalValues.canvasHeight;

                stage.addChild(background);
                initPixi();

                function initPixi() {
                    requestAnimationFrame(initPixi);
                    renderer.render(stage);
                }
            }

            // starts the whole game
            function start() {
                let playerDeck = decks.getCukiDeck(true);
                let enemyDeck = decks.getCukiDeck(false);

                setUpTable();
                initializeCard(stage, playerDeck, true);
                initializeCard(stage, enemyDeck, false);

                let allCards = cardCreator.getPlayersCards();
                let playersAvatars = loadAvatars(localStorage.trainer);

                stage.addChild(playersAvatars[0]);
                stage.addChild(playersAvatars[1]);

                let endTurnButton = new PIXI.Sprite(PIXI.Texture.fromImage('images/buttons/end_turn_bg.png'));

                endTurnButton.interactive = true;
                endTurnButton.width = 6 * widthOnePercent;
                endTurnButton.height = 5.9 * heightOnePercent;
                endTurnButton.position.x = 67.3 * widthOnePercent;
                endTurnButton.position.y = 37.7 * heightOnePercent;

                endTurnButton.on('mousedown', function () {
                    if (localStorage.getItem('hasToPlaceCard') === 'true') {
                        AI.placeCard(allCards, endTurnButton);
                        localStorage.setItem('hasToPlaceCard', 'false');
                    } else {
                        AI.attackPlayerCard(allCards, stage, endTurnButton, playersAvatars);
                    }

                    setTimeout(function () {
                        endTurnButton.texture = PIXI.Texture.fromImage('images/buttons/end_turn_pressed_bg.png');
                    }, 100);
                });

                player.attachAttackEnemyCardEvents(allCards, stage, playersAvatars);
                cardCreator.hoverPlayerCard();

                stage.addChild(endTurnButton);
            }

            return {
                start: start
            };
        });
}());