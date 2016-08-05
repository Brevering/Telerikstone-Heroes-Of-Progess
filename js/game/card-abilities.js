(function () {
    'use strict';

    define(['Pixi', 'globalValues', 'cardCreator'], function (PIXI, globalValues, cardCreator) {
        let widthOnePercent = globalValues.widthOnePercent,
            heightOnePercent = globalValues.heightOnePercent;

        function stealFromEnemyHealth(attacker, playerAvatars) {
            let playerHealth = playerAvatars[0].health,
                enemyHealth = playerAvatars[1].health,
                healthToSteal = attacker.attack,
                avatar,
                enemyAvatar;

            if (attacker.isPlayerCard) {
                enemyHealth -= healthToSteal;
                playerHealth += healthToSteal;
                playerAvatars[0].healthStolen += healthToSteal;
                avatar = playerAvatars[0];
                enemyAvatar = playerAvatars[1];
            } else {
                enemyHealth += healthToSteal;
                playerHealth -= healthToSteal;
                avatar = playerAvatars[1];
                enemyAvatar = playerAvatars[0];
                playerAvatars[1].healthStolen += healthToSteal;
            }

            playerAvatars[0].health = playerHealth;
            playerAvatars[1].health = enemyHealth;
            cardCreator.performStealHealthFromPlayerAnimation(avatar, enemyAvatar, healthToSteal);
        }

        function stealManaFromEnemyPlayer(attacker, avatars) {
            let manaToSteal = Math.round(attacker.mana / 2),
                avatar,
                enemyAvatar;

            if (attacker.isPlayerCard) {
                avatars[0].mana += manaToSteal;
                avatars[0].manaStolen += manaToSteal;
                avatars[1].mana -= manaToSteal;
                avatar = avatars[0];
                enemyAvatar = avatars[1];
            } else {
                avatars[0].mana -= manaToSteal;
                avatars[1].mana += manaToSteal;
                avatars[1].manaStolen += manaToSteal;
                avatar = avatars[1];
                enemyAvatar = avatars[0];
            }

            cardCreator.performStealManaFromCardAnimation(avatar, enemyAvatar, manaToSteal);
        }

        function stealAttackFromEnemyCard(attacker, target, cards) {
            let attackToSteal = Math.round(target.attack / 2);

            if (attackToSteal > 0) {
                let receiver;
                let stealer;

                if (attacker.isPlayerCard) {
                    let playerCardsWhichAttack = cards.filter(c => c.ability === 'normal');
                    receiver = playerCardsWhichAttack[Math.floor(Math.random() * playerCardsWhichAttack.length)];
                    stealer = 'player';
                } else {
                    let enemyCardsWhichAttack = cards.filter(c => c.ability === 'normal');
                    receiver = enemyCardsWhichAttack[Math.floor(Math.random() * enemyCardsWhichAttack.length)];
                    stealer = 'enemy';
                }

                receiver.attack += attackToSteal;
                target.attack -= attackToSteal;

                receiver.damageStat.text = receiver.attack;
                target.damageStat.text = target.attack;

                if(stealer === 'player') {
                    let previouslyStolen = Number(localStorage.getItem('playerStolenAttack'));
                    localStorage.setItem('playerStolenAttack', previouslyStolen + attackToSteal);
                } else {
                    let previouslyStolen = Number(localStorage.getItem('enemyStolenAttack'));
                    localStorage.setItem('enemyStolenAttack', previouslyStolen + attackToSteal);
                }
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