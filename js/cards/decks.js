(function () {
    'use strict';

    define(['minionCard',  'weaponCard'], function (MinionCard,  WeaponCard) {
        function getStandartDeck(isPLayerCard) {
            let standartDeck = [
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/atacata.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/catinbath.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/darkulesku.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/fleavil.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/grr.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/gryphonius.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/insaneous.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/merlock.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/murrrdor.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/pureevil.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/sphynxatto.png', isPLayerCard, function () { }),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/wooki.png', isPLayerCard, function () { })
            ];

            return standartDeck;
        }

        function getRandomValue() {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 10)];
        }

        function getRandomStats() {
            let attack = getRandomValue();
            let mana = getRandomValue();
            let health = getRandomValue();

            return [attack, mana, health];
        }

        function getDeck(trainerDeck, isPlayerCard) {
            let newDeck = trainerDeck.slice(0, 3);
            let standartDeck = getStandartDeck(isPlayerCard);
            let used = [];

            while (newDeck.length !== 10) {
                let standartCardIndex = Math.floor(Math.random() * 10);

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
            getCukiDeck(isPlayerCard) {
                let cukiSpecialCards = [
                    new MinionCard(6, 3, 9, 'images/cuki-deck/avl-tree.png', isPlayerCard),
                    new WeaponCard(9, 'images/cuki-deck/CukiStealHealth.png', isPlayerCard),
                    new WeaponCard(6, 'images/cuki-deck/recursion.png', isPlayerCard),
                    new MinionCard(1, 3, 4, 'images/cuki-deck/ninja.png', isPlayerCard)
                ];

                return getDeck(cukiSpecialCards, isPlayerCard);
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