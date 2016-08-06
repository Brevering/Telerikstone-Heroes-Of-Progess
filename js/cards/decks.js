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

            while (newDeck.length !== 7) {
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
                    new MinionCard(6, 3, 9, 'images/cuki-deck/avl-tree.png', isPlayerCard, 'stealEnemyHealth'),
                    new MinionCard(9, 3, 7, 'images/cuki-deck/CukiStealHealth.png', isPlayerCard, 'stealEnemyHealth'),
                    new MinionCard(3, 4, 6, 'images/cuki-deck/recursion.png', isPlayerCard, 'stealMana')
                ];

                return getDeck(cukiSpecialCards, isPlayerCard);
            },
            getDonchoDeck(isPlayerCard) {
                let donchoSpecialCards = [
                    new MinionCard(4, 7, 4, 'images/doncho-deck/DonchoStealCardHealth.png', isPlayerCard, 'stealEnemyHealth'),
                    new MinionCard(5, 6, 7, 'images/doncho-deck/DonchoStealHealth.png', isPlayerCard, 'stealEnemyHealth'),
                    new MinionCard(5, 5, 4, 'images/doncho-deck/DonchoStealCardMana.png', isPlayerCard, 'stealMana')
                ];

                return getDeck(donchoSpecialCards, isPlayerCard);
            },
            getEvlogiDeck(isPlayerCard) {
                let koceSpecialCards = [
                    new MinionCard(5, 3, 6, 'images/koce-deck/KocetoStealCardHealth.png', isPlayerCard, 'stealEnemyHealth'),
                    new MinionCard(3, 6, 3, 'images/koce-deck/KocetoStealHealth.png', isPlayerCard, 'stealEnemyHealth'),
                    new MinionCard(4, 3, 6, 'images/koce-deck/KocetoStealMana.png', isPlayerCard, 'stealMana'),
                ];

                return getDeck(koceSpecialCards, isPlayerCard);
            },
            getKoceDeck(isPlayerCard) {
                let koceSpecialCards = [
                    new MinionCard(5, 3, 6, 'images/koce-deck/KocetoStealCardHealth.png', isPlayerCard, 'stealEnemyHealth'),
                    new MinionCard(3, 6, 3, 'images/koce-deck/KocetoStealHealth.png', isPlayerCard, 'stealEnemyHealth'),
                    new MinionCard(4, 3, 6, 'images/koce-deck/KocetoStealMana.png', isPlayerCard, 'stealMana'),
                ];

                return getDeck(koceSpecialCards, isPlayerCard);
            }
        };

        return Deck;
    });
}());