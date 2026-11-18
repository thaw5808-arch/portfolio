(function () {
  var root = document.documentElement;
  root.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var body = document.body;
  var baseTheme = body.getAttribute('data-base') || 't-dark';
  var themes = ['t-dark', 't-adore', 't-serpent', 't-marine', 't-vesper', 't-bendux'];

  function setTheme(t) {
    if (body.classList.contains(t)) return;
    themes.forEach(function (x) { body.classList.remove(x); });
    body.classList.add(t);
  }

  if ('IntersectionObserver' in window) {
    // Page colour follows whichever section crosses the middle of the screen
    var bands = document.querySelectorAll('[data-theme]');
    if (bands.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) setTheme(e.target.getAttribute('data-theme'));
        });
      }, { rootMargin: '-48% 0px -48% 0px' });
      bands.forEach(function (b) { io.observe(b); });
    }

    // Reveal on scroll
    var rv = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { rv.observe(el); });

    // Videos play only while visible, and never on their own with reduced motion
    var vids = document.querySelectorAll('video[data-autoplay]');
    if (!reduce) {
      var vo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var v = e.target;
          if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
          else v.pause();
        });
      }, { threshold: 0.35 });
      vids.forEach(function (v) { vo.observe(v); });
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }

  if (!body.className.match(/\bt-/)) setTheme(baseTheme);
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
