(function () {
    'use strict';

    define(['cardController', 'cardAbilities', 'Pixi', 'endGame', 'statsController', 'animator'],
        function (cardController, cardAbilities, PIXI, endGame, statsController, animator) {
            function placeCard(allCards, endTurnButton, avatars) {
                let hasPlayerPlacedCard = localStorage.hasPlayerPlacedCard;

                if (animator.isCardAnimating()) {
                    return;
                }

                if (hasPlayerPlacedCard === 'true') {
                    let placeableCards = allCards.enemyCards.filter(c => !c.isPlaced && c.cardId !== 99),
                        cardToPlace = placeableCards[[Math.floor(Math.random() * placeableCards.length)]],
                        enemyMana = avatars[1].mana;

                    if (enemyMana - cardToPlace.mana >= 0) {
                        localStorage.hasPlayerPlacedCard = 'false';
                        cardController.placeCard(cardToPlace);
                        localStorage.isPlayerTurn = 'true';
                        localStorage.canAttack = 'false';
                        avatars[1].mana -= cardToPlace.mana;
                        avatars[0].mana = 10;

                        statsController.updateEnemyMana(avatars[1].mana);
                        statsController.updatePlayerMana(10);

                        setTimeout(function () {
                            endTurnButton.texture = PIXI.Texture.fromImage('images/buttons/end_turn_bg.png');
                        }, 200);
                    }
                }
            }

            function attackPlayerCard(allCards, stage, endTurnButton, playerAvatars) {
                let placedPlayerCards = allCards.playerCards.filter(c => c.isPlaced);
                let cardToAttack = placedPlayerCards[Math.floor(Math.random() * placedPlayerCards.length)];
                let currentPlacedCard = allCards.enemyCards.filter(c => c.isPlaced && !c.isAvatar)[0];

                if (animator.isCardAnimating()) {
                    return;
                }

                if (currentPlacedCard) {
                    if (currentPlacedCard.ability === 'stealEnemyHealth') {
                        cardAbilities.stealFromEnemyHealth(currentPlacedCard, playerAvatars);
                        endGame.checkForEndGame(playerAvatars, allCards);
                    } else if (currentPlacedCard.ability === 'stealMana') {
                        cardAbilities.stealManaFromEnemyPlayer(currentPlacedCard, playerAvatars);
                    } else if (currentPlacedCard.ability === 'normal') {
                        cardController.performAttackAnimation(currentPlacedCard, cardToAttack);
                        cardToAttack.health -= currentPlacedCard.attack;

                        if (cardToAttack.health <= 0) {
                            let indexToRemove = allCards.playerCards.indexOf(cardToAttack);

                            stage.removeChild(cardToAttack.cardContainer);
                            allCards.playerCards.splice(indexToRemove, 1);
                            cardController.arrangePlayerCardsOnField();
                        }

                        if (cardToAttack.healthStat) {
                            cardToAttack.healthStat.text = cardToAttack.health;
                        }

                        if (cardToAttack.isAvatar) {
                            statsController.updatePlayerHealth(cardToAttack.health < 0 ? 0 : cardToAttack.health);
                        }

                        endGame.checkForEndGame(playerAvatars, allCards);
                        localStorage.enemyDamageDealt = Number(localStorage.enemyDamageDealt) + Number(currentPlacedCard.attack);
                    }
                } else {
                    placeCard(allCards, endTurnButton);
                }

                setTimeout(function () {
                    endTurnButton.texture = PIXI.Texture.fromImage('images/buttons/end_turn_bg.png');
                }, 200);

                localStorage.isPlayerTurn = 'true';
                playerAvatars[0].mana = 10;
            }

            return {
                placeCard: placeCard,
                attackPlayerCard: attackPlayerCard
            };
        });
} ());