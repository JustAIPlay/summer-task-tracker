// ==================== 商店管理模块 ====================

/**
 * 商店管理类
 */
class ShopManager {
    constructor() {
        this.domElements = {};
        this.initDOMElements();
        this.purchaseHistory = this.loadPurchaseHistory();
    }

    /**
     * 初始化DOM元素缓存
     */
    initDOMElements() {
        this.domElements = {
            shopPage: document.getElementById('shopPage'),
            rewardGrid: document.getElementById('rewardGrid'),
            mysteryGrid: document.getElementById('mysteryGrid')
        };
    }

    /**
     * 渲染商店页面
     */
    renderShop() {
        this.renderRewards();
        this.renderMysteryBoxes();
    }

    /**
     * 渲染指定奖品
     */
    renderRewards() {
        if (!this.domElements.rewardGrid) return;
        
        this.domElements.rewardGrid.innerHTML = '';
        
        CONFIG.SHOP_ITEMS.REWARDS.forEach(item => {
            const itemElement = this.createShopItemElement(item, 'reward');
            this.domElements.rewardGrid.appendChild(itemElement);
        });
    }

    /**
     * 渲染神秘盲盒
     */
    renderMysteryBoxes() {
        if (!this.domElements.mysteryGrid) return;
        
        this.domElements.mysteryGrid.innerHTML = '';
        
        CONFIG.SHOP_ITEMS.MYSTERY_BOXES.forEach(item => {
            const itemElement = this.createShopItemElement(item, 'mystery');
            this.domElements.mysteryGrid.appendChild(itemElement);
        });
    }

    /**
     * 创建商品元素
     * @param {Object} item - 商品对象
     * @param {string} type - 商品类型 ('reward' 或 'mystery')
     * @returns {HTMLElement} 商品DOM元素
     */
    createShopItemElement(item, type) {
        const itemDiv = document.createElement('div');
        const currentGems = dataManager.getUserData().gems;
        const canAfford = currentGems >= item.price;
        
        itemDiv.className = `shop-item ${type === 'mystery' ? 'mystery-box' : ''} ${!canAfford ? 'insufficient-gems' : ''}`;
        itemDiv.dataset.itemId = item.id;
        itemDiv.dataset.itemType = type;
        
        itemDiv.innerHTML = `
            <div class="item-icon">${item.icon}</div>
            <div class="item-info">
                <div class="item-name">${item.name}</div>
                <div class="item-description">${item.description}</div>
            </div>
            <div class="item-price">
                <span class="price-icon">💎</span>
                <span class="price-value">${item.price}</span>
            </div>
        `;
        
        // 添加点击事件
        itemDiv.addEventListener('click', () => {
            this.handlePurchase(item, type, itemDiv);
        });
        
        return itemDiv;
    }

    /**
     * 处理购买逻辑
     * @param {Object} item - 商品对象
     * @param {string} type - 商品类型
     * @param {HTMLElement} element - 商品DOM元素
     */
    handlePurchase(item, type, element) {
        const currentGems = dataManager.getUserData().gems;
        
        // 检查宝石是否足够
        if (currentGems < item.price) {
            this.showInsufficientGemsMessage(item.price - currentGems);
            return;
        }
        
        // 确认购买
        const confirmMessage = type === 'mystery' 
            ? `确定要花费 ${item.price} 颗宝石购买 ${item.name} 吗？\n\n${item.description}`
            : `确定要花费 ${item.price} 颗宝石兑换 ${item.name} 吗？\n\n${item.description}`;
            
        if (!confirm(confirmMessage)) {
            return;
        }
        
        // 执行购买
        this.executePurchase(item, type, element);
    }

    /**
     * 执行购买
     * @param {Object} item - 商品对象
     * @param {string} type - 商品类型
     * @param {HTMLElement} element - 商品DOM元素
     */
    executePurchase(item, type, element) {
        // 扣除宝石
        const success = dataManager.spendGems(item.price);
        
        if (!success) {
            this.showInsufficientGemsMessage();
            return;
        }
        
        // 记录购买历史
        this.addToPurchaseHistory(item, type);
        
        // 显示购买成功动画
        this.showPurchaseSuccessAnimation(element);
        
        // 更新UI
        uiManager.updateGemCount(dataManager.getUserData().gems);
        
        // 处理不同类型的奖励
        if (type === 'mystery') {
            this.openMysteryBox(item);
        } else {
            this.showRewardMessage(item);
        }
        
        // 重新渲染商店（更新可购买状态）
        setTimeout(() => {
            this.renderShop();
        }, 1000);
    }

    /**
     * 开启神秘盲盒
     * @param {Object} mysteryBox - 盲盒对象
     */
    openMysteryBox(mysteryBox) {
        // 根据概率随机选择奖励
        const reward = this.getRandomReward(mysteryBox.rewards);
        
        // 显示开盒动画和结果
        setTimeout(() => {
            this.showMysteryBoxResult(mysteryBox, reward);
        }, 500);
    }

    /**
     * 根据概率获取随机奖励
     * @param {Array} rewards - 奖励数组
     * @returns {Object} 选中的奖励
     */
    getRandomReward(rewards) {
        const random = Math.random();
        let cumulativeProbability = 0;
        
        for (const reward of rewards) {
            cumulativeProbability += reward.probability;
            if (random <= cumulativeProbability) {
                return reward;
            }
        }
        
        // 如果没有匹配到，返回最后一个
        return rewards[rewards.length - 1];
    }

    /**
     * 显示神秘盒开启结果
     * @param {Object} mysteryBox - 盲盒对象
     * @param {Object} reward - 获得的奖励
     */
    showMysteryBoxResult(mysteryBox, reward) {
        const message = `🎉 恭喜你！\n\n从 ${mysteryBox.name} 中获得了：\n${reward.name}\n\n快去享受你的奖励吧！`;
        alert(message);
    }

    /**
     * 显示奖励消息
     * @param {Object} item - 奖励对象
     */
    showRewardMessage(item) {
        const message = `🎉 兑换成功！\n\n你获得了：${item.name}\n\n${item.description}\n\n快去享受你的奖励吧！`;
        alert(message);
    }

    /**
     * 显示宝石不足消息
     * @param {number} needed - 还需要的宝石数量
     */
    showInsufficientGemsMessage(needed = 0) {
        const message = needed > 0 
            ? `宝石不足！还需要 ${needed} 颗宝石才能购买这个商品。\n\n快去完成更多任务获得宝石吧！`
            : '宝石不足！快去完成更多任务获得宝石吧！';
        alert(message);
    }

    /**
     * 显示购买成功动画
     * @param {HTMLElement} element - 商品元素
     */
    showPurchaseSuccessAnimation(element) {
        element.classList.add('purchase-success');
        
        setTimeout(() => {
            element.classList.remove('purchase-success');
        }, 600);
    }

    /**
     * 添加到购买历史
     * @param {Object} item - 商品对象
     * @param {string} type - 商品类型
     */
    addToPurchaseHistory(item, type) {
        const purchase = {
            id: item.id,
            name: item.name,
            type: type,
            price: item.price,
            timestamp: new Date().toISOString()
        };
        
        this.purchaseHistory.push(purchase);
        this.savePurchaseHistory();
    }

    /**
     * 加载购买历史
     * @returns {Array} 购买历史数组
     */
    loadPurchaseHistory() {
        try {
            const history = localStorage.getItem('taskAppPurchaseHistory');
            return history ? JSON.parse(history) : [];
        } catch (error) {
            console.error('加载购买历史失败:', error);
            return [];
        }
    }

    /**
     * 保存购买历史
     */
    savePurchaseHistory() {
        try {
            localStorage.setItem('taskAppPurchaseHistory', JSON.stringify(this.purchaseHistory));
        } catch (error) {
            console.error('保存购买历史失败:', error);
        }
    }

    /**
     * 获取购买历史
     * @returns {Array} 购买历史数组
     */
    getPurchaseHistory() {
        return this.purchaseHistory;
    }

    /**
     * 清除购买历史
     */
    clearPurchaseHistory() {
        this.purchaseHistory = [];
        this.savePurchaseHistory();
    }
}

// 创建全局商店管理实例
const shopManager = new ShopManager();

// 导出到全局作用域
window.ShopManager = ShopManager;
window.shopManager = shopManager;