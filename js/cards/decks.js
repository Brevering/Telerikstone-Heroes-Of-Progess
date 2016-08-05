(function () {
    'use strict';

    define(['minionCard', 'weaponCard'], function (MinionCard, WeaponCard) {
        function getStandartDeck(isPLayerCard) {
            let standartDeck = [
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/atacata.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/catinbath.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/darkulesku.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/fleavil.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/grr.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/gryphonius.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/insaneous.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/merlock.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/murrrdor.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/pureevil.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/sphynxatto.png', isPLayerCard, 'normal'),
                new MinionCard(getRandomStats()[0], getRandomStats()[1], getRandomStats()[2], 'images/cards/Team-Crazy-Cat/wooki.png', isPLayerCard, 'normal')
            ];

            return standartDeck;
        }

        function getRandomValue() {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9][Math.floor(Math.random() * 9)];
        }

        function getRandomStats() {
            let attack = getRandomValue(),
                mana = getRandomValue(),
                health = getRandomValue();

            return [attack, mana, health];
        }

        function getDeck(trainerDeck, isPlayerCard) {
            let newDeck = trainerDeck.slice(0, 3),
                standartDeck = getStandartDeck(isPlayerCard),
                used = [];

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
                    new MinionCard(6, 3, 9, 'images/cuki-deck/avl-tree.png', isPlayerCard, 'stealAttac'),
                    new MinionCard(9, 3, 7, 'images/cuki-deck/CukiStealHealth.png', isPlayerCard, 'stealEnemyHealth'),
                    new MinionCard(3, 4, 6, 'images/cuki-deck/recursion.png', isPlayerCard, 'stealMana'),
                    new MinionCard(1, 3, 4, 'images/cuki-deck/ninja.png', isPlayerCard, 'stealMana')
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
}());