(function () {
    'use strict';

    define(['card'], function (Card) {
        function PowerCard(mana, imgUrl, cardType, ability) {
            Card.call(this, undefined, undefined, mana, imgUrl, cardType, ability);
        }

        PowerCard.prototype = Object.create(Card.prototype);

        return PowerCard;
    });
} ());