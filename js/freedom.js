// ==================== 自由放飞管理模块 ====================

/**
 * 自由放飞管理类
 */
class FreedomManager {
    constructor() {
        this.activities = [];
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
        this.loadActivities();
        this.renderActivities();
        console.log('自由放飞管理器初始化完成');
    }

    /**
     * 加载活动数据
     */
    loadActivities() {
        // 从本地存储加载活动数据
        const savedActivities = localStorage.getItem('freedomActivities');
        
        if (savedActivities) {
            this.activities = JSON.parse(savedActivities);
        } else {
            // 使用默认配置
            this.activities = CONFIG.FREEDOM_ACTIVITIES.map(activity => ({
                ...activity,
                completed: false,
                createdAt: new Date().toISOString()
            }));
            this.saveActivities();
        }
    }

    /**
     * 保存活动数据到本地存储
     */
    saveActivities() {
        localStorage.setItem('freedomActivities', JSON.stringify(this.activities));
    }

    /**
     * 获取所有活动
     * @returns {Array} 活动数组
     */
    getActivities() {
        return this.activities;
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
        this.activities.forEach(activity => {
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
        const activity = this.activities.find(a => a.id === activityId);
        if (!activity) return;

        const wasCompleted = activity.completed;
        activity.completed = !activity.completed;

        // 更新显示
        this.updateActivityDisplay(activityId, activity.completed);

        // 处理宝石奖励
        if (activity.completed && !wasCompleted) {
            // 完成活动，获得宝石
            this.handleActivityCompletion(activity);
        } else if (!activity.completed && wasCompleted) {
            // 取消完成，扣除宝石
            this.handleActivityCancellation(activity);
        }

        // 保存数据
        this.saveActivities();
        dataManager.saveData();

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
     * 处理活动完成
     * @param {Object} activity - 活动对象
     */
    handleActivityCompletion(activity) {
        // 添加宝石
        dataManager.addGems(activity.reward);
        
        // 更新宝石显示
        uiManager.updateGemCount(dataManager.getUserData().gems);
        
        // 显示奖励通知
        const activityElement = document.querySelector(`[data-activity-id="${activity.id}"]`);
        if (activityElement) {
            uiManager.showRewardNotification(activity.reward, activityElement);
            
            // 创建宝石飞行动画
            uiManager.createGemFlyAnimation(activityElement);
            
            // 播放完成动画
            if (window.animationManager) {
                animationManager.playCheckSuccessAnimation(activityElement.querySelector('.freedom-check-btn'));
            }
        }
    }

    /**
     * 处理活动取消完成
     * @param {Object} activity - 活动对象
     */
    handleActivityCancellation(activity) {
        // 扣除宝石
        dataManager.spendGems(activity.reward);
        
        // 更新宝石显示
        uiManager.updateGemCount(dataManager.getUserData().gems);
    }

    /**
     * 检查是否所有活动都完成了
     */
    checkAllActivitiesCompleted() {
        const allCompleted = this.activities.every(activity => activity.completed);
        
        if (allCompleted && this.activities.length > 0) {
            this.showEmptyState();
            
            // 播放庆祝动画
            setTimeout(() => {
                if (window.animationManager) {
                    animationManager.playCelebrationAnimation();
                }
            }, CONFIG.ANIMATIONS.CELEBRATION_DELAY);
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
        this.activities.forEach(activity => {
            activity.completed = false;
        });
        
        this.saveActivities();
        this.renderActivities();
        
        console.log('所有自由活动已重置');
    }

    /**
     * 获取活动统计信息
     * @returns {Object} 统计信息
     */
    getActivityStats() {
        const total = this.activities.length;
        const completed = this.activities.filter(activity => activity.completed).length;
        const totalReward = this.activities.reduce((sum, activity) => {
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

    /**
     * 每日重置活动状态
     */
    resetDailyActivities() {
        this.activities.forEach(activity => {
            if (activity.completed) {
                activity.completed = false;
            }
        });
        
        this.saveActivities();
        this.renderActivities();
        
        console.log('自由活动每日状态已重置');
    }
}

// 创建全局自由放飞管理实例
const freedomManager = new FreedomManager();

// 导出到全局作用域
window.FreedomManager = FreedomManager;
window.freedomManager = freedomManager;