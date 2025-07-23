// ==================== 自由放飞管理模块 ====================

/**
 * 自由放飞管理类
 */
class FreedomManager {
    constructor() {
        this.dataManager = null;
        this.uiManager = null;
        this.animationManager = null;
        this.domElements = {};
        this.initDOMElements();
    }

    /**
     * 初始化DOM元素缓存
     */
    initDOMElements() {
        this.domElements = {
            freedomList: document.getElementById('freedomList'),
            freedomEmptyState: document.getElementById('freedomEmptyState')
        };
    }

    /**
     * 初始化自由放飞管理器
     */
    init() {
        this.dataManager = window.dataManager;
        this.uiManager = window.uiManager;
        this.animationManager = window.animationManager;

        this.renderActivities();
        console.log('自由放飞管理器初始化完成');
    }



    /**
     * 获取所有活动
     * @returns {Array} 活动数组
     */
    getActivities() {
        return this.dataManager.getFreedomActivities();
    }

    /**
     * 渲染活动列表
     */
    renderActivities() {
        if (!this.domElements.freedomList) return;

        // 清空现有内容
        this.domElements.freedomList.innerHTML = '';

        if (this.activities.length === 0) {
            this.showEmptyState();
            return;
        }

        this.hideEmptyState();

        // 渲染每个活动
        const activities = this.getActivities();
        activities.forEach(activity => {
            const activityElement = this.createActivityElement(activity);
            this.domElements.freedomList.appendChild(activityElement);
        });
    }

    /**
     * 创建活动元素
     * @param {Object} activity - 活动对象
     * @returns {HTMLElement} 活动DOM元素
     */
    createActivityElement(activity) {
        const activityItem = document.createElement('div');
        activityItem.className = `freedom-item ${activity.completed ? 'completed' : ''}`;
        activityItem.dataset.activityId = activity.id;

        activityItem.innerHTML = `
            <div class="freedom-info">
                <div class="freedom-icon">${activity.icon}</div>
                <div class="freedom-details">
                    <div class="freedom-title">${activity.title}</div>
                    <div class="freedom-description">${activity.description}</div>
                    <div class="freedom-reward">
                        <span class="freedom-reward-icon">💎</span>
                        <span>${activity.reward} 宝石</span>
                    </div>
                </div>
            </div>
            <button class="freedom-check-btn ${activity.completed ? 'completed' : ''}" 
                    onclick="freedomManager.toggleActivity(${activity.id})">
                <span>${activity.completed ? '✓' : ''}</span>
            </button>
        `;

        return activityItem;
    }

    /**
     * 切换活动完成状态
     * @param {number} activityId - 活动ID
     */
    toggleActivity(activityId) {
        const activities = this.getActivities();
        const activity = activities.find(a => a.id === activityId);
        if (!activity) return;

        const wasCompleted = activity.completed;
        activity.completed = !activity.completed;

        // 更新显示
        this.updateActivityDisplay(activityId, activity.completed);

        // 更新数据
        this.dataManager.updateFreedomActivityStatus(activityId, activity.completed);

        // 更新宝石总数显示
        this.uiManager.updateGemCount(this.dataManager.getUserData().gems);

        // 播放动画
        if (activity.completed) {
            this.handleActivityCompletion(activity);
        }

        // 检查是否所有活动都完成了
        this.checkAllActivitiesCompleted();
    }

    /**
     * 更新活动显示状态
     * @param {number} activityId - 活动ID
     * @param {boolean} completed - 完成状态
     */
    updateActivityDisplay(activityId, completed) {
        const activityElement = document.querySelector(`[data-activity-id="${activityId}"]`);
        if (!activityElement) return;

        const checkBtn = activityElement.querySelector('.freedom-check-btn');
        const checkSpan = checkBtn.querySelector('span');

        if (completed) {
            activityElement.classList.add('completed');
            checkBtn.classList.add('completed');
            checkSpan.textContent = '✓';
        } else {
            activityElement.classList.remove('completed');
            checkBtn.classList.remove('completed');
            checkSpan.textContent = '';
        }
    }

    /**
     * 处理活动完成的动画和通知
     * @param {Object} activity - 活动对象
     */
    handleActivityCompletion(activity) {
        const activityElement = document.querySelector(`[data-activity-id="${activity.id}"]`);
        if (activityElement) {
            this.uiManager.showRewardNotification(activity.reward, activityElement);
            this.uiManager.createGemFlyAnimation(activityElement);
            if (this.animationManager) {
                this.animationManager.playCheckSuccessAnimation(activityElement.querySelector('.freedom-check-btn'));
            }
        }
    }

    /**
     * 检查是否所有活动都完成了
     */
    checkAllActivitiesCompleted() {
        const activities = this.getActivities();
        const allCompleted = activities.length > 0 && activities.every(activity => activity.completed);

        if (allCompleted) {
            this.showEmptyState();
            if (this.animationManager) {
                setTimeout(() => {
                    this.animationManager.playCelebrationAnimation();
                }, CONFIG.ANIMATIONS.CELEBRATION_DELAY);
            }
        } else {
            this.hideEmptyState();
        }
    }

    /**
     * 显示空状态
     */
    showEmptyState() {
        if (this.domElements.freedomEmptyState) {
            this.domElements.freedomEmptyState.classList.remove('hidden');
        }
        if (this.domElements.freedomList) {
            this.domElements.freedomList.classList.add('hidden');
        }
    }

    /**
     * 隐藏空状态
     */
    hideEmptyState() {
        if (this.domElements.freedomEmptyState) {
            this.domElements.freedomEmptyState.classList.add('hidden');
        }
        if (this.domElements.freedomList) {
            this.domElements.freedomList.classList.remove('hidden');
        }
    }

    /**
     * 重置所有活动
     */
    resetAllActivities() {
        this.dataManager.resetDailyData(); // 调用统一的重置方法
        this.renderActivities();
        console.log('所有自由活动已通过 DataManager 重置');
    }

    /**
     * 获取活动统计信息
     * @returns {Object} 统计信息
     */
    getActivityStats() {
        const activities = this.getActivities();
        const total = activities.length;
        const completed = activities.filter(activity => activity.completed).length;
        const totalReward = activities.reduce((sum, activity) => {
            return sum + (activity.completed ? activity.reward : 0);
        }, 0);

        return {
            total,
            completed,
            remaining: total - completed,
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
            totalReward
        };
    }


}

// 创建全局自由放飞管理实例
const freedomManager = new FreedomManager();

// 导出到全局作用域
window.FreedomManager = FreedomManager;
window.freedomManager = freedomManager;