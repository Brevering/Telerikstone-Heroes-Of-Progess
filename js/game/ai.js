(function () {
    'use strict';

    define(['cardCreator', 'cardAbilities', 'Pixi', 'endGame', 'statsController'],
        function (cardCreator, cardAbilities, PIXI, endGame, statsController) {
            function placeCard(allCards, endTurnButton, avatars) {
                let enemyCards = allCards.enemyCards,
                    hasPlayerPlacedCard = localStorage.hasPlayerPlacedCard;

                if (hasPlayerPlacedCard === 'true') {
                    let placeableCards = allCards.enemyCards.filter(c => !c.isPlaced && c.cardId !== 99),
                        cardToPlace = placeableCards[[Math.floor(Math.random() * placeableCards.length)]],
                        enemyMana = avatars[1].mana,
                        playerMana = avatars[0].mana;

                    if (enemyMana - cardToPlace.mana >= 0) {
                        localStorage.hasPlayerPlacedCard = 'false';
                        cardCreator.placeCard(cardToPlace);
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
                let playerCards = allCards.playerCards;

                if (currentPlacedCard) {
                    if (currentPlacedCard.ability === 'stealEnemyHealth') {
                        cardAbilities.stealFromEnemyHealth(currentPlacedCard, playerAvatars);
                        endGame.checkForEndGame(playerAvatars, allCards);
                    } else if (currentPlacedCard.ability === 'stealMana') {
                        cardAbilities.stealManaFromEnemyPlayer(currentPlacedCard, playerAvatars);
                    } else if (currentPlacedCard.ability === 'normal') {
                        cardCreator.performAttackAnimation(currentPlacedCard, cardToAttack);
                        cardToAttack.health -= currentPlacedCard.attack;

                        if (cardToAttack.health <= 0) {
                            let indexToRemove = allCards.playerCards.indexOf(cardToAttack);

                            stage.removeChild(cardToAttack.cardContainer);
                            allCards.playerCards.splice(indexToRemove, 1);
                            cardCreator.arrangePlayerCardsOnField();
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