(function () {
    'use strict';

    define(['TimelineMax', 'TweenMax', 'Easing', 'CSSPlugin', 'Pixi', 'GreensockPixiPlugin', 'globalValues'],
        function (TimelineMax, TweenMax, Easing, CSSPlugin, PIXI, GreensockPixiPlugin, globalValues) {
            let widthOnePercent = globalValues.widthOnePercent,
                heightOnePercent = globalValues.heightOnePercent,
                playerCardAnim = new TimelineMax(),
                enemyCardAnim = new TimelineMax();

            function playPlayerCardInitAnimation(container, numberOfPlayerCardsInHand) {
                container.position.x = 80 * widthOnePercent;
                container.position.y = 60 * heightOnePercent;

                let cardInHandTopOffset = 90 * heightOnePercent,
                    cardInHandLeftOffset = numberOfPlayerCardsInHand * 10 * widthOnePercent;

                playerCardAnim.to(container, 2, {
                    delay: 2,
                    pixi: {
                        x: cardInHandLeftOffset + 13 * widthOnePercent,
                        y: cardInHandTopOffset
                    },
                    ease: Expo.easeOut
                }, 0);
            }

            function playEnemyCardInitAnimation(container, numberOfEnemyCardsInHand) {
                container.position.x = 5 * widthOnePercent;
                container.position.y = 20 * heightOnePercent;

                let cardInHandTopOffset = -5 * heightOnePercent,
                    cardInHandLeftOffset = numberOfEnemyCardsInHand * 3 * widthOnePercent;

                enemyCardAnim.to(container, 2, {
                    delay: 2,
                    pixi: {
                        x: cardInHandLeftOffset + 30 * widthOnePercent,
                        y: cardInHandTopOffset
                    },
                    ease: Expo.easeOut,
                }, 0);
            }

            function playRepositioningOfPlayerCardOnTableAnimation(container, numberOfPlayerCardsOnTable) {
                let leftOffset = 22 * widthOnePercent + numberOfPlayerCardsOnTable * widthOnePercent * 7;

                TweenMax.to(container, 1, {
                    pixi: {
                        x: leftOffset,
                        y: 50 * heightOnePercent,
                        scale: 0.025 * heightOnePercent
                    },
                    ease: Expo.easeOut
                });
            }

            function playRepositioningOfEnemyCardOnTableAnimation(container, numberOfEnemyCardsOnTable) {
                let leftOffset = 22 * widthOnePercent + numberOfEnemyCardsOnTable * widthOnePercent * 7;

                TweenMax.to(container, 1, {
                    pixi: {
                        x: leftOffset,
                        y: 34 * heightOnePercent,
                        scale: 0.025 * heightOnePercent
                    },
                    ease: Expo.easeOut
                });
            }

            function playRepositioningOfPlayerCardInHandAnimation(container, numberOfPlayerCardsInHand) {
                let cardInHandLeftOffset = numberOfPlayerCardsInHand * 10 * widthOnePercent;

                TweenMax.to(container, 2, {
                    pixi: {
                        x: cardInHandLeftOffset + 13 * widthOnePercent,
                    },
                    ease: Expo.easeOut
                }, 0);
            }

            function playRepositioningOfEnemyCardInHandAnimation(container, numberOfEnemyCardsInHand) {
                let cardInHandLeftOffset = numberOfEnemyCardsInHand * 3 * widthOnePercent;

                TweenMax.to(container, 2, {
                    pixi: {
                        x: cardInHandLeftOffset + 30 * widthOnePercent
                    },
                    ease: Expo.easeOut,
                }, 0);
            }

            function playPlayerCardPlacementAnimation(container, numberOfPlayerCardsOnTable) {
                let leftOffset = 22 * widthOnePercent + numberOfPlayerCardsOnTable * widthOnePercent * 7;

                playerCardAnim.to(container, 1, {
                    pixi: {
                        x: leftOffset,
                        y: 50 * heightOnePercent,
                        scale: 0.025 * heightOnePercent
                    },
                    ease: Expo.easeOut,
                });
            }

            function playEnemyCardPlacementAnimation(container, numberOfEnemyCardsOnTable) {
                let leftOffset = 22 * widthOnePercent + numberOfEnemyCardsOnTable * widthOnePercent * 7;

                enemyCardAnim.to(container, 1, {
                    pixi: {
                        x: 43 * widthOnePercent,
                        y: 40 * heightOnePercent,
                        scale: 0.1 * heightOnePercent
                    },
                    ease: Expo.easeOut
                    })
                    .to(container, 1, {
                        delay: 1,
                        pixi: {
                            x: leftOffset,
                            y: 34 * heightOnePercent,
                            scale: 0.025 * heightOnePercent
                        },
                        ease: Expo.easeOut
                    });
            }

            function playAttackAnimation(container, startX, startY, destinationX, destinationY) {
                let animation = new TimelineMax();

                animation
                    .to(container, 0.5, {
                        x: destinationX,
                        y: destinationY
                    })
                    .to(container, 0.5, {
                        x: startX,
                        y: startY
                    });
            }

            function playStealAnimation(spotContainer, fromX, fromY, toX, toY, spotLeftOffset, widthPercent, onCompleteFunc) {
                spotLeftOffset = spotLeftOffset || 1;

                spotContainer.x = fromX * widthPercent * spotLeftOffset;
                spotContainer.y = fromY;

                let stealAnimation = new TimelineMax({onComplete: onCompleteFunc});

                stealAnimation.to(spotContainer, 1, {
                    x: toX * widthPercent * spotLeftOffset,
                    y: toY
                });
            }

            function playHoverOverAnimation(container, normalY) {
                if (!TweenMax.isTweening(container)) {
                    TweenMax.to(container, 0.5, {
                        pixi: {
                            y: normalY + 28,
                            scale: 0.1 * globalValues.heightOnePercent
                        }
                    });
                }
            }

            function playHoverOutAnimation(container, normalY) {
                TweenMax.to(container, 0.5, {
                    pixi: {
                        y: normalY + heightOnePercent * 30,
                        scale: 0.05 * globalValues.heightOnePercent
                    }
                });
            }

            function isCardAnimating() {
                return playerCardAnim.isActive() && enemyCardAnim.isActive();
            }

            return {
                playPlayerCardInitAnimation: playPlayerCardInitAnimation,
                playEnemyCardInitAnimation: playEnemyCardInitAnimation,
                playRepositioningOfPlayerCardOnTableAnimation: playRepositioningOfPlayerCardOnTableAnimation,
                playRepositioningOfEnemyCardOnTableAnimation: playRepositioningOfEnemyCardOnTableAnimation,
                playRepositioningOfPlayerCardInHandAnimation: playRepositioningOfPlayerCardInHandAnimation,
                playRepositioningOfEnemyCardInHandAnimation: playRepositioningOfEnemyCardInHandAnimation,
                playPlayerCardPlacementAnimation: playPlayerCardPlacementAnimation,
                playEnemyCardPlacementAnimation: playEnemyCardPlacementAnimation,
                playAttackAnimation: playAttackAnimation,
                playStealAnimation: playStealAnimation,
                playHoverOverAnimation: playHoverOverAnimation,
                playHoverOutAnimation: playHoverOutAnimation,
                isCardAnimating: isCardAnimating
            };
        });
}());