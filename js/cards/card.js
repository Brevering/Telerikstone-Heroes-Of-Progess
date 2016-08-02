(function () {
    'use strict';

    define([], function () {
        function Card(attack, health, mana, imgUrl, isPlayerCard, ability) {
            this.attack = attack;
            this.health = health;
            this.mana = mana;
            this.imgUrl = imgUrl;
            this.isPlayerCard = isPlayerCard;
            this.ability = ability;
        }

        Card.prototype = {
            get attack() {
                return this._attack;
            },
            set attack(value) {
                this._attack = value;
            },
            get health() {
                return this._health;
            },
            set health(value) {
                this._health = value;
            },
            get mana() {
                return this._mana;
            },
            set mana(value) {
                this._mana = value;
            },
            get imgUrl() {
                return this._imgUrl;
            },
            set imgUrl(value) {
                this._imgUrl = value;
            },
            get isPlayerCard() {
                return this._isPlayerCard;
            },
            set isPlayerCard(value) {
                this._isPlayerCard = value;
            },
            specialAbility() {
                this.ability();
            }
        };

        return Card;
    });
} ());