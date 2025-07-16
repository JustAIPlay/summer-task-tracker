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
            reward: 1,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            title: '7:20-8:20 晨练',
            reward: 3,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 3,
            title: '8:30-9:00 早饭',
            reward: 1,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 4,
            title: '9:00-9:30 晨读古诗/美文',
            reward: 3,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 5,
            title: '9:30-11:00 数学暑假作业+思维训练',
            reward: 8,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 6,
            title: '11:00-11:30 练字',
            reward: 3,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 7,
            title: '11:30-12:00 午饭',
            reward: 1,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 8,
            title: '12:00-13:00 自由活动',
            reward: 0,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 9,
            title: '13:00-14:00 午睡',
            reward: 1,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 10,
            title: '14:00-14:30 英语作业/阅读',
            reward: 1,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 11,
            title: '14:30-15:00 计算小达人',
            reward: 8,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 12,
            title: '15:00-16:00 数学预习',
            reward: 8,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 13,
            title: '16:00-17:00 运动',
            reward: 3,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 14,
            title: '17:00-18:30 自由活动',
            reward: 0,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 15,
            title: '18:30-19:30 晚饭',
            reward: 1,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 16,
            title: '19:30-20:00 自由活动',
            reward: 0,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 17,
            title: '20:00-21:00 语文预习',
            reward: 8,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 18,
            title: '21:00-21:30 阅读',
            reward: 1,
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 19,
            title: '21:30-22:00 洗澡睡觉',
            reward: 1,
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
            reward: 0,
            completed: false,
            icon: '✂️',
            description: '发挥创意，制作手工作品'
        },
        {
            id: 2,
            title: '厨神挑战',
            reward: 2,
            completed: false,
            icon: '👨‍🍳',
            description: '学习烹饪，挑战美食制作'
        },
        {
            id: 3,
            title: '亲子阅读',
            reward: 0,
            completed: false,
            icon: '📚',
            description: '与家人一起享受阅读时光'
        },
        {
            id: 4,
            title: '听歌',
            reward: 0,
            completed: false,
            icon: '🎵',
            description: '欣赏美妙的音乐'
        },
        {
            id: 5,
            title: '唱歌',
            reward: 0,
            completed: false,
            icon: '🎤',
            description: '展现歌声，释放心情'
        },
        {
            id: 6,
            title: '家务挑战',
            reward: 2,
            completed: false,
            icon: '🧹',
            description: '参与家务，培养责任心'
        },
        {
            id: 7,
            title: '科学小实验',
            reward: 1,
            completed: false,
            icon: '🔬',
            description: '探索科学的奥秘'
        },
        {
            id: 8,
            title: '摘抄挑战',
            reward: 3,
            completed: false,
            icon: '✍️',
            description: '摘抄优美文字，积累素材'
        },
        {
            id: 9,
            title: '阅读挑战',
            reward: 3,
            completed: false,
            icon: '📖',
            description: '沉浸书海，拓展知识'
        },
        {
            id: 10,
            title: '绘画',
            reward: 0,
            completed: false,
            icon: '🎨',
            description: '用画笔描绘美好世界'
        },
        {
            id: 11,
            title: '感统运动挑战',
            reward: 5,
            completed: false,
            icon: '🤸',
            description: '锻炼身体协调性'
        },
        {
            id: 12,
            title: '专注力挑战',
            reward: 5,
            completed: false,
            icon: '🎯',
            description: '提升专注力和注意力'
        },
        {
            id: 13,
            title: 'AI创作',
            reward: 1,
            completed: false,
            icon: '🤖',
            description: '利用AI工具进行创作'
        },
        {
            id: 14,
            title: '休息发呆',
            reward: 0,
            completed: false,
            icon: '😌',
            description: '放松身心，享受宁静时光'
        },
        {
            id: 15,
            title: '吃水果挑战',
            reward: 2,
            completed: false,
            icon: '🍎',
            description: '品尝新鲜水果，补充维生素'
        },
        {
            id: 16,
            title: '复盘订正错题',
            reward: 5,
            completed: false,
            icon: '📝',
            description: '回顾错题，巩固知识点'
        }
    ],
    
    // 商店商品配置
    SHOP_ITEMS: {
        // 指定奖品
        REWARDS: [
            {
                id: 1,
                name: '露营',
                icon: '🏕️',
                price: 250,
                description: '户外露营体验，与大自然亲密接触'
            },
            {
                id: 2,
                name: '爬山',
                icon: '🏔️',
                price: 150,
                description: '登山挑战，锻炼体魄欣赏美景'
            },
            {
                id: 3,
                name: '图书馆、博物馆等',
                icon: '🏛️',
                price: 150,
                description: '文化场所参观，增长见识开阔眼界'
            },
            {
                id: 4,
                name: '英文电影1小时/动画片3集',
                icon: '🎬',
                price: 200,
                description: '观看英文影视作品，娱乐学习两不误'
            },
            {
                id: 5,
                name: '电影半小时/动画片2集',
                icon: '📺',
                price: 150,
                description: '适量观看影视内容，放松身心'
            },
            {
                id: 6,
                name: '手机益智游戏15分钟',
                icon: '📱',
                price: 100,
                description: '益智游戏时间，锻炼思维能力'
            },
            {
                id: 7,
                name: '农场体验',
                icon: '🚜',
                price: 200,
                description: '农场生活体验，了解农业知识'
            },
            {
                id: 8,
                name: '美食犒赏(一顿烧烤/冰淇淋）',
                icon: '🍖',
                price: 60,
                description: '美味食物奖励，享受味蕾盛宴'
            },
            {
                id: 9,
                name: '超市购物金20￥',
                icon: '🛒',
                price: 100,
                description: '购物资金奖励，自由选择心仪物品'
            },
            {
                id: 10,
                name: '书籍购物金30￥',
                icon: '📚',
                price: 180,
                description: '图书购买资金，投资知识成长'
            },
            {
                id: 11,
                name: '市内一日游',
                icon: '🚌',
                price: 200,
                description: '城市探索之旅，发现身边美景'
            },
            {
                id: 12,
                name: '游乐场畅玩',
                icon: '🎡',
                price: 200,
                description: '游乐场快乐时光，尽情享受童趣'
            },
            {
                id: 13,
                name: '手工DIY活动',
                icon: '✂️',
                price: 250,
                description: '手工制作体验，培养动手创造能力'
            },
            {
                id: 14,
                name: '父母免生气券1张',
                icon: '😊',
                price: 60,
                description: '特殊权限券，获得父母的理解包容'
            },
            {
                id: 15,
                name: '免写1天作业券1张',
                icon: '📝',
                price: 300,
                description: '学习假期券，享受一天无作业时光'
            },
            {
                id: 16,
                name: '玩水',
                icon: '💦',
                price: 250,
                description: '水上活动体验，清凉夏日乐趣'
            }
        ],
        
        // 神秘盲盒
        MYSTERY_BOXES: [
            {
                id: 101,
                name: '小盲盒',
                icon: '📦',
                price: 100,
                description: '神秘小礼品，惊喜等你开启',
                rewards: [
                    { name: '美食犒赏(一顿烧烤/冰淇淋）', probability: 0.08 },
                    { name: '父母免生气券1张', probability: 0.07 },
                    { name: '手机益智游戏15分钟', probability: 0.15 },
                    { name: '超市购物金20￥', probability: 0.08 },
                    { name: '盲盒抽奖1次', probability: 0.05 },
                    { name: '爬山', probability: 0.07 },
                    { name: '图书馆、博物馆等', probability: 0.08 },
                    { name: '电影半小时/动画片2集', probability: 0.12 },
                    { name: '书籍购物金30￥', probability: 0.06 },
                    { name: '父母的一个拥抱', probability: 0.10 },
                    { name: '爸爸面对面20分钟', probability: 0.07 },
                    { name: '父母免催券一张', probability: 0.07 }
                ]
            },
            {
                id: 102,
                name: '大盲盒',
                icon: '🎁',
                price: 200,
                description: '超值大礼包，更多惊喜等着你',
                rewards: [
                    { name: '英文电影1小时/动画片3集', probability: 0.15 },
                    { name: '农场体验', probability: 0.08 },
                    { name: '市内一日游', probability: 0.07 },
                    { name: '游乐场畅玩', probability: 0.08 },
                    { name: '露营', probability: 0.07 },
                    { name: '手工DIY活动', probability: 0.10 },
                    { name: '玩水', probability: 0.10 },
                    { name: '免写1天作业券1张', probability: 0.12 },
                    { name: '父母的一个拥抱', probability: 0.09 },
                    { name: '爸爸面对面20分钟', probability: 0.07 },
                    { name: '父母免催券一张', probability: 0.07 }
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