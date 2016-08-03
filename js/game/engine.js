(function () {
    'use strict';

    define(['cardCreator', 'globalValues', 'card', 'minionCard'], function (cardCreator, globalValues, Card, MinionCard) {
        let stage = new PIXI.Container();
        let widthOnePercent = globalValues.widthOnePercent;
        let heightOnePercent = globalValues.heightOnePercent;

        function botPlayerPlaceCard(allCards, endTurnButton) {
            console.log(allCards);

            let enemyCards = allCards.enemyCards;
            let hasPlayerPlacedCard = localStorage.getItem('hasPlayerPlacedCard');

            if (hasPlayerPlacedCard === 'true') {
                let cardToPlace = enemyCards[[Math.floor(Math.random() * enemyCards.length)]];

                localStorage.setItem('hasPlayerPlacedCard', 'false');
                cardCreator.placeCard(cardToPlace);
                debugger;
                endTurnButton.texture = PIXI.Texture.fromImage('images/buttons/end_turn_bg.png');
            }
        }

        function initializeCard(stage, cardUrl, isPlayerCard) {
            for (let i = 0; i < 10; i += 1) {
                let cardInstance = new Card(4, 5, 6, cardUrl, isPlayerCard);

                cardCreator.initializeCard(stage, cardInstance);
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

            let playersAvatars = loadAvatars(localStorage.trainer);

            stage.addChild(background);
            stage.addChild(playersAvatars[0]);
            stage.addChild(playersAvatars[1]);

            initPixi();

            function initPixi() {
                requestAnimationFrame(initPixi);
                renderer.render(stage);
            }
        }

        // starts the whole game
        function start() {
            setUpTable();
            initializeCard(stage, 'images/cards/cuki_card.png', true);
            initializeCard(stage, 'images/cards/cuki_card.png', false);

            let allCards = cardCreator.getPlayersCards();
            
            let endTurnButton = new PIXI.Sprite(PIXI.Texture.fromImage('images/buttons/end_turn_bg.png'));

            endTurnButton.interactive = true;
            endTurnButton.width = 6 * widthOnePercent;
            endTurnButton.height = 5.9 * heightOnePercent;
            endTurnButton.position.x = 67.3 * widthOnePercent;
            endTurnButton.position.y = 37.7 * heightOnePercent;

            endTurnButton.on('mousedown', function () {
                botPlayerPlaceCard(allCards, endTurnButton);
                endTurnButton.texture = PIXI.Texture.fromImage('images/buttons/end_turn_pressed_bg.png');
            });

            stage.addChild(endTurnButton);
        }

        return {
            start: start
        };
    });
} ());