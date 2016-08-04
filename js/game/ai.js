(function () {
    'use strict';

    define(['cardCreator', 'cardAbilities'], function (cardCreator, cardAbilities) {
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

            if (currentPlacedCard.ability === 'stealEnemyHealth') {
                cardAbilities.stealFromEnemyHealth(currentPlacedCard, cardToAttack);
            } else if (currentPlacedCard.ability === 'stealMana') {
                cardAbilities.stealManaFromEnemyCard(currentPlacedCard, cardToAttack);
            } else if (currentPlacedCard.ability === 'stealAttack') {
                cardAbilities.stealAttackFromEnemyCard(currentPlacedCard, cardToAttack);
            } else {
                cardCreator.performAttackAnimation(currentPlacedCard, cardToAttack);
                cardToAttack.health -= currentPlacedCard.attack;

                if (cardToAttack.health <= 0) {
                    let indexToRemove = playerCards.indexOf(cardToAttack);

                    console.log(playerCards);
                    stage.removeChild(cardToAttack.cardContainer);
                    playerCards.splice(indexToRemove, 1);
                    console.log(playerCards);
                }
            }

            localStorage.setItem('isPlayerTurn', 'true');
        }

        return {
            placeCard: placeCard,
            attackPlayerCard: attackPlayerCard
        };
    });
}());