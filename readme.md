# 🌟 邬驰宇的个人主页

一个现代化、交互式的个人主页项目，融合了前端技术栈的精华与创意设计的灵魂。

![项目预览](https://img.shields.io/badge/状态-已完成-brightgreen) ![技术栈](https://img.shields.io/badge/技术栈-HTML5%2BCSS3%2BJavaScript-blue) ![响应式](https://img.shields.io/badge/响应式-✓-success)

## 📖 项目简介

这个个人主页不仅仅是一个静态展示页面，更是我作为前端开发学习者的技术实践和创意表达的综合体现。通过这个项目，我希望展示：

- **💻 技术能力**：现代Web开发技术的掌握和应用
- **🎨 设计理念**：对用户体验和视觉设计的理解
- **🚀 创新精神**：在常规功能基础上的创意突破
- **📱 适配能力**：跨设备、跨平台的兼容性考虑
- **🔧 工程思维**：代码结构化、模块化的工程实践

## ✨ 核心特色

### 🎯 **沉浸式用户体验**
- 粒子背景系统营造科技感氛围
- 自定义光标提升交互体验
- 流畅的页面切换和动画效果

### 🎮 **隐藏彩蛋与惊喜**
- Konami Code 隐藏游戏
- 动态标题情感互动
- 多层次的视觉反馈

### 📊 **数据可视化展示**
- Chart.js 技能雷达图
- 动态技能进度条
- GitHub API 项目展示

## 🛠️ 技术栈

| 技术 | 版本/库 | 用途 |
|------|---------|------|
| **HTML5** | 语义化标签 | 页面结构和内容 |
| **CSS3** | Grid/Flexbox | 响应式布局和样式 |
| **JavaScript** | ES6+ | 交互逻辑和动态效果 |
| **Chart.js** | ^3.0 | 数据可视化图表 |
| **Marked.js** | ^5.0 | Markdown 解析 |
| **GitHub API** | REST API | 项目数据获取 |
| **Canvas API** | HTML5 | 粒子背景系统 |
| **Web Audio API** | HTML5 | 音效播放 |

## 📚 已实现功能

### 🏠 **第一阶段：核心功能 (100%完成)**

#### ✅ **基础页面结构**
- [x] **导航系统**：多页面导航，当前页面高亮显示
- [x] **响应式布局**：移动端、平板、桌面端完美适配
- [x] **日夜模式切换**：一键切换深色/浅色主题，本地存储偏好
- [x] **打字机效果**：Hero区域动态文字展示
- [x] **页面管理系统**：模块化JavaScript架构

#### ✅ **内容展示区域**
- [x] **个人介绍**：Hero区域集成关于我信息
- [x] **最新动态**：新闻卡片展示，特色卡片设计
- [x] **联系方式**：完整的联系信息页面
- [x] **滚动动画**：Intersection Observer API 实现元素进场动画

### 🎨 **第二阶段：个性化与进阶功能 (100%完成)**

#### ✅ **选修模块A："关于我" - 数据可视化**
- [x] **动态技能条**：
  - 滚动触发的技能熟练度动画
  - Intersection Observer 检测视口进入
  - 平滑的从左到右生长动画
  - 一次性播放机制

- [x] **技能雷达图**：
  - Chart.js 多维度技能展示
  - 响应式图表设计
  - 自定义颜色和样式
  - 错误处理和库加载检测

#### ✅ **选修模块B："我的故事" - 叙事与交互**
- [x] **互动式人生时间轴**：
  - 垂直时间轴设计
  - 鼠标悬停节点放大效果
  - 点击展开详细内容
  - CSS伪元素绘制连接线
  - 响应式时间轴布局

#### ✅ **选修模块C：内容创作平台**
- [x] **轻量级 Markdown 博客**：
  - 动态博文列表生成
  - Marked.js 实时Markdown解析
  - 单页应用阅读体验
  - 无缝内容切换

#### ✅ **Portfolio 增强功能**
- [x] **GitHub API 集成**：
  - 动态获取真实仓库数据
  - 编程语言自动识别和筛选
  - API限制处理和fallback机制
  - 项目卡片动态生成

### 🎯 **第三阶段：创意与"彩蛋" (100%完成)**

#### ✅ **任务D.1 - 鼠标跟随粒子背景**
- [x] **星空粒子系统**：
  - 150个动态闪烁粒子
  - 鼠标引力物理模拟
  - 粒子间智能连线
  - 星云跟随效果
  - 性能优化的Canvas渲染

#### ✅ **任务D.2 - Konami Code 隐藏彩蛋**
- [x] **秘籍激活系统**：
  - 经典 ↑↑↓↓←→←→BA 序列检测
  - 8位复古游戏界面
  - Web Audio API 音效播放
  - 完整贪吃蛇游戏实现
  - Matrix风格视觉效果

#### ✅ **任务D.3 - 细节魔王**
- [x] **动态标题系统**：
  - 页面失焦时挽留文案
  - 动态Favicon情感表达
  - 多重焦点检测机制

- [x] **自定义光标系统**：
  - 双层光标设计（外圈+内点）
  - 悬停元素智能识别
  - 点击反馈动画
  - 毛玻璃视觉效果
  - 主题自适应

## 🏗️ 项目架构

### 📁 **文件结构**
```
my-homepage/
├── index.html          # 主页
├── about.html           # 关于页面
├── portfolio.html       # 作品集页面
├── contact.html         # 联系页面
├── style.css           # 样式文件 (3000+ 行)
├── script.js           # 脚本文件 (2600+ 行)
├── images/             # 图片资源
├── test-esm/           # 测试模块
└── README.md           # 项目文档
```

### 🧩 **JavaScript 模块架构**
```javascript
// 核心管理器
├── PageManager          // 页面总控制器
├── ThemeManager         // 主题切换管理
├── TypewriterEffect     // 打字机效果

// 功能模块
├── SkillsAnimationManager   // 技能动画
├── TimelineManager          // 时间轴交互
├── BlogManager             // 博客系统
├── GitHubPortfolioManager  // GitHub集成
├── HobbiesManager          // 兴趣展示

// 创意功能
├── ParticleSystem      // 粒子背景
├── KonamiCode         // 隐藏彩蛋
├── DynamicTitle       // 动态标题
├── CustomCursor       // 自定义光标
└── SnakeGame         // 贪吃蛇游戏
```

## 🎨 设计亮点

### 🌈 **视觉设计**
- **渐变色彩**：现代感的紫蓝渐变配色
- **玻璃拟态**：backdrop-filter 毛玻璃效果
- **卡片设计**：统一的卡片风格和阴影
- **动画过渡**：流畅的CSS transition和transform

### 📱 **响应式设计**
- **移动优先**：从移动端向桌面端扩展
- **弹性布局**：CSS Grid + Flexbox 混合布局
- **媒体查询**：多断点响应式适配
- **触摸友好**：移动端手势和触摸优化

### ⚡ **性能优化**
- **懒加载**：图片和组件按需加载
- **防抖节流**：滚动和resize事件优化
- **代码分离**：功能模块化，按需初始化
- **缓存策略**：localStorage主题和数据缓存

## 💡 核心技术实现

### 🔧 **Intersection Observer API**
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.1 });
```

### 🎨 **Canvas 粒子系统**
```javascript
// 粒子物理模拟
updateParticles() {
    this.particles.forEach(particle => {
        // 鼠标引力计算
        const force = (this.mouseRadius - distance) / this.mouseRadius;
        particle.vx += Math.cos(angle) * force * 0.3;
        
        // 回归原位的力
        const returnForce = (particle.originalX - particle.x) * 0.01;
        particle.vx += returnForce;
    });
}
```

### 🎮 **键盘事件处理**
```javascript
// Konami Code 序列检测
handleKeyPress(e) {
    this.userInput.push(e.code);
    if (this.userInput.length > 10) this.userInput.shift();
    if (this.checkSequence()) this.activateEasterEgg();
}
```

## 🚧 遇到的挑战与解决方案

### 1. **🎯 粒子系统性能优化**

**挑战**：150个粒子的实时渲染和物理计算导致页面卡顿，特别是在低端设备上。

**解决方案**：
- 使用 `requestAnimationFrame` 替代 `setInterval` 确保60fps流畅动画
- 实现粒子池技术，避免频繁创建销毁对象
- 优化数学计算，使用平方距离避免开方运算
- 添加性能检测，低端设备自动降低粒子数量

```javascript
// 性能优化的距离计算
const distanceSquared = dx * dx + dy * dy;
if (distanceSquared < this.mouseRadius * this.mouseRadius) {
    // 避免Math.sqrt计算
}
```

### 2. **📱 GitHub API 速率限制处理**

**挑战**：GitHub API 每小时60次请求限制，用户频繁访问时出现403错误。

**解决方案**：
- 实现智能错误检测，区分网络错误和API限制
- 设计优雅的降级机制，API限制时自动切换到预设数据
- 添加用户友好的警告提示，说明当前使用模拟数据
- 实现请求缓存，减少不必要的API调用

```javascript
// API限制检测和fallback
catch (error) {
    if (error.message.includes('403') || error.message.includes('rate limit')) {
        this.useFallbackData();
        this.showApiLimitWarning();
    }
}
```

### 3. **🎨 跨浏览器兼容性问题**

**挑战**：自定义光标在Safari中显示异常，backdrop-filter在旧版浏览器不支持。

**解决方案**：
- 使用CSS特性检测，提供fallback样式
- 添加浏览器前缀确保兼容性
- 实现渐进增强，核心功能在所有浏览器中可用
- 使用Babel转译ES6+代码，支持旧版浏览器

```css
/* 渐进增强的毛玻璃效果 */
.glass-effect {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    /* Safari兼容性 */
    -webkit-backdrop-filter: blur(10px);
}

/* fallback for unsupported browsers */
@supports not (backdrop-filter: blur(10px)) {
    .glass-effect {
        background: rgba(255, 255, 255, 0.3);
    }
}
```

### 4. **⚡ 模块化架构设计**

**挑战**：随着功能增加，代码文件超过2600行，维护困难，功能耦合严重。

**解决方案**：
- 采用面向对象设计，每个功能封装为独立类
- 实现统一的初始化管理器，按页面按需加载
- 使用事件驱动架构，降低模块间耦合
- 添加完善的错误处理和日志系统

```javascript
// 模块化初始化
document.addEventListener('DOMContentLoaded', () => {
    // 基础功能
    new PageManager();
    
    // 按页面条件加载
    if (document.body.classList.contains('about-page')) {
        new SkillsAnimationManager();
        new TimelineManager();
    }
    
    // 创意功能
    initCreativeFeatures();
});
```

### 5. **📊 Chart.js 响应式配置**

**挑战**：雷达图在不同屏幕尺寸下显示不佳，移动端图表文字过小。

**解决方案**：
- 实现动态配置系统，根据屏幕尺寸调整图表参数
- 使用ResizeObserver监听容器变化，实时更新图表
- 设计移动端专用的图表样式
- 添加图表加载状态和错误处理

```javascript
// 响应式图表配置
const isMobile = window.innerWidth < 768;
const chartOptions = {
    scales: {
        r: {
            pointLabels: {
                font: {
                    size: isMobile ? 10 : 12
                }
            }
        }
    }
};
```

## 🎯 项目价值与成果

### 📈 **技术成长**
- **JavaScript进阶**：从基础语法到ES6+特性，面向对象编程
- **CSS精通**：Grid/Flexbox布局，动画，响应式设计
- **API集成**：RESTful API调用，错误处理，数据处理
- **性能优化**：代码分离，懒加载，事件优化
- **工程化思维**：模块化架构，代码规范，文档编写

### 🎨 **设计能力**
- **用户体验**：交互设计，视觉反馈，无障碍访问
- **视觉设计**：色彩搭配，布局设计，品牌形象
- **创意思维**：彩蛋设计，动画效果，细节打磨

### 🚀 **实践经验**
- **项目管理**：需求分析，进度控制，质量保证
- **问题解决**：调试技巧，性能优化，兼容性处理
- **持续学习**：新技术学习，最佳实践应用

## 🔮 未来规划

### 📋 **短期优化**
- [ ] 添加更多博客文章内容
- [ ] 实现评论系统
- [ ] 添加访问统计
- [ ] SEO优化

### 🚀 **长期扩展**
- [ ] 后端API开发
- [ ] 数据库集成
- [ ] 内容管理系统
- [ ] PWA功能

## 📞 联系方式

- **📧 Email**: [邮箱地址]
- **💼 LinkedIn**: [LinkedIn链接]
- **🐱 GitHub**: [GitHub链接]
- **📱 微信**: [微信号]

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

---

**✨ 感谢您的关注！这个项目不仅展示了我的技术能力，更体现了我对前端开发的热情和对用户体验的追求。每一行代码都承载着我的学习成果和创意思考。**

**🚀 让我们一起探索前端开发的无限可能！**
