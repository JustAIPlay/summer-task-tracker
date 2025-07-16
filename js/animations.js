// ==================== 动画管理模块 ====================

/**
 * 动画管理类
 */
class AnimationManager {
    constructor() {
        this.injectAnimationStyles();
    }

    /**
     * 播放打卡成功动画
     * @param {HTMLElement} element - 目标元素
     */
    playCheckSuccessAnimation(element) {
        if (!element) return;
        
        element.classList.add('check-success');
        
        setTimeout(() => {
            element.classList.remove('check-success');
        }, CONFIG.ANIMATIONS.CHECK_SUCCESS_DURATION);
    }

    /**
     * 创建宝石飞行动画
     * @param {HTMLElement} sourceElement - 源元素
     */
    createGemFlyAnimation(sourceElement) {
        if (!sourceElement) return;
        
        const gem = document.createElement('div');
        gem.innerHTML = '💎';
        gem.className = 'gem-fly';
        
        const rect = sourceElement.getBoundingClientRect();
        gem.style.left = rect.left + rect.width / 2 + 'px';
        gem.style.top = rect.top + rect.height / 2 + 'px';
        gem.style.fontSize = '2em';
        
        document.body.appendChild(gem);
        
        setTimeout(() => {
            if (document.body.contains(gem)) {
                document.body.removeChild(gem);
            }
        }, CONFIG.ANIMATIONS.GEM_FLY_DURATION);
    }

    /**
     * 显示奖励文字通知
     * @param {number} reward - 奖励数量
     * @param {HTMLElement} sourceElement - 源元素
     */
    showRewardTextNotification(reward, sourceElement) {
        if (!sourceElement) return;
        
        const notification = document.createElement('div');
        notification.textContent = `+${reward} 💎`;
        notification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 105, 180, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-size: 1.2em;
            font-weight: bold;
            z-index: 1000;
            animation: fadeInOut 2s ease-out;
            pointer-events: none;
            box-shadow: 0 4px 20px rgba(255, 105, 180, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, CONFIG.ANIMATIONS.REWARD_NOTIFICATION_DURATION);
    }

    /**
     * 显示庆祝动画（所有任务完成时）
     */
    showCelebration() {
        // 创建多个庆祝元素
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createCelebrationElement();
            }, i * CONFIG.ANIMATIONS.CELEBRATION_DELAY);
        }
    }

    /**
     * 创建庆祝元素
     */
    createCelebrationElement() {
        const celebration = document.createElement('div');
        celebration.innerHTML = '🎉';
        celebration.style.cssText = `
            position: fixed;
            font-size: 3em;
            z-index: 1000;
            left: ${Math.random() * 100}%;
            top: -50px;
            animation: fall 3s ease-out;
            pointer-events: none;
        `;
        
        document.body.appendChild(celebration);
        
        setTimeout(() => {
            if (document.body.contains(celebration)) {
                document.body.removeChild(celebration);
            }
        }, CONFIG.ANIMATIONS.CELEBRATION_DURATION);
    }

    /**
     * 播放淡入动画
     * @param {HTMLElement} element - 目标元素
     */
    fadeIn(element) {
        if (!element) return;
        
        element.classList.add('fade-in');
        
        setTimeout(() => {
            element.classList.remove('fade-in');
        }, 500);
    }

    /**
     * 播放淡出动画
     * @param {HTMLElement} element - 目标元素
     * @param {Function} callback - 动画完成后的回调函数
     */
    fadeOut(element, callback) {
        if (!element) return;
        
        element.classList.add('fade-out');
        
        setTimeout(() => {
            element.classList.remove('fade-out');
            if (callback && typeof callback === 'function') {
                callback();
            }
        }, 500);
    }

    /**
     * 播放缩放动画
     * @param {HTMLElement} element - 目标元素
     * @param {number} scale - 缩放比例
     * @param {number} duration - 动画持续时间（毫秒）
     */
    playScaleAnimation(element, scale = 1.1, duration = 300) {
        if (!element) return;
        
        const originalTransform = element.style.transform;
        
        element.style.transition = `transform ${duration}ms ease`;
        element.style.transform = `scale(${scale})`;
        
        setTimeout(() => {
            element.style.transform = originalTransform;
            
            setTimeout(() => {
                element.style.transition = '';
            }, duration);
        }, duration);
    }

    /**
     * 播放摇摆动画
     * @param {HTMLElement} element - 目标元素
     */
    playShakeAnimation(element) {
        if (!element) return;
        
        const keyframes = [
            { transform: 'translateX(0)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(-10px)' },
            { transform: 'translateX(10px)' },
            { transform: 'translateX(0)' }
        ];
        
        const options = {
            duration: 500,
            easing: 'ease-in-out'
        };
        
        element.animate(keyframes, options);
    }

    /**
     * 播放弹跳动画
     * @param {HTMLElement} element - 目标元素
     */
    playBounceAnimation(element) {
        if (!element) return;
        
        const keyframes = [
            { transform: 'translateY(0)' },
            { transform: 'translateY(-20px)' },
            { transform: 'translateY(0)' },
            { transform: 'translateY(-10px)' },
            { transform: 'translateY(0)' }
        ];
        
        const options = {
            duration: 600,
            easing: 'ease-out'
        };
        
        element.animate(keyframes, options);
    }

    /**
     * 创建粒子效果
     * @param {HTMLElement} sourceElement - 源元素
     * @param {string} particle - 粒子内容
     * @param {number} count - 粒子数量
     */
    createParticleEffect(sourceElement, particle = '✨', count = 8) {
        if (!sourceElement) return;
        
        const rect = sourceElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < count; i++) {
            const particleElement = document.createElement('div');
            particleElement.innerHTML = particle;
            particleElement.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: 1.5em;
                z-index: 1000;
                pointer-events: none;
                animation: particleFloat 1.5s ease-out forwards;
            `;
            
            // 随机方向
            const angle = (360 / count) * i;
            const distance = 50 + Math.random() * 50;
            const endX = centerX + Math.cos(angle * Math.PI / 180) * distance;
            const endY = centerY + Math.sin(angle * Math.PI / 180) * distance;
            
            particleElement.style.setProperty('--end-x', `${endX - centerX}px`);
            particleElement.style.setProperty('--end-y', `${endY - centerY}px`);
            
            document.body.appendChild(particleElement);
            
            setTimeout(() => {
                if (document.body.contains(particleElement)) {
                    document.body.removeChild(particleElement);
                }
            }, 1500);
        }
    }

    /**
     * 动态添加CSS动画样式
     */
    injectAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(360deg);
                    opacity: 0;
                }
            }
            
            @keyframes particleFloat {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--end-x), var(--end-y)) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * 防抖函数
     * @param {Function} func - 要防抖的函数
     * @param {number} wait - 等待时间（毫秒）
     * @returns {Function} 防抖后的函数
     */
    debounce(func, wait = CONFIG.DEBOUNCE_DELAY) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// 创建全局动画管理实例
const animationManager = new AnimationManager();

// 导出到全局作用域
window.AnimationManager = AnimationManager;
window.animationManager = animationManager;