(function () {
  var input = document.getElementById("search-input");
  var out = document.getElementById("search-results");
  if (!input || !out) return;
  var index = null, loading = null;

  function load() {
    if (!loading) {
      loading = fetch("/index.json")
        .then(function (r) { return r.json(); })
        .then(function (d) { index = d; });
    }
    return loading;
  }

  function score(doc, terms) {
    var title = (doc.title || "").toLowerCase();
    var body = ((doc.summary || "") + " " + (doc.content || "")).toLowerCase();
    var s = 0;
    for (var i = 0; i < terms.length; i++) {
      var inTitle = title.indexOf(terms[i]) !== -1;
      var inBody = body.indexOf(terms[i]) !== -1;
      if (!inTitle && !inBody) return 0;
      s += (inTitle ? 10 : 0) + (inBody ? 1 : 0);
    }
    return s;
  }

  function render(docs) {
    out.textContent = "";
    if (!docs.length) {
      var none = document.createElement("li");
      none.textContent = "No results.";
      out.appendChild(none);
      return;
    }
    docs.forEach(function (doc) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = doc.url;
      a.textContent = doc.title;
      var p = document.createElement("p");
      p.textContent = doc.summary;
      li.appendChild(a);
      li.appendChild(p);
      out.appendChild(li);
    });
  }

  input.addEventListener("focus", load);
  input.addEventListener("input", function () {
    var q = input.value.trim().toLowerCase();
    if (q.length < 2) {
      out.textContent = "";
      return;
    }
    load().then(function () {
      if (!index) return;
      var terms = q.split(/\s+/);
      var hits = index
        .map(function (d) { return { d: d, s: score(d, terms) }; })
        .filter(function (x) { return x.s > 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .slice(0, 10)
        .map(function (x) { return x.d; });
      render(hits);
    });
  });
})();
