(function () {
    'use strict';

    define(['card'], function (Card) {
        function WeaponCard(mana, imgUrl, isPlayerCard, ability) {
            Card.call(this, undefined, undefined, mana, imgUrl, isPlayerCard, ability);
        }

        WeaponCard.prototype = Object.create(Card.prototype);

        return WeaponCard;
    });
} ());