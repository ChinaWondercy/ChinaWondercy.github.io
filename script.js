// ================== 全局变量 ==================
let currentTheme = 'light';
let typewriterInterval;
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

// 打字机文本数组
const typewriterTexts = [
    "你好，我是邬驰宇",
    "一名前端开发爱好者",
    "正在学习全栈开发",
    "期待与你交流技术"
];

// ================== 日夜模式切换 ==================
class ThemeManager {
    constructor() {
        this.themeToggle = null;
        this.init();
    }

    init() {
        // 创建主题切换按钮
        this.createThemeToggle();
        // 绑定事件
        this.bindEvents();
        // 检查本地存储的主题
        this.loadTheme();
    }

    createThemeToggle() {
        // 查找导航栏
        const nav = document.querySelector('nav ul');
        if (nav) {
            // 创建主题切换按钮
            const themeToggle = document.createElement('button');
            themeToggle.className = 'theme-toggle';
            themeToggle.innerHTML = '☀️';
            themeToggle.title = '切换主题';
            
            // 插入到导航栏
            nav.appendChild(themeToggle);
            this.themeToggle = themeToggle;
        }
    }

    bindEvents() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
    }

    toggleTheme() {
        const body = document.body;
        if (currentTheme === 'light') {
            this.setDarkTheme();
        } else {
            this.setLightTheme();
        }
    }

    setDarkTheme() {
        document.body.classList.add('dark-mode');
        if (this.themeToggle) {
            this.themeToggle.innerHTML = '🌙';
        }
        currentTheme = 'dark';
        localStorage.setItem('theme', 'dark');
    }

    setLightTheme() {
        document.body.classList.remove('dark-mode');
        if (this.themeToggle) {
            this.themeToggle.innerHTML = '☀️';
        }
        currentTheme = 'light';
        localStorage.setItem('theme', 'light');
    }

    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            this.setDarkTheme();
        }
    }
}

// ================== 打字机效果 ==================
class TypewriterEffect {
    constructor(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.currentTextIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.interval = null;
        this.init();
    }

    init() {
        if (this.element) {
            this.start();
        }
    }

    start() {
        this.interval = setInterval(() => {
            this.type();
        }, this.speed);
    }

    type() {
        const currentText = this.texts[this.currentTextIndex];
        
        if (this.isDeleting) {
            // 删除字符
            this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            // 添加字符
            this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        // 处理删除和添加的切换
        if (!this.isDeleting && this.currentCharIndex === currentText.length) {
            // 完成输入，等待后开始删除
            setTimeout(() => {
                this.isDeleting = true;
            }, 2000);
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            // 完成删除，切换到下一句
            this.isDeleting = false;
            this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
            setTimeout(() => {
                // 短暂停顿后开始下一句
            }, 500);
        }
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// ================== GitHub项目卡片类 ==================
class ProjectCard {
    constructor(repo) {
        this.repo = repo;
        this.element = null;
    }

    render() {
        const card = document.createElement('article');
        card.className = 'project-card fade-in';
        
        const language = this.repo.language || '其他';
        const description = this.repo.description || '暂无描述';
        
        card.innerHTML = `
            <h3>${this.repo.name}</h3>
            <p>${description}</p>
            <div class="project-meta">
                <a href="${this.repo.html_url}" target="_blank" rel="noopener noreferrer">
                    🔗 查看项目
                </a>
                <span class="language-tag" data-language="${language}">${language}</span>
            </div>
        `;
        
        this.element = card;
        return card;
    }

    show() {
        if (this.element) {
            this.element.classList.remove('hidden');
        }
    }

    hide() {
        if (this.element) {
            this.element.classList.add('hidden');
        }
    }

    getLanguage() {
        return this.repo.language || '其他';
    }
}

// ================== 项目管理器 ==================
class ProjectManager {
    constructor() {
        this.projects = [];
        this.filteredProjects = [];
        this.currentFilter = 'all';
        this.init();
    }

    async init() {
        console.log('项目管理器初始化开始...');
        await this.fetchProjects();
        console.log('获取项目完成，项目数量:', this.projects.length);
        this.createFilterButtons();
        console.log('筛选按钮创建完成');
        this.renderProjects();
        console.log('项目渲染完成');
        this.bindFilterEvents();
        console.log('事件绑定完成');
    }

    async fetchProjects() {
        // 暂时跳过GitHub API请求，直接使用模拟数据
        console.log('跳过GitHub API请求，直接使用模拟数据...');
        this.useMockData();
        
        // 如果需要使用GitHub API，取消下面的注释
        /*
        try {
            // 这里使用模拟数据，实际使用时替换为你的GitHub用户名
            const username = 'ChinaWondercy'; // 替换为你的GitHub用户名
            console.log('尝试从GitHub API获取项目...');
            const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`);
            
            if (!response.ok) {
                throw new Error(`GitHub API 请求失败: ${response.status}`);
            }
            
            const repos = await response.json();
            console.log('GitHub API返回的仓库数量:', repos.length);
            this.projects = repos.map(repo => new ProjectCard(repo));
            this.filteredProjects = [...this.projects];
            
        } catch (error) {
            console.error('获取GitHub项目失败:', error);
            console.log('使用模拟数据作为备用...');
            // 使用模拟数据作为备用
            this.useMockData();
        }
        */
    }

    useMockData() {
        console.log('使用模拟数据...');
        const mockProjects = [
            {
                name: "个人主页项目",
                description: "使用HTML、CSS、JavaScript构建的响应式个人主页，包含日夜模式切换和动态效果。",
                language: "JavaScript",
                html_url: "#"
            },
            {
                name: "数据分析平台",
                description: "参与国家级大学生创新创业训练计划项目《智能数据分析平台》。",
                language: "Python",
                html_url: "#"
            },
            {
                name: "AI行为分析系统",
                description: "主持《基于AI的校园行为分析系统》，负责架构与实现。",
                language: "Python",
                html_url: "#"
            },
            {
                name: "前端组件库",
                description: "基于Vue.js构建的可复用前端组件库，提高开发效率。",
                language: "Vue",
                html_url: "#"
            },
            {
                name: "移动端应用",
                description: "使用React Native开发的跨平台移动应用。",
                language: "JavaScript",
                html_url: "#"
            },
            {
                name: "任务管理系统",
                description: "基于原生JavaScript开发的Web应用，包含任务创建、编辑、删除和状态管理功能。",
                language: "JavaScript",
                html_url: "#"
            },
            {
                name: "个人博客系统",
                description: "使用HTML、CSS和JavaScript构建的静态博客系统，支持Markdown渲染和响应式设计。",
                language: "HTML",
                html_url: "#"
            }
        ];

        console.log('模拟数据数组长度:', mockProjects.length);
        this.projects = mockProjects.map(project => new ProjectCard(project));
        this.filteredProjects = [...this.projects];
        console.log('模拟数据加载完成，项目数量:', this.projects.length);
        console.log('项目语言分布:', this.projects.map(p => p.getLanguage()));
    }

    createFilterButtons() {
        const projectsSection = document.querySelector('.projects-section');
        if (!projectsSection) return;

        // 获取所有语言
        const languages = [...new Set(this.projects.map(project => project.getLanguage()))];
        console.log('创建筛选按钮，语言列表:', languages);
        
        // 创建筛选按钮容器
        const filterContainer = document.createElement('div');
        filterContainer.className = 'filter-buttons';
        
        // 添加"全部"按钮
        const allButton = document.createElement('button');
        allButton.className = 'filter-btn active';
        allButton.textContent = '全部';
        allButton.dataset.filter = 'all';
        filterContainer.appendChild(allButton);
        
        // 添加语言筛选按钮
        languages.forEach(language => {
            const button = document.createElement('button');
            button.className = 'filter-btn';
            button.textContent = language;
            button.dataset.filter = language;
            filterContainer.appendChild(button);
        });
        
        // 插入到项目区域
        const projectsHeader = projectsSection.querySelector('.projects-header');
        if (projectsHeader) {
            projectsHeader.appendChild(filterContainer);
        }
    }

    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;
        
        // 清空现有内容
        projectsGrid.innerHTML = '';
        
        // 渲染项目卡片
        this.filteredProjects.forEach(project => {
            const card = project.render();
            projectsGrid.appendChild(card);
        });
    }

    bindFilterEvents() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const filter = e.target.dataset.filter;
                this.filterProjects(filter);
                this.updateActiveButton(e.target);
            });
        });
    }

    filterProjects(filter) {
        // 移除所有按钮的active类
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // 筛选项目
        if (filter === 'all') {
            this.filteredProjects = [...this.projects];
            this.currentFilter = 'all';
        } else {
            this.filteredProjects = this.projects.filter(project => 
                project.getLanguage() === filter
            );
            this.currentFilter = filter;
        }
        
        // 重新渲染
        this.renderProjects();
    }

    updateActiveButton(clickedButton) {
        clickedButton.classList.add('active');
    }
}

// ================== 兴趣爱好管理器 ==================
class HobbiesManager {
    constructor() {
        this.hobbies = [
            {
                icon: '🏀',
                title: '篮球',
                description: '热爱篮球运动，享受团队合作的乐趣'
            },
            {
                icon: '🎵',
                title: '音乐',
                description: '喜欢听各种类型的音乐，特别是流行和古典'
            },
            {
                icon: '✈️',
                title: '旅行',
                description: '喜欢探索新的地方，体验不同的文化'
            },
            {
                icon: '💻',
                title: '编程',
                description: '热爱编程，享受创造的过程'
            },
            {
                icon: '📚',
                title: '阅读',
                description: '喜欢阅读技术书籍和科幻小说'
            },
            {
                icon: '🎮',
                title: '游戏',
                description: '偶尔玩一些策略和角色扮演游戏'
            }
        ];
        
        this.init();
    }

    init() {
        this.renderHobbies();
    }

    renderHobbies() {
        const hobbiesSection = document.querySelector('.hobbies-section');
        if (!hobbiesSection) return;

        const hobbiesGrid = document.createElement('div');
        hobbiesGrid.className = 'hobbies-grid';

        this.hobbies.forEach(hobby => {
            const hobbyCard = document.createElement('div');
            hobbyCard.className = 'hobby-card fade-in';
            hobbyCard.innerHTML = `
                <div class="hobby-icon">${hobby.icon}</div>
                <h3>${hobby.title}</h3>
                <p>${hobby.description}</p>
            `;
            hobbiesGrid.appendChild(hobbyCard);
        });

        hobbiesSection.appendChild(hobbiesGrid);
    }
}

// ================== 技能条动画管理器 ==================
class SkillsAnimationManager {
    constructor() {
        this.skillsObserver = null;
        this.animatedSkills = new Set();
        this.init();
    }

    init() {
        this.createSkillsObserver();
        this.initRadarChart();
    }

    createSkillsObserver() {
        // 创建 Intersection Observer 来检测技能条是否进入视口
        this.skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedSkills.has(entry.target)) {
                    this.animateSkillBar(entry.target);
                    this.animatedSkills.add(entry.target);
                }
            });
        }, {
            threshold: 0.3, // 当30%的元素可见时触发
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察所有技能条
        const skillBars = document.querySelectorAll('.skill-bar');
        console.log('找到技能条数量:', skillBars.length);
        skillBars.forEach(bar => {
            this.skillsObserver.observe(bar);
        });
    }

    animateSkillBar(skillBar) {
        console.log('技能条动画触发');
        const progressBar = skillBar.querySelector('.skill-progress');
        if (!progressBar) {
            console.log('未找到 skill-progress 元素');
            return;
        }

        const percentage = progressBar.dataset.percentage;
        if (!percentage) {
            console.log('未找到百分比数据');
            return;
        }

        console.log('开始动画，百分比:', percentage);
        // 延迟一点时间开始动画，让用户有准备
        setTimeout(() => {
            progressBar.style.width = percentage + '%';
            progressBar.classList.add('animate');
            console.log('技能条动画执行完成');
        }, 200);
    }

    initRadarChart() {
        const canvas = document.getElementById('skillsRadarChart');
        if (!canvas) {
            console.log('Canvas元素未找到: skillsRadarChart');
            return;
        }

        // 检查Chart.js是否加载
        if (typeof Chart === 'undefined') {
            console.error('Chart.js未加载，请检查CDN链接');
            return;
        }

        const ctx = canvas.getContext('2d');
        
        // 技能数据
        const skillsData = {
            labels: ['编程能力', '设计思维', '沟通协作', '学习能力', '问题解决', '团队合作'],
            datasets: [{
                label: '技能水平',
                data: [85, 70, 80, 90, 75, 85],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        };

        // 创建雷达图
        try {
            new Chart(ctx, {
                type: 'radar',
                data: skillsData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            top: 20,
                            bottom: 20,
                            left: 20,
                            right: 20
                        }
                    },
                    scales: {
                        r: {
                            beginAtZero: true,
                            max: 100,
                            min: 0,
                            ticks: {
                                stepSize: 25,
                                color: '#6b7280',
                                font: {
                                    size: 9
                                },
                                backdropColor: 'transparent',
                                display: true
                            },
                            grid: {
                                color: '#e5e7eb',
                                lineWidth: 1
                            },
                            angleLines: {
                                color: '#e5e7eb',
                                lineWidth: 1
                            },
                            pointLabels: {
                                color: '#374151',
                                font: {
                                    size: 10,
                                    weight: '600'
                                },
                                padding: 8
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            enabled: true,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            cornerRadius: 4
                        }
                    },
                    elements: {
                        point: {
                            radius: 3,
                            hoverRadius: 5,
                            backgroundColor: '#3b82f6',
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        line: {
                            borderWidth: 2,
                            fill: true
                        }
                    }
                }
            });
            console.log('雷达图创建成功');
        } catch (error) {
            console.error('创建雷达图时出错:', error);
        }
    }
}

// ================== 时间轴管理器 ==================
class TimelineManager {
    constructor() {
        this.timelineObserver = null;
        this.animatedItems = new Set();
        this.init();
    }

    init() {
        this.createTimelineObserver();
        this.bindTimelineEvents();
    }

    createTimelineObserver() {
        // 创建 Intersection Observer 来检测时间轴项目是否进入视口
        this.timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedItems.has(entry.target)) {
                    this.animateTimelineItem(entry.target);
                    this.animatedItems.add(entry.target);
                }
            });
        }, {
            threshold: 0.3, // 当30%的元素可见时触发
            rootMargin: '0px 0px -50px 0px'
        });

        // 观察所有时间轴项目
        const timelineItems = document.querySelectorAll('.timeline-item');
        console.log('找到时间轴项目数量:', timelineItems.length);
        timelineItems.forEach(item => {
            this.timelineObserver.observe(item);
        });
    }

    animateTimelineItem(timelineItem) {
        // 添加动画类
        timelineItem.classList.add('animate');
        console.log('时间轴项目动画触发');
    }

    bindTimelineEvents() {
        // 为每个时间轴内容添加点击事件
        const timelineContents = document.querySelectorAll('.timeline-content');
        console.log('绑定时间轴事件，找到内容数量:', timelineContents.length);
        timelineContents.forEach(content => {
            content.addEventListener('click', (e) => {
                // 如果点击的是时间轴内容本身，则切换详情展开
                if (e.target === content || content.contains(e.target)) {
                    this.toggleTimelineDetails(content);
                }
            });
        });
    }

    toggleTimelineDetails(content) {
        const details = content.querySelector('.timeline-details');
        if (details) {
            details.classList.toggle('expanded');
            
            // 添加一些视觉反馈
            if (details.classList.contains('expanded')) {
                content.style.borderColor = '#3b82f6';
                content.style.transform = 'translateY(-5px) scale(1.02)';
            } else {
                content.style.borderColor = '';
                content.style.transform = '';
            }
        }
    }
}

// ================== 博客管理器 ==================
class BlogManager {
    constructor() {
        this.posts = [];
        this.currentPost = null;
        this.init();
    }

    init() {
        this.loadPosts();
        this.renderPostsList();
        this.bindEvents();
    }

    loadPosts() {
        // 模拟博客文章数据
        this.posts = [
            {
                id: 'post1',
                title: '我的前端学习之路',
                description: '分享我从零开始学习前端开发的经历和心得',
                content: `# 我的前端学习之路

## 引言
作为一名计算机专业的学生，我对前端开发一直充满好奇。这篇文章将分享我从零开始学习前端开发的经历和心得。

## 学习历程

### 第一阶段：HTML/CSS基础
- 学习HTML标签和语义化
- 掌握CSS布局和样式
- 理解响应式设计原理

### 第二阶段：JavaScript进阶
- 深入学习JavaScript语法
- 掌握DOM操作和事件处理
- 学习ES6+新特性

### 第三阶段：框架学习
- Vue.js基础和应用
- React组件化开发
- 状态管理和路由

## 学习心得

> 前端开发不仅仅是写代码，更是一种艺术。好的用户体验需要我们在细节上下功夫。

## 代码示例

\`\`\`javascript
// 一个简单的Vue组件
export default {
  name: 'HelloWorld',
  data() {
    return {
      message: 'Hello Vue!'
    }
  },
  methods: {
    greet() {
      alert(this.message);
    }
  }
}
\`\`\`

## 未来规划
1. 深入学习TypeScript
2. 掌握Node.js后端开发
3. 学习移动端开发技术

---

*学习是一个持续的过程，我会继续努力，在前端开发的道路上不断前进！*`
            },
            {
                id: 'post2',
                title: 'CSS动画技巧分享',
                description: '介绍一些实用的CSS动画技巧和最佳实践',
                content: `# CSS动画技巧分享

## 为什么使用CSS动画？

CSS动画相比JavaScript动画有以下优势：
- 性能更好，GPU加速
- 代码更简洁
- 浏览器优化更好

## 常用动画属性

### 1. transition
\`\`\`css
.element {
  transition: all 0.3s ease;
}
\`\`\`

### 2. transform
\`\`\`css
.element:hover {
  transform: translateY(-10px) scale(1.1);
}
\`\`\`

### 3. animation
\`\`\`css
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.element {
  animation: slideIn 0.5s ease-out;
}
\`\`\`

## 性能优化建议

1. **使用transform和opacity**
   - 这两个属性不会触发重排和重绘
   - 性能最佳

2. **避免频繁改变布局属性**
   - 如width、height、top、left等
   - 会触发重排

3. **使用will-change**
   - 提前告知浏览器元素将要变化
   - 优化渲染性能

## 实用动画示例

### 卡片悬停效果
\`\`\`css
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}
\`\`\`

### 加载动画
\`\`\`css
@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading {
  animation: spin 1s linear infinite;
}
\`\`\`

## 总结

CSS动画是现代Web开发中不可或缺的技能。通过合理使用，我们可以创造出流畅、优雅的用户体验。记住，好的动画应该是：
- 有意义的
- 性能优秀的
- 用户体验友好的

让我们一起在前端动画的世界里探索更多可能性！`
            },
            {
                id: 'post3',
                title: 'JavaScript异步编程详解',
                description: '深入理解JavaScript中的异步编程模式和最佳实践',
                content: `# JavaScript异步编程详解

## 什么是异步编程？

异步编程允许程序在等待某些操作完成时继续执行其他代码，这对于处理网络请求、文件操作等耗时任务非常重要。

## 异步编程的演进

### 1. 回调函数（Callback）
\`\`\`javascript
// 传统的回调方式
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Data:', data);
});
\`\`\`

**问题：**
- 回调地狱（Callback Hell）
- 错误处理困难
- 代码难以维护

### 2. Promise
\`\`\`javascript
// Promise方式
fetch('/api/data')
  .then(response => response.json())
  .then(data => {
    console.log('Data:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
\`\`\`

**优势：**
- 链式调用
- 统一的错误处理
- 更好的可读性

### 3. Async/Await
\`\`\`javascript
// 最现代的异步方式
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

**优势：**
- 代码更同步化
- 错误处理更简单
- 调试更容易

## 实际应用示例

### 并行请求
\`\`\`javascript
async function fetchMultipleData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { users, posts, comments };
}
\`\`\`

### 错误处理
\`\`\`javascript
async function robustFetch(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Fetch failed:', error);
    // 返回默认值或重试
    return null;
  }
}
\`\`\`

## 最佳实践

1. **总是使用try-catch**
   - 异步函数中的错误需要显式捕获

2. **避免混合使用**
   - 在同一个项目中保持一致的异步模式

3. **合理使用Promise.all**
   - 并行执行独立的异步操作

4. **超时处理**
   - 为异步操作设置合理的超时时间

## 总结

异步编程是JavaScript开发中的核心概念。随着语言的发展，我们有了越来越优雅的方式来处理异步操作。选择合适的方式，可以让我们的代码更加清晰、可维护。

记住：**异步编程不是目的，而是手段。我们的目标是写出更好的代码！**`
            }
        ];
    }

    renderPostsList() {
        const postsList = document.querySelector('.posts-list');
        if (!postsList) return;

        postsList.innerHTML = '';
        
        this.posts.forEach(post => {
            const postItem = document.createElement('div');
            postItem.className = 'post-item';
            postItem.dataset.postId = post.id;
            
            postItem.innerHTML = `
                <h4>${post.title}</h4>
                <p>${post.description}</p>
            `;
            
            postsList.appendChild(postItem);
        });
    }

    bindEvents() {
        const postsList = document.querySelector('.posts-list');
        if (!postsList) return;

        postsList.addEventListener('click', (e) => {
            const postItem = e.target.closest('.post-item');
            if (postItem) {
                const postId = postItem.dataset.postId;
                this.loadPost(postId);
                this.updateActivePost(postItem);
            }
        });
    }

    updateActivePost(clickedItem) {
        // 移除所有active类
        document.querySelectorAll('.post-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // 添加active类到点击的项目
        clickedItem.classList.add('active');
    }

    async loadPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;

        this.currentPost = post;
        this.renderPost(post);
    }

    renderPost(post) {
        const blogArticle = document.querySelector('.blog-article');
        const blogPlaceholder = document.querySelector('.blog-placeholder');
        
        if (!blogArticle || !blogPlaceholder) return;

        // 隐藏占位符
        blogPlaceholder.style.display = 'none';
        
        // 显示文章
        blogArticle.style.display = 'block';
        
        // 使用Marked.js解析Markdown
        try {
            // 检查marked是否加载
            if (typeof marked === 'undefined') {
                console.error('Marked.js未加载，请检查CDN链接');
                blogArticle.innerHTML = '<p>Markdown解析库未加载，无法显示文章内容。</p>';
                return;
            }
            
            const htmlContent = marked.parse(post.content);
            blogArticle.innerHTML = htmlContent;
            
            // 添加淡入动画
            blogArticle.style.opacity = '0';
            blogArticle.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                blogArticle.style.transition = 'all 0.5s ease';
                blogArticle.style.opacity = '1';
                blogArticle.style.transform = 'translateY(0)';
            }, 100);
            
        } catch (error) {
            console.error('Markdown解析错误:', error);
            blogArticle.innerHTML = '<p>文章加载失败，请稍后重试。</p>';
        }
    }
}

// ================== 页面初始化 ==================
class PageManager {
    constructor() {
        this.themeManager = null;
        this.typewriter = null;
        this.projectManager = null;
        this.hobbiesManager = null;
        this.blogManager = null; // 新增博客管理器
        this.init();
    }

    init() {
        // 等待DOM加载完成
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupPage();
            });
        } else {
            this.setupPage();
        }
    }

    setupPage() {
        // 初始化主题管理器
        this.themeManager = new ThemeManager();
        
        // 初始化打字机效果
        this.initTypewriter();
        
        // 初始化项目管理器（已移除）
        // this.initProjects();
        
        // 初始化兴趣爱好
        this.initHobbies();
        
        // 初始化博客管理器
        this.initBlog();
        
        // 添加页面加载动画
        this.addPageAnimations();
    }

    initTypewriter() {
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            this.typewriter = new TypewriterEffect(heroTitle, typewriterTexts, 100);
        }
    }

    initProjects() {
        // 项目展示功能已移除
        // const projectsSection = document.querySelector('.projects-section');
        // if (projectsSection) {
        //     this.projectManager = new ProjectManager();
        // }
    }

    initHobbies() {
        const hobbiesSection = document.querySelector('.hobbies-section');
        if (hobbiesSection) {
            this.hobbiesManager = new HobbiesManager();
        }
    }

    initBlog() {
        const blogSection = document.querySelector('.blog-section');
        if (blogSection) {
            this.blogManager = new BlogManager();
        }
    }

    addPageAnimations() {
        // 为所有卡片添加淡入动画
        const cards = document.querySelectorAll('.card, .project-card, .hobby-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }
}

// ================== 工具函数 ==================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ================== 页面加载完成后的初始化 ==================
document.addEventListener('DOMContentLoaded', () => {
    // 初始化粒子背景系统
    if (document.getElementById('particle-canvas')) {
        new ParticleSystem();
    }
    
    // 初始化创意功能
    initCreativeFeatures();
    
    // 初始化页面管理器
    const pageManager = new PageManager();
    
    // 检查是否在About页面
    if (document.body.classList.contains('about-page')) {
        // 初始化技能动画管理器
        const skillsManager = new SkillsAnimationManager();
        
        // 初始化时间轴管理器
        const timelineManager = new TimelineManager();
        
        // 初始化博客管理器
        const blogManager = new BlogManager();
    }
    
    // 检查是否在Portfolio页面
    if (document.querySelector('.portfolio-main')) {
        initPortfolioFilters();
    }
    

    
    // 添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.card, .hobby-card, .project-card, .news-card').forEach(el => {
        observer.observe(el);
    });
});

// ================== 粒子背景系统 ==================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.particleCount = 150;
        this.mouseRadius = 100;
        
        this.init();
    }

    init() {
        this.setupCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                originalX: 0,
                originalY: 0,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                twinkle: Math.random() * 0.02 + 0.01
            });
        }
        // 设置原始位置
        this.particles.forEach(particle => {
            particle.originalX = particle.x;
            particle.originalY = particle.y;
        });
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        document.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // 计算与鼠标的距离
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // 鼠标影响范围内的粒子
            if (distance < this.mouseRadius) {
                const force = (this.mouseRadius - distance) / this.mouseRadius;
                const angle = Math.atan2(dy, dx);
                particle.vx += Math.cos(angle) * force * 0.3;
                particle.vy += Math.sin(angle) * force * 0.3;
            }

            // 自然运动
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 回归原位的力
            const returnForceX = (particle.originalX - particle.x) * 0.01;
            const returnForceY = (particle.originalY - particle.y) * 0.01;
            particle.vx += returnForceX;
            particle.vy += returnForceY;

            // 阻尼
            particle.vx *= 0.98;
            particle.vy *= 0.98;

            // 闪烁效果
            particle.opacity += particle.twinkle;
            if (particle.opacity > 1 || particle.opacity < 0.2) {
                particle.twinkle *= -1;
            }

            // 边界检查
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.originalX = Math.random() * this.canvas.width;
                particle.x = particle.originalX;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.originalY = Math.random() * this.canvas.height;
                particle.y = particle.originalY;
            }
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制粒子
        this.particles.forEach(particle => {
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });

        // 绘制连接线
        this.drawConnections();
        
        // 绘制鼠标附近的星云效果
        this.drawMouseEffect();
    }

    drawConnections() {
        this.particles.forEach((particle, i) => {
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 80) {
                    this.ctx.save();
                    this.ctx.globalAlpha = (80 - distance) / 80 * 0.3;
                    this.ctx.strokeStyle = '#ffffff';
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        });
    }

    drawMouseEffect() {
        if (this.mouse.x < 0 || this.mouse.y < 0) return;

        // 绘制鼠标光晕
        const gradient = this.ctx.createRadialGradient(
            this.mouse.x, this.mouse.y, 0,
            this.mouse.x, this.mouse.y, this.mouseRadius
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        this.ctx.save();
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, this.mouseRadius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        // 在鼠标附近生成额外的粒子效果
        for (let i = 0; i < 5; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 30 + 10;
            const x = this.mouse.x + Math.cos(angle) * radius;
            const y = this.mouse.y + Math.sin(angle) * radius;

            this.ctx.save();
            this.ctx.globalAlpha = Math.random() * 0.5 + 0.3;
            this.ctx.fillStyle = '#ffffff';
            this.ctx.beginPath();
            this.ctx.arc(x, y, Math.random() * 2 + 1, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        }
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// ================== GitHub Portfolio 管理器 ==================
class GitHubPortfolioManager {
    constructor() {
        this.projects = [];
        this.languages = new Set();
        this.currentFilter = 'all';
        this.apiBaseUrl = 'https://api.github.com';
        this.init();
    }

    init() {
        this.bindEvents();
        // 自动加载默认用户的项目
        this.loadProjects();
    }

    bindEvents() {
        const loadBtn = document.getElementById('load-projects');
        const retryBtn = document.getElementById('retry-load');
        const usernameInput = document.getElementById('github-username');

        if (loadBtn) {
            loadBtn.addEventListener('click', () => this.loadProjects());
        }

        if (retryBtn) {
            retryBtn.addEventListener('click', () => this.loadProjects());
        }

        if (usernameInput) {
            usernameInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.loadProjects();
                }
            });
        }
    }

    async loadProjects() {
        const username = document.getElementById('github-username')?.value.trim();
        if (!username) {
            this.showError('请输入GitHub用户名');
            return;
        }

        this.showLoading();
        this.hideError();
        this.hideEmptyState();

        try {
            console.log(`正在获取 ${username} 的GitHub仓库...`);
            
            // 获取用户的仓库列表，按更新时间排序
            const response = await fetch(`${this.apiBaseUrl}/users/${username}/repos?per_page=100&sort=updated&type=all`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error(`用户 "${username}" 不存在`);
                } else if (response.status === 403) {
                    throw new Error('GitHub API 访问限制，请稍后重试');
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const repos = await response.json();
            console.log(`获取到 ${repos.length} 个仓库`);
            
            if (repos.length === 0) {
                this.showEmptyState();
                return;
            }

            // 过滤仓库：包含原创项目和GitHub Pages项目
            const filteredRepos = repos.filter(repo => {
                // 包含非fork的仓库
                if (!repo.fork) return true;
                // 包含GitHub Pages仓库（通常是 username.github.io）
                if (repo.name.includes('.github.io')) return true;
                return false;
            });

            console.log(`过滤后剩余 ${filteredRepos.length} 个仓库`);
            
            if (filteredRepos.length === 0) {
                this.showEmptyState();
                return;
            }
            
            // 获取每个仓库的语言信息
            this.projects = await this.enrichProjectsWithLanguages(filteredRepos, username);
            
            this.extractLanguages();
            this.createLanguageFilters();
            this.renderProjects();
            this.hideLoading();

            console.log(`成功加载 ${this.projects.length} 个项目`);

        } catch (error) {
            console.error('Error loading GitHub projects:', error);
            
            // 如果是API限制，使用备用数据
            if (error.message.includes('GitHub API 访问限制') || error.message.includes('403')) {
                console.log('GitHub API受限，使用模拟数据...');
                this.useFallbackData(username);
                this.hideLoading();
                return;
            }
            
            this.showError(`加载失败: ${error.message}`);
            this.hideLoading();
        }
    }

    async enrichProjectsWithLanguages(repos, username) {
        const enrichedProjects = [];

        for (const repo of repos) {
            try {
                // 获取仓库的语言信息
                const langResponse = await fetch(`${this.apiBaseUrl}/repos/${username}/${repo.name}/languages`);
                const languages = langResponse.ok ? await langResponse.json() : {};

                // 获取主要语言（使用字节数最多的语言）
                const primaryLanguage = repo.language || Object.keys(languages)[0] || 'Unknown';

                enrichedProjects.push({
                    ...repo,
                    languages: languages,
                    primaryLanguage: primaryLanguage
                });

                // 添加延迟避免API速率限制
                await this.sleep(100);
            } catch (error) {
                console.warn(`Failed to get languages for ${repo.name}:`, error);
                enrichedProjects.push({
                    ...repo,
                    languages: {},
                    primaryLanguage: repo.language || 'Unknown'
                });
            }
        }

        return enrichedProjects;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    extractLanguages() {
        this.languages.clear();
        this.projects.forEach(project => {
            if (project.primaryLanguage && project.primaryLanguage !== 'Unknown') {
                this.languages.add(project.primaryLanguage);
            }
        });
    }

    createLanguageFilters() {
        const filtersContainer = document.getElementById('language-filters');
        if (!filtersContainer) return;

        filtersContainer.innerHTML = '';

        // 创建"全部"按钮
        const allBtn = this.createFilterButton('all', '全部', true);
        filtersContainer.appendChild(allBtn);

        // 创建语言筛选按钮
        const sortedLanguages = Array.from(this.languages).sort();
        sortedLanguages.forEach(language => {
            const btn = this.createFilterButton(language, language, false);
            filtersContainer.appendChild(btn);
        });
    }

    createFilterButton(value, text, isActive = false) {
        const button = document.createElement('button');
        button.className = `filter-btn ${isActive ? 'active' : ''}`;
        button.setAttribute('data-language', value);
        button.textContent = text;

        button.addEventListener('click', () => {
            this.filterProjects(value);
            this.updateActiveButton(button);
        });

        return button;
    }

    updateActiveButton(activeButton) {
        const allButtons = document.querySelectorAll('.filter-btn');
        allButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
    }

    filterProjects(language) {
        this.currentFilter = language;
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const cardLanguage = card.getAttribute('data-language');
            
            if (language === 'all' || cardLanguage === language) {
                this.showCard(card);
            } else {
                this.hideCard(card);
            }
        });
    }

    showCard(card) {
        card.classList.remove('fade-out');
        card.classList.add('fade-in');
        setTimeout(() => {
            card.style.display = 'block';
        }, 50);
    }

    hideCard(card) {
        card.classList.remove('fade-in');
        card.classList.add('fade-out');
        setTimeout(() => {
            if (card.classList.contains('fade-out')) {
                card.style.display = 'none';
            }
        }, 400);
    }

    renderProjects() {
        const container = document.getElementById('projects-container');
        if (!container) return;

        container.innerHTML = '';

        this.projects.forEach(project => {
            const card = this.createProjectCard(project);
            container.appendChild(card);
        });

        // 添加渐入动画
        setTimeout(() => {
            container.querySelectorAll('.project-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100);
            });
        }, 100);
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-language', project.primaryLanguage);

        const languageColors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#2b7489',
            'Python': '#3572A5',
            'Java': '#b07219',
            'HTML': '#e34c26',
            'CSS': '#1572B6',
            'Vue': '#4FC08D',
            'React': '#61DAFB',
            'PHP': '#777bb4',
            'C++': '#f34b7d',
            'C': '#555555',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Swift': '#fa7343',
            'Kotlin': '#F18E33',
            'Shell': '#89e051',
            'Dockerfile': '#384d54',
            'Unknown': '#6b7280'
        };

        const languageColor = languageColors[project.primaryLanguage] || '#6b7280';
        
        // 特殊处理GitHub Pages项目
        const isGitHubPages = project.name.includes('.github.io');
        const repoIcon = isGitHubPages ? '🌐' : '📁';
        const projectType = isGitHubPages ? 'GitHub Pages' : (project.private ? '私有' : '公开');
        
        // 生成项目链接，优先显示GitHub Pages链接
        const projectUrl = isGitHubPages ? `https://${project.name}` : project.homepage;
        
        card.innerHTML = `
            <div class="project-image">
                <div class="project-placeholder">
                    <div class="repo-icon">${repoIcon}</div>
                    <div class="language-badge" style="background-color: ${languageColor}">
                        ${project.primaryLanguage}
                    </div>
                    ${isGitHubPages ? '<div class="pages-badge">GitHub Pages</div>' : ''}
                </div>
                <div class="project-overlay">
                    <div class="project-links">
                        ${projectUrl ? 
                            `<a href="${projectUrl}" target="_blank" class="project-link" title="查看项目">
                                <span>🔗</span>
                            </a>` : ''
                        }
                        <a href="${project.html_url}" target="_blank" class="project-link" title="查看代码">
                            <span>💻</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="project-content">
                <div class="project-header">
                    <h3>${this.formatProjectName(project.name)}</h3>
                    <span class="project-status ${isGitHubPages ? 'github-pages' : ''}">${projectType}</span>
                </div>
                <p>${project.description || '这是一个有趣的项目，期待您的探索'}</p>
                <div class="project-tech">
                    ${Object.keys(project.languages).slice(0, 4).map(lang => 
                        `<span class="tech-tag">${lang}</span>`
                    ).join('')}
                    ${Object.keys(project.languages).length === 0 ? 
                        `<span class="tech-tag">${project.primaryLanguage}</span>` : ''
                    }
                </div>
                <div class="project-footer">
                    <span class="project-date">更新于 ${this.formatDate(project.updated_at)}</span>
                    <div class="project-stats">
                        <span class="stars">⭐ ${project.stargazers_count || 0}</span>
                        <span class="forks">🍴 ${project.forks_count || 0}</span>
                        ${project.size ? `<span class="size">📦 ${this.formatSize(project.size)}</span>` : ''}
                    </div>
                </div>
            </div>
        `;

        return card;
    }

    formatProjectName(name) {
        // 美化项目名称显示
        return name
            .replace(/[-_]/g, ' ')  // 替换连字符和下划线为空格
            .replace(/\.github\.io$/, ' (Personal Site)')  // 标记GitHub Pages站点
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    }

    formatSize(sizeKB) {
        if (sizeKB < 1024) return `${sizeKB}KB`;
        if (sizeKB < 1024 * 1024) return `${Math.round(sizeKB / 1024)}MB`;
        return `${Math.round(sizeKB / (1024 * 1024))}GB`;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    showLoading() {
        const loading = document.querySelector('.loading-container');
        if (loading) loading.style.display = 'block';
    }

    hideLoading() {
        const loading = document.querySelector('.loading-container');
        if (loading) loading.style.display = 'none';
    }

    showError(message) {
        const error = document.querySelector('.error-container');
        const errorMessage = document.querySelector('.error-message');
        if (error && errorMessage) {
            errorMessage.textContent = message;
            error.style.display = 'block';
        }
    }

    hideError() {
        const error = document.querySelector('.error-container');
        if (error) error.style.display = 'none';
    }

    showEmptyState() {
        const empty = document.querySelector('.empty-state');
        if (empty) empty.style.display = 'block';
    }

    hideEmptyState() {
        const empty = document.querySelector('.empty-state');
        if (empty) empty.style.display = 'none';
    }

    // 备用数据系统 - 当GitHub API受限时使用
    useFallbackData(username) {
        console.log(`为用户 ${username} 使用备用数据`);
        
        // 显示警告信息
        this.showApiLimitWarning();
        
        // 根据用户名提供相应的模拟数据
        const fallbackData = this.getFallbackDataForUser(username);
        
        // 转换为项目格式
        this.projects = fallbackData.map(project => ({
            ...project,
            languages: project.languages || {},
            primaryLanguage: project.language || 'Unknown'
        }));
        
        this.extractLanguages();
        this.createLanguageFilters();
        this.renderProjects();
        
        console.log(`备用数据加载完成，共 ${this.projects.length} 个项目`);
    }

    getFallbackDataForUser(username) {
        // 为ChinaWondercy用户提供专门的模拟数据
        if (username.toLowerCase() === 'chinawondercy') {
            return [
                {
                    name: 'ChinaWondercy.github.io',
                    description: '个人主页网站，展示前端开发技能和项目作品',
                    language: 'HTML',
                    languages: { 'HTML': 45, 'CSS': 35, 'JavaScript': 20 },
                    html_url: 'https://github.com/ChinaWondercy/ChinaWondercy.github.io',
                    homepage: 'https://chinawondercy.github.io',
                    stargazers_count: 5,
                    forks_count: 2,
                    size: 1024,
                    updated_at: '2024-12-20T10:00:00Z',
                    private: false,
                    fork: false
                },
                {
                    name: 'frontend-learning-notes',
                    description: '前端学习笔记和代码示例集合',
                    language: 'JavaScript',
                    languages: { 'JavaScript': 60, 'HTML': 25, 'CSS': 15 },
                    html_url: 'https://github.com/ChinaWondercy/frontend-learning-notes',
                    stargazers_count: 8,
                    forks_count: 3,
                    size: 2048,
                    updated_at: '2024-12-15T14:30:00Z',
                    private: false,
                    fork: false
                },
                {
                    name: 'vue-component-library',
                    description: '基于Vue.js的可复用组件库项目',
                    language: 'Vue',
                    languages: { 'Vue': 70, 'JavaScript': 20, 'CSS': 10 },
                    html_url: 'https://github.com/ChinaWondercy/vue-component-library',
                    stargazers_count: 12,
                    forks_count: 4,
                    size: 3072,
                    updated_at: '2024-12-10T09:15:00Z',
                    private: false,
                    fork: false
                },
                {
                    name: 'python-data-analysis',
                    description: '数据分析项目，使用Python进行数据处理和可视化',
                    language: 'Python',
                    languages: { 'Python': 85, 'Jupyter Notebook': 15 },
                    html_url: 'https://github.com/ChinaWondercy/python-data-analysis',
                    stargazers_count: 6,
                    forks_count: 1,
                    size: 1536,
                    updated_at: '2024-12-05T16:45:00Z',
                    private: false,
                    fork: false
                },
                {
                    name: 'react-todo-app',
                    description: '使用React开发的现代化任务管理应用',
                    language: 'JavaScript',
                    languages: { 'JavaScript': 75, 'CSS': 15, 'HTML': 10 },
                    html_url: 'https://github.com/ChinaWondercy/react-todo-app',
                    stargazers_count: 10,
                    forks_count: 5,
                    size: 896,
                    updated_at: '2024-11-28T11:20:00Z',
                    private: false,
                    fork: false
                },
                {
                    name: 'css-animations-showcase',
                    description: 'CSS动画效果展示和学习项目',
                    language: 'CSS',
                    languages: { 'CSS': 80, 'HTML': 20 },
                    html_url: 'https://github.com/ChinaWondercy/css-animations-showcase',
                    stargazers_count: 15,
                    forks_count: 7,
                    size: 512,
                    updated_at: '2024-11-20T13:10:00Z',
                    private: false,
                    fork: false
                }
            ];
        }

        // 为其他用户提供通用模拟数据
        return [
            {
                name: 'personal-website',
                description: '个人网站项目，展示开发技能和作品集',
                language: 'HTML',
                languages: { 'HTML': 50, 'CSS': 30, 'JavaScript': 20 },
                html_url: `https://github.com/${username}/personal-website`,
                homepage: `https://${username}.github.io`,
                stargazers_count: 3,
                forks_count: 1,
                size: 1024,
                updated_at: '2024-12-20T10:00:00Z',
                private: false,
                fork: false
            },
            {
                name: 'learning-projects',
                description: '学习过程中创建的各种项目集合',
                language: 'JavaScript',
                languages: { 'JavaScript': 70, 'HTML': 20, 'CSS': 10 },
                html_url: `https://github.com/${username}/learning-projects`,
                stargazers_count: 5,
                forks_count: 2,
                size: 2048,
                updated_at: '2024-12-15T14:30:00Z',
                private: false,
                fork: false
            },
            {
                name: 'web-app-demo',
                description: '前端Web应用演示项目',
                language: 'JavaScript',
                languages: { 'JavaScript': 60, 'CSS': 25, 'HTML': 15 },
                html_url: `https://github.com/${username}/web-app-demo`,
                stargazers_count: 7,
                forks_count: 3,
                size: 1536,
                updated_at: '2024-12-10T09:15:00Z',
                private: false,
                fork: false
            }
        ];
    }

    showApiLimitWarning() {
        // 在页面顶部显示API限制警告
        const projectsHeader = document.querySelector('.projects-header');
        if (projectsHeader) {
            const warning = document.createElement('div');
            warning.className = 'api-warning';
            warning.innerHTML = `
                <div class="warning-content">
                    <span class="warning-icon">⚠️</span>
                    <div class="warning-text">
                        <strong>GitHub API访问受限</strong>
                        <p>当前显示为模拟数据，请稍后重试获取真实项目数据</p>
                    </div>
                    <button class="warning-close" onclick="this.parentElement.parentElement.remove()">×</button>
                </div>
            `;
            projectsHeader.insertBefore(warning, projectsHeader.firstChild);
        }
    }
}

// ================== Index页面GitHub项目管理器 ==================
class IndexProjectsManager {
    constructor() {
        this.projects = [];
        this.apiBaseUrl = 'https://api.github.com';
        this.username = 'ChinaWondercy'; // 默认用户名
        this.maxProjects = 6; // Index页面最多显示6个项目
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadProjects();
    }

    bindEvents() {
        const retryBtn = document.querySelector('.retry-projects-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => this.loadProjects());
        }
    }

    async loadProjects() {
        this.showLoading();
        this.hideError();

        try {
            console.log(`正在为Index页面获取 ${this.username} 的GitHub仓库...`);
            
            // 获取用户的仓库列表
            const response = await fetch(`${this.apiBaseUrl}/users/${this.username}/repos?per_page=30&sort=updated&type=all`);
            
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('GitHub API 访问限制');
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const repos = await response.json();
            console.log(`获取到 ${repos.length} 个仓库`);
            
            // 过滤并选择最佳项目
            const filteredRepos = this.filterBestRepos(repos);
            
            // 获取前几个项目的详细信息
            this.projects = await this.enrichProjectsWithLanguages(filteredRepos.slice(0, this.maxProjects));
            
            this.renderProjects();
            this.hideLoading();

            console.log(`Index页面成功加载 ${this.projects.length} 个项目`);

        } catch (error) {
            console.error('Error loading projects for Index page:', error);
            
            // 如果是API限制，使用备用数据
            if (error.message.includes('GitHub API 访问限制') || error.message.includes('403')) {
                console.log('GitHub API受限，为Index页面使用模拟数据...');
                this.useFallbackData();
                this.hideLoading();
                return;
            }
            
            this.showError(`加载失败: ${error.message}`);
            this.hideLoading();
        }
    }

    filterBestRepos(repos) {
        // 筛选最佳项目：优先显示非fork、有描述、有语言、最近更新的项目
        return repos
            .filter(repo => {
                // 包含非fork的仓库和GitHub Pages项目
                if (!repo.fork) return true;
                if (repo.name.includes('.github.io')) return true;
                return false;
            })
            .filter(repo => repo.description) // 有描述的项目
            .sort((a, b) => {
                // 按星标数和更新时间排序
                const scoreA = (a.stargazers_count || 0) * 10 + (new Date(a.updated_at).getTime() / 1000000000);
                const scoreB = (b.stargazers_count || 0) * 10 + (new Date(b.updated_at).getTime() / 1000000000);
                return scoreB - scoreA;
            });
    }

    async enrichProjectsWithLanguages(repos) {
        const enrichedProjects = [];

        for (const repo of repos) {
            try {
                // 获取仓库的语言信息
                const langResponse = await fetch(`${this.apiBaseUrl}/repos/${this.username}/${repo.name}/languages`);
                const languages = langResponse.ok ? await langResponse.json() : {};

                // 获取主要语言
                const primaryLanguage = repo.language || Object.keys(languages)[0] || 'Unknown';

                enrichedProjects.push({
                    ...repo,
                    languages: languages,
                    primaryLanguage: primaryLanguage
                });

                // 添加延迟避免API速率限制
                await this.sleep(150);
            } catch (error) {
                console.warn(`Failed to get languages for ${repo.name}:`, error);
                enrichedProjects.push({
                    ...repo,
                    languages: {},
                    primaryLanguage: repo.language || 'Unknown'
                });
            }
        }

        return enrichedProjects;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    renderProjects() {
        const container = document.getElementById('index-projects-grid');
        if (!container) return;

        container.innerHTML = '';

        this.projects.forEach((project, index) => {
            const card = this.createProjectCard(project);
            container.appendChild(card);
            
            // 添加动画延迟
            setTimeout(() => {
                card.classList.add('animate');
            }, index * 150);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'index-project-card';

        const isGitHubPages = project.name.includes('.github.io');
        const projectUrl = isGitHubPages ? `https://${project.name}` : project.homepage;
        
        // 格式化项目名称
        const displayName = project.name
            .replace(/[-_]/g, ' ')
            .replace(/\.github\.io$/, ' (Personal Site)')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');

        card.innerHTML = `
            <h3>
                <a href="${project.html_url}" target="_blank" rel="noopener noreferrer">
                    ${displayName}
                </a>
            </h3>
            <p>${project.description || '这是一个有趣的项目，期待您的探索'}</p>
            <div class="project-meta">
                <span class="language-tag">${project.primaryLanguage}</span>
                <div class="project-stats">
                    <span>⭐ ${project.stargazers_count || 0}</span>
                    <span>🍴 ${project.forks_count || 0}</span>
                </div>
            </div>
        `;

        return card;
    }

    useFallbackData() {
        console.log('为Index页面使用备用数据');
        
        // 使用精选的项目数据
        const fallbackData = [
            {
                name: 'ChinaWondercy.github.io',
                description: '个人主页网站，展示前端开发技能和项目作品',
                language: 'HTML',
                html_url: 'https://github.com/ChinaWondercy/ChinaWondercy.github.io',
                stargazers_count: 5,
                forks_count: 2,
                primaryLanguage: 'HTML'
            },
            {
                name: 'vue-component-library',
                description: '基于Vue.js的可复用组件库项目',
                language: 'Vue',
                html_url: 'https://github.com/ChinaWondercy/vue-component-library',
                stargazers_count: 12,
                forks_count: 4,
                primaryLanguage: 'Vue'
            },
            {
                name: 'frontend-learning-notes',
                description: '前端学习笔记和代码示例集合',
                language: 'JavaScript',
                html_url: 'https://github.com/ChinaWondercy/frontend-learning-notes',
                stargazers_count: 8,
                forks_count: 3,
                primaryLanguage: 'JavaScript'
            },
            {
                name: 'react-todo-app',
                description: '使用React开发的现代化任务管理应用',
                language: 'JavaScript',
                html_url: 'https://github.com/ChinaWondercy/react-todo-app',
                stargazers_count: 10,
                forks_count: 5,
                primaryLanguage: 'JavaScript'
            },
            {
                name: 'python-data-analysis',
                description: '数据分析项目，使用Python进行数据处理和可视化',
                language: 'Python',
                html_url: 'https://github.com/ChinaWondercy/python-data-analysis',
                stargazers_count: 6,
                forks_count: 1,
                primaryLanguage: 'Python'
            },
            {
                name: 'css-animations-showcase',
                description: 'CSS动画效果展示和学习项目',
                language: 'CSS',
                html_url: 'https://github.com/ChinaWondercy/css-animations-showcase',
                stargazers_count: 15,
                forks_count: 7,
                primaryLanguage: 'CSS'
            }
        ];

        this.projects = fallbackData;
        this.renderProjects();
        console.log(`Index页面备用数据加载完成，共 ${this.projects.length} 个项目`);
    }

    showLoading() {
        const loading = document.querySelector('.projects-loading');
        if (loading) loading.style.display = 'block';
    }

    hideLoading() {
        const loading = document.querySelector('.projects-loading');
        if (loading) loading.style.display = 'none';
    }

    showError(message) {
        const error = document.querySelector('.projects-error');
        const errorMessage = document.querySelector('.projects-error .error-message');
        if (error && errorMessage) {
            errorMessage.textContent = message;
            error.style.display = 'block';
        }
    }

    hideError() {
        const error = document.querySelector('.projects-error');
        if (error) error.style.display = 'none';
    }
}

// ================== 初始化Index页面项目 ==================
function initIndexProjects() {
    new IndexProjectsManager();
}

// ================== 创意功能集合 ==================

// Konami Code 彩蛋系统
class KonamiCode {
    constructor() {
        this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.userInput = [];
        this.isActivated = false;
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
    }

    handleKeyPress(e) {
        this.userInput.push(e.code);
        
        // 只保留最近10个按键
        if (this.userInput.length > 10) {
            this.userInput.shift();
        }

        // 检查是否匹配序列
        if (this.userInput.length === 10 && this.checkSequence()) {
            this.activateEasterEgg();
        }
    }

    checkSequence() {
        for (let i = 0; i < this.sequence.length; i++) {
            if (this.userInput[i] !== this.sequence[i]) {
                return false;
            }
        }
        return true;
    }

    activateEasterEgg() {
        if (this.isActivated) return;
        this.isActivated = true;

        console.log('🎮 Konami Code 激活！');
        
        // 创建8位游戏风格的覆盖层
        this.createRetroOverlay();
        
        // 播放音效
        this.playSound();
        
        // 启动贪吃蛇游戏
        setTimeout(() => {
            this.startSnakeGame();
        }, 2000);
    }

    createRetroOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'retro-overlay';
        overlay.innerHTML = `
            <div class="retro-container">
                <div class="retro-header">
                    <h1 class="retro-title">🎮 KONAMI CODE ACTIVATED! 🎮</h1>
                    <p class="retro-subtitle">Welcome to the Matrix... I mean, Retro Mode!</p>
                </div>
                <div class="retro-content">
                    <div class="matrix-text">
                        <div class="matrix-line">01001000 01100101 01101100 01101100 01101111</div>
                        <div class="matrix-line">01010111 01101111 01110010 01101100 01100100</div>
                        <div class="matrix-line">Loading Snake Game...</div>
                    </div>
                </div>
                <button class="retro-close" onclick="this.parentElement.parentElement.remove(); konamiCode.isActivated = false;">× Close</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        // 添加动画效果
        setTimeout(() => overlay.classList.add('active'), 100);
    }

    playSound() {
        // 创建音频上下文播放8位音效
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    startSnakeGame() {
        const gameContainer = document.querySelector('.retro-content');
        if (!gameContainer) return;

        gameContainer.innerHTML = `
            <canvas id="snake-game" width="400" height="400"></canvas>
            <div class="game-controls">
                <p>Use WASD or Arrow Keys to control the snake!</p>
                <p>Score: <span id="score">0</span></p>
            </div>
        `;

        new SnakeGame();
    }
}

// 简化版贪吃蛇游戏
class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('snake-game');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.snake = [{x: 200, y: 200}];
        this.direction = {x: 0, y: 0};
        this.food = this.generateFood();
        this.score = 0;
        this.gameRunning = true;
        
        this.bindEvents();
        this.gameLoop();
    }

    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if (!this.gameRunning) return;
            
            switch(e.code) {
                case 'ArrowUp':
                case 'KeyW':
                    if (this.direction.y === 0) this.direction = {x: 0, y: -this.gridSize};
                    break;
                case 'ArrowDown':
                case 'KeyS':
                    if (this.direction.y === 0) this.direction = {x: 0, y: this.gridSize};
                    break;
                case 'ArrowLeft':
                case 'KeyA':
                    if (this.direction.x === 0) this.direction = {x: -this.gridSize, y: 0};
                    break;
                case 'ArrowRight':
                case 'KeyD':
                    if (this.direction.x === 0) this.direction = {x: this.gridSize, y: 0};
                    break;
            }
        });
    }

    generateFood() {
        return {
            x: Math.floor(Math.random() * (this.canvas.width / this.gridSize)) * this.gridSize,
            y: Math.floor(Math.random() * (this.canvas.height / this.gridSize)) * this.gridSize
        };
    }

    update() {
        if (!this.gameRunning) return;

        const head = {
            x: this.snake[0].x + this.direction.x,
            y: this.snake[0].y + this.direction.y
        };

        // 检查碰撞
        if (head.x < 0 || head.x >= this.canvas.width || 
            head.y < 0 || head.y >= this.canvas.height ||
            this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            this.gameRunning = false;
            this.showGameOver();
            return;
        }

        this.snake.unshift(head);

        // 检查是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            document.getElementById('score').textContent = this.score;
            this.food = this.generateFood();
        } else {
            this.snake.pop();
        }
    }

    draw() {
        // 清空画布
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制蛇
        this.ctx.fillStyle = '#0f0';
        this.snake.forEach(segment => {
            this.ctx.fillRect(segment.x, segment.y, this.gridSize, this.gridSize);
        });

        // 绘制食物
        this.ctx.fillStyle = '#f00';
        this.ctx.fillRect(this.food.x, this.food.y, this.gridSize, this.gridSize);
    }

    showGameOver() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '24px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2 - 20);
        this.ctx.font = '16px monospace';
        this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
    }

    gameLoop() {
        this.update();
        this.draw();
        
        if (this.gameRunning) {
            setTimeout(() => this.gameLoop(), 150);
        }
    }
}

// 动态标题管理器
class DynamicTitle {
    constructor() {
        this.originalTitle = document.title;
        this.originalFavicon = document.querySelector('link[rel="icon"]')?.href || '';
        this.awayTitle = '别走呀，快回来！QAQ';
        this.init();
    }

    init() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.setAwayMode();
            } else {
                this.setActiveMode();
            }
        });

        // 窗口焦点事件
        window.addEventListener('blur', () => this.setAwayMode());
        window.addEventListener('focus', () => this.setActiveMode());
    }

    setAwayMode() {
        document.title = this.awayTitle;
        this.changeFavicon('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">😢</text></svg>');
    }

    setActiveMode() {
        document.title = this.originalTitle;
        this.changeFavicon('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">😊</text></svg>');
    }

    changeFavicon(href) {
        let link = document.querySelector('link[rel="icon"]');
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = href;
    }
}

// 自定义光标系统
class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.init();
    }

    init() {
        this.createCursor();
        this.bindEvents();
        this.hiddenDefaultCursor();
    }

    createCursor() {
        // 主光标
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        // 光标中心点
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(this.cursorDot);
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                this.cursorDot.style.left = e.clientX + 'px';
                this.cursorDot.style.top = e.clientY + 'px';
            }, 100);
        });

        // 悬停在可点击元素上的效果
        const clickableElements = 'a, button, input, textarea, select, [onclick], [role="button"]';
        
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches(clickableElements)) {
                this.cursor.classList.add('hover');
                this.cursorDot.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches(clickableElements)) {
                this.cursor.classList.remove('hover');
                this.cursorDot.classList.remove('hover');
            }
        });

        // 点击效果
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('click');
            this.cursorDot.classList.add('click');
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('click');
            this.cursorDot.classList.remove('click');
        });
    }

    hiddenDefaultCursor() {
        document.body.style.cursor = 'none';
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                cursor: none !important;
            }
        `;
        document.head.appendChild(style);
    }
}

// 创意功能初始化
function initCreativeFeatures() {
    // 初始化所有创意功能
    window.konamiCode = new KonamiCode();
    window.dynamicTitle = new DynamicTitle();
    window.customCursor = new CustomCursor();
    
    console.log('🎨 创意功能已全部激活！');
    console.log('🎮 试试输入 Konami Code：↑↑↓↓←→←→BA');
}

// ================== 更新Portfolio初始化 ==================
function initPortfolioFilters() {
    // 使用新的GitHub Portfolio管理器
    new GitHubPortfolioManager();
}

// ================== 导出类（如果使用模块化） ==================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ThemeManager,
        TypewriterEffect,
        ProjectCard,
        ProjectManager,
        HobbiesManager,
        PageManager
    };
}
