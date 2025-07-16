// ==================== 应用配置 ====================

/**
 * 应用配置常量
 */
const CONFIG = {
    // 存储键名
    STORAGE_KEYS: {
        TASKS: 'taskAppTasks',
        USER_DATA: 'taskAppUserData'
    },
    
    // 默认任务数据
    DEFAULT_TASKS: [
        {
            id: 1,
            title: '7:00-7:20 起床穿衣刷牙',
            reward: 10,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            title: '7:20-8:20 晨练',
            reward: 10,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            title: '8:30-9:00 早饭',
            reward: 5,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 4,
            title: '9:00-9:30 晨读古诗/美文',
            reward: 5,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 5,
            title: '9:30-11:00 数学暑假作业+思维训练',
            reward: 10,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 6,
            title: '11:00-11:30 练字',
            reward: 5,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 7,
            title: '11:30-12:00 午饭',
            reward: 5,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 8,
            title: '12:00-13:00 自由活动',
            reward: 5,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 9,
            title: '13:00-14:00 午睡',
            reward: 5,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 10,
            title: '14:00-14:30 英语作业/阅读',
            reward: 5,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 11,
            title: '14:30-15:00 计算小达人',
            reward: 5,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 12,
            title: '15:00-16:00 数学预习',
            reward: 10,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 13,
            title: '16:00-17:00 运动',
            reward: 10,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 14,
            title: '17:00-18:30 自由活动',
            reward: 2,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 15,
            title: '18:30-19:30 晚饭',
            reward: 5,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 16,
            title: '19:30-20:00 自由活动',
            reward: 2,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 17,
            title: '20:00-21:00 语文预习',
            reward: 10,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 18,
            title: '21:00-21:30 阅读',
            reward: 5,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 19,
            title: '21:30-22:00 洗澡睡觉',
            reward: 10,
            completed: false,
            createdAt: new Date().toISOString()
        }
    ],
    
    // 默认用户数据
    DEFAULT_USER_DATA: {
        gems: 0,
        totalTasksCompleted: 0,
        streak: 0,
        lastActiveDate: new Date().toDateString()
    },
    
    // 动画配置
    ANIMATIONS: {
        CHECK_SUCCESS_DURATION: 600,
        GEM_FLY_DURATION: 1000,
        REWARD_NOTIFICATION_DURATION: 2000,
        CELEBRATION_DELAY: 200,
        CELEBRATION_DURATION: 3000
    },
    
    // 自动保存间隔（毫秒）
    AUTO_SAVE_INTERVAL: 30000,
    
    // 防抖延迟（毫秒）
    DEBOUNCE_DELAY: 300,
    
    // 页面名称映射
    PAGE_NAMES: {
        'shop': '商店',
        'freedom': '自由放飞',
        'achievements': '成就',
        'settings': '设置'
    },
    
    // 自由放飞活动配置
    FREEDOM_ACTIVITIES: [
        {
            id: 1,
            title: '手工',
            reward: 10,
            completed: false,
            icon: '✂️',
            description: '发挥创意，制作手工作品'
        },
        {
            id: 2,
            title: '厨神挑战',
            reward: 20,
            completed: false,
            icon: '👨‍🍳',
            description: '学习烹饪，挑战美食制作'
        },
        {
            id: 3,
            title: '亲子阅读',
            reward: 10,
            completed: false,
            icon: '📚',
            description: '与家人一起享受阅读时光'
        },
        {
            id: 4,
            title: '听歌',
            reward: 5,
            completed: false,
            icon: '🎵',
            description: '欣赏美妙的音乐'
        },
        {
            id: 5,
            title: '唱歌',
            reward: 5,
            completed: false,
            icon: '🎤',
            description: '展现歌声，释放心情'
        },
        {
            id: 6,
            title: '家务挑战',
            reward: 20,
            completed: false,
            icon: '🧹',
            description: '参与家务，培养责任心'
        },
        {
            id: 7,
            title: '科学小实验',
            reward: 10,
            completed: false,
            icon: '🔬',
            description: '探索科学的奥秘'
        },
        {
            id: 8,
            title: '摘抄挑战',
            reward: 10,
            completed: false,
            icon: '✍️',
            description: '摘抄优美文字，积累素材'
        },
        {
            id: 9,
            title: '阅读挑战',
            reward: 10,
            completed: false,
            icon: '📖',
            description: '沉浸书海，拓展知识'
        },
        {
            id: 10,
            title: '绘画',
            reward: 5,
            completed: false,
            icon: '🎨',
            description: '用画笔描绘美好世界'
        },
        {
            id: 11,
            title: '感统运动挑战',
            reward: 20,
            completed: false,
            icon: '🤸',
            description: '锻炼身体协调性'
        },
        {
            id: 12,
            title: '专注力挑战',
            reward: 20,
            completed: false,
            icon: '🎯',
            description: '提升专注力和注意力'
        },
        {
            id: 13,
            title: 'AI创作',
            reward: 20,
            completed: false,
            icon: '🤖',
            description: '利用AI工具进行创作'
        }
    ],
    
    // 商店商品配置
    SHOP_ITEMS: {
        // 指定奖品
        REWARDS: [
            {
                id: 1,
                name: '彩色笔套装',
                icon: '✏️',
                price: 8,
                description: '12色彩色笔，让创作更精彩'
            },
            {
                id: 2,
                name: '小熊玩偶',
                icon: '🧸',
                price: 15,
                description: '可爱的小熊陪伴，温暖每一天'
            },
            {
                id: 3,
                name: '晚睡30分钟',
                icon: '🌙',
                price: 10,
                description: '特殊权限：今晚可以晚睡30分钟'
            },
            {
                id: 4,
                name: '糖果奖励',
                icon: '🍭',
                price: 5,
                description: '美味糖果一份，甜蜜好心情'
            },
            {
                id: 5,
                name: '游戏时间+1小时',
                icon: '🎮',
                price: 12,
                description: '额外获得1小时游戏时间'
            },
            {
                id: 6,
                name: '选择今日晚餐',
                icon: '🍽️',
                price: 8,
                description: '今天的晚餐由你来决定'
            }
        ],
        
        // 神秘盲盒
        MYSTERY_BOXES: [
            {
                id: 101,
                name: '小盲盒',
                icon: '📦',
                price: 8,
                description: '神秘小礼品，惊喜等你开启',
                rewards: [
                    { name: '贴纸一套', probability: 0.3 },
                    { name: '小玩具', probability: 0.25 },
                    { name: '糖果', probability: 0.25 },
                    { name: '彩色笔', probability: 0.15 },
                    { name: '特殊奖励', probability: 0.05 }
                ]
            },
            {
                id: 102,
                name: '大盲盒',
                icon: '🎁',
                price: 15,
                description: '超值大礼包，更多惊喜等着你',
                rewards: [
                    { name: '精美文具套装', probability: 0.2 },
                    { name: '益智玩具', probability: 0.2 },
                    { name: '图书一本', probability: 0.2 },
                    { name: '手工材料包', probability: 0.2 },
                    { name: '超级大奖', probability: 0.1 },
                    { name: '双倍宝石', probability: 0.1 }
                ]
            }
        ]
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}