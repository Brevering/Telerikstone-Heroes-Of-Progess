(function () {
    'use strict';

    define(['minionCard', 'powerCard', 'weaponCard'], function (MinionCard, PowerCard, WeaponCard) {
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

        function getRandomValue() {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 10)];
        }

        function getRandomStats() {
            let attack = getRandomValue();
            let mana = getRandomValue();
            let health = getRandomValue();

            return [attack, mana, health];
        }

        function getDeck(trainerDeck) {
            let newDeck = trainerDeck.slice(0, 3);
            let used = [];

            while (newDeck.length !== 10) {
                let standartCardIndex = Math.floor(Math.random() * 11);

                if (used.indexOf(standartCardIndex) === -1) {
                    used.push(standartCardIndex);
                    newDeck.push(standartDeck[standartCardIndex]);
                }
            }

            return newDeck;
        }

        function Deck() {
        }

        Deck.prototype = {
            getCukiDeck() {
                let cukiSpecialCards = [
                    new MinionCard(6, 3, 9, 'images/cards/cuki-deck/avl-tree.png'),
                    new PowerCard(9, 'images/cards/cuki-deck/dynamic-programming.png'),
                    new WeaponCard(6, 'images/cards/cuki-deck/recursion.png'),
                    new MinionCard(1, 3, 4, 'images/cards/cuki-deck/ninja.png')
                ];

                return getDeck(cukiSpecialCards);
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