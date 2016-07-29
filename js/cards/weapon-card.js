(function () {
    'use strict';

    define(['card'], function (Card) {
        function WeaponCard(mana, imgUrl, cardType, ability) {
            Card.call(this, undefined, undefined, mana, imgUrl, cardType, ability);
        }

        WeaponCard.prototype = Object.create(Card.prototype);

        return WeaponCard;
    });
} ());