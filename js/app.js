// ==================== 主应用入口 ====================

/**
 * 主应用类
 */
class TaskApp {
    constructor() {
        this.dataManager = null;
        this.uiManager = null;
        this.taskManager = null;
        this.animationManager = null;
        
        this.isInitialized = false;
    }

    /**
     * 初始化应用
     */
    async init() {
        if (this.isInitialized) return;
        
        try {
            console.log('正在初始化任务应用...');
            
            // 获取依赖的管理器实例
            this.dataManager = window.dataManager;
            this.uiManager = window.uiManager;
            this.taskManager = window.taskManager;
            this.animationManager = window.animationManager;
            
            // 显示加载状态
            this.uiManager.showLoading();
            
            // 初始化各个模块
            await this.initModules();
            
            // 设置事件监听器
            this.setupEventListeners();
            
            // 隐藏加载状态
            this.uiManager.hideLoading();
            
            // 标记为已初始化
            this.isInitialized = true;
            
            console.log('任务应用初始化完成');
            
        } catch (error) {
            console.error('应用初始化失败:', error);
            this.handleInitError(error);
        }
    }

    /**
     * 初始化各个模块
     */
    async initModules() {
        // 初始化数据管理器
        this.dataManager.initData();
        
        // 初始化任务管理器
        this.taskManager.init();
        
        // 初始化自由放飞管理器
        if (window.freedomManager) {
            window.freedomManager.init();
        }
        
        // 设置导航
        this.uiManager.setupNavigation();
        
        // 确保任务列表显示
        this.uiManager.showTasks();
        
        // 模拟异步加载
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    /**
     * 设置事件监听器
     */
    setupEventListeners() {
        // 页面卸载时保存数据
        window.addEventListener('beforeunload', () => {
            this.dataManager.saveData();
        });
        
        // 页面可见性变化时保存数据
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.dataManager.saveData();
            }
        });
        
        // 定期自动保存数据
        setInterval(() => {
            this.dataManager.saveData();
        }, CONFIG.AUTO_SAVE_INTERVAL);
        
        // 键盘快捷键
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardShortcuts(event);
        });
        
        // 窗口大小变化时重新布局
        window.addEventListener('resize', this.animationManager.debounce(() => {
            this.handleWindowResize();
        }));
    }

    /**
     * 处理键盘快捷键
     * @param {KeyboardEvent} event - 键盘事件
     */
    handleKeyboardShortcuts(event) {
        // Ctrl+S 保存数据
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.dataManager.saveData();
            this.showMessage('数据已保存');
        }
        
        // Ctrl+R 重置所有任务
        if (event.ctrlKey && event.key === 'r') {
            event.preventDefault();
            if (confirm('确定要重置所有任务吗？此操作不可撤销。')) {
                this.taskManager.resetAllTasks();
                this.showMessage('所有任务已重置');
            }
        }
        
        // Esc 键关闭模态框或取消操作
        if (event.key === 'Escape') {
            this.closeModals();
        }
    }

    /**
     * 处理窗口大小变化
     */
    handleWindowResize() {
        // 重新计算布局
        console.log('窗口大小已变化，重新计算布局');
    }

    /**
     * 处理初始化错误
     * @param {Error} error - 错误对象
     */
    handleInitError(error) {
        if (this.uiManager) {
            this.uiManager.hideLoading();
        }
        
        const errorMessage = document.createElement('div');
        errorMessage.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #ff4757;
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                z-index: 9999;
            ">
                <h3>应用初始化失败</h3>
                <p>${error.message}</p>
                <button onclick="location.reload()" style="
                    background: white;
                    color: #ff4757;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                ">重新加载</button>
            </div>
        `;
        
        document.body.appendChild(errorMessage);
    }

    /**
     * 显示消息提示
     * @param {string} message - 消息内容
     * @param {string} type - 消息类型 (success, error, info)
     */
    showMessage(message, type = 'success') {
        const colors = {
            success: '#2ed573',
            error: '#ff4757',
            info: '#5352ed'
        };
        
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => {
                if (document.body.contains(messageElement)) {
                    document.body.removeChild(messageElement);
                }
            }, 300);
        }, 3000);
    }

    /**
     * 关闭所有模态框
     */
    closeModals() {
        const modals = document.querySelectorAll('.modal, .popup, .overlay');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }

    /**
     * 获取应用状态
     * @returns {Object} 应用状态信息
     */
    getAppState() {
        return {
            isInitialized: this.isInitialized,
            taskStats: this.taskManager.getTaskStats(),
            userData: this.dataManager.getUserData(),
            timestamp: new Date().toISOString()
        };
    }

    /**
     * 导出应用数据
     * @returns {string} JSON格式的应用数据
     */
    exportAppData() {
        const appState = this.getAppState();
        const exportData = {
            ...appState,
            tasks: this.dataManager.getTasks(),
            version: '1.0.0',
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    /**
     * 重启应用
     */
    restart() {
        this.isInitialized = false;
        location.reload();
    }

    /**
     * 清理应用资源
     */
    cleanup() {
        // 保存数据
        this.dataManager.saveData();
        
        // 清理定时器
        // 这里可以添加清理定时器的代码
        
        console.log('应用资源已清理');
    }
}

// 创建全局应用实例
const taskApp = new TaskApp();

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    taskApp.init();
});

// 将主要函数暴露到全局作用域，以便HTML中的onclick事件可以访问
window.toggleTask = (taskId) => taskManager.toggleTask(taskId);
window.saveData = () => dataManager.saveData();
window.loadData = () => dataManager.loadData();

// 开发模式下的调试功能
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    window.debugTaskApp = {
        app: taskApp,
        dataManager,
        uiManager,
        taskManager,
        animationManager,
        CONFIG
    };
    console.log('调试模式已启用，可通过 window.debugTaskApp 访问调试功能');
}

// 添加消息动画样式
const messageStyles = document.createElement('style');
messageStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(messageStyles);

// 导出到全局作用域
window.TaskApp = TaskApp;
window.taskApp = taskApp;