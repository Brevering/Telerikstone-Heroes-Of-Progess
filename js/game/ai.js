(function () {
    'use strict';

    define(['cardCreator', 'cardAbilities', 'Pixi'], function (cardCreator, cardAbilities, PIXI) {
        function placeCard(allCards, endTurnButton) {
            let enemyCards = allCards.enemyCards;
            let hasPlayerPlacedCard = localStorage.getItem('hasPlayerPlacedCard');

            if (hasPlayerPlacedCard === 'true') {
                let cardToPlace = enemyCards[[Math.floor(Math.random() * enemyCards.length)]];

                localStorage.setItem('hasPlayerPlacedCard', 'false');
                cardCreator.placeCard(cardToPlace);
                localStorage.setItem('isPlayerTurn', 'true');
                localStorage.setItem('canAttack', 'false');

                setTimeout(function () {
                    endTurnButton.texture = PIXI.Texture.fromImage('images/buttons/end_turn_bg.png');
                }, 200);
            }
        }

        function attackPlayerCard(allCards, stage, endTurnButton, playerAvatars) {
            let placedPlayerCards = allCards.playerCards.filter(c => c.isPlaced);
            let cardToAttack = placedPlayerCards[Math.floor(Math.random() * placedPlayerCards.length)];
            let currentPlacedCard = allCards.enemyCards.filter(c => c.isPlaced)[0];
            let playerCards = allCards.playerCards;

            if (currentPlacedCard) {
                if (currentPlacedCard.ability === 'stealEnemyHealth') {
                    cardAbilities.stealFromEnemyHealth(currentPlacedCard, playerAvatars);
                } else if (currentPlacedCard.ability === 'stealMana') {
                    cardAbilities.stealManaFromEnemyPlayer(currentPlacedCard, playerAvatars);
                } else if (currentPlacedCard.ability === 'stealAttack') {
                    cardAbilities.stealAttackFromEnemyCard(currentPlacedCard, cardToAttack);
                } else {
                    cardCreator.performAttackAnimation(currentPlacedCard, cardToAttack);
                    cardToAttack.health -= currentPlacedCard.attack;

                    if (cardToAttack.health <= 0) {
                        let indexToRemove = playerCards.indexOf(cardToAttack);

                        stage.removeChild(cardToAttack.cardContainer);
                        playerCards.splice(indexToRemove, 1);
                    }

                    cardToAttack.healthStat.text = cardToAttack.health;
                }
            } else {
                placeCard(allCards, endTurnButton);
            }

            setTimeout(function () {
                endTurnButton.texture = PIXI.Texture.fromImage('images/buttons/end_turn_bg.png');
            }, 200);

            localStorage.setItem('isPlayerTurn', 'true');
        }

        return {
            placeCard: placeCard,
            attackPlayerCard: attackPlayerCard
        };
    });
}());