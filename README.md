
# 今日任务 - 响应式任务管理应用

## 项目简介

这是一个现代化的任务管理应用，采用响应式设计，支持多种设备尺寸。用户可以通过完成任务获得宝石奖励，享受游戏化的任务管理体验。

## 功能特性

### 核心功能
- ✅ 任务列表管理
- 💎 宝石奖励系统
- 🎉 完成任务动画效果
- 💾 本地数据存储
- ⌨️ 键盘快捷键支持
- 🕒 自动日期显示
- 🎨 多页面导航系统
- 🛒 商店兑换功能
- 🎯 激励性页面设计

### 响应式设计
- 🖥️ **桌面端 (>1200px)**: 单列布局，宽松间距，优化阅读体验
- 📱 **平板端 (769px-1200px)**: 单列布局，适中间距
- 📱 **手机横屏 (481px-768px)**: 紧凑布局
- 📱 **手机竖屏 (<480px)**: 最小化布局，优化触控体验

## 项目结构

```
test/
├── index.html              # 主页面（包含任务、自由放飞、商店三个页面）
├── js/                      # JavaScript 文件
│   ├── config.js           # 应用配置
│   ├── data.js             # 统一数据管理（任务、活动、宝石等）
│   ├── ui.js               # 用户界面（含日期自动更新功能）
│   ├── tasks.js            # 任务管理
│   ├── animations.js       # 动画效果
│   ├── freedom.js          # 自由放飞页面逻辑
│   ├── shop.js             # 商店页面逻辑
│   └── app.js              # 应用主控制器
├── styles/                  # CSS 样式文件
│   ├── base.css            # 基础样式和响应式布局
│   ├── components.css      # 组件样式（含页面标题样式）
│   ├── animations.css      # 动画样式
│   └── pages.css           # 页面特定样式
├── prototype.html          # 原型页面
└── README.md               # 项目说明文档
```

## 响应式布局说明

### 容器设计
- **最大宽度**: 1200px
- **自适应**: 根据屏幕尺寸自动调整
- **居中对齐**: 在大屏幕上保持居中显示

### 断点设置
1. **大屏幕 (>1200px)**
   - 任务列表采用单列弹性布局
   - 最大宽度800px，居中显示
   - 增大内边距和字体尺寸
   - Header和导航栏宽度保持一致

2. **平板 (769px-1200px)**
   - 单列布局
   - 适中的内边距
   - 容器最大宽度768px
   - 统一的视觉宽度

3. **手机横屏 (481px-768px)**
   - 紧凑布局
   - 减小间距
   - 容器最大宽度480px
   - 保持一致的边距

4. **手机竖屏 (<480px)**
   - 最小化布局
   - 优化触控体验
   - 底部导航栏调整为平铺布局
   - 统一的视觉边界

## 使用方法

### 基本操作
1. **完成任务**: 点击任务右侧的圆形按钮
2. **获得奖励**: 完成任务后自动获得宝石奖励
3. **查看进度**: 顶部显示当前宝石数量和实时日期
4. **页面导航**: 通过底部导航栏切换"日精于勤"、"自由放飞"、"劳有所得"页面
5. **商店购买**: 在"劳有所得"页面使用宝石兑换奖品

### 键盘快捷键
- `Ctrl + S`: 手动保存数据
- `Ctrl + R`: 重置所有任务（需确认）
- `Esc`: 关闭模态框

### 数据存储
- 应用使用浏览器本地存储保存数据
- 每30秒自动保存一次
- 页面关闭时自动保存

## 技术特性

### 前端技术
- **HTML5**: 语义化标签
- **CSS3**: Flexbox布局、动画效果、响应式设计
- **JavaScript ES6+**: 模块化设计、依赖注入
- **响应式设计**: 移动优先，单列布局

### 性能优化
- CSS 动画硬件加速
- 防抖处理
- 本地存储优化
- 模块化代码结构
- 统一的视觉布局系统

### 浏览器兼容性
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 开发说明

### 本地运行
```bash
# 启动本地服务器
python -m http.server 8080

# 访问应用
http://localhost:8080/index.html
```

### Vercel 部署
项目包含 `vercel.json` 配置文件，用于指导 Vercel 平台的部署工作。该文件定义了构建规则和路由重写，确保所有静态资源（HTML, CSS, JS）都能被正确托管和访问，解决了在 Vercel 环境下可能出现的 404 Not Found 问题。

### 自定义配置
编辑 `js/config.js` 文件可以修改：
- 默认任务列表
- 动画时长
- 自动保存间隔
- 其他应用配置

### 添加新任务
可以通过修改 `CONFIG.DEFAULT_TASKS` 数组来添加新的默认任务。

### 清除数据
如需重置应用数据，可在浏览器控制台执行：
```javascript
localStorage.removeItem('taskAppTasks');
localStorage.removeItem('taskAppUserData');
localStorage.removeItem('freedomActivitiesData');
location.reload();
```

## 更新日志

### v1.7.0 (最新版本)
- 🐞 **修复初始化错误**：解决了在“自由放飞”页面因数据未正确加载导致的 `undefined is not an object` 错误，以及因函数调用错误导致的 `freedomManager.checkDailyReset is not a function` 问题。
- 🚀 **修复部署问题**：添加 `vercel.json` 配置文件，明确了 Vercel 的构建和路由规则，解决了静态资源 404 Not Found 的问题，确保应用在 Vercel 平台顺利部署和运行。

### v1.6.0
- ✨ **统一数据管理**：重构数据管理系统，将“业精于勤”和“自由放飞”页面的数据统一由 `js/data.js` 管理。
- 🔄 **优化重置逻辑**：实现统一的每日任务状态重置功能，确保新的一天所有任务和活动状态都能正确刷新。
- 🔧 **代码结构优化**：移除 `js/freedom.js` 中冗余的数据处理逻辑，代码更清晰、更易于维护。
- 💎 **宝石数据同步**：确保宝石数量在所有页面之间正确同步，不受每日重置影响。

### v1.5.0 (当前版本)
- 🎁 更新小盲盒和大盲盒奖品列表，增加更多有吸引力的奖励
- 💰 调整盲盒价格：小盲盒100宝石，大盲盒200宝石
- 🎯 优化奖品概率分配，根据奖品价值和吸引力合理设置
- 🛒 全面更新商店兑换系统，新增16个指定奖品：
  - 高价值体验类（200-300宝石）：露营、市内一日游、游乐场畅玩、英文电影/动画片、农场体验、免写作业券
  - 中等价值活动类（150-180宝石）：爬山、图书馆/博物馆参观、电影/动画片、书籍购物金
  - 基础奖励类（60-100宝石）：手机益智游戏、超市购物金、美食犒赏、父母免生气券
- 🎮 增加娱乐类奖励，如电影/动画片时间、手机游戏时间等
- 🎫 添加特权类奖励，如免写作业券、免催券等
- ❤️ 加入情感类奖励，增强亲子互动
- 🆕 自由放飞页面新增3个活动：休息发呆、吃水果挑战、复盘订正错题
- 📊 调整自由放飞活动奖励策略：
  - 高价值学习任务（5宝石）：感统运动挑战、专注力挑战、复盘订正错题
  - 中等价值活动（3宝石）：摘抄挑战、阅读挑战
  - 基础价值活动（2宝石）：家务挑战、吃水果挑战
  - 低价值活动（1宝石）：科学小实验、AI创作
  - 休闲活动（0宝石）：亲子阅读、听歌、唱歌、绘画、休息发呆

### v1.4.0
- 🎨 优化用户界面体验，导航栏文字更新为"日精于勤"和"劳有所得"
- ✨ 任务页面新增激励标题"刻意练习，做时间的朋友！"
- 🕒 实现日期自动获取，横幅页面显示当前系统时间
- 📱 完善页面标题样式，参考自由放飞页面设计风格
- 🔧 优化UI管理器，增强日期显示功能

### v1.3.1
- 💎 优化宝石奖励系统，调整各任务奖励数量
- 📊 重新平衡奖励机制：重要任务10宝石，一般任务5宝石，休闲活动2宝石
- 🎯 突出重点任务：起床、晨练、数学作业、数学预习、运动、语文预习、洗澡睡觉获得10宝石

### v1.3.0
- 🛒 新增奖品兑换功能，完整的商店系统
- 🎁 添加指定奖品兑换（彩色笔、小熊玩偶、特殊权限等）

- 🎲 实现神秘盲盒系统，基于概率的随机奖励
- 💎 完善宝石管理系统，支持购买验证和扣除
- 📱 新增商店页面UI，响应式设计适配各种设备
- 🎯 根据暑假作息时间表更新任务列表（19个具体时间段任务）
- 📋 任务奖励重新平衡，学习类任务奖励更高

### v1.2.1
- 🐛 修复任务列表最后一个任务与底部导航栏重叠问题
- 📐 优化主要内容区域底部内边距，确保充足的显示空间
- 🎨 增加底部导航栏最小高度，提升视觉稳定性
- 📱 优化各屏幕尺寸下的间距配置
- ✨ 改进响应式布局的用户体验

### v1.2.0
- 🎨 统一任务列表为单列布局，提升阅读体验
- 🔧 修复Header和导航栏宽度不一致问题
- 📐 优化响应式布局的视觉一致性
- 🐛 解决应用初始化依赖注入问题
- ✨ 改进错误处理机制
- 📱 增强移动端用户体验

### v1.1.0
- ✨ 新增响应式设计支持
- 🎨 优化大屏幕下的网格布局
- 📱 改进移动端用户体验
- 🔧 增加更多默认任务（10个任务）
- 📚 完善项目文档
- 🐛 修复页面加载问题

### v1.0.0
- 🎉 初始版本发布
- ✅ 基础任务管理功能
- 💎 宝石奖励系统
- 🎨 动画效果
- 💾 本地数据存储

## 架构优化建议

### 代码质量提升
- **依赖注入容器**: 实现更优雅的依赖管理
- **TypeScript**: 增加类型安全
- **单元测试**: 提高代码可靠性
- **JSDoc**: 完善代码文档

### 用户体验增强
- **离线支持**: PWA功能
- **数据备份**: 云端同步
- **主题切换**: 暗色模式支持
- **无障碍访问**: ARIA标签优化

### 性能优化
- **懒加载**: 模块按需加载
- **代码分割**: 减少初始加载时间
- **内存管理**: 防止内存泄漏
- **构建优化**: 压缩和打包

## 未来计划

- [ ] 添加任务分类功能
- [ ] 实现数据导入导出
- [ ] 添加主题切换
- [ ] 支持任务提醒
- [ ] 添加统计图表
- [ ] 实现云端同步
- [ ] PWA 支持
- [ ] 暗色模式
- [ ] TypeScript重构
- [ ] 单元测试覆盖

## 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目！

## 许可证

MIT License

---

*这个项目采用响应式设计，在不同设备上都能提供良好的用户体验。如有问题或建议，欢迎反馈！*