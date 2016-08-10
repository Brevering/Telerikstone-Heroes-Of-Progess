(function () {
    'use strict';

    define(['cardController', 'cardAbilities', 'endGame', 'statsController'],
        function (cardController, cardAbilities, endGame, statsController) {
            function attackEnemyCardEvent(event, enemyCards, playerCards, stage, playerAvatars, allCards) {
                let cardId = this.cardId,
                    cardObject = allCards.enemyCards.filter(obj => obj.cardId === cardId)[0];

                if (!cardObject.isPlayerCard && cardObject.isPlaced && !cardObject.isJustPlaced &&
                    localStorage.canAttack === 'true') {
                    localStorage.canAttack = 'false';
                    localStorage.isPlayerTurn = 'false';
                    localStorage.hasPlayerPlacedCard = 'true';

                    let attacker = playerCards.filter(c => c.cardId === Number(localStorage.attackerId))[0];

                    if (attacker.ability === 'stealEnemyHealth') {
                        cardAbilities.stealFromEnemyHealth(attacker, playerAvatars);
                        endGame.checkForEndGame(playerAvatars, allCards);
                    } else if (attacker.ability === 'stealMana') {
                        cardAbilities.stealManaFromEnemyPlayer(attacker, playerAvatars)
                    } else if (attacker.ability === 'normal') {
                        cardObject.health -= attacker.attack;
                        cardController.performAttackAnimation(attacker, cardObject);

                        if (cardObject.health <= 0) {
                            let indexToRemove = allCards.enemyCards.indexOf(cardObject);

                            stage.removeChild(cardObject.cardContainer);
                            allCards.enemyCards.splice(indexToRemove, 1);
                            localStorage.setItem('hasToPlaceCard', 'true');

                            cardController.arrangeEnemyCardsOnField();
                        }

                        if (cardObject.healthStat) {
                            cardObject.healthStat.text = cardObject.health;
                        }

                        if (cardObject.isAvatar) {
                            statsController.updateEnemyHealth(cardObject.health < 0 ? 0 : cardObject.health);
                        }

                        endGame.checkForEndGame(playerAvatars, allCards);

                        localStorage.playerDamageDealt = Number(localStorage.playerDamageDealt) + Number(attacker.attack);
                    }
                } else {
                    cardObject.isJustPlaced = false;
                }

                playerAvatars[1].mana = 10;
                statsController.updateEnemyMana(10);
            }

            function initializeAttackEvent(event, playerCards) {
                let cardId = this.cardId,
                    cardObject = playerCards.filter(obj => obj.cardId === cardId)[0];

                if (cardObject.isPlayerCard && cardObject.isPlaced) {
                    localStorage.canAttack = 'true';
                    localStorage.attackerId = cardObject.cardId;
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
                        attackEnemyCardEvent.call(this, event, enemyCards, playerCards, stage, playerAvatars, allCards);
                    });
                }
            }

            return {
                attachAttackEnemyCardEvents: attachAttackEnemyCardEvents
            };
        });
} ());