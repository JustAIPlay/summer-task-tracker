// ==================== UI管理模块 ====================

/**
 * UI管理类
 */
class UIManager {
    constructor() {
        this.domElements = {};
        this.initDOMElements();
    }

    /**
     * 初始化DOM元素缓存
     */
    initDOMElements() {
        this.domElements = {
            gemCount: document.getElementById('gemCount'),
            taskList: document.getElementById('taskList'),
            emptyState: document.getElementById('emptyState'),
            loadingState: document.getElementById('loadingState'),
            navItems: document.querySelectorAll('.nav-item'),
            currentDate: document.getElementById('currentDate')
        };
        
        // 初始化当前日期显示
        this.updateCurrentDate();
    }

    /**
     * 更新宝石数量显示
     * @param {number} count - 宝石数量
     */
    updateGemCount(count) {
        if (this.domElements.gemCount) {
            this.domElements.gemCount.textContent = count;
        }
    }

    /**
     * 显示加载状态
     */
    showLoading() {
        if (this.domElements.loadingState) {
            this.domElements.loadingState.classList.remove('hidden');
        }
        if (this.domElements.taskList) {
            this.domElements.taskList.classList.add('hidden');
        }
        if (this.domElements.emptyState) {
            this.domElements.emptyState.classList.add('hidden');
        }
    }

    /**
     * 隐藏加载状态
     */
    hideLoading() {
        if (this.domElements.loadingState) {
            this.domElements.loadingState.classList.add('hidden');
        }
        // 显示任务列表
        if (this.domElements.taskList) {
            this.domElements.taskList.classList.remove('hidden');
        }
    }

    /**
     * 显示空状态
     */
    showEmptyState() {
        if (this.domElements.emptyState) {
            this.domElements.emptyState.classList.remove('hidden');
        }
        if (this.domElements.taskList) {
            this.domElements.taskList.classList.add('hidden');
        }
    }

    /**
     * 隐藏空状态
     */
    hideEmptyState() {
        if (this.domElements.emptyState) {
            this.domElements.emptyState.classList.add('hidden');
        }
        if (this.domElements.taskList) {
            this.domElements.taskList.classList.remove('hidden');
        }
    }

    /**
     * 创建任务元素
     * @param {Object} task - 任务对象
     * @returns {HTMLElement} 任务DOM元素
     */
    createTaskElement(task) {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.dataset.taskId = task.id;
        
        taskItem.innerHTML = `
            <div class="task-info">
                <div class="task-title">${task.title}</div>
                <div class="task-reward">
                    <span class="reward-icon">💎</span>
                    <span>${task.reward} 宝石</span>
                </div>
            </div>
            <button class="check-btn ${task.completed ? 'completed' : ''}" 
                    onclick="taskManager.toggleTask(${task.id})">
                <span>${task.completed ? '✓' : ''}</span>
            </button>
        `;
        
        return taskItem;
    }

    /**
     * 渲染任务列表
     * @param {Array} tasks - 任务数组
     */
    renderTasks(tasks) {
        if (!this.domElements.taskList) return;
        
        // 清空现有任务
        this.domElements.taskList.innerHTML = '';
        
        if (tasks.length === 0) {
            this.showEmptyState();
            return;
        }
        
        this.hideEmptyState();
        
        // 渲染每个任务
        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.domElements.taskList.appendChild(taskElement);
        });
    }

    /**
     * 更新任务状态显示
     * @param {number} taskId - 任务ID
     * @param {boolean} completed - 完成状态
     */
    updateTaskDisplay(taskId, completed) {
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        if (!taskElement) return;
        
        const checkBtn = taskElement.querySelector('.check-btn');
        const checkSpan = checkBtn.querySelector('span');
        
        if (completed) {
            taskElement.classList.add('completed');
            checkBtn.classList.add('completed');
            checkSpan.textContent = '✓';
        } else {
            taskElement.classList.remove('completed');
            checkBtn.classList.remove('completed');
            checkSpan.textContent = '';
        }
    }

    /**
     * 显示奖励通知
     * @param {number} reward - 奖励数量
     * @param {HTMLElement} sourceElement - 源元素
     */
    showRewardNotification(reward, sourceElement) {
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
     * 显示每日重置提示
     */
    showDailyResetNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 15px 25px;
                border-radius: 15px;
                font-size: 1em;
                font-weight: 500;
                z-index: 1000;
                animation: slideInDown 0.5s ease-out;
                box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
                text-align: center;
                min-width: 280px;
            ">
                <div style="margin-bottom: 5px; font-size: 1.1em;">🌅 新的一天开始了！</div>
                <div style="font-size: 0.9em; opacity: 0.9;">任务状态已重置，宝石已保留</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutUp 0.5s ease-in';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 500);
            }
        }, 3000);
    }

    /**
     * 显示自由放飞页面每日重置提示
     */
    showFreedomDailyResetNotification() {
        const notification = document.createElement('div');
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
                color: white;
                padding: 15px 25px;
                border-radius: 15px;
                font-size: 1em;
                font-weight: 500;
                z-index: 1000;
                animation: slideInDown 0.5s ease-out;
                box-shadow: 0 4px 20px rgba(255, 107, 107, 0.3);
                text-align: center;
                min-width: 280px;
            ">
                <div style="margin-bottom: 5px; font-size: 1.1em;">🎮 自由放飞新的一天！</div>
                <div style="font-size: 0.9em; opacity: 0.9;">活动状态已重置，开始新的挑战吧</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutUp 0.5s ease-in';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 500);
            }
        }, 3000);
    }

    /**
     * 创建宝石飞行动画
     * @param {HTMLElement} sourceElement - 源元素
     */
    createGemFlyAnimation(sourceElement) {
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
     * 显示任务列表
     */
    showTasks() {
        this.hideLoading();
        // 如果任务列表为空，显示空状态
        if (this.domElements.taskList && this.domElements.taskList.children.length === 0) {
            this.showEmptyState();
        } else {
            this.hideEmptyState();
        }
    }

    /**
     * 设置导航栏事件监听器
     */
    setupNavigation() {
        this.domElements.navItems.forEach(item => {
            item.addEventListener('click', (event) => {
                this.handleNavigation(event);
            });
        });
    }

    /**
     * 处理导航点击事件
     * @param {Event} event - 点击事件
     */
    handleNavigation(event) {
        const clickedItem = event.currentTarget;
        const page = clickedItem.dataset.page;
        
        // 移除所有active类
        this.domElements.navItems.forEach(nav => {
            nav.classList.remove('active');
        });
        
        // 添加active类到当前项
        clickedItem.classList.add('active');
        
        // 处理页面切换
        this.switchPage(page);
    }

    /**
     * 切换页面
     * @param {string} page - 页面名称
     */
    switchPage(page) {
        console.log('切换到页面:', page);
        
        // 隐藏所有页面
        this.hideAllPages();
        
        // 显示对应页面
        switch (page) {
            case 'tasks':
                this.showTasksPage();
                break;
            case 'shop':
                this.showShopPage();
                break;
            case 'freedom':
                this.showFreedomPage();
                break;
            default:
                this.showPageNotAvailable(page);
                // 重新激活任务页面
                setTimeout(() => {
                    this.domElements.navItems.forEach(nav => {
                        nav.classList.remove('active');
                    });
                    document.querySelector('[data-page="tasks"]').classList.add('active');
                    this.showTasksPage();
                }, 100);
                break;
        }
    }

    /**
     * 隐藏所有页面
     */
    hideAllPages() {
        // 隐藏任务页面
        const tasksPage = document.getElementById('tasksPage');
        if (tasksPage) {
            tasksPage.classList.add('hidden');
        }
        
        // 隐藏商店页面
        const shopPage = document.getElementById('shopPage');
        if (shopPage) {
            shopPage.classList.add('hidden');
        }
        
        // 隐藏自由放飞页面
        const freedomPage = document.getElementById('freedomPage');
        if (freedomPage) {
            freedomPage.classList.add('hidden');
        }
    }

    /**
     * 显示任务页面
     */
    showTasksPage() {
        const tasksPage = document.getElementById('tasksPage');
        if (tasksPage) {
            tasksPage.classList.remove('hidden');
        }
        
        // 重新检查日期重置
        if (window.dataManager) {
            dataManager.checkDailyReset();
        }
        
        // 检查是否需要显示空状态
        const tasks = dataManager.getTasks();
        if (tasks.length === 0) {
            this.showEmptyState();
        } else {
            this.hideEmptyState();
        }
    }

    /**
     * 显示商店页面
     */
    showShopPage() {
        const shopPage = document.getElementById('shopPage');
        if (shopPage) {
            shopPage.classList.remove('hidden');
            // 渲染商店内容
            if (window.shopManager) {
                shopManager.renderShop();
            }
        }
    }

    /**
     * 显示自由放飞页面
     */
    showFreedomPage() {
        const freedomPage = document.getElementById('freedomPage');
        if (freedomPage) {
            freedomPage.classList.remove('hidden');
            // 重新检查日期重置并渲染自由放飞内容
            if (window.freedomManager) {
                // 重新检查日期重置
                freedomManager.checkDailyReset();
                // 渲染自由放飞内容
                freedomManager.renderActivities();
            }
        }
    }

    /**
     * 显示页面不可用提示
     * @param {string} page - 页面名称
     */
    showPageNotAvailable(page) {
        const pageName = CONFIG.PAGE_NAMES[page] || page;
        alert(`${pageName} 页面正在开发中，敬请期待！`);
    }

    /**
     * 更新当前日期显示
     */
    updateCurrentDate() {
        if (this.domElements.currentDate) {
            const now = new Date();
            this.domElements.currentDate.textContent = this.formatDate(now);
        }
    }

    /**
     * 格式化日期
     * @param {Date} date - 日期对象
     * @returns {string} 格式化后的日期字符串
     */
    formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            weekday: 'long' 
        };
        return date.toLocaleDateString('zh-CN', options);
    }
}

// 创建全局UI管理实例
const uiManager = new UIManager();

// 导出到全局作用域
window.UIManager = UIManager;
window.uiManager = uiManager;