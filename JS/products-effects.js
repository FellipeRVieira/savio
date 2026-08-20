/* =========================================================
   FORMA3D — Efeitos da página de Produtos
   ========================================================= */

(() => {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =========================================================
     HEADER — efeito de profundidade ao rolar
     ========================================================= */

  const header = document.querySelector("header");

  const updateHeader = () => {
    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 12
    );
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================================================
     PARALLAX DO HERO
     ========================================================= */

  const hero = document.querySelector(".page-hero");

  let ticking = false;

  const updateParallax = () => {
    if (!hero) return;

    const rect = hero.getBoundingClientRect();

    const progress = Math.max(
      -1,
      Math.min(
        1,
        -rect.top / Math.max(rect.height, 1)
      )
    );

    hero.style.setProperty(
      "--hero-parallax",
      `${progress * 45}px`
    );

    ticking = false;
  };

  if (!reduceMotion) {
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateParallax();
  }


  /* =========================================================
     REVEAL — elementos aparecem conforme entram na tela
     ========================================================= */

  if (!reduceMotion) {

    const revealObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "is-visible"
            );

            revealObserver.unobserve(
              entry.target
            );
          }

        });

      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -35px 0px"
      }
    );


    const prepareReveal = (root = document) => {

      root
        .querySelectorAll(
          ".card, .related-card, .results-meta"
        )
        .forEach((element) => {

          if (
            !element.classList.contains(
              "js-reveal"
            )
          ) {

            element.classList.add(
              "js-reveal"
            );

            revealObserver.observe(
              element
            );
          }

        });

    };


    prepareReveal();


    /* =====================================================
       TILT 3D DOS CARDS
       ===================================================== */

    const setupTilt = (card) => {

      if (
        card.dataset.tiltReady === "1"
      ) {
        return;
      }

      card.dataset.tiltReady = "1";


      card.addEventListener(
        "pointermove",
        (event) => {

          const rect =
            card.getBoundingClientRect();

          const x =
            (event.clientX - rect.left) /
            rect.width;

          const y =
            (event.clientY - rect.top) /
            rect.height;


          const rotateY =
            (x - 0.5) * 4;

          const rotateX =
            (0.5 - y) * 4;


          card.style.setProperty(
            "--tilt-x",
            `${rotateX}deg`
          );

          card.style.setProperty(
            "--tilt-y",
            `${rotateY}deg`
          );


          card.style.setProperty(
            "--mx",
            `${x * 100}%`
          );

          card.style.setProperty(
            "--my",
            `${y * 100}%`
          );

        }
      );


      card.addEventListener(
        "pointerleave",
        () => {

          card.style.setProperty(
            "--tilt-x",
            "0deg"
          );

          card.style.setProperty(
            "--tilt-y",
            "0deg"
          );

          card.style.setProperty(
            "--mx",
            "50%"
          );

          card.style.setProperty(
            "--my",
            "0%"
          );

        }
      );

    };


    const prepareCards = (
      root = document
    ) => {

      root
        .querySelectorAll(
          ".card, .related-card"
        )
        .forEach((card) => {

          setupTilt(card);

        });

      prepareReveal(root);

    };


    prepareCards();


    /* =====================================================
       OBSERVER
       
       O produtos.js provavelmente cria os cards
       dinamicamente.

       Por isso observamos #grid e #relatedGrid.
       ===================================================== */

    const grid =
      document.querySelector("#grid");

    const relatedGrid =
      document.querySelector(
        "#relatedGrid"
      );


    const mutationObserver =
      new MutationObserver(() => {

        prepareCards();

      });


    if (grid) {

      mutationObserver.observe(
        grid,
        {
          childList: true,
          subtree: true
        }
      );

    }


    if (relatedGrid) {

      mutationObserver.observe(
        relatedGrid,
        {
          childList: true,
          subtree: true
        }
      );

    }

  }


  /* =========================================================
     IMAGENS

     Quando uma imagem termina de carregar,
     adicionamos uma classe para permitir animações.
     ========================================================= */

  document.addEventListener(
    "load",
    (event) => {

      if (
        event.target instanceof
        HTMLImageElement
      ) {

        event.target.classList.add(
          "img-loaded"
        );

      }

    },
    true
  );

})();