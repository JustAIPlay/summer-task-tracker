// ==================== 数据管理模块 ====================

/**
 * 数据管理类
 */
class DataManager {
    constructor() {
        this.tasksData = [];
        this.userData = {};
    }

    /**
     * 初始化数据
     */
    initData() {
        this.loadData();
        
        // 检查是否需要更新任务列表（如果任务数量不匹配，说明配置已更新）
        if (this.tasksData.length === 0 || this.tasksData.length !== CONFIG.DEFAULT_TASKS.length) {
            console.log('检测到任务配置更新，重置为新的默认任务');
            this.tasksData = [...CONFIG.DEFAULT_TASKS];
            this.saveData();
        }
        
        if (Object.keys(this.userData).length === 0) {
            this.userData = { ...CONFIG.DEFAULT_USER_DATA };
        }
        
        // 检查是否需要进行每日重置
        this.checkDailyReset();
    }

    /**
     * 检查是否需要进行每日重置
     */
    checkDailyReset() {
        const today = new Date().toDateString();
        const lastActiveDate = this.userData.lastActiveDate;
        
        // 如果不是同一天，重置任务状态但保留宝石
        if (lastActiveDate !== today) {
            console.log('检测到新的一天，重置任务状态');
            this.resetDailyTasks();
            this.userData.lastActiveDate = today;
            this.saveData();
            
            // 显示每日重置提示
            if (window.uiManager && typeof window.uiManager.showDailyResetNotification === 'function') {
                setTimeout(() => {
                    window.uiManager.showDailyResetNotification();
                }, 1000); // 延迟1秒显示，确保页面加载完成
            }
        }
    }

    /**
     * 重置每日任务状态（保留宝石）
     */
    resetDailyTasks() {
        let completedTasksCount = 0;
        
        this.tasksData.forEach(task => {
            if (task.completed) {
                task.completed = false;
                completedTasksCount++;
            }
        });
        
        // 重置今日完成任务数，但保留总完成数和宝石
        this.userData.totalTasksCompleted = Math.max(0, this.userData.totalTasksCompleted - completedTasksCount);
        
        console.log(`已重置 ${completedTasksCount} 个任务状态，保留宝石数量: ${this.userData.gems}`);
    }

    /**
     * 保存数据到本地存储
     */
    saveData() {
        try {
            localStorage.setItem(CONFIG.STORAGE_KEYS.TASKS, JSON.stringify(this.tasksData));
            localStorage.setItem(CONFIG.STORAGE_KEYS.USER_DATA, JSON.stringify(this.userData));
            console.log('数据已保存');
        } catch (error) {
            console.error('保存数据失败:', error);
        }
    }

    /**
     * 从本地存储加载数据
     */
    loadData() {
        try {
            const savedTasks = localStorage.getItem(CONFIG.STORAGE_KEYS.TASKS);
            const savedUserData = localStorage.getItem(CONFIG.STORAGE_KEYS.USER_DATA);
            
            if (savedTasks) {
                this.tasksData = JSON.parse(savedTasks);
            }
            
            if (savedUserData) {
                this.userData = JSON.parse(savedUserData);
            }
            
            console.log('数据已加载');
        } catch (error) {
            console.error('加载数据失败:', error);
            // 如果加载失败，使用默认数据
            this.tasksData = [...CONFIG.DEFAULT_TASKS];
            this.userData = { ...CONFIG.DEFAULT_USER_DATA };
        }
    }

    /**
     * 获取任务数据
     * @returns {Array} 任务数组
     */
    getTasks() {
        return this.tasksData;
    }

    /**
     * 获取用户数据
     * @returns {Object} 用户数据对象
     */
    getUserData() {
        return this.userData;
    }

    /**
     * 更新任务状态
     * @param {number} taskId - 任务ID
     * @param {boolean} completed - 完成状态
     */
    updateTaskStatus(taskId, completed) {
        const task = this.tasksData.find(t => t.id === taskId);
        if (task) {
            task.completed = completed;
            
            if (completed) {
                // 增加宝石
                this.userData.gems += task.reward;
                this.userData.totalTasksCompleted += 1;
            } else {
                // 减少宝石
                this.userData.gems = Math.max(0, this.userData.gems - task.reward);
                this.userData.totalTasksCompleted = Math.max(0, this.userData.totalTasksCompleted - 1);
            }
            
            // 更新最后活跃日期
            this.userData.lastActiveDate = new Date().toDateString();
            
            this.saveData();
        }
    }

    /**
     * 添加新任务
     * @param {Object} taskData - 任务数据
     */
    addTask(taskData) {
        const newTask = {
            id: Date.now(), // 使用时间戳作为ID
            title: taskData.title,
            reward: taskData.reward || 10,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasksData.push(newTask);
        this.saveData();
        return newTask;
    }

    /**
     * 删除任务
     * @param {number} taskId - 任务ID
     */
    deleteTask(taskId) {
        const taskIndex = this.tasksData.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            const task = this.tasksData[taskIndex];
            
            // 如果任务已完成，需要扣除相应的宝石和完成数
            if (task.completed) {
                this.userData.gems = Math.max(0, this.userData.gems - task.reward);
                this.userData.totalTasksCompleted = Math.max(0, this.userData.totalTasksCompleted - 1);
            }
            
            this.tasksData.splice(taskIndex, 1);
            this.saveData();
        }
    }

    /**
     * 检查是否所有任务都已完成
     * @returns {boolean} 是否全部完成
     */
    areAllTasksCompleted() {
        return this.tasksData.length > 0 && this.tasksData.every(task => task.completed);
    }

    /**
     * 获取已完成任务数量
     * @returns {number} 已完成任务数量
     */
    getCompletedTasksCount() {
        return this.tasksData.filter(task => task.completed).length;
    }

    /**
     * 重置所有任务状态
     */
    resetAllTasks() {
        this.tasksData.forEach(task => {
            if (task.completed) {
                task.completed = false;
                // 扣除宝石
                this.userData.gems = Math.max(0, this.userData.gems - task.reward);
            }
        });
        
        this.userData.totalTasksCompleted = 0;
        this.saveData();
    }

    /**
     * 花费宝石
     * @param {number} amount - 花费的宝石数量
     * @returns {boolean} 是否成功花费
     */
    spendGems(amount) {
        if (this.userData.gems >= amount) {
            this.userData.gems -= amount;
            this.saveData();
            return true;
        }
        return false;
    }

    /**
     * 增加宝石
     * @param {number} amount - 增加的宝石数量
     */
    addGems(amount) {
        this.userData.gems += amount;
        this.saveData();
    }

    /**
     * 强制重置为默认任务
     */
    forceResetToDefaultTasks() {
        this.tasksData = [...CONFIG.DEFAULT_TASKS];
        this.saveData();
        console.log('已强制重置为默认任务列表');
    }

    /**
     * 清空所有数据
     */
    clearAllData() {
        localStorage.removeItem(CONFIG.STORAGE_KEYS.TASKS);
        localStorage.removeItem(CONFIG.STORAGE_KEYS.USER_DATA);
        this.tasksData = [...CONFIG.DEFAULT_TASKS];
        this.userData = { ...CONFIG.DEFAULT_USER_DATA };
        console.log('所有数据已清空');
    }
}

// 创建全局数据管理实例
const dataManager = new DataManager();

// 导出到全局作用域
window.DataManager = DataManager;
window.dataManager = dataManager;