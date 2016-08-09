(function () {
    'use strict';

    define(['jquery', 'TimelineMax', 'TweenMax', 'Easing', 'CSSPlugin', 'Pixi', 'GreensockPixiPlugin', 'globalValues', 'statsController'],
        function ($, TimelineMax, TweenMax, Easing, CSSPlugin, PIXI, GreensockPixiPlugin, globalValues, statsController) {
            let numberOfPlayerCardsInHand = 0,
                numberOfEnemyCardsInHand = 0,
                numberOfPlayerCardsOnTable = 0,
                numberOfEnemyCardsOnTable = 0,
                playerCards = [],
                enemyCards = [],
                widthOnePercent = globalValues.widthOnePercent,
                heightOnePercent = globalValues.heightOnePercent,
                playerCardAnim = new TimelineMax(),
                enemyCardAnim = new TimelineMax(),
                gameStage;

            function initializeCard(someStage, cardObject, avatars) {
                cardObject.cardContainer = new PIXI.Container();
                cardObject.placedTexture = cardObject.imgUrl.toString();
                cardObject.isPlaced = false;

                // add properties to the card in accordance to the card type (pleayer or enemy card)
                if (cardObject.isPlayerCard === true) {
                    cardObject.cardTexture = PIXI.Texture.fromImage(cardObject.imgUrl);
                    cardObject.sprite = new PIXI.Sprite(cardObject.cardTexture);
                    cardObject.cardId = Number(localStorage.getItem('playerCardId'));
                    cardObject.sprite.cardId = Number(localStorage.getItem('playerCardId'));
                    localStorage.setItem('playerCardId', Number(localStorage.getItem('playerCardId')) + 2);

                    // add basic properties to the card
                    basicCardInit(cardObject);
                    playerCardInit(someStage, cardObject, avatars);
                    initStats(cardObject);
                    playerCards.push(cardObject);
                    numberOfPlayerCardsInHand += 1;
                } else {
                    cardObject.cardTexture = PIXI.Texture.fromImage('images/cards/card_back.png');
                    cardObject.sprite = new PIXI.Sprite(cardObject.cardTexture);
                    cardObject.cardId = Number(localStorage.getItem('enemyCardId'));
                    cardObject.sprite.cardId = Number(localStorage.getItem('enemyCardId'));
                    localStorage.setItem('enemyCardId', Number(localStorage.getItem('enemyCardId')) + 2);

                    // add basic properties to the card
                    basicCardInit(cardObject);
                    enemyCardInit(someStage, cardObject);
                    initStats(cardObject);
                    enemyCards.push(cardObject);
                    numberOfEnemyCardsInHand += 1;
                }
            }

            function initStats(cardObject) {
                let containerWidthPercent = cardObject.sprite.texture.baseTexture.width / 100,
                    containerHeightPercent = cardObject.sprite.texture.baseTexture.height / 100;

                if (cardObject.health) {
                    cardObject.healthStat = new PIXI.Text(cardObject.health, {
                        font: 'bold ' + 100 * containerWidthPercent + 'px Arial',
                        fill: 'white',
                        align: 'center'
                    });
                    cardObject.healthStat.x = 120 * containerWidthPercent;
                    cardObject.healthStat.y = 180 * containerHeightPercent;
                    cardObject.cardContainer.addChild(cardObject.healthStat);
                }

                if (cardObject.mana) {
                    cardObject.manaStat = new PIXI.Text(cardObject.mana, {
                        font: 'bold ' + 5 * widthOnePercent + 'px Arial',
                        fill: 'white',
                        align: 'center'
                    });
                    cardObject.manaStat.x = -(170 * containerWidthPercent);
                    cardObject.manaStat.y = -(250 * containerHeightPercent);
                    cardObject.cardContainer.addChild(cardObject.manaStat);
                }

                if (cardObject.attack) {
                    cardObject.damageStat = new PIXI.Text(cardObject.attack, {
                        font: 'bold ' + 5 * widthOnePercent + 'px Arial',
                        fill: 'white',
                        align: 'center'
                    });
                    cardObject.damageStat.x = -(170 * containerWidthPercent);
                    cardObject.damageStat.y = 180 * containerHeightPercent;
                    cardObject.cardContainer.addChild(cardObject.damageStat);
                }

                if (cardObject.isPlaced === false && cardObject.isPlayerCard === false) {
                    makeStatsInviisible(cardObject);
                }
            }

            function makeStatsVisible(cardObject) {
                if (cardObject.attack) {
                    cardObject.damageStat.visible = true;
                }
                if (cardObject.health) {
                    cardObject.healthStat.visible = true;
                }
                if (cardObject.mana) {
                    cardObject.manaStat.visible = true;
                }
            }

            function makeStatsInviisible(cardObject) {
                if (cardObject.attack) {
                    cardObject.damageStat.visible = false;
                }
                if (cardObject.health) {
                    cardObject.healthStat.visible = false;
                }
                if (cardObject.mana) {
                    cardObject.manaStat.visible = false;
                }
            }

            // this adds basic properties to the card
            function basicCardInit(cardObject) {
                // set scales and anchors
                cardObject.sprite.anchor.x = 0.5;
                cardObject.sprite.anchor.y = 0.5;
                cardObject.cardContainer.scale = { x: 0.05 * heightOnePercent, y: 0.05 * heightOnePercent };
            }

            // this initializes a player card
            function playerCardInit(stage, cardObject, avatars) {
                cardObject.cardContainer.position.x = 80 * widthOnePercent;
                cardObject.cardContainer.position.y = 60 * heightOnePercent;
                cardObject.sprite.interactive = true;

                cardObject.sprite.on('mousedown', function () {
                    let playerMana = avatars[0].mana;

                    if (playerMana - cardObject.mana >= 0) {
                        placeCard(cardObject);
                        avatars[0].mana -= cardObject.mana;
                        avatars[1].mana = 10;

                        statsController.updatePlayerMana(avatars[0].mana);
                    }
                });

                // calculate card in hand offset
                let cardInHandTopOffset = 90 * heightOnePercent,
                    cardInHandLeftOffset = numberOfPlayerCardsInHand * 10 * widthOnePercent;

                // add card to the hand
                cardObject.cardContainer.addChild(cardObject.sprite);
                gameStage = stage;
                stage.addChild(cardObject.cardContainer);

                // play player card intro animation
                // this animation will probably be attached to a button
                playerCardAnim.to(cardObject.cardContainer, 2, {
                    delay: 2,
                    pixi: {
                        x: cardInHandLeftOffset + 13 * widthOnePercent,
                        y: cardInHandTopOffset
                    },
                    ease: Expo.easeOut
                }, 0);
            }

            // this initializes an enemy card
            function enemyCardInit(stage, cardObject) {
                cardObject.cardContainer.position.x = 5 * widthOnePercent;
                cardObject.cardContainer.position.y = 20 * heightOnePercent;

                // calculate card in hand offset
                let cardInHandTopOffset = -5 * heightOnePercent,
                    cardInHandLeftOffset = numberOfEnemyCardsInHand * 3 * widthOnePercent;

                // add card to the field
                cardObject.cardContainer.addChild(cardObject.sprite);
                stage.addChild(cardObject.cardContainer);

                // enemy card intro animation
                enemyCardAnim.to(cardObject.cardContainer, 2, {
                    delay: 2,
                    pixi: {
                        x: cardInHandLeftOffset + 30 * widthOnePercent,
                        y: cardInHandTopOffset
                    },
                    ease: Expo.easeOut,
                }, 0);

                cardObject.sprite.interactive = true;
                cardObject.sprite.on('mousedown', function () {
                    placeCard(cardObject);
                });
            }

            function arrangePlayerCardsOnField() {
                numberOfPlayerCardsOnTable = 0;

                for (let i = 0; i < playerCards.length; i += 1) {
                    let currentCard = playerCards[i];

                    if (currentCard.isPlaced && gameStage.children.indexOf(currentCard.cardContainer) >= 0) {
                        let leftOffset = 22 * widthOnePercent + numberOfPlayerCardsOnTable * widthOnePercent * 7;

                        numberOfPlayerCardsOnTable += 1;
                        TweenMax.to(currentCard.cardContainer, 1, {
                            pixi: {
                                x: leftOffset,
                                y: 50 * heightOnePercent,
                                scale: 0.025 * heightOnePercent
                            },
                            ease: Expo.easeOut
                        });
                    }
                }
            }

            function arrangeEnemyCardsOnField() {
                numberOfEnemyCardsOnTable = 0;

                for (let i = 0; i < enemyCards.length; i += 1) {
                    let currentCard = enemyCards[i];

                    if (currentCard.isPlaced && gameStage.children.indexOf(currentCard.cardContainer) >= 0) {
                        let leftOffset = 22 * widthOnePercent + numberOfEnemyCardsOnTable * widthOnePercent * 7;

                        numberOfEnemyCardsOnTable += 1;
                        TweenMax.to(currentCard.cardContainer, 1, {
                            pixi: {
                                x: leftOffset,
                                y: 34 * heightOnePercent,
                                scale: 0.025 * heightOnePercent
                            },
                            ease: Expo.easeOut
                        });
                    }
                }
            }

            function arrangePlayerCardsInHand() {
                numberOfPlayerCardsInHand = 0;

                for (let i = 0; i < playerCards.length; i += 1) {
                    let currentCard = playerCards[i];

                    if (currentCard.isPlaced === false && gameStage.children.indexOf(currentCard.cardContainer) >= 0) {
                        let cardInHandLeftOffset = numberOfPlayerCardsInHand * 10 * widthOnePercent;

                        numberOfPlayerCardsInHand += 1;
                        TweenMax.to(currentCard.cardContainer, 2, {
                            pixi: {
                                x: cardInHandLeftOffset + 13 * widthOnePercent,
                            },
                            ease: Expo.easeOut
                        }, 0);
                    }
                }
            }

            function arrangeEnemyCardsInHand() {
                numberOfEnemyCardsInHand = 0;

                for (let i = 0; i < enemyCards.length; i += 1) {
                    let currentCard = enemyCards[i];

                    if (currentCard.isPlaced === false && gameStage.children.indexOf(currentCard.cardContainer) >= 0) {
                        let cardInHandLeftOffset = numberOfEnemyCardsInHand * 3 * widthOnePercent;

                        numberOfEnemyCardsInHand += 1;
                        TweenMax.to(currentCard.cardContainer, 2, {
                            pixi: {
                                x: cardInHandLeftOffset + 30 * widthOnePercent
                            },
                            ease: Expo.easeOut,
                        }, 0);
                    }
                }
            }

            // this animates a card placement
            function placeCard(cardObject) {
                if (cardObject.isPlayerCard === true && numberOfPlayerCardsOnTable < 7 && cardObject.isPlaced === false) {
                    let leftOffset = 22 * widthOnePercent + numberOfPlayerCardsOnTable * widthOnePercent * 7;

                    if (localStorage.getItem('isPlayerTurn') === 'true') {
                        cardObject.isPlaced = true;
                        cardObject.isJustPlaced = true;

                        TweenMax.to(cardObject.cardContainer, 1, {
                            pixi: {
                                x: leftOffset,
                                y: 50 * heightOnePercent,
                                scale: 0.025 * heightOnePercent
                            },
                            ease: Expo.easeOut,
                        });

                        arrangePlayerCardsInHand();
                        localStorage.setItem('hasPlayerPlacedCard', 'true');
                        numberOfPlayerCardsOnTable += 1;
                        numberOfPlayerCardsInHand -= 1;
                        localStorage.setItem('isPlayerTurn', 'false');
                    }
                }
                else if (cardObject.isPlayerCard === false && numberOfEnemyCardsOnTable < 7 && cardObject.isPlaced === false) {
                    let leftOffset = 22 * widthOnePercent + numberOfEnemyCardsOnTable * widthOnePercent * 7;

                    if (localStorage.getItem('isPlayerTurn') === 'false') {
                        cardObject.isPlaced = true;
                        makeStatsVisible(cardObject);
                        cardObject.isJustPlaced = true;
                        TweenMax.to(cardObject.cardContainer, 1, {
                            pixi: {
                                x: leftOffset,
                                y: 34 * heightOnePercent,
                                scale: 0.025 * heightOnePercent
                            },
                            ease: Expo.easeOut
                        });

                        arrangeEnemyCardsInHand();
                        cardObject.sprite.texture = new PIXI.Texture.fromImage(cardObject.placedTexture);
                        numberOfEnemyCardsOnTable += 1;
                        localStorage.setItem('isPlayerTurn', 'true');
                    }
                }
            }

            function getPlayersCards() {
                return {
                    enemyCards: enemyCards,
                    playerCards: playerCards
                };
            }

            function performAttackAnimation(fromCard, toCard) {
                if (fromCard && toCard) {
                    let startX = fromCard.cardContainer.x,
                        startY = fromCard.cardContainer.y,
                        animation = new TimelineMax(),
                        destinationX,
                        destinationY;

                    if (toCard.isAvatar && toCard.isPlayerCard === false) {
                        destinationX = toCard.sprite.position.x * 1.1;
                        destinationY = toCard.sprite.position.y * 2.5;
                        gameStage.removeChild(fromCard.cardContainer);
                        gameStage.addChildAt(fromCard.cardContainer, gameStage.children.length - 1);
                    }
                    else if (toCard.isAvatar && toCard.isPlayerCard === true) {
                        destinationX = toCard.sprite.position.x * 1.1;
                        destinationY = toCard.sprite.position.y;
                        gameStage.removeChild(fromCard.cardContainer);
                        gameStage.addChildAt(fromCard.cardContainer, gameStage.children.length - 1);
                    }
                    else {
                        destinationX = toCard.cardContainer.x;
                        destinationY = toCard.cardContainer.y;
                    }

                    animation
                        .to(fromCard.cardContainer, 0.5, {
                            x: destinationX,
                            y: destinationY
                        })
                        .to(fromCard.cardContainer, 0.5, {
                            x: startX,
                            y: startY
                        });
                }
            }

            function performStealHealthFromPlayerAnimation(attacker, target, healthToSteal) {
                let stealImage = 'images/effects/healthSteal.png',
                    leftOffset = 0.263,
                    textSize = 10,
                    spriteScale = 0.03,
                    textLeftOffset = 6.5,
                    textTopOffset = 1.1;

                performStealAnim(
                    attacker,
                    target,
                    healthToSteal,
                    stealImage,
                    leftOffset,
                    textSize,
                    spriteScale,
                    textLeftOffset,
                    textTopOffset)
            }

            function performStealManaFromCardAnimation(attacker, target, manaToSteal) {
                let stealImage = 'images/effects/manaSteal.png',
                    leftOffset = 0.25,
                    textSize = 10,
                    spriteScale = 0.15,
                    textLeftOffset = 17,
                    textTopOffset = 9;

                performStealAnim(
                    attacker,
                    target,
                    manaToSteal,
                    stealImage,
                    leftOffset,
                    textSize,
                    spriteScale,
                    textLeftOffset,
                    textTopOffset);
            }

            function performStealAnim(
                attacker,
                target,
                valueToSteal,
                stealImage,
                leftOffset,
                textSize,
                spriteScale,
                textLeftOffset,
                textTopOffset) {
                leftOffset = leftOffset || 1;

                let spotContainer = new PIXI.Container(),
                    spotTexture = PIXI.Texture.fromImage(stealImage),
                    spotSprite = new PIXI.Sprite(spotTexture),
                    widthPercent = attacker.sprite.texture.baseTexture.width / 100,
                    heightPercent = attacker.sprite.texture.baseTexture.height / 100;

                spotContainer.x = target.sprite.x * widthPercent * leftOffset;
                spotContainer.y = target.sprite.y;

                let spotText = new PIXI.Text(valueToSteal, {
                    font: 'bold ' + textSize * heightPercent + 'px Arial',
                    fill: 'white',
                    align: 'center'
                });

                spotText.x = textLeftOffset * widthPercent;
                spotText.y = textTopOffset * heightPercent;

                spotSprite.scale = { x: spriteScale * heightPercent, y: spriteScale * heightPercent };

                spotContainer.addChild(spotSprite);
                spotContainer.addChild(spotText);
                gameStage.addChild(spotContainer);

                let stealAnimation = new TimelineMax({ onComplete: remove });

                stealAnimation.to(spotContainer, 1, {
                    x: attacker.sprite.x * widthPercent * leftOffset,
                    y: attacker.sprite.y
                });

                function remove() {
                    gameStage.removeChild(spotContainer);
                }
            }

            function hoverPlayerCard() {
                for (let i = 0; i < playerCards.length; i += 1) {
                    let currentCard = playerCards[i],
                        normalY = currentCard.cardContainer.y;

                    playerCards[i].sprite.on('mouseover', function () {
                        if (!currentCard.isPlaced && !playerCardAnim.isActive()) {
                            gameStage.removeChild(currentCard.cardContainer);
                            gameStage.addChildAt(currentCard.cardContainer, gameStage.children.length - 1);

                            TweenMax.to(currentCard.cardContainer, 0.5, {
                                pixi: {
                                    y: normalY + 28,
                                    scale: 0.1 * globalValues.heightOnePercent
                                }
                            });
                        }
                    });

                    playerCards[i].sprite.on('mouseout', function () {
                        if (!currentCard.isPlaced && !playerCardAnim.isActive()) {
                            TweenMax.to(currentCard.cardContainer, 0.5, {
                                pixi: {
                                    y: normalY + heightOnePercent * 30,
                                    scale: 0.05 * globalValues.heightOnePercent
                                }
                            });
                        }
                    });
                }
            }

            return {
                initializeCard: initializeCard,
                placeCard: placeCard,
                getPlayersCards: getPlayersCards,
                performAttackAnimation: performAttackAnimation,
                performStealHealthFromPlayerAnimation: performStealHealthFromPlayerAnimation,
                performStealManaFromCardAnimation: performStealManaFromCardAnimation,
                hoverPlayerCard: hoverPlayerCard,
                arrangePlayerCardsOnField: arrangePlayerCardsOnField,
                arrangeEnemyCardsOnField: arrangeEnemyCardsOnField,
            };
        });
} ());