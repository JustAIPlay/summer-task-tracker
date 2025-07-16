// ==================== 任务管理模块 ====================

/**
 * 任务管理类
 */
class TaskManager {
    constructor() {
        this.dataManager = null;
        this.uiManager = null;
        this.animationManager = null;
    }

    /**
     * 初始化任务管理器
     */
    init() {
        // 获取依赖的管理器实例
        this.dataManager = window.dataManager;
        this.uiManager = window.uiManager;
        this.animationManager = window.animationManager;
        
        this.dataManager.initData();
        this.renderTasks();
        this.updateDisplay();
    }

    /**
     * 渲染任务列表
     */
    renderTasks() {
        const tasks = this.dataManager.getTasks();
        this.uiManager.renderTasks(tasks);
    }

    /**
     * 更新显示
     */
    updateDisplay() {
        const userData = this.dataManager.getUserData();
        this.uiManager.updateGemCount(userData.gems);
    }

    /**
     * 切换任务完成状态
     * @param {number} taskId - 任务ID
     */
    toggleTask(taskId) {
        const tasks = this.dataManager.getTasks();
        const task = tasks.find(t => t.id === taskId);
        
        if (!task) return;
        
        const wasCompleted = task.completed;
        const newStatus = !wasCompleted;
        
        // 更新数据
        this.dataManager.updateTaskStatus(taskId, newStatus);
        
        // 更新UI显示
        this.uiManager.updateTaskDisplay(taskId, newStatus);
        this.updateDisplay();
        
        // 播放动画效果
        if (newStatus) {
            this.handleTaskCompletion(taskId, task);
        }
        
        // 检查是否所有任务都完成了
        this.checkAllTasksCompleted();
    }

    /**
     * 处理任务完成
     * @param {number} taskId - 任务ID
     * @param {Object} task - 任务对象
     */
    handleTaskCompletion(taskId, task) {
        const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        const checkBtn = taskElement?.querySelector('.check-btn');
        
        if (checkBtn) {
            // 播放成功动画
            this.animationManager.playCheckSuccessAnimation(checkBtn);
            
            // 显示奖励通知
            setTimeout(() => {
                this.uiManager.showRewardNotification(task.reward, checkBtn);
                this.uiManager.createGemFlyAnimation(checkBtn);
            }, CONFIG.ANIMATIONS.CHECK_SUCCESS_DURATION / 2);
        }
    }

    /**
     * 检查是否所有任务都完成了
     */
    checkAllTasksCompleted() {
        if (this.dataManager.areAllTasksCompleted()) {
            setTimeout(() => {
                this.animationManager.showCelebration();
            }, CONFIG.ANIMATIONS.REWARD_NOTIFICATION_DURATION);
        }
    }

    /**
     * 添加新任务
     * @param {Object} taskData - 任务数据
     */
    addTask(taskData) {
        const newTask = this.dataManager.addTask(taskData);
        this.renderTasks();
        return newTask;
    }

    /**
     * 删除任务
     * @param {number} taskId - 任务ID
     */
    deleteTask(taskId) {
        this.dataManager.deleteTask(taskId);
        this.renderTasks();
        this.updateDisplay();
    }

    /**
     * 重置所有任务
     */
    resetAllTasks() {
        this.dataManager.resetAllTasks();
        this.renderTasks();
        this.updateDisplay();
    }

    /**
     * 获取任务统计信息
     * @returns {Object} 统计信息
     */
    getTaskStats() {
        const tasks = this.dataManager.getTasks();
        const completedCount = this.dataManager.getCompletedTasksCount();
        const totalCount = tasks.length;
        const completionRate = totalCount > 0 ? (completedCount / totalCount * 100).toFixed(1) : 0;
        
        return {
            total: totalCount,
            completed: completedCount,
            remaining: totalCount - completedCount,
            completionRate: parseFloat(completionRate)
        };
    }

    /**
     * 获取今日完成的任务
     * @returns {Array} 今日完成的任务列表
     */
    getTodayCompletedTasks() {
        const tasks = this.dataManager.getTasks();
        const today = new Date().toDateString();
        
        return tasks.filter(task => {
            if (!task.completed || !task.completedAt) return false;
            const completedDate = new Date(task.completedAt).toDateString();
            return completedDate === today;
        });
    }

    /**
     * 获取任务按优先级排序
     * @returns {Array} 排序后的任务列表
     */
    getTasksByPriority() {
        const tasks = this.dataManager.getTasks();
        
        // 按奖励值降序排序，未完成的任务优先
        return [...tasks].sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1; // 未完成的在前
            }
            return b.reward - a.reward; // 奖励高的在前
        });
    }

    /**
     * 搜索任务
     * @param {string} keyword - 搜索关键词
     * @returns {Array} 匹配的任务列表
     */
    searchTasks(keyword) {
        const tasks = this.dataManager.getTasks();
        const lowerKeyword = keyword.toLowerCase();
        
        return tasks.filter(task => 
            task.title.toLowerCase().includes(lowerKeyword)
        );
    }

    /**
     * 导出任务数据
     * @returns {string} JSON格式的任务数据
     */
    exportTasks() {
        const data = {
            tasks: this.dataManager.getTasks(),
            userData: this.dataManager.getUserData(),
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(data, null, 2);
    }

    /**
     * 导入任务数据
     * @param {string} jsonData - JSON格式的任务数据
     * @returns {boolean} 导入是否成功
     */
    importTasks(jsonData) {
        try {
            const data = JSON.parse(jsonData);
            
            if (data.tasks && Array.isArray(data.tasks)) {
                this.dataManager.tasksData = data.tasks;
            }
            
            if (data.userData && typeof data.userData === 'object') {
                this.dataManager.userData = { ...this.dataManager.userData, ...data.userData };
            }
            
            this.dataManager.saveData();
            this.renderTasks();
            this.updateDisplay();
            
            return true;
        } catch (error) {
            console.error('导入任务数据失败:', error);
            return false;
        }
    }
}

// 创建全局任务管理实例
const taskManager = new TaskManager();

// 导出到全局作用域
window.TaskManager = TaskManager;
window.taskManager = taskManager;