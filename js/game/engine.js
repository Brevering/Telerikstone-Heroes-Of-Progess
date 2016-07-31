(function () {
    'use strict';

    define(['cardCreator'], function (cardCreator) {
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
            $('#pass-turn').on('click', botPlayerPlaceCard);
        }

        function initializeCard(cardUrl, isPlayerCard) {
            for (let i = 0; i < 10; i += 1) {
                cardCreator.initializeCard(cardUrl, isPlayerCard);
            }
        }

        // starts the whole game
        function start() {
            initializeCard('images/cards/cuki_card.png', true);
            initializeCard('images/cards/cuki_card.png', false);
            botPlayerPlaceCardEvent();
        }

        return {
            start: start
        };
    });
} ());