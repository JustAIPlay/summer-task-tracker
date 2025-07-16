/**
 * 夏日元素生成器
 * 用于在页面背景中添加动态的夏日元素
 */

class SummerElementsManager {
    constructor() {
        // 夏日元素配置
        this.elements = [
            { type: 'watermelon', emoji: '🍉', count: 5 },
            { type: 'ice-cream', emoji: '🍦', count: 4 },
            { type: 'sun', emoji: '☀️', count: 2 },
            { type: 'palm-tree', emoji: '🌴', count: 3 }
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
        
        // 创建新容器
        this.container = document.createElement('div');
        this.container.className = 'summer-elements-container';
        document.body.appendChild(this.container);
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
});