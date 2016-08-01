(function () {
    'use strict';

    define(['minionCard'], function (MinionCard) {
        function getRandomValue() {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 3)];
        }

        function getRandomStats() {
            let attack = getRandomValue();
            let mana = getRandomValue();
            let health = getRandomValue();

            return [attack, mana, health];
        }        

        let standartDeck = [
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/atacata.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/catinbath.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/darkulesku.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/fleavil.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/grr.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/gryphonius.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/insaneous.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/merlock.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/murrrdor.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/pureevil.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/sphynxatto.png', 'minion', function () { }),
            new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/wooki.png', 'minion', function () { })
        ];

        function Deck() {
        }

        Deck.prototype = {
            getCukiDeck() {

            },
            getDonchoDeck() {

            },
            getEvlogiDeck() {

            },
            getKoceDeck() {

            }
        };

        return Deck;
    });
} ());