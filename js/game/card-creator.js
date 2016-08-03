(function () {
    'use strict';

    define(['jquery', 'TimelineMax', 'TweenMax', 'Easing', 'CSSPlugin', 'Pixi', 'GreensockPixiPlugin', 'globalValues'],
        function ($, TimelineMax, TweenMax, Easing, CSSPlugin, Pixi, GreensockPixiPlugin, globalValues) {
            let numberOfPlayerCardsInHand = 0;
            let numberOfEnemyCardsInHand = 0;
            let numberOfPlayerCardsOnTable = 0;
            let numberOfEnemyCardsOnTable = 0;
            let playerCards = [];
            let enemyCards = [];
            let widthOnePercent = globalValues.widthOnePercent;
            let heightOnePercent = globalValues.heightOnePercent;

            function initializeCard(someStage, cardObject) {
                cardObject.cardContainer = new PIXI.Container();
                cardObject.placedTexture = cardObject.imgUrl.toString();
                cardObject.isPlaced = false;

                // add properties to the card in accordance to the card type (pleayer or enemy card)
                if (cardObject.isPlayerCard === true) {
                    cardObject.cardTexture = PIXI.Texture.fromImage(cardObject.imgUrl);
                    cardObject.cardSprite = new PIXI.Sprite(cardObject.cardTexture);
                    cardObject.cardId = Number(localStorage.getItem('playerCardId'));
                    cardObject.cardSprite.cardId = Number(localStorage.getItem('playerCardId'));
                    localStorage.setItem('playerCardId', Number(localStorage.getItem('playerCardId')) + 2);

                    // add basic properties to the card
                    basicCardInit(cardObject);
                    playerCardInit(someStage, cardObject);
                    initStats(cardObject);
                    playerCards.push(cardObject);
                    numberOfPlayerCardsInHand += 1;
                }
                else {
                    cardObject.cardTexture = PIXI.Texture.fromImage('images/cards/card_back.png');
                    cardObject.cardSprite = new PIXI.Sprite(cardObject.cardTexture);
                    cardObject.cardId = Number(localStorage.getItem('enemyCardId'));
                    cardObject.cardSprite.cardId = Number(localStorage.getItem('enemyCardId'));
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
                let containerWidthPercent = cardObject.cardSprite.texture.baseTexture.width / 100;
                let containerHeightPercent = cardObject.cardSprite.texture.baseTexture.height / 100;  

                let healthStat = new PIXI.Text(cardObject.health, {
                    font: 'bold ' + 100 * containerWidthPercent + 'px Arial',
                    fill: 'cyan',
                    align: 'center'
                });
                healthStat.x = 120 * containerWidthPercent;
                healthStat.y = 180 * containerHeightPercent;
                cardObject.cardContainer.addChild(healthStat);

                let manaStat = new PIXI.Text(cardObject.mana, {
                    font: 'bold ' + 5 * widthOnePercent + 'px Arial',
                    fill: 'cyan',
                    align: 'center'
                });
                manaStat.x = -(170 * containerWidthPercent);
                manaStat.y = -(250 * containerHeightPercent);
                cardObject.cardContainer.addChild(manaStat);

                let damageStat = new PIXI.Text(cardObject.attack, {
                    font: 'bold ' + 5 * widthOnePercent + 'px Arial',
                    fill: 'cyan',
                    align: 'center'
                });
                damageStat.x = -(170 * containerWidthPercent);
                damageStat.y = 180 * containerHeightPercent;
                cardObject.cardContainer.addChild(damageStat);
            }

            // this adds basic properties to the card
            function basicCardInit(cardObject) {
                // set scales and anchors
                cardObject.cardSprite.anchor.x = 0.5;
                cardObject.cardSprite.anchor.y = 0.5;
                cardObject.cardContainer.scale = {x: 0.05 * heightOnePercent, y: 0.05 * heightOnePercent};
            }

            // this initializes a player card
            function playerCardInit(stage, cardObject) {
                cardObject.cardContainer.position.x = 40 * widthOnePercent;
                cardObject.cardContainer.position.y = 60 * heightOnePercent;

                cardObject.cardSprite.interactive = true;
                cardObject.cardSprite.on('mousedown', function () {
                    placeCard(cardObject);
                });

                // calculate card in hand offset
                let cardInHandTopOffset = 90 * heightOnePercent;
                let cardInHandLeftOffset = numberOfPlayerCardsInHand * 3 * widthOnePercent;

                // add card to the hand
                cardObject.cardContainer.addChild(cardObject.cardSprite);

                stage.addChild(cardObject.cardContainer);

                // play player card intro animation
                // this animation will probably be attached to a button
                TweenMax.to(cardObject.cardContainer, 2, {
                    delay: 2,
                    pixi: {
                        x: cardInHandLeftOffset + 30 * widthOnePercent,
                        y: cardInHandTopOffset
                    },
                    ease: Expo.easeOut
                });
            }

            // this initializes an enemy card
            function enemyCardInit(stage, cardObject) {
                cardObject.cardContainer.position.x = 40 * widthOnePercent;
                cardObject.cardContainer.position.y = 20 * heightOnePercent;

                // calculate card in hand offset
                let cardInHandTopOffset = -5 * heightOnePercent;
                let cardInHandLeftOffset = numberOfEnemyCardsInHand * 3 * widthOnePercent;

                // add card to the field
                cardObject.cardContainer.addChild(cardObject.cardSprite);
                stage.addChild(cardObject.cardContainer);

                // enemy card intro animation
                TweenMax.to(cardObject.cardContainer, 2, {
                    delay: 2,
                    pixi: {
                        x: cardInHandLeftOffset + 30 * widthOnePercent,
                        y: cardInHandTopOffset
                    },
                    ease: Expo.easeOut
                });

                cardObject.cardSprite.interactive = true;
                cardObject.cardSprite.on('mousedown', function () {
                    placeCard(cardObject);
                });
            }

            // this animates a card placement
            function placeCard(cardObject) {
                if (cardObject.isPlayerCard === true && numberOfPlayerCardsOnTable < 7 && cardObject.isPlaced === false) {
                    let leftOffset = 22 * widthOnePercent + numberOfPlayerCardsOnTable * widthOnePercent * 7;

                    if (localStorage.getItem('isPlayerTurn') === 'true') {
                        cardObject.isJustPlaced = true;
                        TweenMax.to(cardObject.cardContainer, 1, {
                            pixi: {
                                x: leftOffset,
                                y: 50 * heightOnePercent,
                                scale: 0.025 * heightOnePercent
                            },
                            ease: Expo.easeOut
                        });

                        localStorage.setItem('hasPlayerPlacedCard', 'true');

                        cardObject.isPlaced = true;
                        numberOfPlayerCardsOnTable += 1;
                        localStorage.setItem('isPlayerTurn', 'false');
                    }
                }
                else if (cardObject.isPlayerCard === false && numberOfEnemyCardsOnTable < 7 && cardObject.isPlaced === false) {
                    let leftOffset = 22 * widthOnePercent + numberOfEnemyCardsOnTable * widthOnePercent * 7;

                    cardObject.isJustPlaced = true;
                    TweenMax.to(cardObject.cardContainer, 1, {
                        pixi: {
                            x: leftOffset,
                            y: 34 * heightOnePercent,
                            scale: 0.025 * heightOnePercent
                        },
                        ease: Expo.easeOut
                    });

                    cardObject.cardSprite.texture = new PIXI.Texture.fromImage(cardObject.placedTexture);

                    cardObject.isPlaced = true;

                    numberOfEnemyCardsOnTable += 1;
                }
            }

            function getPlayersCards() {
                return {
                    enemyCards: enemyCards,
                    playerCards: playerCards
                };
            }

            function performAttackAnimation(fromCard, toCard) {
                let startX = fromCard.cardContainer.x;
                let startY = fromCard.cardContainer.y;
                let destinationX = toCard.cardContainer.x;
                let destinationY = toCard.cardContainer.y;

                TweenMax.to(fromCard, 1.5, {
                    x: destinationX,
                    y: destinationY,
                    repeat: 1
                });
            }

            return {
                initializeCard: initializeCard,
                placeCard: placeCard,
                getPlayersCards: getPlayersCards,
                performAttackAnimation: performAttackAnimation
            };
        });
}());