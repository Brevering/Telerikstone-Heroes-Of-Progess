(function () {
    'use strict';

    define(['cardCreator', 'globalValues', 'card', 'minionCard'], function (cardCreator, globalValues, Card, MinionCard) {
        let stage = new PIXI.Container();
        let widthOnePercent = globalValues.widthOnePercent;
        let heightOnePercent = globalValues.heightOnePercent;

        function botPlayerPlaceCard() {
            let hasPlayerPlacedCard = localStorage.getItem('hasPlayerPlacedCard');

            if (hasPlayerPlacedCard === 'true') {
                let $botPlayerCards = $('.enemyCard');
                let $cardToPlace = $botPlayerCards[[Math.floor(Math.random() * $botPlayerCards.length)]];

                localStorage.setItem('hasPlayerPlacedCard', 'false');
                cardCreator.placeCard($cardToPlace);
            }
        }

        function botPlayerPlaceCardEvent() {
            //$('#pass-turn').on('click', botPlayerPlaceCard);
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

        function setupEndTurnBtn() {
            let endTurnButton = new PIXI.Sprite(PIXI.Texture.fromImage('images/buttons/end_turn_bg.png'));

            endTurnButton.interactive = true;
            endTurnButton.width = 105;
            endTurnButton.height = 55;
            endTurnButton.position.x = 1235;
            endTurnButton.position.y = 384;

            endTurnButton.on('mousedown', function () {
                console.log('FIRED');
                endTurnButton.texture = PIXI.Texture.fromImage('images/buttons/end_turn_pressed_bg.png');
            });

            return endTurnButton;
        }

        function setUpTable() {
            console.log(globalValues);
            let renderer = PIXI.autoDetectRenderer(globalValues.canvasWidth, globalValues.canvasHeight);
            $('#playFieldCanvas').append(renderer.view);
            let background = new PIXI.Sprite(PIXI.Texture.fromImage('images/table.png'));

            background.width = globalValues.canvasWidth;
            background.height = globalValues.canvasHeight;

            let playersAvatars = loadAvatars(localStorage.trainer);
            let endTurnButton = setupEndTurnBtn();

            stage.addChild(background);
            stage.addChild(playersAvatars[0]);
            stage.addChild(playersAvatars[1]);
            stage.addChild(endTurnButton);

            initPixi();

            function initPixi() {
                requestAnimationFrame(initPixi);
                renderer.render(stage);
            }
        }

        // starts the whole game
        function start() {
            setUpTable();
            let allCards = cardCreator.getPlayersCards();
            console.log(allCards);

            initializeCard(stage, 'images/cards/cuki_card.png', true);
            initializeCard(stage, 'images/cards/cuki_card.png', false);
            // botPlayerPlaceCardEvent();
        }

        return {
            start: start
        };
    });
} ());