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
                let healthStat = new PIXI.Text(cardObject.health, {
                    font: 'bold ' + 5 * widthOnePercent + 'px Arial',
                    fill: 'cyan',
                    align: 'center'
                });
                healthStat.x = cardObject.cardContainer.scale.x + 6 * widthOnePercent;
                healthStat.y = cardObject.cardContainer.scale.y + 18 * heightOnePercent;
                cardObject.cardContainer.addChild(healthStat);

                let manaStat = new PIXI.Text(cardObject.mana, {
                    font: 'bold ' + 5 * widthOnePercent + 'px Arial',
                    fill: 'cyan',
                    align: 'center'
                });
                manaStat.x = -cardObject.cardContainer.scale.x - 9 * widthOnePercent;
                manaStat.y = -cardObject.cardContainer.scale.y - 23.5 * heightOnePercent;
                cardObject.cardContainer.addChild(manaStat);

                let damageStat = new PIXI.Text(cardObject.attack, {
                    font: 'bold ' + 5 * widthOnePercent + 'px Arial',
                    fill: 'cyan',
                    align: 'center'
                });
                damageStat.x = -cardObject.cardContainer.scale.x - 9 * widthOnePercent;
                damageStat.y = cardObject.cardContainer.scale.y + 18 * heightOnePercent;
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
                let cardInHandTopOffset = -5 * heightOnePercent;
                let cardInHandLeftOffset = numberOfEnemyCardsInHand * 3 * widthOnePercent;

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
                            scale: 0.025 * heightOnePercent
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

            return {
                initializeCard: initializeCard,
                placeCard: placeCard,
                getPlayersCards: getPlayersCards
            };
        });
}());