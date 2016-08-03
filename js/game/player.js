(function () {
    'use strict';

    define(['cardCreator'], function (cardCreator) {
        function attackEnemyCardEvent(event, enemyCards, playerCards) {
            let cardId = this.cardId;
            let cardObject = enemyCards.filter(obj => obj.cardId === cardId)[0];

            if (!cardObject.isPlayerCard && cardObject.isPlaced && !cardObject.isJustPlaced &&
                localStorage.getItem('canAttack') === 'true') {
                console.log('before ' + cardObject.health);
                cardObject.health -= Number(localStorage.getItem('currentCardAttack'));
                console.log('after ' + cardObject.health);
                localStorage.setItem('currentCardAttack', '0');
                localStorage.setItem('canAttack', 'false');
                localStorage.setItem('isPlayerTurn', 'false');
                localStorage.setItem('hasPlayerPlacedCard', 'true');

                let attacker = playerCards.filter(c => c.cardId === Number(localStorage.attackerId))[0];
                cardCreator.performAttackAnimation(attacker, cardObject);
            } else {
                cardObject.isJustPlaced = false;
            }
        }

        function initializeAttackEvent(event, playerCards) {
            let cardId = this.cardId;
            let cardObject = playerCards.filter(obj => obj.cardId === cardId)[0];

            if (cardObject.isPlayerCard && cardObject.isPlaced) {
                localStorage.setItem('currentCardAttack', cardObject.attack);
                localStorage.setItem('canAttack', 'true');
                localStorage.setItem('attackerId', cardObject.cardId);
            }
        }

        function attachAttackEnemyCardEvents(allCards) {
            let playerCards = allCards.playerCards;
            let enemyCards = allCards.enemyCards;

            for (let i = 0; i < playerCards.length; i += 1) {
                playerCards[i].cardSprite.on('mousedown', function (event) {
                    initializeAttackEvent.call(this, event, playerCards);
                });
            }

            for (let i = 0; i < enemyCards.length; i += 1) {
                enemyCards[i].cardSprite.on('mousedown', function (event) {
                    attackEnemyCardEvent.call(this, event, enemyCards, playerCards);
                });
            }
        }

        return {
            attachAttackEnemyCardEvents: attachAttackEnemyCardEvents
        };
    });
}());