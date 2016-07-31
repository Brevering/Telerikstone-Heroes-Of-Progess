(function () {
    'use strict';

    define(['jquery', 'TimelineMax', 'TweenMax', 'Easing', 'CSSPlugin'], function ($, TimelineMax, TweenMax, Easing, CSSPlugin) {
        function initializeCard(cardImageSrc, isPlayerCard) {
            let $card = $('<img>');

            // add basic properties to the card dom element
            basicCardInit($card);

            // add properties to the card dom element in accordance to the card type (pleayer or enemy card)
            if (isPlayerCard === true) {
                playerCardInit($card, cardImageSrc);
            }
            else {
                enemyCardInit($card);
            }
        }

        // this adds basic properties to the card element
        function basicCardInit($cardDomElement) {
            $cardDomElement.attr('alt', 'aCard');

            $cardDomElement.css({
                position: 'absolute',
                display: 'inline-block',
                width: '10%',
                height: 'auto'
            });
        }

        // this initializes a player card
        function playerCardInit($cardDomElement, cardImageSrc) {
            $cardDomElement.css({
                top: '25%',
                right: '20%',
                width: '15%'
            });

            // add card attributes
            $cardDomElement.attr('class', 'playerCard').attr('src', `${cardImageSrc}`);

            // add card events
            $cardDomElement.on('click', function () {
                placeCard(event.target);
            });

            // calculate card in hand offset
            let numberOfPlayerCardsInHand = $('.playerCard').length;
            let cardInHandLeftOffset = 35 + numberOfPlayerCardsInHand * 2 + '%';
            let cardInHandTopOffset;
            let rotationOfCard = -20 + numberOfPlayerCardsInHand * 5;

            if (numberOfPlayerCardsInHand < 6) {
                cardInHandTopOffset = 80 - numberOfPlayerCardsInHand + 11 + '%';
            }
            else {
                cardInHandTopOffset = 80 + numberOfPlayerCardsInHand + '%';
            }

            // add card to the hand
            $($cardDomElement).appendTo('#playField');

            // play player card intro animation
            // this animation will probably be attached to a button
            TweenMax.to($cardDomElement, 2, { delay: 2, top: cardInHandTopOffset, left: cardInHandLeftOffset, rotation: rotationOfCard, width: '10%', ease: Expo.easeOut });
        }

        // this initializes an enemy card
        function enemyCardInit($cardDomElement) {
            $cardDomElement.css({
                top: '-40%',
                left: '35%'
            });

            // add card attributes
            $cardDomElement.attr('class', 'enemyCard').attr('src', '../images/cards/card_back.png');

            // calculate card in hand offset
            let numberOfEnemyCardsInHand = $('.enemyCard').length;
            let cardInHandLeftOffset = 35 + numberOfEnemyCardsInHand * 2 + '%';
            let cardInHandTopOffset;
            let rotationOfCard = 20 - numberOfEnemyCardsInHand * 5;

            if (numberOfEnemyCardsInHand < 6) {
                cardInHandTopOffset = -22 + numberOfEnemyCardsInHand + '%';
            }
            else {
                cardInHandTopOffset = -22 - numberOfEnemyCardsInHand + 11 + '%';
            }

            // add card to the field
            $($cardDomElement).appendTo('#playField');

            // enemy card intro animation
            TweenMax.to($cardDomElement, 1, { top: cardInHandTopOffset, left: cardInHandLeftOffset, rotation: rotationOfCard, ease: Expo.easeOut });

            // add card events (place the card on the field)
            // this click event will eventually be replaced or removed
            $cardDomElement.on('click', function () {
                placeCard(event.target);
            });
        }

        // this animates a card placement
        function placeCard(someCard) {
            let $someCard = $(someCard);
            let numberOfPlayerCardsInHand = $('.playerCard').length;
            let numberOfEnemyCardsInHand = $('.enemyCard').length;

            if ($someCard.attr('class') === 'playerCard' && $('.placedPlayerCard').length < 7) {
                let leftOffset = 95 - numberOfPlayerCardsInHand * 7 + '%';

                TweenMax.to($someCard, 1, { width: '6%', left: leftOffset, top: '48%', rotation: 0, ease: Expo.easeOut });
                localStorage.setItem('hasPlayerPlacedCard', 'true');

                $someCard.attr('class', 'placedPlayerCard');
            }
            else if ($someCard.attr('class') === 'enemyCard' && $('.placedEnemyCard').length < 7) {
                let leftOffset = 95 - numberOfEnemyCardsInHand * 7 + '%';

                TweenMax.to($someCard, 1, { width: '6%', left: leftOffset, top: '28%', rotation: 0, ease: Expo.easeOut });

                $someCard.attr('src', '../images/cards/cuki_card.png');
                $someCard.attr('class', 'placedEnemyCard');
            }
        }

        return {
            initializeCard: initializeCard,
            placeCard: placeCard
        };
    });
} ());