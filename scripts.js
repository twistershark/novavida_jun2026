(() => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const desktopMotion = window.matchMedia("(min-width: 641px)").matches;

  function revealStaticContent() {
    document.querySelectorAll(".js-reveal").forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });
  }

  function initChromeState() {
    const nav = document.getElementById("nav");
    const stickyCta = document.getElementById("stickyCta");

    if (!nav && !stickyCta) return;

    function updateChrome() {
      const isScrolled = window.scrollY > 60;

      nav?.classList.toggle("is-scrolled", isScrolled);
      stickyCta?.classList.toggle(
        "is-visible",
        window.scrollY > window.innerHeight * 0.72,
      );
    }

    window.addEventListener("scroll", updateChrome, { passive: true });
    updateChrome();
  }

  function initPointerGlow() {
    document.addEventListener(
      "pointermove",
      (event) => {
        const x = Math.round((event.clientX / window.innerWidth) * 100);
        const y = Math.round((event.clientY / window.innerHeight) * 100);

        document.documentElement.style.setProperty("--mx", `${x}%`);
        document.documentElement.style.setProperty("--my", `${y}%`);
      },
      { passive: true },
    );
  }

  function closeFaqItem(item) {
    const button = item.querySelector(".faq-button");
    const panel = item.querySelector(".faq-panel");

    item.classList.remove("is-open");
    button?.setAttribute("aria-expanded", "false");
    panel?.setAttribute("hidden", "");
  }

  function openFaqItem(item) {
    const button = item.querySelector(".faq-button");
    const panel = item.querySelector(".faq-panel");

    item.classList.add("is-open");
    button?.setAttribute("aria-expanded", "true");
    panel?.removeAttribute("hidden");
  }

  function initFaq() {
    const faqItems = [...document.querySelectorAll(".faq-item")];

    faqItems.forEach((item) => {
      const button = item.querySelector(".faq-button");
      const panel = item.querySelector(".faq-panel");

      if (!button || !panel) return;

      if (item.classList.contains("is-open")) {
        openFaqItem(item);
      } else {
        closeFaqItem(item);
      }

      button.addEventListener("click", () => {
        const isOpen = item.classList.contains("is-open");

        faqItems.forEach(closeFaqItem);

        if (!isOpen) {
          openFaqItem(item);
        }
      });
    });
  }

  function initGsapAnimations() {
    if (
      !desktopMotion ||
      prefersReducedMotion ||
      !window.gsap ||
      !window.ScrollTrigger
    ) {
      revealStaticContent();
      return;
    }

    const { gsap, ScrollTrigger } = window;

    gsap.registerPlugin(ScrollTrigger);

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom 45%",
          scrub: true,
        },
      })
      .to(".hero-inner", { yPercent: -5, ease: "none" }, 0)
      .to(
        ".hero-visual img",
        { yPercent: -5, scale: 1.14, ease: "none" },
        0,
      );

    gsap.utils.toArray(".section").forEach((section) => {
      gsap.fromTo(
        section,
        {
          clipPath: "inset(14% 0% 0% 0%)",
          y: 110,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 45%",
            scrub: true,
          },
        },
      );
    });

    const intro = document.querySelector("[aria-labelledby='intro-title']");

    if (intro) {
      gsap.set(".for-list li", { y: 38, opacity: 0.28 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: intro,
            start: "top 88%",
            end: "top 24%",
            scrub: true,
          },
        })
        .to("#intro-title", { xPercent: -8, scale: 1.08, ease: "none" }, 0)
        .to(
          ".for-list li",
          { y: 0, opacity: 1, stagger: 0.045, ease: "none" },
          0.02,
        )
        .to(intro, { backgroundColor: "#eee6d8", ease: "none" }, 0.15);
    }

    gsap.to(".marquee-track", {
      xPercent: -18,
      ease: "none",
      scrollTrigger: {
        trigger: ".marquee",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.utils.toArray(".js-reveal").forEach((element) => {
      if (element.classList.contains("experience-card")) return;

      gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 82%",
          once: true,
        },
      });
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#experiencia",
          start: "top 88%",
          end: "top 18%",
          scrub: true,
        },
      })
      .fromTo(
        "#experience-title",
        { y: 40, opacity: 0.55 },
        { y: 0, opacity: 1, ease: "none" },
        0,
      )
      .fromTo(
        "#experiencia .section-text",
        { y: 90, opacity: 0.2 },
        { y: 0, opacity: 1, ease: "none" },
        0.05,
      )
      .fromTo(
        ".experience-card",
        {
          y: 42,
          opacity: 0.3,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          ease: "none",
        },
        0.08,
      );

    const gallerySection = document.querySelector(
      "[aria-labelledby='gallery-title']",
    );

    if (gallerySection) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: gallerySection,
            start: "top 88%",
            end: "top 30%",
            scrub: true,
          },
        })
        .fromTo(
          "#gallery-title",
          { y: 36, opacity: 0.55 },
          { y: 0, opacity: 1, ease: "none" },
          0,
        )
        .fromTo(
          ".photo-slot",
          { y: 34, opacity: 0.75 },
          { y: 0, opacity: 1, stagger: 0.025, ease: "none" },
          0.04,
        );
    }

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#programacao",
          start: "top 88%",
          end: "top 18%",
          scrub: true,
        },
      })
      .fromTo(
        "#schedule-title",
        { y: 36, opacity: 0.55 },
        { y: 0, opacity: 1, ease: "none" },
        0,
      )
      .fromTo(
        ".day",
        { y: 42, opacity: 0.25 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.055,
          ease: "none",
        },
        0.05,
      )
      .to(
        ".day.is-featured",
        { boxShadow: "0 24px 70px rgba(199, 154, 58, 0.14)", ease: "none" },
        0.35,
      );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#investimento",
          start: "top 88%",
          end: "top 16%",
          scrub: true,
        },
      })
      .fromTo(
        ".price",
        { y: 36, opacity: 0.45 },
        { y: 0, opacity: 1, ease: "none" },
        0,
      )
      .fromTo(
        ".includes li",
        { x: 34, opacity: 0.35 },
        { x: 0, opacity: 1, stagger: 0.02, ease: "none" },
        0.08,
      );

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".final",
          start: "top 88%",
          end: "top 20%",
          scrub: true,
        },
      })
      .fromTo(
        ".final h2",
        { scale: 0.82, opacity: 0.25 },
        { scale: 1, opacity: 1, ease: "none" },
        0,
      )
      .fromTo(
        ".final p, .final .btn",
        { y: 70, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.035, ease: "none" },
        0.18,
      );

    gsap.utils.toArray(".photo-slot, .local-map").forEach((element) => {
      gsap.fromTo(
        element,
        { backgroundPosition: "50% 0%" },
        {
          backgroundPosition: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "top 20%",
            scrub: true,
          },
        },
      );
    });

    ScrollTrigger.refresh();
  }

  initChromeState();
  initPointerGlow();
  initFaq();
  initGsapAnimations();
})();
