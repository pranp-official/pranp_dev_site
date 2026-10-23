(function () {
  document.querySelectorAll(".prose pre").forEach(function (pre) {
    if (pre.classList.contains("mermaid")) return;
    var wrap = document.createElement("div");
    wrap.className = "code-block";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "Copy";
    btn.setAttribute("aria-label", "Copy code to clipboard");
    btn.addEventListener("click", function () {
      var code = pre.querySelector("code") || pre;
      navigator.clipboard.writeText(code.innerText).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () {
          btn.textContent = "Copy";
        }, 1500);
      });
    });
      wrap.appendChild(btn);
    });

  document.querySelectorAll(".share-btn-copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var url = btn.getAttribute("data-url") || window.location.href;
      navigator.clipboard.writeText(url).then(function () {
        btn.classList.add("is-copied");
        setTimeout(function () {
          btn.classList.remove("is-copied");
        }, 1800);
      });
    });
  });
})();
