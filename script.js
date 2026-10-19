// DevZambia — small, dependency-free enhancements.

(function () {
    "use strict";

    // Flag that JS is running so CSS only hides .reveal elements when we can reveal them again.
    document.documentElement.classList.add("js");

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- Fade-in on scroll ----
    var revealTargets = document.querySelectorAll(
        ".hero .container > *, .section-sub, section h2, .card, .step, .table-wrap"
    );

    revealTargets.forEach(function (el) {
        el.classList.add("reveal");
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
        revealTargets.forEach(function (el) {
            el.classList.add("visible");
        });
    } else {
        var revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        revealTargets.forEach(function (el) {
            revealObserver.observe(el);
        });
    }

    // ---- Highlight the current section in the nav ----
    var navLinks = document.querySelectorAll(".nav nav a");
    var sections = Array.prototype.map.call(navLinks, function (link) {
        return document.querySelector(link.getAttribute("href"));
    });

    if ("IntersectionObserver" in window) {
        var navObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (!entry.isIntersecting) return;
                    navLinks.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                });
            },
            { rootMargin: "-40% 0px -55% 0px" }
        );

        sections.forEach(function (section) {
            if (section) navObserver.observe(section);
        });
    }
})();