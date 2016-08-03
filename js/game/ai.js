(function () {
    'use strict';

    define(['cardCreator'], function (cardCreator) {
        function placeCard(allCards, endTurnButton) {
            let enemyCards = allCards.enemyCards;
            let hasPlayerPlacedCard = localStorage.getItem('hasPlayerPlacedCard');

            if (hasPlayerPlacedCard === 'true') {
                let cardToPlace = enemyCards[[Math.floor(Math.random() * enemyCards.length)]];

                localStorage.setItem('hasPlayerPlacedCard', 'false');
                cardCreator.placeCard(cardToPlace);
                endTurnButton.texture = PIXI.Texture.fromImage('images/buttons/end_turn_bg.png');
                localStorage.setItem('isPlayerTurn', 'true');
                localStorage.setItem('canAttack', 'false');
            }
        }

        return {
            placeCard: placeCard
        };
    });
}());