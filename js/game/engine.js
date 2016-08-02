(function () {
    'use strict';

    define(['cardCreator', 'globalValues'], function (cardCreator, globalValues) {
        let stage = new PIXI.Container();

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
                cardCreator.initializeCard(stage, cardUrl, isPlayerCard);
            }
            // cardCreator.initializeCard(stage, cardUrl, isPlayerCard);
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
            setUpTable();

            initializeCard(stage, 'images/cards/cuki_card.png', true);
            //initializeCard(stage, 'images/cards/cuki_card.png', false);
            // botPlayerPlaceCardEvent();
        }

        return {
            start: start
        };
    });
} ());