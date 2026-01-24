import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Setup the basic hero state
      gsap.set(".hero", { position: "absolute" });

      const CONFIG = [
        { x: () => Math.max(260, window.innerWidth * 0.45) * -1, y: -10, r: -8, h: 160, w: (i, el) => Math.max(320, el.parentNode.offsetWidth * 0.55) },
        { x: () => Math.max(260, window.innerWidth * 0.45) * 1, y: -50, r: 15, h: 360, w: (i, el) => Math.max(220, el.parentNode.offsetWidth * 0.3) },
        { x: () => Math.max(260, window.innerWidth * 0.45) * -1, y: -30, r: 6, h: 300, w: (i, el) => Math.max(330, el.parentNode.offsetWidth * 0.55) },
        { x: () => Math.max(260, window.innerWidth * 0.45) * 1, y: -30, r: -5, h: 400, w: (i, el) => Math.max(305, el.parentNode.offsetWidth * 0.45) },
        { x: () => Math.max(260, window.innerWidth * 0.45) * -1, y: -45, r: -20, h: 525, w: (i, el) => Math.max(160, el.parentNode.offsetWidth * 0.3) },
        { x: () => Math.max(260, window.innerWidth * 0.45) * 1, y: 10, r: 10, h: 160, w: (i, el) => Math.max(320, el.parentNode.offsetWidth * 0.55) }
      ];

      const cards = gsap.utils.toArray(".card");

      // 2. Animate Cards using fromTo for strict precision
      cards.forEach((card, index) => {
        if (CONFIG[index]) {
          gsap.fromTo(card, 
            {
              // Starting State
              x: CONFIG[index].x,
              yPercent: CONFIG[index].y,
              rotation: CONFIG[index].r,
              height: `${CONFIG[index].h}%`,
              width: CONFIG[index].w,
            },
            {
              // Ending State
              x: 0,
              yPercent: 0,
              rotation: 0,
              height: "100%",
              width: "100%",
              scrollTrigger: {
                trigger: ".scroller",
                start: "top bottom",
                end: "top 50%",
                scrub: true,
                immediateRender: false,
                markers: true, // DELETE THIS LINE once you are happy with the alignment
              }
            }
          );
        }
      });

      // 3. Sliding Content Panels
      gsap.fromTo([".card__content", ".card--two .card__column:last-of-type", ".card--three .card__column:last-of-type", ".card--five .card__column:last-of-type"], 
        { y: "-100cqh" },
        {
          y: "0cqh",
          scrollTrigger: {
            trigger: ".scroller",
            start: "top 80%",
            end: "top top",
            scrub: true
          }
        }
      );

      // 4. Fades and Avatars
      gsap.from(".card__avatar img, .password svg", {
        opacity: 0,
        scrollTrigger: { trigger: ".scroller", start: "top 50%", end: "top top", scrub: true }
      });

      gsap.from(".card--one .card__avatar, .card--four .card__avatar", {
        scale: 2,
        scrollTrigger: { trigger: ".scroller", start: "top bottom", end: "top top", scrub: true }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <nav>
        <div className="navbar">
          <a className="bear-link" href="https://twitter.com/intent/follow?screen_name=jh3yy" target="_blank" rel="noreferrer noopener">
            <svg className="w-9" viewBox="0 0 969 955" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="161.191" cy="320.191" r="133.191" stroke="currentColor" strokeWidth="20" />
              <circle cx="806.809" cy="320.191" r="133.191" stroke="currentColor" strokeWidth="20" />
              <circle cx="695.019" cy="587.733" r="31.4016" fill="currentColor" />
              <circle cx="272.981" cy="587.733" r="31.4016" fill="currentColor" />
              <path d="M564.388 712.083C564.388 743.994 526.035 779.911 483.372 779.911C440.709 779.911 402.356 743.994 402.356 712.083C402.356 680.173 440.709 664.353 483.372 664.353C526.035 664.353 564.388 680.173 564.388 712.083Z" fill="currentColor" />
              <rect x="310.42" y="448.31" width="343.468" height="51.4986" fill="#FF1E1E" />
              <path fillRule="evenodd" clipRule="evenodd" d="M745.643 288.24C815.368 344.185 854.539 432.623 854.539 511.741H614.938V454.652C614.938 433.113 597.477 415.652 575.938 415.652H388.37C366.831 415.652 349.37 433.113 349.37 454.652V511.741L110.949 511.741C110.949 432.623 150.12 344.185 219.845 288.24C289.57 232.295 384.138 200.865 482.744 200.865C581.35 200.865 675.918 232.295 745.643 288.24Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </nav>

      <header>
        <div className="hero">
          <div className="content">
            <h1>Step up your CSS game,<br /><span>today</span></h1>
            <p>Start your journey and join thousands of others.</p>
            <a href="https://twitter.com/intent/follow?screen_name=jh3yy" target="_blank" rel="noreferrer noopener">Start now</a>
          </div>
        </div>

        <div className="sticker">
          <div className="content">
            <div className="panel">
              <div className="panel__row">
                <div className="card card--one">
                  <div className="card__column">
                    <div className="card__avatar">
                      <img src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/526.jpg" alt="" />
                    </div>
                  </div>
                  <div className="card__content">
                    <div className="card__details">
                      <div className="text"></div>
                      <div className="image headspace">
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Headspace</title><path d="M23.9711 11.8612c.279 3.8878-1.5272 6.0933-2.6155 7.6357-1.694 1.7856-3.8397 4.2203-9.291 4.3565-4.6237.1827-6.8957-1.8508-8.8034-3.617-2.487-2.7336-3.1366-4.3512-3.261-8.3752-.0118-2.467.9397-4.9292 2.6025-7.0954C4.934 1.4736 8.6408.3699 12.0646.1426c3.5923-.1392 6.4493 1.6723 8.3993 3.624 2.4963 2.632 3.2629 4.8923 3.5054 8.0946Z"/></svg>
                      </div>
                      <div className="text"></div>
                      <div className="card__dummy"><div className="text-wrap"><div className="text"></div><div className="text"></div></div></div>
                    </div>
                  </div>
                  <div className="card__column">
                    <div className="card__company alexa">
                      <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Amazon Alexa</title><path d="M12 0C5.37 0 0 5.37 0 12C0 18.09 4.53 23.11 10.4 23.9V21.5A1.59 1.59 0 0 0 9.32 19.97A8.41 8.41 0 0 1 3.6 11.8A8.37 8.37 0 0 1 12.09 3.6A8.4 8.4 0 0 1 20.4 12.31L20.39 12.38A8.68 8.68 0 0 1 20.36 12.76C20.36 12.83 20.35 12.9 20.34 12.96C20.34 13.04 20.33 13.12 20.32 13.19L20.3 13.29C19.27 20.07 10.45 23.87 10.4 23.9C10.92 23.97 11.46 24 12 24C18.63 24 24 18.63 24 12S18.63 0 12 0Z"/></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="scroller">
          <div className="content">
            <div className="panel">
              {[...Array(6)].map((_, i) => <div key={i}></div>)}
            </div>
          </div>
        </div>

        <div className="ring ring--under">
          <img src="https://assets.codepen.io/605876/portal-ring.png" alt="" />
        </div>
        <div className="ring ring--over">
          <img src="https://assets.codepen.io/605876/portal-ring.png" alt="" />
        </div>
      </header>

      <main>
        <section><h2>Pretty rad.</h2></section>
      </main>
      <footer>ʕ•ᴥ•ʔ jhey © 2024</footer>
    </div>
  );
};

export default HeroSection;