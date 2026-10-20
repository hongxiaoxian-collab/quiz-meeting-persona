(function () {
  "use strict";

  var DATA = window.QUIZ_DATA;
  if (!DATA) {
    console.error("QUIZ_DATA missing");
    return;
  }

  var state = {
    screen: "home", // home | quiz | result
    index: 0,
    answers: {}, // qid -> optionId
    scores: null,
    result: null,
    busy: false,
  };

  var el = {
    home: document.getElementById("screen-home"),
    quiz: document.getElementById("screen-quiz"),
    result: document.getElementById("screen-result"),
    progressFill: document.getElementById("progress-fill"),
    progressText: document.getElementById("progress-text"),
    stem: document.getElementById("stem"),
    options: document.getElementById("options"),
    btnPrev: document.getElementById("btn-prev"),
    btnNext: document.getElementById("btn-next"),
    resultAccent: document.getElementById("result-accent"),
    resultTitle: document.getElementById("result-title"),
    resultSummary: document.getElementById("result-summary"),
    resultDetail: document.getElementById("result-detail"),
    resultArt: document.getElementById("result-art"),
    resultFunTag: document.getElementById("result-fun-tag"),
    resultUnlock: document.getElementById("result-unlock"),
    toast: document.getElementById("toast"),
    poster: document.getElementById("poster"),
    posterTitle: document.getElementById("poster-title"),
    posterLine: document.getElementById("poster-line"),
    posterSummary: document.getElementById("poster-summary"),
    posterArt: document.getElementById("poster-art"),
  };

  function showToast(msg) {
    el.toast.textContent = msg;
    el.toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.toast.classList.remove("show");
    }, 2200);
  }

  function showScreen(name) {
    state.screen = name;
    el.home.classList.toggle("hidden", name !== "home");
    el.quiz.classList.toggle("hidden", name !== "quiz");
    el.result.classList.toggle("hidden", name !== "result");
    window.scrollTo(0, 0);
  }

  function startQuiz() {
    state.index = 0;
    state.answers = {};
    state.scores = null;
    state.result = null;
    showScreen("quiz");
    renderQuestion();
  }

  function renderQuestion() {
    var q = DATA.questions[state.index];
    var total = DATA.questions.length;
    var pct = ((state.index + 1) / total) * 100;
    el.progressFill.style.width = pct + "%";
    el.progressText.textContent = "第 " + (state.index + 1) + " / " + total + " 题";
    el.stem.textContent = q.stem;

    el.options.innerHTML = "";
    q.options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option";
      btn.setAttribute("data-oid", opt.id);
      btn.textContent = opt.label;
      if (state.answers[q.id] === opt.id) {
        btn.classList.add("selected");
      }
      btn.addEventListener("click", function () {
        if (state.busy) return;
        state.answers[q.id] = opt.id;
        Array.prototype.forEach.call(el.options.children, function (c) {
          c.classList.toggle("selected", c.getAttribute("data-oid") === opt.id);
        });
        updateNav();
      });
      el.options.appendChild(btn);
    });

    updateNav();
  }

  function updateNav() {
    var q = DATA.questions[state.index];
    var has = !!state.answers[q.id];
    var last = state.index === DATA.questions.length - 1;
    el.btnPrev.disabled = state.index === 0 || state.busy;
    el.btnNext.disabled = !has || state.busy;
    el.btnNext.textContent = last ? DATA.ui.submit : DATA.ui.next;
  }

  function goPrev() {
    if (state.index <= 0 || state.busy) return;
    state.index -= 1;
    renderQuestion();
  }

  function goNext() {
    var q = DATA.questions[state.index];
    if (!state.answers[q.id] || state.busy) return;
    if (state.index >= DATA.questions.length - 1) {
      finish();
      return;
    }
    state.index += 1;
    renderQuestion();
  }

  function finish() {
    state.busy = true;
    var scores = {};
    DATA.traits.forEach(function (t) {
      scores[t.id] = 0;
    });

    DATA.questions.forEach(function (q) {
      var oid = state.answers[q.id];
      var opt = q.options.find(function (o) {
        return o.id === oid;
      });
      if (!opt || !opt.weights) return;
      Object.keys(opt.weights).forEach(function (trait) {
        scores[trait] = (scores[trait] || 0) + opt.weights[trait];
      });
    });

    var bestTrait = DATA.traits[0].id;
    var bestScore = -1;
    DATA.traits.forEach(function (t) {
      var s = scores[t.id] || 0;
      if (s > bestScore) {
        bestScore = s;
        bestTrait = t.id;
      }
    });

    var result =
      DATA.results.find(function (r) {
        return r.trait === bestTrait;
      }) || DATA.results[0];

    state.scores = scores;
    state.result = result;
    renderResult(result);
    showScreen("result");
    state.busy = false;
  }

  function preloadImg(src) {
    return new Promise(function (resolve) {
      if (!src) {
        resolve();
        return;
      }
      var img = new Image();
      img.onload = function () {
        resolve();
      };
      img.onerror = function () {
        resolve();
      };
      img.src = src;
    });
  }

  function renderResult(result) {
    var accent = result.accent || "#38bdf8";
    var art = result.poster_img || "";

    el.resultAccent.style.background = accent;
    document.documentElement.style.setProperty("--result-glow", accent);
    el.resultTitle.textContent = result.title;
    el.resultSummary.textContent = result.summary;
    el.resultDetail.textContent = result.detail;
    el.resultFunTag.textContent = result.fun_tag || "";
    el.resultFunTag.style.display = result.fun_tag ? "" : "none";
    if (el.resultUnlock) {
      el.resultUnlock.textContent = DATA.ui.unlockLine || "恭喜解锁开会人设！";
    }

    el.resultArt.src = art;
    el.resultArt.alt = result.title + "卡通海报";

    el.posterTitle.textContent = result.title;
    el.posterLine.textContent = result.poster_line;
    el.posterSummary.textContent = result.summary;
    el.posterArt.src = art;
    el.posterArt.alt = result.title;
    el.poster.style.setProperty("--poster-accent", accent);

    // restart sparkle animation
    var sparkles = document.getElementById("result-sparkles");
    if (sparkles) {
      sparkles.style.animation = "none";
      // force reflow
      void sparkles.offsetWidth;
      sparkles.style.animation = "";
    }
  }

  function retake() {
    startQuiz();
  }

  function copyShare() {
    if (!state.result) return;
    var text = state.result.share_text;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () {
          showToast("已复制分享文案");
        },
        function () {
          fallbackCopy(text);
        }
      );
    } else {
      fallbackCopy(text);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast("已复制分享文案");
    } catch (e) {
      showToast("复制失败，请长按手动复制");
    }
    document.body.removeChild(ta);
  }

  function savePoster() {
    if (!state.result) return;
    if (typeof html2canvas !== "function") {
      showToast("海报库未加载，请检查网络后重试");
      return;
    }
    if (state.busy) return;
    state.busy = true;
    showToast("正在生成海报…");

    var node = el.poster;
    var artSrc = state.result.poster_img || "";

    preloadImg(artSrc).then(function () {
      return html2canvas(node, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        width: 360,
        height: Math.max(640, node.scrollHeight),
      });
    })
      .then(function (canvas) {
        var filename =
          "开会人设-" + (state.result.title || "结果") + ".png";
        canvas.toBlob(function (blob) {
          state.busy = false;
          if (!blob) {
            downloadDataUrl(canvas.toDataURL("image/png"), filename);
            return;
          }
          var url = URL.createObjectURL(blob);
          var a = document.createElement("a");
          a.href = url;
          a.download = filename;
          a.rel = "noopener";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(function () {
            URL.revokeObjectURL(url);
          }, 1500);
          showToast("海报已保存（若未弹出请检查浏览器下载权限）");
        }, "image/png");
      })
      .catch(function (err) {
        console.error(err);
        state.busy = false;
        showToast("生成失败，请换浏览器重试");
      });
  }

  function downloadDataUrl(dataUrl, filename) {
    var a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast("海报已保存（若未弹出请检查浏览器下载权限）");
  }

  // wire
  document.getElementById("btn-start").addEventListener("click", startQuiz);
  el.btnPrev.addEventListener("click", goPrev);
  el.btnNext.addEventListener("click", goNext);
  document.getElementById("btn-retake").addEventListener("click", retake);
  document.getElementById("btn-save-poster").addEventListener("click", savePoster);
  document.getElementById("btn-copy-share").addEventListener("click", copyShare);

  // home copy
  document.getElementById("home-title").textContent = DATA.quiz.title;
  document.getElementById("home-oneliner").textContent = DATA.quiz.oneLiner;
  document.getElementById("home-disclaimer").textContent = DATA.quiz.disclaimer;
  document.getElementById("result-disclaimer").textContent = DATA.quiz.disclaimer;
  document.getElementById("footer-text").textContent = DATA.ui.footerDisclaimer;
  document.getElementById("demo-badge").textContent = DATA.ui.demoBadge;
  document.getElementById("btn-start").textContent = DATA.ui.startCta;
  document.getElementById("btn-retake").textContent = DATA.ui.retake;
  document.getElementById("btn-save-poster").textContent = DATA.ui.savePoster;
  document.getElementById("btn-copy-share").textContent = DATA.ui.copyShare;
  document.getElementById("btn-prev").textContent = DATA.ui.prev;

  // preload all poster arts
  DATA.results.forEach(function (r) {
    if (r.poster_img) preloadImg(r.poster_img);
  });

  showScreen("home");
})();
