(function () {
    'use strict';

    define(['Pixi', 'globalValues', 'cardCreator'], function (PIXI, globalValues, cardCreator) {
        let widthOnePercent = globalValues.widthOnePercent,
            heightOnePercent = globalValues.heightOnePercent;

        function stealFromEnemyHealth(attacker, playerAvatars) {
            let playerHealth = playerAvatars[0].health,
                enemyHealth = playerAvatars[1].health,
                healthToSteal = attacker.attack,
                avatar;

            if (attacker.isPlayerCard) {
                enemyHealth -= healthToSteal;
                playerHealth += healthToSteal;
                avatar = playerAvatars[1];
            } else {
                enemyHealth += healthToSteal;
                playerHealth -= healthToSteal;
                avatar = playerAvatars[0];
            }

            playerAvatars[0].health = playerHealth;
            playerAvatars[1].health = enemyHealth;
            cardCreator.performStealHealthFromPlayerAnimation({sprite: playerAvatars[0]}, {sprite: avatar} , healthToSteal);
        }

        function stealManaFromEnemyPlayer(attacker, avatars) {
            let playerMana = Number(localStorage.getItem('playerMana')),
                enemyMana = Number(localStorage.getItem('enemyMana')),
                manaToSteal = Math.round(attacker.mana / 2),
                avatar;

            if (attacker.isPlayerCard) {
                avatars[0].mana += manaToSteal;
                avatars[1].mana -= manaToSteal;
                avatar = avatars[1];
            } else {
                avatars[0].mana -= manaToSteal;
                avatars[1].mana += manaToSteal;
                avatar = avatars[0];
            }

            cardCreator.performStealManaFromCardAnimation(attacker, {sprite: avatar}, manaToSteal);
        }

        function stealAttackFromEnemyCard(attacker, target, cards) {
            let attackToSteal = Math.round(target.attack / 2);

            if (attackToSteal > 0) {
                let receiver;

                if (attacker.isPlayerCard) {
                    let playerCardsWhichAttack = cards.filter(c => c.ability === 'normal');
                    receiver = playerCardsWhichAttack[Math.floor(Math.random() * playerCardsWhichAttack.length)];
                } else {
                    let enemyCardsWhichAttack = cards.filter(c => c.ability === 'normal');
                    receiver = enemyCardsWhichAttack[Math.floor(Math.random() * enemyCardsWhichAttack.length)];
                }

                receiver.attack += attackToSteal;
                target.attack -= attackToSteal;

                receiver.damageStat.text = receiver.attack;
                target.damageStat.text = target.attack;
            }

            // perform animation
        }

        return {
            stealFromEnemyHealth: stealFromEnemyHealth,
            stealManaFromEnemyPlayer: stealManaFromEnemyPlayer,
            stealAttackFromEnemyCard: stealAttackFromEnemyCard
        };
    });
}());