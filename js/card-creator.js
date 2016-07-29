(function () {
    'use strict';

    define(['jquery', 'TimelineMax', 'TweenMax', 'Easing', 'CSSPlugin'], function ($, TimelineMax, TweenMax, Easing, CSSPlugin) {
        let $card = $('<img>');
        let animation = new TimelineMax();
        let placed = false;
        let isForPlayer;

        function initializeCard(cardHealth, attackDamage, manaCost, cardImageSrc, isPlayerCard) {
            isForPlayer = isPlayerCard;

            $card.attr('alt', 'aCard')
                    .attr('src', `${cardImageSrc}`);
            $card.css({
                position: 'absolute',
                display: 'inline-block',
                width: '10%',
                height: 'auto'
            });

            if (isForPlayer === true) {
                $card.css({
                    top: '5%',
                    left: '0px'
                });
            }
            else {
                $card.css({
                    top: '5%',
                    left: '90%'
                });
            }

            // add card events
            $card.on('click', placeCard);

            $($card).appendTo('#playField');

            // play first animation
            // this animation will probably be attached to a button
            if (isForPlayer === true) {
                animation.to($card, 1, {top: '5%', left: '0%', ease: Easing.Expo.easeOut})
                    .to($card, 2, {top: '80%', left: '35%', rotation: -20, width: '10%', ease: Expo.easeOut});
            }
            else {
                 animation.to($card, 1, {top: '5%', left: '70%', ease: Expo.easeOut})
                    .to($card, 2, {top: '-5%', left: '35%', rotation: 200, width: '10%', ease: Expo.easeOut});
            }
        }
 
        function placeCard() {
            if (animation.isActive() === false && placed === false) {
                placed = true;

                if (isForPlayer === true) {
                    TweenMax.to($card, 1, {width: '6%', left: '25%', top: '55%', rotation: 0, ease: Expo.easeOut});
                }
                else {
                    TweenMax.to($card, 1, {width: '6%', left: '25%', top: '35%', rotation: 180, ease: Expo.easeOut});
                }
            }
        }
 
        return {
            initializeCard: initializeCard,
            placeCard: placeCard
        };
    });
} ());