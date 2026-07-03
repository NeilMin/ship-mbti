# SHIP-MBTI 内容大改版设计（zh 优先）

日期：2026-07-03
状态：待用户 review
范围：文案 + 社交钩子（题目、16 型档案、全站 copy、新增天敌/搭子/稀有度字段及其 UI 落点）。不改 result code 结构、不改评分算法、不改 `?result=` 语义。

## 0. 已拍板的方向（用户确认）

1. 主战场：北美华人码农微信圈，zh 为主，en 陪跑。
2. 毒舌度：精准处刑 9/10，先扎再抱。
3. 范围：全量重写文案 + 新增社交钩子字段。
4. 题目：题干短 + 损，7 点 Likert 仪器形态不动。
5. 素材纪律：梗必须来自真实社区吐槽（梗库见附录 A 来源清单）；禁生造词/硬翻译（"工票"类事故不再发生）；en 本轮只做机械同步，味道后置。

已确认（用户 2026-07-03）：A1 标题体系 = 单名人设 + 假正经副标，16 个主名全部通过。

已否决（用户 2026-07-03）：稀有度机制。对标 MBTI——每种人格都是合理存在，不做高低稀有之分。

追加指令（用户 2026-07-03）：题库混入生活化题目（约四成，不全是编程题），从生活角度探查人格；profile 的代入感来自生活面（Costco、新店排队、湾区三俗等），不局限于写码行为。

## 1. Tone 宪法

1. **处刑 9/10，先扎再抱**：每型 description 至少 2 句可独立截图的狠话；结尾必有一句"被看穿而不是被羞辱"的立场反转。
2. **具体性法则**：每句 roast 必须有画面（掏 PPT、改变量名糊弄 reviewer、Google Calendar 约会邀请），禁止抽象形容词堆叠。
3. **句式禁令**："你并非/不是 X，你只是 Y"全 16 型 ≤ 2 次；同一修辞结构 ≤ 2 型使用。
4. **词汇纪律**：只用梗库确认过的真实说法；中英夹杂照社区习惯（接 ticket、过 perf、被 PIP、oncall、push to prod、比包裹、店面）；没把握的词查梗库，查不到用英文原词。
5. **红线**（发布前逐条检查）：
   - 性别对立词汇不用（舔狗/普信/娇妻等）；相亲梗只 roast 本人设行为，不评价约会对象。
   - 民族/国籍黑话不用。
   - PIP/layoff 玩制度与心态（攻略学/表演学），不碰个体悲剧。
   - 标签不变纯羞辱（参考 MBTI 反噬："e 人不是显眼包，i 人不是自闭症"）。

## 2. 命名体系

### 2.1 四大派系（group，替换现有"编排者/速通者/匠构者/造物者"）

| 组 | 现名 | 新名 | 逻辑 |
|---|---|---|---|
| CO | 编排者/Orchestrator | **画饼派** | AI + 宏大架构 = 叙事先行 |
| CA | 速通者/Sprinter | **速通派** | AI + 糊 = 一切求快 |
| TO | 匠构者/Architect | **古法派** | 手写 + 宏大 = 古法编程 |
| TA | 造物者/Builder | **手搓派** | 手写 + 快 = 手搓一切 |

group 字段 zh 格式：`"CO · 画饼派"`（en 暂保留现值）。

### 2.2 16 型主名 + 副标（title / subtitle）

| Code | 主名 | 副标（假正经职称） |
|---|---|---|
| COLG | 赛博炼丹师 | Agentic Workflow 布道师 |
| COLW | Design Doc 战神 | 跨组赋能 · 平台化架构负责人 |
| COPG | 风口冲浪手 | 全周期创新孵化专家 |
| COPW | 养老院架构师 | 长期技术愿景负责人 |
| CALG | MVP 缝合怪 | 0-1 全栈增长工程师 |
| CALW | ROI 做题家 | 结果导向交付负责人 |
| CAPG | 「您说的对」工程师 | 人机协同结对编程先锋 |
| CAPW | Ticket 消消乐 | 资深敏捷交付专家 |
| TOLG | 古法编程仙人 | 代码质量委员会主席 |
| TOLW | 护城河总工 | 核心系统唯一负责人 |
| TOPG | 手冲代码大师 | 工程美学与最佳实践守护者 |
| TOPW | 祖传代码守墓人 | 核心系统稳定性负责人 |
| TALG | 键盘特种兵 | 疑难杂症攻坚小组组长 |
| TALW | 交付牛马 | 核心业务基石工程师 |
| TAPG | Stack Overflow 考古家 | 开源社区资源整合专家 |
| TAPW | 精神离职者 | 存量系统维护专家 |

## 3. 社交钩子：天敌与灵魂搭子

### 3.1 天敌（nemesis）：镜像对立规则

四个字母全反 = 天敌。规则本身是彩蛋（用户会自己发现），共 8 对，天然对称：

| 对 | 一句话注解方向 |
|---|---|
| COLG ↔ TAPW | 炼丹师要用 prompt 重构世界，精神离职者连 README 都懒得看 |
| COLW ↔ TAPG | 一个靠 doc 讲故事，一个靠论坛考古拼代码，互相觉得对方在混 |
| COPG ↔ TALW | 冲浪手画的饼，最后都是牛马含泪交付 |
| COPW ↔ TALG | 特种兵想拆掉养老院重写，养老院靠流程把他耗死 |
| CALG ↔ TOPW | 缝合怪每天都在守墓人的坟头蹦迪 |
| CALW ↔ TOPG | 做题家眼里美学不计入 ROI，大师眼里 ROI 玷污美学 |
| CAPG ↔ TOLW | 您说的对工程师提的 PR，总工能挑出七层问题再挂七天 |
| CAPW ↔ TOLG | 仙人 review 一个 PR 写三千字，消消乐只回一个 done |

### 3.2 灵魂搭子（soulmate）：互补共生，8 对对称

| 对 | 一句话注解方向 |
|---|---|
| COLG ↔ COLW | 一个真信 AGI，一个用 AGI 写 promo packet，一个出信仰一个出材料 |
| COPG ↔ CALG | 一个路演卖愿景，一个连夜缝 demo，创业公司标配双人组 |
| COPW ↔ TOPW | 养老院与祖坟，稳定压倒一切联盟 |
| CALW ↔ CAPW | 一个算 ROI 一个清 ticket，全程零情绪损耗的无痛联盟 |
| TOLG ↔ TOLW | 唯二能 review 对方代码的人，一个为纯洁一个为职级 |
| CAPG ↔ TAPG | 一个问 AI 一个问论坛，抄作业的两大流派互相救命 |
| TALG ↔ TALW | 特种兵开路牛马守线，全场唯一健康的关系（对照组笑点） |
| TOPG ↔ TAPW | 一个追求完美不许人乱动，一个根本不想动，消极联盟 |

数据形态：`nemesis: { code, note }`、`soulmate: { code, note }`，note 为一句损话（≤40 字）。UI 显示对方主名 + note。

## 4. 数据模型与 UI 落点

### 4.1 types.ts

```ts
export interface PersonalityRelation {
  code: ResultCode;
  note: string;
}

export interface Personality {
  code: ResultCode;
  group: string;
  title: string;        // 主名
  subtitle: string;     // 新：假正经职称
  quote: string;
  description: string;
  strengths: string;
  risks: string;
  lifestyle: string;
  environment: string;
  nemesis: PersonalityRelation;   // 新
  soulmate: PersonalityRelation;  // 新
}
```

`AppCopy.resultSections` 新增 `nemesis` / `soulmate` 两个 label。

### 4.2 组件

- **ResultScreen**：hero 区 title 下渲染 subtitle；result-grid 新增"天敌 / 灵魂搭子"卡片（对方主名 + note）。
- **ShareCard**（海报是传播物，钩子必须上）：header 加 subtitle；sections 间加一行"天敌：XXX ｜ 搭子：XXX"。
- **样式**：app.css 加关系卡样式，保持现有设计语言。

### 4.3 测试

- `personalities.test.ts` 新增：每型 subtitle 非空；nemesis/soulmate code 合法且 ≠ 自身；nemesis 满足四字母全反。
- `App.test.tsx`：检查现有断言是否绑定旧文案（如标题字符串），同步更新。
- 全量跑 `npm run lint && npm run typecheck && npm run test && npm run build`。

## 5. 题目重写（20 题，pole 结构与 id 完全不动）

原则：题干目标 ≤ 30 字；每题一个画面；**约四成生活化题目**（标 ⌂），从生活角度探查同一维度；地域梗不进题目（题目用全球华语码农都懂的通用生活梗，地域梗留给 profile）；Likert 陈述句形态不变。

| id | pole | 新题干（zh） |
|---|---|---|
| S1 | C | 周五下午来的活，我会直接丢给 AI，先让它吐一版再说。 |
| S2 ⌂ | C | 不止写码——去哪吃饭、旅游怎么玩，我都先问 AI 要个方案。 |
| S3 ⌂ | T | 组装家具、修小家电这种事，我享受亲手搞定的过程。 |
| S4 | C | 被 reviewer 追问，我会把 comment 原样丢给 AI，求一段回怼。 |
| S5 | T | AI 写的核心逻辑，我不亲手重写一遍就不敢上线。 |
| H1 ⌂ | O | 出门旅游，我会做出小时级的行程表，还自带 Plan B。 |
| H2 | O | 明明是个 CRUD，我已经在想它怎么升级成平台。 |
| H3 | O | 需求还没批，我已经开始操心它三年后的扩展性。 |
| H4 | A | 只要今晚能上线，能活过这周的版本就是好版本。 |
| H5 ⌂ | A | 出去玩我从不做攻略：先出发，落地再说。 |
| I1 | L | 线上一炸，我先翻日志对变更，绝不上来就重启。 |
| I2 | R | 复现不了的 bug，我会写个定时重启脚本先兜底。 |
| I3 | R | 本地是好的、线上炸了——我第一反应是到处加 console.log。 |
| I4 ⌂ | R | 车里响了个怪声？把音乐开大一点就好了。 |
| I5 | L | 不搞清楚它为什么坏、又为什么好，我下不了班。 |
| P1 | G | 不算 perf 不给钱，我周末也会自己写点东西玩。 |
| P2 ⌂ | G | 给家里折腾 NAS、软路由、智能家居，我比上班积极多了。 |
| P3 | W | 让我认真干活的不是热爱，是 perf、promo 和 PIP。 |
| P4 | W | 身份和 layoff 的压力，实实在在影响我敢接什么活。 |
| P5 ⌂ | W | 周末去新开的店排两小时队，也比多看一眼代码强。 |

注意：S3 的 agreementPole 由 C 改为 T（原 boilerplate 题换成动手生活题），S 维极性平衡变为 C:T = 3:2；其余题 id 与 pole 均不变。zh/en 两套必须同步此变化（CLAUDE.md 的平行约束是 zh↔en 之间）。`scoring.test.ts` 若引用 S3 极性需同步。

`questions.en.ts` 本轮机械压缩同步（保持 id/pole 与 zh 平行，保证 scoring 双语一致），文案味道下一轮做。

## 6. 16 型 quote（海报核心句）

| Code | Quote |
|---|---|
| COLG | 手写代码，是对 token 的不尊重。 |
| COLW | 代码能不能跑不重要，这份 doc 能不能让我活过这轮 perf 才重要。 |
| COPG | 架构是未来的，报错是暂时的，重启之后一切都会再次伟大。 |
| COPW | 抽象层够厚，责任就穿不过来；发版够少，周末就还是我的。 |
| CALG | 别跟我谈规范，我和 Claude 刚把 MVP 缝出来了。 |
| CALW | 我最强的工程能力，是五秒内判断这坨 AI 代码值不值得救。 |
| CAPG | 我不知道它为什么能跑，但它今晚能 demo，这就够了。 |
| CAPW | 5 点前把 ticket 拖到 Done，代码里住着谁我都认。 |
| TOLG | 谁在我的仓库里写 any，谁就在 code review 里忏悔。 |
| TOLW | 七层封装不为业务，为的是这套系统离了我就没人敢动。 |
| TOPG | 设计本来是完美的，是生产环境不配合。 |
| TOPW | 最稳的系统不是没有 bug，是没人敢动。 |
| TALG | 等 AI 想明白的功夫，我已经写完了。 |
| TALW | 需求给我，排期定好，我写完回家遛狗。 |
| TAPG | 这些代码我每一行都认识，它们凑一起能跑属于机缘。 |
| TAPW | 它还有呼吸，就轮不到我优化它。 |

## 7. 结果页栏目名与全站 copy（copy.ts zh）

栏目统一为"人类观察学报告"语体：

| 字段 | 现名 | 新名 |
|---|---|---|
| description | 长描述 | **行为观察报告** |
| strengths | 核心优势 | **公司还留着你的理由** |
| risks | 致命风险 | **迟早要出的事故** |
| environment | 适宜环境 | **适合关押你的地方** |
| lifestyle | 生活与社交侧写 | **下班后目击报告** |
| nemesis（新） | — | **天敌** |
| soulmate（新） | — | **灵魂搭子** |

首页：
- heroSubtitle：`一个有趣的程序员人格测试。` → **`20 道题，鉴定你是哪一种码农。准到你想举报。`**
- heroNote → **`AI 依赖、架构洁癖、排错玄学、上班动机——四个维度交叉出 16 种码农。测完拿到你的行为观察报告、你的天敌，和你的灵魂搭子。`**
- startButton：`开始测试` → **`开始鉴定`**
- share.cta → **`扫码鉴定你是哪种码农`**
- resultButtons.saveImage → **`保存海报`**

dimensions.zh.ts 微调：S 右极 shortLabel `手工打磨` → `古法手写`；其余 label（代码来源/架构审美/排错玄学/工作动机）保留。

## 8. 档案写作规范 + 完整样稿

结构（每型）：① 场景开场把人钉死 → ② 两句处刑（截图点）→ ③ 结尾立场反转（先扎再抱）。strengths 写成"公司留你的理由"口吻；risks 写成"事故预告"口吻；lifestyle 必含真实 milieu 细节，素材池：Costco/大华采购、Tahoe 滑雪、湾区三俗（hiking/摘樱桃/露营——"跟老中露营根本是 cook out"）、"最大的三俗是整天讨论三俗"、新店排队两小时、美食荒漠之争、狼人杀局、"钓鱼是为讨好老板，行头一身俨然半个专家"、NAS/软路由/homelab（"折腾完 NAS，接下来存什么？"）、"社交话题永远是跳槽股票包裹"、相亲现场（PPT 男/奶茶店筛选/比包裹）、Patagonia 马甲。16 型在素材池里各取所需，禁止两型撞同一细节。

### 样稿 1：CAPW · Ticket 消消乐

- **quote**：5 点前把 ticket 拖到 Done，代码里住着谁我都认。
- **行为观察报告**：上班第一件事：打开 Jira，把 ticket 从左往右拖。需求进来，AI 出货，本地不报错就提 PR；reviewer 挑刺，你改个变量名再提一遍——反正他也就扫五秒。你的 debug 工具箱里只有两样东西：console.log 和重启。别人管这叫摆烂，你管这叫可持续交付。把公司代码当艺术品的人才是真的疯了，这一点上，你比谁都清醒。
- **公司还留着你的理由**：全组情绪最稳定的人。什么烂活到你手里都是面无表情三下拖到 Done，从不因为技术信仰跟人吵架——因为你没有。
- **迟早要出的事故**：下一次 P0 的第一嫌疑人。毕竟连你自己都不知道昨天粘进 prod 的到底是什么。
- **适合关押你的地方**：外包流水线、交付完就跑的项目组，以及任何把"别出事"当最高纲领的地方。
- **下班后目击报告**：社交电量常年 1%。周末打游戏，看不上湾区满地的 hiking 局。感情观原话："要是比 ticket 还麻烦，那算了。"
- **天敌**：TOLG 古法编程仙人——他 review 你的 PR 能写三千字，你看完只回一个 done。
- **灵魂搭子**：CALW ROI 做题家——一个算 ROI 一个清 ticket，全程零情绪损耗的无痛联盟。

### 样稿 2：COLW · Design Doc 战神

- **quote**：代码能不能跑不重要，这份 doc 能不能让我活过这轮 perf 才重要。
- **行为观察报告**：你的代码可以让 AI 写，你的 doc 必须自己写——毕竟 perf 看的是后者。一个普通的 CRUD，经你包装就成了"面向未来的平台化底座"；一次普通重构，能画出三张架构图和一条五年演进路线。同事以为你在做技术决策，其实你在写辩护词。这不叫圆滑：在 blame 比 truth 跑得快的大厂里，这叫求生。
- **公司还留着你的理由**：把任何日常工作翻译成"战略级 impact"的顶级语言能力，perf 材料写得比代码整洁十倍。
- **迟早要出的事故**：白板恐惧症晚期。离开框架和 AI，现场手写一个反转链表，可能当场出汗。
- **适合关押你的地方**：流程厚重、文档为王、评审会连开三轮的成熟大厂——那里每一页 PPT 都算 KPI。
- **下班后目击报告**：Patagonia 马甲 + Allbirds 是永久皮肤。约会发 Google Calendar 邀请，附 agenda；聊到未来，你说："我们的规划还需要再 align 一下。"
- **天敌**：TAPG Stack Overflow 考古家——他靠论坛考古拼代码，你靠 doc 讲故事，你们互相觉得对方在混。
- **灵魂搭子**：COLG 赛博炼丹师——他真信 AGI，你用 AGI 写 promo packet，一个出信仰一个出材料。

其余 14 型在实现阶段按本规范写作，素材从附录 A 梗库取。

## 9. en 策略（本轮）

- `personalities.en.ts`：新增字段机械补齐（直译，标 `// TODO(en-pass)`），保证 TS 编译与 parity 测试通过；现有字段不动。
- `questions.en.ts`：题干同步压缩为对应英文（保 id/pole 平行）。
- `copy.ts` en：新增三个 section label 用直译；其余不动。
- en 的独立幽默方向（corporate satire 路线）另开一轮，允许与 zh 不同梗不同味。

## 10. 实施与验证顺序

1. types.ts + copy.ts（新字段/新 label）
2. personalities.ts 全量重写（zh 16 型）+ personalities.en.ts 机械同步
3. questions.zh.ts / questions.en.ts 题干替换
4. dimensions.zh.ts 微调
5. ResultScreen / ShareCard / app.css
6. 测试更新与新增
7. `npm run lint && npm run typecheck && npm run test && npm run build`
8. 红线清单人工过一遍（§1.5）
9. 用户验收 zh 文案 → 部署

## 附录 A：素材来源

梗库工作文件（本机 scratchpad `genglib.md`，核心条目已内化进本文档）。来源：一亩三分地（刻板印象帖 736103、摆烂 PIP 帖 1133763、地典黑话帖 933587、相亲分析帖 1116544、湾区无聊帖 1059689/700817）、huaren.us（婚恋市场帖、湾区三俗帖 3110241）、zhaoolee/xiaohongshu-programmer-memes、腾讯云"会 Vibe Coding 的同事"、卡思数据 MBTI 传播分析、芝加哥时报硅谷相亲群卧底文、世界日报旧金山排队汉堡报道。
