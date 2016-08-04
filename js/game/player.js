(function () {
    'use strict';

    define(['cardCreator', 'cardAbilities'], function (cardCreator, cardAbilities) {
        function attackEnemyCardEvent(event, enemyCards, playerCards, stage) {
            let cardId = this.cardId;
            let cardObject = enemyCards.filter(obj => obj.cardId === cardId)[0];

            if (!cardObject.isPlayerCard && cardObject.isPlaced && !cardObject.isJustPlaced &&
                localStorage.getItem('canAttack') === 'true') {
                localStorage.setItem('canAttack', 'false');
                localStorage.setItem('isPlayerTurn', 'false');
                localStorage.setItem('hasPlayerPlacedCard', 'true');

                let attacker = playerCards.filter(c => c.cardId === Number(localStorage.attackerId))[0];

                if (attacker.ability === 'stealEnemyHealth') {
                    cardAbilities.stealFromEnemyHealth(attacker, cardObject);
                } else if (attacker.ability === 'stealMana') {
                    cardAbilities.stealManaFromEnemyCard(attacker, cardObject)
                } else {
                    cardObject.health -= attacker.attack;
                    cardCreator.performAttackAnimation(attacker, cardObject);

                    if (cardObject.health <= 0) {
                        let indexToRemove = enemyCards.indexOf(cardObject);

                        stage.removeChild(cardObject.cardContainer);
                        enemyCards.splice(indexToRemove, 1);
                    }
                }
            } else {
                cardObject.isJustPlaced = false;
            }
        }

        function initializeAttackEvent(event, playerCards) {
            let cardId = this.cardId;
            let cardObject = playerCards.filter(obj => obj.cardId === cardId)[0];

            if (cardObject.isPlayerCard && cardObject.isPlaced) {
                localStorage.setItem('canAttack', 'true');
                localStorage.setItem('attackerId', cardObject.cardId);
            }
        }

        function attachAttackEnemyCardEvents(allCards, stage) {
            let playerCards = allCards.playerCards;
            let enemyCards = allCards.enemyCards;

            for (let i = 0; i < playerCards.length; i += 1) {
                playerCards[i].cardSprite.on('mousedown', function (event) {
                    initializeAttackEvent.call(this, event, playerCards);
                });
            }

            for (let i = 0; i < enemyCards.length; i += 1) {
                enemyCards[i].cardSprite.on('mousedown', function (event) {
                    attackEnemyCardEvent.call(this, event, enemyCards, playerCards, stage);
                });
            }
        }

        return {
            attachAttackEnemyCardEvents: attachAttackEnemyCardEvents
        };
    });
}());