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

        function attackPlayerCard(allCards, stage) {
            let placedPlayerCards = allCards.playerCards.filter(c => c.isPlaced);
            let cardToAttack = placedPlayerCards[Math.floor(Math.random() * placedPlayerCards.length)];
            let currentPlacedCard = allCards.enemyCards.filter(c => c.isPlaced)[0];
            let playerCards = allCards.playerCards;

            cardCreator.performAttackAnimation(currentPlacedCard, cardToAttack);
            cardToAttack.health -= currentPlacedCard.attack;
            localStorage.setItem('isPlayerTurn', 'true');

            if (cardToAttack.health <= 0) {
                let indexToRemove = playerCards.indexOf(cardToAttack);

                console.log(playerCards);
                stage.removeChild(cardToAttack.cardContainer);
                playerCards.splice(indexToRemove, 1);
                console.log(playerCards);
            }
        }

        return {
            placeCard: placeCard,
            attackPlayerCard: attackPlayerCard
        };
    });
}());