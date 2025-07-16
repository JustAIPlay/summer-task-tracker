/**
 * 夏日元素生成器
 * 用于在任务列表容器中添加动态的夏日元素
 */

class SummerElementsManager {
    constructor() {
        // 夏日元素配置
        this.elements = [
            { type: 'watermelon', emoji: '🍉', count: 3 },
            { type: 'ice-cream', emoji: '🍦', count: 3 },
            { type: 'bubble-tea', emoji: '🧋', count: 3 },
            { type: 'sun', emoji: '☀️', count: 1 },
            { type: 'palm-tree', emoji: '🌴', count: 2 }
        ];
        
        // 创建容器
        this.container = null;
        
        // 初始化
        this.init();
    }
    
    /**
     * 初始化夏日元素
     */
    init() {
        // 创建容器
        this.createContainer();
        
        // 生成元素
        this.generateElements();
    }
    
    /**
     * 创建夏日元素容器
     */
    createContainer() {
        // 检查容器是否已存在
        if (document.querySelector('.summer-elements-container')) {
            this.container = document.querySelector('.summer-elements-container');
            return;
        }
        
        // 获取任务列表容器
        const taskList = document.getElementById('taskList');
        if (!taskList) {
            console.error('任务列表容器不存在');
            return;
        }
        
        // 创建新容器并添加到任务列表中
        this.container = document.createElement('div');
        this.container.className = 'summer-elements-container';
        taskList.appendChild(this.container);
        
        // 确保任务列表有相对定位，以便夏日元素容器可以相对于它定位
        taskList.style.position = 'relative';
    }
    
    /**
     * 生成夏日元素
     */
    generateElements() {
        // 清空容器
        this.container.innerHTML = '';
        
        // 为每种元素生成指定数量
        this.elements.forEach(element => {
            for (let i = 0; i < element.count; i++) {
                this.createSingleElement(element);
            }
        });
    }
    
    /**
     * 创建单个夏日元素
     * @param {Object} element - 元素配置
     */
    createSingleElement(element) {
        // 创建元素
        const el = document.createElement('div');
        el.className = element.type;
        el.textContent = element.emoji;
        
        // 随机位置
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        el.style.left = `${randomX}%`;
        el.style.top = `${randomY}%`;
        
        // 随机延迟动画
        const randomDelay = Math.random() * 10;
        el.style.animationDelay = `${randomDelay}s`;
        
        // 添加到容器
        this.container.appendChild(el);
    }
}

// 页面加载完成后初始化夏日元素
document.addEventListener('DOMContentLoaded', () => {
    // 创建夏日元素管理器实例
    const summerElements = new SummerElementsManager();
    
    // 监听页面切换事件，确保在任务列表页面显示时才显示夏日元素
    document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.addEventListener('click', () => {
            const targetPage = navItem.getAttribute('data-page');
            
            // 如果切换到任务页面，重新生成夏日元素
            if (targetPage === 'tasks') {
                // 延迟一点执行，确保任务列表已经显示
                setTimeout(() => {
                    summerElements.init();
                }, 100);
            }
        });
    });
});