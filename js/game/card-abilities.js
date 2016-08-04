(function () {
    'use strict';

    define(['Pixi', 'globalValues', 'cardCreator'], function (PIXI, globalValues, cardCreator) {
        let widthOnePercent = globalValues.widthOnePercent;
        let heightOnePercent = globalValues.heightOnePercent;

        function stealFromEnemyHealth(attacker, playerAvatars) {
            let playerHealth = Number(localStorage.getItem('playerHealth'));
            let enemyHealth = Number(localStorage.getItem('enemyHealth'));
            let healthToSteal = attacker.attack;
            let avatar;

            if (attacker.isPlayerCard) {
                enemyHealth -= healthToSteal;
                playerHealth += healthToSteal;
                avatar = playerAvatars[1];
            } else {
                enemyHealth += healthToSteal;
                playerHealth -= healthToSteal;
                avatar = playerAvatars[0];
            }

            localStorage.setItem('playerHealth', playerHealth);
            localStorage.setItem('enemyHealth', enemyHealth);

            cardCreator.performStealHealthFromPlayerAnimation({sprite: playerAvatars[0]}, {sprite: avatar}, healthToSteal);
        }

        function stealManaFromEnemyPlayer(attacker, avatars) {
            let playerMana = Number(localStorage.getItem('playerMana'));
            let enemyMana = Number(localStorage.getItem('enemyMana'));
            let manaToSteal = Math.round(attacker.mana / 2);
            let avatar;

            if (attacker.isPlayerCard) {
                localStorage.setItem('playerMana', playerMana + manaToSteal);
                localStorage.setItem('enemyMana', enemyMana - manaToSteal);
                avatar = avatars[1];
            } else {
                localStorage.setItem('playerMana', playerMana - manaToSteal);
                localStorage.setItem('enemyMana', enemyMana + manaToSteal);
                avatar = avatars[0];
            }

            cardCreator.performStealManaFromCardAnimation(attacker, avatar, manaToSteal);
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