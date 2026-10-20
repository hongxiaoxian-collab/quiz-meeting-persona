/**
 * 你是哪种开会人 — 演示题库
 * 对齐 sku-quiz-site-builder/demo/选题-开会人设.md
 * 标注：示例级 · 可直接演示 · 商用前请整库替换
 */
window.QUIZ_DATA = {
  meta: {
    notice: "示例 · 可演示 · 商用前请替换题库与文案",
    version: "1.1.0-demo",
    locale: "zh-CN",
  },
  quiz: {
    id: "meeting-persona-demo-v1",
    title: "你是哪种开会人？",
    oneLiner: "测完晒出你的开会人设",
    disclaimer:
      "本测评仅供娱乐与自我反思，不构成心理咨询、医学诊断或任何专业建议。请勿将结果用于标签化他人。",
    scoring: "weighted_traits_sum_then_top_result",
  },
  traits: [
    { id: "agenda", label: "议程" },
    { id: "ideate", label: "创意" },
    { id: "observe", label: "观察" },
    { id: "harmonize", label: "调和" },
  ],
  questions: [
    {
      id: "q1",
      stem: "会议开始前 3 分钟，你更常在？",
      options: [
        { id: "a", label: "确认议程与结束时间", weights: { agenda: 2 } },
        { id: "b", label: "打开白板／备灵感关键词", weights: { ideate: 2 } },
        { id: "c", label: "先观察谁在场、气氛如何", weights: { observe: 2 } },
        { id: "d", label: "跟迟到的人打个圆场招呼", weights: { harmonize: 2 } },
      ],
    },
    {
      id: "q2",
      stem: "有人开始跑题讲故事，你？",
      options: [
        { id: "a", label: "礼貌打断，指回议程条目", weights: { agenda: 2 } },
        { id: "b", label: "抓住故事里的新点子往下挖", weights: { ideate: 2 } },
        { id: "c", label: "先听完，记下谁在推动什么", weights: { observe: 2 } },
        {
          id: "d",
          label: "笑着接两句，再帮话头转回正题",
          weights: { harmonize: 2, agenda: 1 },
        },
      ],
    },
    {
      id: "q3",
      stem: "争论起来时，你更想？",
      options: [
        { id: "a", label: "限时：每人 1 分钟，然后表决或停车", weights: { agenda: 2 } },
        { id: "b", label: "换个框架重画问题边界", weights: { ideate: 2 } },
        { id: "c", label: "少插话，先看各方真实诉求", weights: { observe: 2 } },
        { id: "d", label: "降温：找双方都同意的一点", weights: { harmonize: 2 } },
      ],
    },
    {
      id: "q4",
      stem: "会议纪要你更在意？",
      options: [
        { id: "a", label: "决议、负责人、截止日期对齐", weights: { agenda: 2 } },
        { id: "b", label: "过程中冒出的半成品创意别丢", weights: { ideate: 2 } },
        { id: "c", label: "谁说了什么、隐含前提记清楚", weights: { observe: 2 } },
        { id: "d", label: "语气别伤人，抄送范围想周全", weights: { harmonize: 2 } },
      ],
    },
    {
      id: "q5",
      stem: "同事夸你开会时，你更想听到？",
      options: [
        { id: "a", label: "「多亏你，今天准时收束了」", weights: { agenda: 2 } },
        { id: "b", label: "「就你那一笔，思路打开了」", weights: { ideate: 2 } },
        { id: "c", label: "「你一总结，大家才听懂分歧」", weights: { observe: 2 } },
        { id: "d", label: "「有你在，火药味小很多」", weights: { harmonize: 2 } },
      ],
    },
  ],
  results: [
    {
      id: "r_agenda",
      trait: "agenda",
      title: "议程守门员",
      summary: "开会先对齐目标与时间盒，跑题就拉回来。",
      detail:
        "你习惯把「为什么开、开到几点、谁拍板」钉在桌上。同事可能觉得你有点严，但多数时候正是你把会从故事会拽回决策场。小提醒：偶尔留 5 分钟开放讨论，创意不会被时间盒掐死——这是娱乐比喻，不是性格诊断。",
      poster_line: "议程守门员 · 时间盒在手",
      share_text: "我测到了「议程守门员」——开会先对齐目标！仅供娱乐～",
      accent: "#2563eb",
      poster_img: "./img/poster-agenda.jpg",
      fun_tag: "准时收束本本分分",
    },
    {
      id: "r_whiteboard",
      trait: "ideate",
      title: "白板爆破手",
      summary: "爱现场画图拆问题，灵感多、纪要要补。",
      detail:
        "你一进会就想画框、拆假设、抛新角度。团队常靠你打开僵局，但半成品点子若没人收口，会后容易散。小提醒：散会前花 2 分钟把「要试的一件事」写进纪要——娱乐向描述，请勿对号入座病理化。",
      poster_line: "白板爆破手 · 一图胜千言",
      share_text: "我测到了「白板爆破手」——一图胜千言！仅供娱乐～",
      accent: "#ea580c",
      poster_img: "./img/poster-ideate.jpg",
      fun_tag: "灵感爆炸请系好安全带",
    },
    {
      id: "r_silent",
      trait: "observe",
      title: "沉默计算器",
      summary: "会上话少、会后结论准；别被当成「没参与」。",
      detail:
        "你更愿意先听、先记、先算账。真正开口时往往一句切中分歧。风险是：别人可能误读你的安静。小提醒：关键节点主动复述一句「我听到的是……」，既参与又不抢麦——仅供娱乐与自我反思。",
      poster_line: "沉默计算器 · 会后见真章",
      share_text: "我测到了「沉默计算器」——会后见真章！仅供娱乐～",
      accent: "#7c3aed",
      poster_img: "./img/poster-observe.jpg",
      fun_tag: "安静才是隐藏大招",
    },
    {
      id: "r_harmonizer",
      trait: "harmonize",
      title: "气氛润滑剂",
      summary: "擅长缓和冲突、对齐情绪；记得把决议钉死。",
      detail:
        "火药味上来时，你总能找到双方都能接的话。团队安全感往往因你而升。注意：和谐不等于没有结论——散会前确认「谁、做什么、何时」。娱乐向描述，非专业评估。",
      poster_line: "气氛润滑剂 · 先齐心再齐力",
      share_text: "我测到了「气氛润滑剂」——先齐心再齐力！仅供娱乐～",
      accent: "#059669",
      poster_img: "./img/poster-harmonize.jpg",
      fun_tag: "会议室里的维稳专家",
    },
  ],
  ui: {
    startCta: "开始测评",
    next: "下一题",
    prev: "上一题",
    submit: "看结果",
    retake: "再测一次",
    savePoster: "保存海报晒朋友圈",
    copyShare: "复制分享文案",
    footerDisclaimer: "仅供娱乐，不构成专业建议。",
    demoBadge: "Demo 示例题库",
    unlockLine: "恭喜解锁开会人设！",
  },
};
