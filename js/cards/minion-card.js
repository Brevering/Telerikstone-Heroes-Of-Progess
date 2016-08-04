(function () {
    'use strict';

    define(['card'], function (Card) {
        function MinionCard(attack, health, mana, imgUrl, isPlayerCard, ability) {
            Card.call(this, attack, health, mana, imgUrl, isPlayerCard, ability);
        }

        MinionCard.prototype = Object.create(Card.prototype);

        return MinionCard;
    });
}());