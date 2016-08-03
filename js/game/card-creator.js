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

                    // add basic properties to the card
                    basicCardInit(cardObject);
                    enemyCardInit(someStage, cardObject);
                    initStats(cardObject);
                    enemyCards.push(cardObject);
                    numberOfEnemyCardsInHand += 1;
                }
            }

            function initStats(cardObject) {
                let healthStat = new PIXI.Text(cardObject.health, {
                    font: 'bold ' + 1.5 * widthOnePercent + 'px Arial',
                    fill: 'black',
                    align: 'center'
                });
                healthStat.x = cardObject.cardSprite.texture.baseTexture.width - 4 * widthOnePercent;
                healthStat.y = cardObject.cardSprite.texture.baseTexture.height - 7 * heightOnePercent;
                cardObject.cardContainer.addChild(healthStat);

                let manaStat = new PIXI.Text(cardObject.mana, {
                    font: 'bold ' + 1.5 * widthOnePercent + 'px Arial',
                    fill: 'black',
                    align: 'center'
                });
                manaStat.x = -cardObject.cardSprite.texture.baseTexture.width + 3.5 * widthOnePercent;
                manaStat.y = -cardObject.cardSprite.texture.baseTexture.height + 5.5 * heightOnePercent;
                cardObject.cardContainer.addChild(manaStat);

                let damageStat = new PIXI.Text(cardObject.attack, {
                    font: 'bold ' + 1.5 * widthOnePercent + 'px Arial',
                    fill: 'black',
                    align: 'center'
                });
                damageStat.x = -cardObject.cardSprite.texture.baseTexture.width + 3.5 * widthOnePercent;
                damageStat.y = cardObject.cardSprite.texture.baseTexture.height - 7 * heightOnePercent;
                cardObject.cardContainer.addChild(damageStat);
            }

            // this adds basic properties to the card
            function basicCardInit(cardObject) {
                // set scales and anchors
                cardObject.cardSprite.anchor.x = 0.5;
                cardObject.cardSprite.anchor.y = 0.5;
                cardObject.cardSprite.width = 10 * widthOnePercent;
                cardObject.cardSprite.height = 20 * heightOnePercent;
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
                let cardInHandTopOffset = 83 * heightOnePercent;
                let cardInHandLeftOffset = numberOfPlayerCardsInHand * 2 * widthOnePercent;

                // add card to the hand
                cardObject.cardContainer.addChild(cardObject.cardSprite);

                stage.addChild(cardObject.cardContainer);

                // play player card intro animation
                // this animation will probably be attached to a button
                TweenLite.to(cardObject.cardContainer, 2, {
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
                let cardInHandTopOffset = 6 * heightOnePercent;
                let cardInHandLeftOffset = numberOfEnemyCardsInHand * 2 * widthOnePercent;

                // add card to the field
                cardObject.cardContainer.addChild(cardObject.cardSprite);
                stage.addChild(cardObject.cardContainer);

                // enemy card intro animation
                TweenLite.to(cardObject.cardContainer, 2, {
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

                    TweenLite.to(cardObject.cardContainer, 1, {
                        pixi: {
                            x: leftOffset,
                            y: 50 * heightOnePercent,
                            scale: 0.8
                        },
                        ease: Expo.easeOut
                    });

                    localStorage.setItem('hasPlayerPlacedCard', 'true');

                    cardObject.isPlaced = true;

                    numberOfPlayerCardsOnTable += 1;
                }
                else if (cardObject.isPlayerCard === false && numberOfEnemyCardsOnTable < 7 && cardObject.isPlaced === false) {
                    let leftOffset = 22 * widthOnePercent + numberOfEnemyCardsOnTable * widthOnePercent * 7;

                    TweenLite.to(cardObject.cardContainer, 1, {
                        pixi: {
                            x: leftOffset,
                            y: 34 * heightOnePercent,
                            scale: 0.8
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

            return {
                initializeCard: initializeCard,
                placeCard: placeCard,
                getPlayersCards: getPlayersCards
            };
        });
} ());