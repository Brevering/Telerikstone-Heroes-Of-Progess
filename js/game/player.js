(function () {
    'use strict';

    define(['cardCreator', 'cardAbilities'], function (cardCreator, cardAbilities) {
        function attackEnemyCardEvent(event, enemyCards, playerCards, stage, playerAvatars) {
            let cardId = this.cardId,
                cardObject = enemyCards.filter(obj => obj.cardId === cardId)[0];

            if (!cardObject.isPlayerCard && cardObject.isPlaced && !cardObject.isJustPlaced &&
                localStorage.getItem('canAttack') === 'true') {
                localStorage.setItem('canAttack', 'false');
                localStorage.setItem('isPlayerTurn', 'false');
                localStorage.setItem('hasPlayerPlacedCard', 'true');

                let attacker = playerCards.filter(c => c.cardId === Number(localStorage.attackerId))[0];

                if (attacker.ability === 'stealEnemyHealth') {
                    cardAbilities.stealFromEnemyHealth(attacker, playerAvatars);
                } else if (attacker.ability === 'stealMana') {
                    cardAbilities.stealManaFromEnemyPlayer(attacker, playerAvatars)
                } else if (attacker.ability === 'stealAttack') {
                    cardAbilities.stealAttackFromEnemyCard(attacker, cardObject, playerCards);
                } else if (attacker.ability === 'normal') {
                    cardObject.health -= attacker.attack;
                    cardCreator.performAttackAnimation(attacker, cardObject);

                    if (cardObject.health <= 0) {
                        let indexToRemove = enemyCards.indexOf(cardObject);

                        stage.removeChild(cardObject.cardContainer);
                        enemyCards.splice(indexToRemove, 1);
                        localStorage.setItem('hasToPlaceCard', 'true');
                    }

                    cardObject.healthStat.text = cardObject.health;
                }
            } else {
                cardObject.isJustPlaced = false;
            }

            playerAvatars[1].mana = 10;
        }

        function initializeAttackEvent(event, playerCards) {
            let cardId = this.cardId,
                cardObject = playerCards.filter(obj => obj.cardId === cardId)[0];

            if (cardObject.isPlayerCard && cardObject.isPlaced) {
                localStorage.setItem('canAttack', 'true');
                localStorage.setItem('attackerId', cardObject.cardId);
            }
        }

        function attachAttackEnemyCardEvents(allCards, stage, playerAvatars) {
            let playerCards = allCards.playerCards,
                enemyCards = allCards.enemyCards;

            for (let i = 0; i < playerCards.length; i += 1) {
                playerCards[i].sprite.on('mousedown', function (event) {
                    initializeAttackEvent.call(this, event, playerCards);
                });
            }

            for (let i = 0; i < enemyCards.length; i += 1) {
                enemyCards[i].sprite.on('mousedown', function (event) {
                    attackEnemyCardEvent.call(this, event, enemyCards, playerCards, stage, playerAvatars);
                });
            }
        }

        return {
            attachAttackEnemyCardEvents: attachAttackEnemyCardEvents
        };
    });
}());