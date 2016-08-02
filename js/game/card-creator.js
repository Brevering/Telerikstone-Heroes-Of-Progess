(function () {
    'use strict';

    define(['jquery', 'TimelineMax', 'TweenMax', 'Easing', 'CSSPlugin', 'Pixi', 'GreensockPixiPlugin', 'globalValues'], 
    function ($, TimelineMax, TweenMax, Easing, CSSPlugin, Pixi, GreensockPixiPlugin, globalValues) {

        let numberOfPlayerCardsInHand = 0;
        let numberOfEnemyCardsInHand = 0;

        function initializeCard(someStage, cardImageSrc, isPlayerCard) {
            let cardTexture = PIXI.Texture.fromImage(cardImageSrc);
            let cardSprite = new PIXI.Sprite(cardTexture);
            let cardContainer = new PIXI.Container();
            // let $card = $('<img>');

            // add basic properties to the card dom element
            basicCardInit(cardSprite);

            // add properties to the card dom element in accordance to the card type (pleayer or enemy card)
            if (isPlayerCard === true) {
                playerCardInit(someStage, cardSprite, cardContainer);

                numberOfPlayerCardsInHand += 1;
            }
            else {
                enemyCardInit(someStage, cardContainer);
            }
        }

        // this adds basic properties to the card element
        function basicCardInit(cardSprite) {
            cardSprite.anchor.x = 0.5;
            cardSprite.anchor.y = 0.5;
            cardSprite.scale = new PIXI.Point(0.5, 0.5);
        }

        // this initializes a player card
        function playerCardInit(stage, cardSprite, cardContainer) {
            cardSprite.position.x = globalValues.canvasWidth / 2 + 500;
            cardSprite.position.y = globalValues.canvasHeight / 2 - 100;

            // add card events
            // $cardDomElement.on('click', function () {
            //     placeCard(event.target);
            // });

            // calculate card in hand offset
            let rotationOfCard;
            let cardInHandTopOffset = globalValues.canvasHeight - 10;
            let cardInHandLeftOffset = 600 + numberOfPlayerCardsInHand * 50;

            // add card to the hand
            cardContainer.addChild(cardSprite);
            stage.addChild(cardContainer);
            
            // play player card intro animation
            // this animation will probably be attached to a button
            TweenLite.to(cardSprite, 2, {delay: 2, x: cardInHandLeftOffset, y: cardInHandTopOffset, ease: Expo.easeOut});
        }

        // this initializes an enemy card
        function enemyCardInit(stage, cardContainer) {
            // set card texture
            let cardTexture = PIXI.Texture.fromImage('images/cards/card_back.png');
            let cardSprite = new PIXI.Sprite(cardTexture);
            
            cardSprite.position.x = globalValues.canvasWidth / 2;
            cardSprite.position.y = globalValues.canvasHeight / 2;

            // calculate card in hand offset
            // let numberOfEnemyCardsInHand = $('.enemyCard').length;
            // let cardInHandLeftOffset = 35 + numberOfEnemyCardsInHand * 2 + '%';
            // let cardInHandTopOffset;
            // let rotationOfCard = 20 - numberOfEnemyCardsInHand * 5;

            // if (numberOfEnemyCardsInHand < 6) {
            //     cardInHandTopOffset = -22 + numberOfEnemyCardsInHand + '%';
            // } else {
            //     cardInHandTopOffset = -22 - numberOfEnemyCardsInHand + 11 + '%';
            // }

            // add card to the field
            cardContainer.addChild(cardSprite);
            stage.addChild(cardContainer);
            // enemy card intro animation
            // TweenMax.to($cardDomElement, 1, { top: cardInHandTopOffset, left: cardInHandLeftOffset, rotation: rotationOfCard, ease: Expo.easeOut });

            // add card events (place the card on the field)
            // this click event will eventually be replaced or removed
            // $cardDomElement.on('click', function () {
            //     placeCard(event.target);
            // });
        }

        // this animates a card placement
        function placeCard(someCard) {
            if ($someCard.attr('class') === 'playerCard' && $('.placedPlayerCard').length < 7) {
                let leftOffset = 95 - numberOfPlayerCardsInHand * 7 + '%';

                TweenMax.to($someCard, 1, { width: '6%', left: leftOffset, top: '48%', rotation: 0, ease: Expo.easeOut });
                localStorage.setItem('hasPlayerPlacedCard', 'true');

                $someCard.attr('class', 'placedPlayerCard');
            }
            else if ($someCard.attr('class') === 'enemyCard' && $('.placedEnemyCard').length < 7) {
                let leftOffset = 95 - numberOfEnemyCardsInHand * 7 + '%';

                TweenMax.to($someCard, 1, { width: '6%', left: leftOffset, top: '28%', rotation: 0, ease: Expo.easeOut });

                $someCard.attr('src', 'images/cards/cuki_card.png');
                $someCard.attr('class', 'placedEnemyCard');
            }
        }

        return {
            initializeCard: initializeCard,
            placeCard: placeCard
        };
    });
} ());