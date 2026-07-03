# SHIP-MBTI Content Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the zh-first roast rewrite per `docs/superpowers/specs/2026-07-03-content-overhaul-design.md`: persona titles + subtitle, nemesis/soulmate social hooks, 20 rewritten questions (7 lifestyle), report-style section labels, new hero copy, with en mechanically synced.

**Architecture:** Pure content + presentation change. Scoring engine, result codes, and `?result=` semantics untouched. `Personality` gains `subtitle`/`nemesis`/`soulmate`; data flows through existing `getAppContent(locale)`; ResultScreen/ShareCard render the new fields.

**Tech Stack:** React 19, TypeScript, Vite, Vitest + Testing Library.

## Global Constraints

- Result codes, scoring math, URL format: DO NOT TOUCH (`src/lib/scoring.ts`, `src/lib/resultCodes.ts`, `src/lib/urlState.ts`).
- zh/en question sets stay structurally parallel: same ids, same dimensions, same agreementPole per id. S3 agreementPole becomes `"T"` in BOTH locales.
- Forbidden words anywhere in `src/data`: 舔狗、普信、娇妻、烙印、工票（and any invented jargon — community terms or English originals only).
- "你并非/不是 X，你只是/你是 Y" sentence pattern: used by COLG and COPG descriptions ONLY. Do not add more.
- All copy below is final and verbatim — implementer transcribes, never rewrites.
- Node 20 for CI parity. Run commands from repo root.

---

### Task 1: Personality schema + both personality data sets

**Files:**
- Modify: `src/lib/types.ts:19-29` (Personality interface)
- Modify: `src/data/personalities.ts` (full zh rewrite)
- Modify: `src/data/personalities.en.ts` (add 3 fields per entry)
- Modify: `src/data/personalities.test.ts` (new assertions)
- Modify: `src/lib/scoring.test.ts:46` (title assertion)
- Modify: `src/components/App.test.tsx:146` (title assertion)

**Interfaces:**
- Consumes: existing `ResultCode`, `Locale` types.
- Produces: `PersonalityRelation { code: ResultCode; note: string }`; `Personality` with new required fields `subtitle: string`, `nemesis: PersonalityRelation`, `soulmate: PersonalityRelation`. Task 4 renders these exact names.

- [ ] **Step 1: Add failing tests to `src/data/personalities.test.ts`**

Append inside the file (after the existing describe block):

```ts
const MIRROR: Record<string, string> = {
  C: "T",
  T: "C",
  O: "A",
  A: "O",
  L: "P",
  P: "L",
  G: "W",
  W: "G",
};

describe("personality social hooks", () => {
  for (const [locale, set] of Object.entries(locales)) {
    it(`${locale} gives every personality a subtitle`, () => {
      for (const item of set) {
        expect(item.subtitle.trim().length, item.code).toBeGreaterThan(0);
      }
    });

    it(`${locale} points nemesis at the four-letter mirror type`, () => {
      for (const item of set) {
        const mirror = item.code
          .split("")
          .map((letter) => MIRROR[letter])
          .join("");
        expect(item.nemesis.code, item.code).toBe(mirror);
        expect(item.nemesis.note.trim().length, item.code).toBeGreaterThan(0);
      }
    });

    it(`${locale} keeps soulmate pairs symmetric and not self`, () => {
      const byCode = new Map(set.map((item) => [item.code, item]));
      for (const item of set) {
        expect(item.soulmate.code, item.code).not.toBe(item.code);
        const partner = byCode.get(item.soulmate.code);
        expect(partner, item.soulmate.code).toBeDefined();
        expect(partner?.soulmate.code, item.code).toBe(item.code);
        expect(item.soulmate.note.trim().length, item.code).toBeGreaterThan(0);
      }
    });
  }
});
```

- [ ] **Step 2: Run to verify failure**

Run: `npm run test -- src/data/personalities.test.ts`
Expected: FAIL (TS: `subtitle`/`nemesis`/`soulmate` do not exist on type `Personality`).

- [ ] **Step 3: Update `src/lib/types.ts`**

Replace the `Personality` interface with:

```ts
export interface PersonalityRelation {
  code: ResultCode;
  note: string;
}

export interface Personality {
  code: ResultCode;
  group: string;
  title: string;
  subtitle: string;
  quote: string;
  description: string;
  strengths: string;
  risks: string;
  lifestyle: string;
  environment: string;
  nemesis: PersonalityRelation;
  soulmate: PersonalityRelation;
}
```

- [ ] **Step 4: Replace the zh array in `src/data/personalities.ts`**

Keep imports and the `personalitySets` / `personalities` exports as-is. Replace `personalitiesZh` with exactly:

```ts
export const personalitiesZh: Personality[] = [
  {
    code: "COLG",
    group: "CO · 画饼派",
    title: "赛博炼丹师",
    subtitle: "Agentic Workflow 布道师",
    quote: "手写代码，是对 token 的不尊重。",
    description:
      "别人写代码，你炼丹。四个小时调一段 prompt，产出十个字符的正则，你管这叫“认知对齐”。架构评审会上你张口 Agentic 闭口 AGI，PPT 里的系统宏大到 AI 自己都开始幻觉。你坚信手敲键盘是前 AGI 时代的原始劳动——说到底你不是不会写代码，你是嫌碳基的手速配不上你硅基的脑子。",
    strengths:
      "永远站在技术叙事的最前沿，能用三个新造词让高管以为公司已经领先行业两年。",
    risks:
      "抽象层叠到连 AI 都 hold 不住的那天，全组会发现系统里没有一行人类看得懂的代码，包括你。",
    lifestyle:
      "一日三餐 Soylent，咀嚼是浪费带宽。相亲聊奇点降临和碳基生物的局限性，咖啡还没凉透，人已经被拉黑了。",
    environment:
      "还没有 MVP 就融到 A 轮的 AI 创业公司，或大厂的“前沿探索实验室”。",
    nemesis: { code: "TAPW", note: "你要用 prompt 重构世界，他连你发的 README 都懒得点开。" },
    soulmate: { code: "COLW", note: "他不信 AGI，但他会把你的信仰写进 promo packet——各取所需。" },
  },
  {
    code: "COLW",
    group: "CO · 画饼派",
    title: "Design Doc 战神",
    subtitle: "跨组赋能 · 平台化架构负责人",
    quote: "代码能不能跑不重要，这份 doc 能不能让我活过这轮 perf 才重要。",
    description:
      "你的代码可以让 AI 写，你的 doc 必须自己写——毕竟 perf 看的是后者。一个普通的 CRUD，经你包装就成了“面向未来的平台化底座”；一次普通重构，能画出三张架构图和一条五年演进路线。同事以为你在做技术决策，其实你在写辩护词。这不叫圆滑：在 blame 比 truth 跑得快的大厂里，这叫求生。",
    strengths:
      "把任何日常工作翻译成“战略级 impact”的顶级语言能力，perf 材料写得比代码整洁十倍。",
    risks:
      "白板恐惧症晚期。离开框架和 AI，现场手写一个反转链表，可能当场出汗。",
    lifestyle:
      "Patagonia 马甲 + Allbirds 是永久皮肤。约会发 Google Calendar 邀请，附 agenda；聊到未来，你说：“我们的规划还需要再 align 一下。”",
    environment:
      "流程厚重、文档为王、评审会连开三轮的成熟大厂——那里每一页 PPT 都算 KPI。",
    nemesis: { code: "TAPG", note: "他靠论坛考古拼代码，你靠 doc 讲故事，你们互相觉得对方在混。" },
    soulmate: { code: "COLG", note: "他真信 AGI，你用 AGI 写 promo packet，一个出信仰一个出材料。" },
  },
  {
    code: "COPG",
    group: "CO · 画饼派",
    title: "风口冲浪手",
    subtitle: "全周期创新孵化专家",
    quote: "架构是未来的，报错是暂时的，重启之后一切都会再次伟大。",
    description:
      "你的架构图画得像星际战舰，引擎舱里全是胶水代码和 AI 编出来的函数。系统一崩，你绝不看那五百行 stack trace——换个更虔诚的 prompt 重新生成，或者重启容器，等待宇宙的善意。三年前你聊 Web3，去年聊 AI Agent，明年聊什么你自己也不知道，但你确定自己会在场。你不是浮躁，你只是比所有人都害怕错过。",
    strengths:
      "拼 demo 的速度冠绝全场，投资人看完路演真的会心动——毕竟 PPT 里的系统没有 bug。",
    risks:
      "代码库是个黑盒，昨天还能跑的服务今天抛空指针，你的修复方案是再生成一遍。",
    lifestyle:
      "推特简介 Serial Entrepreneur。相亲开口就是“我们明年上 B 轮”——域名还没买。",
    environment:
      "黑客松决赛现场、路演日倒计时 48 小时的项目组，一切只需要活到 demo 结束的地方。",
    nemesis: { code: "TALW", note: "你在台上画的每一张饼，最后都是他含泪加班烙出来的。" },
    soulmate: { code: "CALG", note: "你负责把故事讲圆，他负责连夜把 demo 缝上，创业公司标配双人组。" },
  },
  {
    code: "COPW",
    group: "CO · 画饼派",
    title: "养老院架构师",
    subtitle: "长期技术愿景负责人",
    quote: "抽象层够厚，责任就穿不过来；发版够少，周末就还是我的。",
    description:
      "你给系统设计了七层抽象，不为扩展性，为的是出事时 blame 在第三层就会迷路。发版能拖就拖，refactor 想都别想——上一个动你系统的人，现在还在写 postmortem。你也曾经热血过，直到亲眼看着画饼的高管跑路、接盘的同事背锅，你才悟了：对公司最深的感情，应该止于 vest 日历。",
    strengths:
      "情绪稳定得像你的系统一样常年无事故——毕竟你俩都以“绝不轻举妄动”为最高原则。",
    risks:
      "那座被过度设计包裹的屎山总有一天要爆，而全公司只有你一个人有解压密码。",
    lifestyle:
      "FIRE 社区常驻用户，滑雪季准点出现在 Tahoe。相亲约在奶茶店，三句话内报出自己的 TC，第五句开始刺探对方的 ESPP。",
    environment:
      "边缘化但裁不掉的业务线，安静 vest 的养老组，以及一切“没消息就是好消息”的部门。",
    nemesis: { code: "TALG", note: "他嚷着要把你的系统推倒重写，你用三轮 design review 把他耗到转组。" },
    soulmate: { code: "TOPW", note: "你守养老院他守祖坟，你们的联盟纲领只有四个字：谁都别动。" },
  },
  {
    code: "CALG",
    group: "CA · 速通派",
    title: "MVP 缝合怪",
    subtitle: "0-1 全栈增长工程师",
    quote: "别跟我谈规范，我和 Claude 刚把 MVP 缝出来了。",
    description:
      "脑子里的点子超过 24 小时没上线，你会生理性难受。三个大模型 API、五个开源库、几段来路不明的代码，被你连夜缝成一个能跑的 MVP——接口逻辑你是真的走通了，但缩进和命名惨得像事故现场。规范？规范是给第二个版本准备的，而你的项目从来没有第二个版本。天下武功唯快不破，烂代码能跑，就已经赢过了所有还在画架构图的人。",
    strengths:
      "一个人顶一支原型团队，从 idea 到 demo 的速度快到需求方还没想清楚自己要什么。",
    risks:
      "技术债以工业规模生产，接手你项目的人会在 git blame 里查你的住址。",
    lifestyle:
      "衣柜里全是历届黑客松白嫖的文化衫，没有一件合身。约会吃到一半掏出电脑：“我刚想到一个百万美元的 idea，你听我说。”",
    environment:
      "极早期创业团队、YC 冲刺周，以及一切“先跑起来再说”合法甚至光荣的地方。",
    nemesis: { code: "TOPW", note: "你每一次 npm install 新玩具，都是在他的祖坟上蹦迪。" },
    soulmate: { code: "COPG", note: "他把饼画到天上，你把 demo 缝到能跑，你们凑一起就是一家创业公司。" },
  },
  {
    code: "CALW",
    group: "CA · 速通派",
    title: "ROI 做题家",
    subtitle: "结果导向交付负责人",
    quote: "我最强的工程能力，是五秒内判断这坨 AI 代码值不值得救。",
    description:
      "你早就想明白了：编程是道题，工资是分数，多余的动作都是丢分。AI 是你的免费外包，你的核心竞争力是五秒内判断它的产出值不值得救。重构？不占 KPI 的活你一行都不写。技术理想你也有过，后来你算了算：它的 ROI，是负的。",
    strengths:
      "投入产出比全组第一，永远用最少的脑细胞交出老板最想看的那页数据。",
    risks:
      "长期只做审核员，构建能力持续折旧，哪天 AI 真把初级活干完了，你比谁都先被对齐掉。",
    lifestyle:
      "交友软件用脚本自动右划，每个 date 在 Notion 里有 ROI 评分。你说等财富自由了，就用二十种语言谈风花雪月——目前一种都还没开始学。",
    environment:
      "考核唯结果论的大厂核心业务线，KPI 写得越清楚，你活得越滋润。",
    nemesis: { code: "TOPG", note: "他觉得你玷污了工程美学，你觉得他的美学连个转化率都算不出来。" },
    soulmate: { code: "CAPW", note: "你算 ROI 他清 ticket，全程零情绪损耗，堪称职场无痛联盟。" },
  },
  {
    code: "CAPG",
    group: "CA · 速通派",
    title: "「您说的对」工程师",
    subtitle: "人机协同结对编程先锋",
    quote: "我不知道它为什么能跑，但它今晚能 demo，这就够了。",
    description:
      "你的开发流程是一段双人相声：你把报错原样贴给 AI，它说“您说的对，我改”；改完还是炸，你再贴，它再“您说的对”。一晚上四十个回合，谁都没看懂那段代码，但它最后居然跑起来了。设计文档没有，单元测试没有，肌肉记忆全在 Cmd+C 和 Cmd+V 上。可你是真的爱这行——爱的是新框架发布那晚的兴奋，不是操作系统课本第三章。",
    strengths:
      "毫无技术包袱，什么都敢试，运气好的时候真能试出让老工程师沉默的方案。",
    risks:
      "断网即失业。API 一宕机，你的智商瞬间回落到只会 F5。",
    lifestyle:
      "作息是个谜，第一次约会敢约凌晨攀岩。放人鸽子的理由通常是：在修自己昨晚亲手造出来的 P0。",
    environment:
      "独立开发、玩具项目、不谈并发不谈安全的自留地——你的快乐老家。",
    nemesis: { code: "TOLW", note: "你的 PR 在他那里能被挑出七层问题，然后挂七天。" },
    soulmate: { code: "TAPG", note: "你问 AI，他问论坛，抄作业的两大流派在深夜互相救命。" },
  },
  {
    code: "CAPW",
    group: "CA · 速通派",
    title: "Ticket 消消乐",
    subtitle: "资深敏捷交付专家",
    quote: "5 点前把 ticket 拖到 Done，代码里住着谁我都认。",
    description:
      "上班第一件事：打开 Jira，把 ticket 从左往右拖。需求进来，AI 出货，本地不报错就提 PR；reviewer 挑刺，你改个变量名再提一遍——反正他也就扫五秒。你的 debug 工具箱里只有两样东西：console.log 和重启。别人管这叫摆烂，你管这叫可持续交付。把公司代码当艺术品的人才是真的疯了，这一点上，你比谁都清醒。",
    strengths:
      "全组情绪最稳定的人。什么烂活到你手里都是面无表情三下拖到 Done，从不因为技术信仰跟人吵架——因为你没有。",
    risks:
      "下一次 P0 的第一嫌疑人。毕竟连你自己都不知道昨天粘进 prod 的到底是什么。",
    lifestyle:
      "社交电量常年 1%。周末打游戏，看不上湾区满地的 hiking 局。感情观原话：“要是比 ticket 还麻烦，那算了。”",
    environment:
      "外包流水线、交付完就跑的项目组，以及任何把“别出事”当最高纲领的地方。",
    nemesis: { code: "TOLG", note: "他 review 你的 PR 能写三千字，你看完只回一个 done。" },
    soulmate: { code: "CALW", note: "他算 ROI 你清 ticket，全程零情绪损耗，堪称职场无痛联盟。" },
  },
  {
    code: "TOLG",
    group: "TO · 古法派",
    title: "古法编程仙人",
    subtitle: "代码质量委员会主席",
    quote: "谁在我的仓库里写 any，谁就在 code review 里忏悔。",
    description:
      "你鄙视 AI 补全，鄙视 any，鄙视一切没有从第一性原理推导出来的代码。为了一个按钮变色，你抽象出四个 interface；为了一个偶现 bug，你通宵读到 C++ 源码，第二天在群里发了篇小论文。全组的代码品味因你提升了一个档次，全组的发版速度也因你下降了一个档次。你守的是这个行业最后的体面——只是这份体面，有点贵。",
    strengths:
      "源码级的问题定位能力，写出来的代码能直接进教科书，招人的时候 HR 拿你当招牌。",
    risks:
      "优雅到没人敢接手。你休假的那两周，全组对着你的泛型体操集体沉默。",
    lifestyle:
      "鄙视链不在穿什么，在编辑器快捷键。青轴机械键盘吵醒整层楼，GitHub 绿点连成一片森林。相亲对象用鼠标点了下“保存”，你心里已经扣完分了。",
    environment:
      "基础架构组、开源核心仓、不赶 deadline 的研发中心——能供得起仙人的地方不多。",
    nemesis: { code: "CAPW", note: "你 review 他的 PR 写了三千字，他回你一个字：done。" },
    soulmate: { code: "TOLW", note: "全公司只有你俩能看懂对方的代码——一个为了纯洁，一个为了职级，殊途同归。" },
  },
  {
    code: "TOLW",
    group: "TO · 古法派",
    title: "护城河总工",
    subtitle: "核心系统唯一负责人",
    quote: "七层封装不为业务，为的是这套系统离了我就没人敢动。",
    description:
      "你手写每一行核心代码，深度抽象每一个模块——不为工匠精神，为的是让这套系统离了你就转不动。产品经理提任何需求，都得先过你的“架构评估”；新人想动你的模块，文档看一周还找不到入口。promo 答辩你年年过，因为“系统复杂度”这一栏，你就是复杂度本身。你玩的是最专业的技术，下的是最世故的棋。",
    strengths:
      "把晋升体系研究得比业务还透，每一层封装都精准踩在考核点上。",
    risks:
      "团队被你的护城河困成孤岛，业务改一个字段要排三周——总有一天有人会算这笔账。",
    lifestyle:
      "信仰“包裹+绿卡教”，饭桌话题只有大包、学区房和合并报税。相亲像终面，会反问对方的五年职业规划。",
    environment:
      "论资排辈、架构评审比需求还多的巨头核心部门，职级就是你的货币。",
    nemesis: { code: "CAPG", note: "他的代码是 AI 生成的都算高抬——你挂他 PR 的理由能写成周报。" },
    soulmate: { code: "TOLG", note: "他守护代码的纯洁，你守护自己的职级，你们的深渊连着同一条河。" },
  },
  {
    code: "TOPG",
    group: "TO · 古法派",
    title: "手冲代码大师",
    subtitle: "工程美学与最佳实践守护者",
    quote: "设计本来是完美的，是生产环境不配合。",
    description:
      "你的系统是手工打磨的艺术品：命名有韵律，分层有哲学，README 排版赏心悦目。然后它上线了。并发一来，你的杰作开始抽搐，而你拒绝承认——你调整了一个无关紧要的变量名，像给佛像掸灰一样重新部署，期待优雅自己回来。深挖 root cause？太脏了，那不是艺术家该干的活。你是个被分布式系统困住的浪漫主义者，错的不是你，是这个不肯优雅运行的世界。",
    strengths:
      "全组的审美天花板，你 review 过的代码会莫名变得好看，团队品味被动升级。",
    risks:
      "偶现 bug 是你的天敌：现实不按你的设计运行时，你的第一反应是心碎，第二反应还是心碎。",
    lifestyle:
      "家里的半自动意式机比显示器贵。约会花二十分钟讲水洗和日晒的区别；马桶堵了，沉默地打给水管工——那属于不优雅的现实。",
    environment:
      "研究型实验室、体验优先的前端团队，一切把“好看”当生产力的地方。",
    nemesis: { code: "CALW", note: "他管你的美学叫“不计入 KPI 的行为艺术”，你管他的 KPI 叫“对文明的背叛”。" },
    soulmate: { code: "TAPW", note: "你不许别人乱动代码，他压根不想动，你们在“保持现状”上达成了神圣同盟。" },
  },
  {
    code: "TOPW",
    group: "TO · 古法派",
    title: "祖传代码守墓人",
    subtitle: "核心系统稳定性负责人",
    quote: "最稳的系统不是没有 bug，是没人敢动。",
    description:
      "你守着一套自己十年前手写的框架，注释里还留着“相信后人的智慧”。谁提重构，你就给谁看那份 47 页的架构规范——不是你写得细，是你知道这座屎山的每一块砖抽掉会砸到谁。产品经理的新需求排进你的队列，平均寿命是两个季度。你对创新没意见，你有意见的是每次创新之后，周六凌晨三点响的都是你的电话。",
    strengths:
      "变更冻结期的定海神针，你在，线上就出不了大事——因为压根上不了线。",
    risks:
      "把团队冻成永冻层，等哪天业务真要转身，第一个被优化的就是纹丝不动的你。",
    lifestyle:
      "生活精确到 RSU vest 日历，每季度归属那天是你唯一的节日。相亲诉求写得明明白白：找个搭伙过日子、一起还贷的队友。",
    environment:
      "银行核心系统、老产品维护线，一切“稳定压倒一切”写在墙上的地方。",
    nemesis: { code: "CALG", note: "他一晚上引入的依赖，比你十年批准的都多——你的坟头就是他的舞池。" },
    soulmate: { code: "COPW", note: "他的养老院你的祖坟，联盟纲领四个字：谁都别动。" },
  },
  {
    code: "TALG",
    group: "TA · 手搓派",
    title: "键盘特种兵",
    subtitle: "疑难杂症攻坚小组组长",
    quote: "等 AI 想明白的功夫，我已经写完了。",
    description:
      "AI 补全对你来说太慢了——它还在转圈，你已经把函数写完顺手把内存泄漏堵了。没有架构会，没有 design doc，你的开发流程就是坐下、开写、上线、下一个。线上出事你一头扎进源码，两小时后浮出水面，手里拎着 root cause。同事叫你卷王，其实你没在卷，你就是手痒。这个行业包装词越来越多，而你还保留着最原始的那种快乐：东西是我亲手搓出来的。",
    strengths:
      "单兵战力天花板，一个人能平推一个技术攻坚项目，排错像开了透视。",
    risks:
      "你的代码只有你的手速跟得上，个人英雄主义的账，最后都是团队来结。",
    lifestyle:
      "一年四季短裤，把湾区三俗玩成铁人三项：hiking 十五公里起步，约会对象跟不上配速的，没有第二次。",
    environment:
      "自动驾驶、图形渲染这类硬核初创，或任何“能打的来”的攻坚小队。",
    nemesis: { code: "COPW", note: "你刚说“这系统该重写了”，他的三轮评审邀请已经出现在你日历上。" },
    soulmate: { code: "TALW", note: "你开路他守线，全场唯一一对健康的关系。" },
  },
  {
    code: "TALW",
    group: "TA · 手搓派",
    title: "交付牛马",
    subtitle: "核心业务基石工程师",
    quote: "需求给我，排期定好，我写完回家遛狗。",
    description:
      "你不信 AI 神话，也不搞架构行为艺术。需求给你，排期定好，代码一行行手写，日志一条条排查，到点交付，绝不废话。同事聊愿景聊赋能，你听完只问一句：“所以需求文档在哪？”这个行业的泡沫起起落落，你的交付记录稳如 Costco 的烤鸡价格。代码对你是门手艺，手艺是为了生活——这份清醒，全组就你一个人有。",
    strengths:
      "排期表上最让人放心的名字，你说周四上线，周四就上线，PM 做梦都会笑。",
    risks:
      "十年如一日的稳定输出，也意味着十年如一日的岗位画像——天花板不会自己长高。",
    lifestyle:
      "文化衫比 LV 更有身份感，周末雷打不动 Costco 补货：烤鸡、牛奶、四十卷厕纸。相亲直接亮牌：有车有狗有身份，确定关系后像维护线上服务一样维护感情——稳定，且有 SLA。",
    environment:
      "业务健康的中大型公司，需求清楚、排期合理，你就是永动机。",
    nemesis: { code: "COPG", note: "他在台上讲第二增长曲线，你在台下改他上一个项目留下的 bug。" },
    soulmate: { code: "TALG", note: "他冲锋你守线，你们是彼此唯一不用翻译黑话就能说话的人。" },
  },
  {
    code: "TAPG",
    group: "TA · 手搓派",
    title: "Stack Overflow 考古家",
    subtitle: "开源社区资源整合专家",
    quote: "这些代码我每一行都认识，它们凑一起能跑属于机缘。",
    description:
      "你的编程之路是一场大型互联网考古：答案埋在 2014 年的 Stack Overflow、一条 GitHub issue 的第 38 楼、和某个再也没更新过的博客里。你把前人的代码亲手搬进工程，兼容性报错就删 node_modules 重装，不行就重启，再不行就把版本号往下降——总有一层能通。原理你说不太清，但你坚信互联网的集体智慧不会辜负一个虔诚的搬运工。",
    strengths:
      "检索能力接近超能力，再冷门的报错你都能挖出五年前一个同病相怜的老哥。",
    risks:
      "拼图之间的缝隙就是你的知识盲区，哪天问题需要第一性原理，你会卡在第一步。",
    lifestyle:
      "家里 NAS 折腾了两个月终于完工，目前存的全是“以后会看”的教程。交友软件开场白是从小红书攻略里抄的，翻车了就靠梗图圆场——成功率意外地不低。",
    environment:
      "独立小游戏、前端动效外包、边缘业务——答案永远搜得到的地方。",
    nemesis: { code: "COLW", note: "他觉得你在靠运气编程，你觉得他在靠 PPT 编程——你们都对。" },
    soulmate: { code: "CAPG", note: "他半夜找 AI 忏悔，你半夜刨论坛坟贴，天亮时你们交换答案。" },
  },
  {
    code: "TAPW",
    group: "TA · 手搓派",
    title: "精神离职者",
    subtitle: "存量系统维护专家",
    quote: "它还有呼吸，就轮不到我优化它。",
    description:
      "你的工作哲学浓缩成一条 git log：“update”。旧代码复制过来，字段名改一改，测试报 bug 就补个 if——能过，就够了。新框架分享会你已读，团建群接龙你乱回，OKR 你写得像一首朦胧诗。躺平是外人的叫法，你管这叫风险控制：在“做多错多”的地方，静止是唯一的正期望策略。哪天真要走了，你大概是全组交接文档写得最干净的人——毕竟你早就想好了这一天。",
    strengths:
      "心如止水，任何画饼、PUA、周报文学都无法对你造成一点伤害。",
    risks:
      "裁员名单从低可见度往下裁，你的隐身术练得太好，好到 HR 都快看不见你了。",
    lifestyle:
      "别人激烈争论湾区是不是美食荒漠，你在同一家店点了三年同一碗粉。同事聊跳槽拿大包，你嗦一口，淡淡来一句：“太卷了，没必要。”",
    environment:
      "无人问津的后台管理系统，和一切“只要它还能跑”的角落。",
    nemesis: { code: "COLG", note: "他半夜给你发 AGI 长文，你的已读就是全部回复。" },
    soulmate: { code: "TOPG", note: "他容不得别人乱动代码，你根本不想动，“保持现状”教的两大长老。" },
  },
];
```

- [ ] **Step 5: Add the three fields to every entry in `src/data/personalities.en.ts`**

Insert `subtitle` after each `title`, and `nemesis`/`soulmate` after each `environment`. Exact values per code (en keeps its existing title/quote/description etc. unchanged; these are mechanical additions flagged for a later en pass):

```ts
// COLG
subtitle: "Agentic Workflow Evangelist",
nemesis: { code: "TAPW", note: "You want to refactor the world with prompts; he won't even open your README." },
soulmate: { code: "COLW", note: "He doesn't believe in AGI, but he'll write your faith into a promo packet." },
// COLW
subtitle: "Cross-org Enablement & Platform Architecture Lead",
nemesis: { code: "TAPG", note: "He codes by forum archaeology, you by slide deck — each thinks the other is faking it." },
soulmate: { code: "COLG", note: "He supplies the faith, you supply the paperwork." },
// COPG
subtitle: "Full-cycle Innovation Incubation Expert",
nemesis: { code: "TALW", note: "Every pie you pitch on stage, he bakes overtime with tears." },
soulmate: { code: "CALG", note: "You sell the story, he stitches the demo overnight." },
// COPW
subtitle: "Long-term Technical Vision Owner",
nemesis: { code: "TALG", note: "He wants to rewrite your system; your three rounds of design review outlast him." },
soulmate: { code: "TOPW", note: "Retirement home meets ancestral tomb: nobody touches anything." },
// CALG
subtitle: "0-to-1 Full-stack Growth Engineer",
nemesis: { code: "TOPW", note: "Every npm install you run is a rave on his ancestral grave." },
soulmate: { code: "COPG", note: "He draws the pie in the sky, you stitch the demo that runs." },
// CALW
subtitle: "Outcome-driven Delivery Lead",
nemesis: { code: "TOPG", note: "His aesthetics have no line item in your ROI sheet." },
soulmate: { code: "CAPW", note: "You score the ROI, he clears the tickets — zero emotional overhead." },
// CAPG
subtitle: "Human-AI Pair Programming Pioneer",
nemesis: { code: "TOLW", note: "Your PR gets seven layers of comments and seven days of silence from him." },
soulmate: { code: "TAPG", note: "You ask the AI, he asks the forums; at dawn you swap answers." },
// CAPW
subtitle: "Senior Agile Delivery Specialist",
nemesis: { code: "TOLG", note: "His review runs three thousand words; you reply with one: done." },
soulmate: { code: "CALW", note: "He scores the ROI, you clear the tickets — zero emotional overhead." },
// TOLG
subtitle: "Chair, Code Quality Committee",
nemesis: { code: "CAPW", note: "You wrote three thousand words of review; he replied “done”." },
soulmate: { code: "TOLW", note: "The only two people who can read each other's code — one for purity, one for leveling." },
// TOLW
subtitle: "Sole Owner, Core Systems",
nemesis: { code: "CAPG", note: "Calling his code AI-generated flatters it; your rejection reasons could fill a weekly report." },
soulmate: { code: "TOLG", note: "He guards the code's purity, you guard your level; your abysses share one river." },
// TOPG
subtitle: "Guardian of Engineering Aesthetics & Best Practices",
nemesis: { code: "CALW", note: "He files your aesthetics under “performance art, not KPI-relevant”." },
soulmate: { code: "TAPW", note: "You forbid touching the code, he never wanted to — a holy alliance of the status quo." },
// TOPW
subtitle: "Core System Stability Owner",
nemesis: { code: "CALG", note: "He imports more dependencies in one night than you've approved in ten years." },
soulmate: { code: "COPW", note: "His retirement home, your ancestral tomb: nobody touches anything." },
// TALG
subtitle: "Lead, Hard Problem Strike Team",
nemesis: { code: "COPW", note: "You said “this needs a rewrite”; his third design-review invite is already on your calendar." },
soulmate: { code: "TALW", note: "You breach, he holds the line — the only healthy relationship here." },
// TALW
subtitle: "Cornerstone Engineer, Core Business",
nemesis: { code: "COPG", note: "He pitches the second growth curve on stage; you fix his last project's bugs below." },
soulmate: { code: "TALG", note: "He charges, you hold the line — the only healthy relationship here." },
// TAPG
subtitle: "Open-source Community Resource Integrator",
nemesis: { code: "COLW", note: "You think he codes by PowerPoint; he thinks you code by luck. You're both right." },
soulmate: { code: "CAPG", note: "He confesses to the AI at 3 a.m., you excavate forum threads; at dawn you trade findings." },
// TAPW
subtitle: "Legacy System Maintenance Specialist",
nemesis: { code: "COLG", note: "He sends AGI essays at midnight; your read receipt is the whole reply." },
soulmate: { code: "TOPG", note: "He can't stand people touching the code; you never planned to." },
```

- [ ] **Step 6: Update the two stale title assertions**

`src/lib/scoring.test.ts:46`: `expect(result.personality.title).toContain("敏捷燃尽火化师");` → `expect(result.personality.title).toContain("Ticket 消消乐");`

`src/components/App.test.tsx:146`: `expect(screen.getAllByText(/敏捷燃尽火化师/i).length).toBeGreaterThan(0);` → `expect(screen.getAllByText(/Ticket 消消乐/i).length).toBeGreaterThan(0);`

- [ ] **Step 7: Run the suite**

Run: `npm run test` then `npm run typecheck`
Expected: PASS (all files).

- [ ] **Step 8: Commit**

```bash
git add src/lib/types.ts src/data/personalities.ts src/data/personalities.en.ts src/data/personalities.test.ts src/lib/scoring.test.ts src/components/App.test.tsx
git commit -m "feat: persona-driven profiles with nemesis/soulmate hooks"
```

---

### Task 2: Question rewrite (zh + en)

**Files:**
- Modify: `src/data/questions.zh.ts` (all 20 prompts; S3 pole flip)
- Modify: `src/data/questions.en.ts` (all 20 prompts; S3 pole flip)
- Modify: `src/components/App.test.tsx` (4 question regexes)

**Interfaces:**
- Consumes: `Question` type (unchanged).
- Produces: same ids/dimensions/kinds; S3 `agreementPole: "T"`, `disagreementPole: "C"` in BOTH locales. All other poles unchanged.

Result-math note (why existing flow tests stay green): answering "strongly agree" (value 1, weight +3) on all 20 questions yields S = 3+3−3+3−3 = +3 → C; H = +3 → O; I = −3 → P; P = −3 → W ⇒ still `COPW`, so `App.test.tsx` line 137 needs no change.

- [ ] **Step 1: Replace all 20 zh prompts in `src/data/questions.zh.ts`**

Keep ids, dimensions, and `kind` values exactly as they are. New `prompt` per id; S3 additionally swaps poles:

```text
S1 (C): 周五下午来的活，我会直接丢给 AI，先让它吐一版再说。
S2 (C): 不止写码——去哪吃饭、旅游怎么玩，我都先问 AI 要个方案。
S3 (T, poles flipped): 组装家具、修小家电这种事，我享受亲手搞定的过程。
S4 (C): 被 reviewer 追问，我会把 comment 原样丢给 AI，求一段回怼。
S5 (T): AI 写的核心逻辑，我不亲手重写一遍就不敢上线。
H1 (O): 出门旅游，我会做出小时级的行程表，还自带 Plan B。
H2 (O): 明明是个 CRUD，我已经在想它怎么升级成平台。
H3 (O): 需求还没批，我已经开始操心它三年后的扩展性。
H4 (A): 只要今晚能上线，能活过这周的版本就是好版本。
H5 (A): 出去玩我从不做攻略：先出发，落地再说。
I1 (L): 线上一炸，我先翻日志对变更，绝不上来就重启。
I2 (R): 复现不了的 bug，我会写个定时重启脚本先兜底。
I3 (R): 本地是好的、线上炸了——我第一反应是到处加 console.log。
I4 (R): 车里响了个怪声？把音乐开大一点就好了。
I5 (L): 不搞清楚它为什么坏、又为什么好，我下不了班。
P1 (G): 不算 perf 不给钱，我周末也会自己写点东西玩。
P2 (G): 给家里折腾 NAS、软路由、智能家居，我比上班积极多了。
P3 (W): 让我认真干活的不是热爱，是 perf、promo 和 PIP。
P4 (W): 身份和 layoff 的压力，实实在在影响我敢接什么活。
P5 (W): 周末去新开的店排两小时队，也比多看一眼代码强。
```

S3 entry becomes:

```ts
{
  id: "S3",
  dimension: "S",
  kind: "scenario",
  prompt: "组装家具、修小家电这种事，我享受亲手搞定的过程。",
  agreementPole: "T",
  disagreementPole: "C",
},
```

- [ ] **Step 2: Replace all 20 en prompts in `src/data/questions.en.ts`** (same structure; S3 poles flipped identically)

```text
S1: When work lands on my desk Friday afternoon, I toss it to AI first and see what comes back.
S2: Not just code — where to eat, how to travel: I ask AI for a plan first.
S3: Assembling furniture or fixing small appliances, I enjoy doing it with my own hands.
S4: When a reviewer pushes back, I paste the comment into AI and ask for a comeback.
S5: If AI wrote the core logic, I can't ship it until I've rewritten it by hand.
H1: When I travel, I build an hour-by-hour itinerary — with a Plan B.
H2: It's just CRUD, but I'm already planning how it becomes a platform.
H3: The feature isn't approved yet, and I'm already worried about scaling it three years out.
H4: If it can ship tonight and survive the week, it's a good version.
H5: No itineraries for me: book the flight, figure it out after landing.
I1: When prod breaks, I go straight to logs and recent diffs — never a blind restart.
I2: For a bug I can't reproduce, I'll write a scheduled-restart script as a stopgap.
I3: Works locally, explodes in prod — my first move is console.log everywhere.
I4: Weird noise in the car? Turn the music up.
I5: If I don't know why it broke and why the fix works, I can't call it a day.
P1: No perf credit, no pay — I'd still build things for fun on weekends.
P2: NAS, home router, smart home — my homelab gets more of me than my job does.
P3: What keeps me working isn't passion. It's perf, promo, and PIP.
P4: Visa and layoff pressure genuinely shape which risks I take.
P5: Two hours in line at a new restaurant beats one more look at code.
```

- [ ] **Step 3: Update the 4 stale question regexes in `src/components/App.test.tsx`**

| Line | Old matcher | New matcher |
|---|---|---|
| 51, 81, 110 | `/周五傍晚突然塞来脏活/i` | `/周五下午来的活/i` |
| 61, 70, 93, 115 | `/接到陌生需求时/i` | `/去哪吃饭、旅游怎么玩/i` |
| 104, 121 | `/写那些毫无营养的 boilerplate 时/i` | `/组装家具、修小家电/i` |
| 41 | `/When Friday-night grunt work lands on my desk/i` | `/When work lands on my desk Friday afternoon/i` |

- [ ] **Step 4: Run the suite**

Run: `npm run test`
Expected: PASS (including the COPW full-flow test, per the math note above).

- [ ] **Step 5: Commit**

```bash
git add src/data/questions.zh.ts src/data/questions.en.ts src/components/App.test.tsx
git commit -m "feat: rewrite quiz prompts, mix in lifestyle probes"
```

---

### Task 3: Copy + section labels + dimension tweak

**Files:**
- Modify: `src/lib/types.ts:99-105` (AppCopy.resultSections)
- Modify: `src/data/copy.ts` (zh rewrite + en labels)
- Modify: `src/data/dimensions.zh.ts:17` (shortLabel)
- Modify: `src/components/App.test.tsx` (button/hero assertions)
- Modify: `src/components/ResultAssets.test.tsx` (3 label strings)

**Interfaces:**
- Produces: `AppCopy.resultSections.nemesis: string` and `.soulmate: string` — Task 4 renders them.

- [ ] **Step 1: Extend `resultSections` in `src/lib/types.ts`**

```ts
resultSections: {
  description: string;
  strengths: string;
  risks: string;
  environment: string;
  lifestyle: string;
  nemesis: string;
  soulmate: string;
};
```

- [ ] **Step 2: Update `src/data/copy.ts`**

zh block — replace these fields (others stay):

```ts
heroSubtitle: "20 道题，鉴定你是哪一种码农。准到你想举报。",
heroNote:
  "AI 依赖、架构洁癖、排错玄学、上班动机——四个维度交叉出 16 种码农。测完拿到你的行为观察报告、你的天敌，和你的灵魂搭子。",
startButton: "开始鉴定",
resultSections: {
  description: "行为观察报告",
  strengths: "公司还留着你的理由",
  risks: "迟早要出的事故",
  environment: "适合关押你的地方",
  lifestyle: "下班后目击报告",
  nemesis: "天敌",
  soulmate: "灵魂搭子",
},
resultButtons: {
  saveImage: "保存海报",
  generatingImage: "生成中...",
  restart: "再测一次",
},
share: {
  kicker: "Programmer Personality Test",
  cta: "扫码鉴定你是哪种码农",
  visit: "Visit",
},
```

en block — only add two labels to `resultSections` (rest of en copy unchanged this round):

```ts
nemesis: "Nemesis",
soulmate: "Soulmate",
```

- [ ] **Step 3: `src/data/dimensions.zh.ts`** — S rightPole `shortLabel: "手工打磨"` → `shortLabel: "古法手写"`.

- [ ] **Step 4: Update stale copy assertions**

`src/components/App.test.tsx`:
- All 9 occurrences of `/开始测试/i` (lines 23, 49, 58, 67, 77, 88, 99, 129, 152) → `/开始鉴定/i`.
- Line 25 `"一个有趣的程序员人格测试。"` → `"20 道题，鉴定你是哪一种码农。准到你想举报。"`.

`src/components/ResultAssets.test.tsx`:
- Line 52 `"长描述"` → `"行为观察报告"`.
- Line 53 `"生活与社交侧写"` → `"下班后目击报告"`.
- Line 132 `"保存结果图"` → `"保存海报"`.

- [ ] **Step 5: Run the suite**

Run: `npm run test` then `npm run typecheck`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lib/types.ts src/data/copy.ts src/data/dimensions.zh.ts src/components/App.test.tsx src/components/ResultAssets.test.tsx
git commit -m "feat: report-style section labels and sharper hero copy"
```

---

### Task 4: Render subtitle + nemesis/soulmate on result page and poster

**Files:**
- Modify: `src/components/ResultScreen.tsx`
- Modify: `src/components/ShareCard.tsx`
- Modify: `src/app/App.tsx` (pass `personalities`)
- Modify: `src/app/app.css` (3 new rules)
- Modify: `src/components/ResultAssets.test.tsx` (props + new assertions)

**Interfaces:**
- Consumes: `Personality.subtitle/nemesis/soulmate` (Task 1), `copy.resultSections.nemesis/soulmate` (Task 3).
- Produces: `ResultScreenProps.personalities: Personality[]`; `ShareCardProps.personalities: Personality[]`.

- [ ] **Step 1: Add failing assertions to `src/components/ResultAssets.test.tsx`**

Add `import { personalitySets } from "../data/personalities";` and pass `personalities={personalitySets.zh}` to every `<ResultScreen>` and `<ShareCard>` render in the file. In the first test (CAPW result screen) add:

```ts
expect(screen.getByText("资深敏捷交付专家")).toBeInTheDocument();
expect(screen.getByText("天敌")).toBeInTheDocument();
expect(screen.getByText(/古法编程仙人/)).toBeInTheDocument();
```

In the TOPW share-card test add:

```ts
expect(screen.getByText("核心系统稳定性负责人")).toBeInTheDocument();
expect(screen.getByText(/天敌：CALG/)).toBeInTheDocument();
```

- [ ] **Step 2: Run to verify failure**

Run: `npm run test -- src/components/ResultAssets.test.tsx`
Expected: FAIL (TS: `personalities` not a known prop).

- [ ] **Step 3: Update `src/components/ResultScreen.tsx`**

Add to props interface and destructuring: `personalities: Personality[]` (import `Personality` type). Inside the component before `return`:

```tsx
const nemesisTitle = personalities.find(
  (item) => item.code === personality.nemesis.code
)?.title;
const soulmateTitle = personalities.find(
  (item) => item.code === personality.soulmate.code
)?.title;
```

After the `result-title` h2 add:

```tsx
<p className="result-subtitle">{personality.subtitle}</p>
```

Inside `.result-grid`, after the environment card, add:

```tsx
<article className="result-card">
  <h3>{copy.resultSections.nemesis}</h3>
  <p>
    <strong>
      {personality.nemesis.code} · {nemesisTitle}
    </strong>
    <br />
    {personality.nemesis.note}
  </p>
</article>
<article className="result-card">
  <h3>{copy.resultSections.soulmate}</h3>
  <p>
    <strong>
      {personality.soulmate.code} · {soulmateTitle}
    </strong>
    <br />
    {personality.soulmate.note}
  </p>
</article>
```

Pass `personalities={personalities}` through to `<ShareCard>`.

- [ ] **Step 4: Update `src/components/ShareCard.tsx`**

Props gain `personalities: Personality[]`. Compute `nemesisTitle`/`soulmateTitle` the same way. After `share-card-title` add:

```tsx
<p className="share-card-subtitle">{result.personality.subtitle}</p>
```

After the `share-card-sections` div add:

```tsx
<p className="share-card-relations">
  {copy.resultSections.nemesis}：{result.personality.nemesis.code} · {nemesisTitle}
  ｜{copy.resultSections.soulmate}：{result.personality.soulmate.code} · {soulmateTitle}
</p>
```

- [ ] **Step 5: `src/app/App.tsx`** — pass `personalities={content.personalities}` where `<ResultScreen>` is rendered.

- [ ] **Step 6: Append to `src/app/app.css`** (after the `.result-quote` rules; adjust hues only if lint/visual review demands):

```css
.result-subtitle {
  margin: 6px 0 0;
  font-size: 0.95rem;
  letter-spacing: 0.04em;
  color: #5b7083;
}

.share-card-subtitle {
  margin: 2px 0 0;
  font-size: 13px;
  color: #56707f;
}

.share-card-relations {
  margin: 14px 0 0;
  font-size: 13px;
  text-align: center;
  color: #2c4657;
}
```

- [ ] **Step 7: Run the suite**

Run: `npm run test`
Expected: PASS, including the new assertions.

- [ ] **Step 8: Commit**

```bash
git add src/components/ResultScreen.tsx src/components/ShareCard.tsx src/app/App.tsx src/app/app.css src/components/ResultAssets.test.tsx
git commit -m "feat: show subtitle and nemesis/soulmate on result page and poster"
```

---

### Task 5: Full gate + red-line audit

**Files:** none new.

- [ ] **Step 1: Full pipeline**

Run: `npm run lint && npm run typecheck && npm run test && npm run build`
Expected: all four PASS.

- [ ] **Step 2: Red-line grep (must return nothing)**

Run: `grep -rnE "舔狗|普信|娇妻|女拳|烙印|三哥|工票" src/data/`
Expected: no output.

- [ ] **Step 3: Template-sentence audit**

Run: `grep -c "你不是" src/data/personalities.ts` and confirm the "你并非/不是 X，你只是/你是 Y" closer appears only in COLG and COPG descriptions (other matches must not be that pattern).

- [ ] **Step 4: Manual smoke (dev server)**

Run: `npm run dev` — walk intro → 20 questions → result; verify subtitle, 天敌/灵魂搭子 cards, and poster export contain the relations line. Check `/?result=CAPW` shared link.

- [ ] **Step 5: Commit any stragglers, hand off for user acceptance**

```bash
git status --short
```

Expected: clean tree; zh content ready for user review on the dev server.
