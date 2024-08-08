import React from 'react'
import './Anime.css';
import D3 from './assets/21.png';
import D4 from './assets/Yoga.png';
import D5 from './assets/treat.png';
import D6 from './assets/Hos.png';
function Anime() {
  return (
    <div>
      <div class="section">
        <div class="video-visual">
          <video
            class="video"
            autoplay
            loop
            muted
            poster=""
            role="none"
            aria-label="background gradient animation"
          >
            <source
              src="https://raw.githubusercontent.com/mobalti/open-props-interfaces/main/dynamic-content-lockups-v2/assets/bg-gradient-animation.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div class="section-wrapper">
          <div class="content-wrapper">
            <div class="content content-1">
              <div class="mobile-visual">
                <img
                  class="card-img"
                  src={D3}
                  alt="Fantasy warrior  - Video game character"
                />
              </div>
              <div class="meta">
                <h2 class="headline">
                  Unleash Our<span class="text-highlight"> Best Doctor</span>
                </h2>
                <p class="desc">
                  Harness the skills of our top doctor to conquer the arena with unmatched medical expertise and strategic brilliance.
                </p>
              </div>
            </div>
            <div class="content content-2">
              <div class="mobile-visual">
                <img
                  class="card-img"
                  src={D4}
                  alt="Green haired ninja in armor - Video game character"
                />
              </div>
              <div class="meta">
                <h2 class="headline">
                  Embark on Your,
                  <span class="text-highlight">Healing Odyssey</span>
                </h2>
                <p class="desc">
                  Immerse Yourself in a Realm Where Challenges Test and Heroes Rise in Service to Others.
                </p>
              </div>
            </div>
            <div class="content content-3">
              <div class="mobile-visual">
                <img
                  class="card-img"
                  src={D5}
                  alt="Female warrior in armor - Video game character"
                />
              </div>
              <div class="meta">
                <h2 class="headline">

                  Mastering
                  <span class="text-highlight">
                    Treatment Strategies:</span>
                </h2>
                <p class="desc">
                  We provide the best treatment in the world, ensuring unparalleled care and outcomes. Our strategy to treatment focuses on personalized care, cutting-edge technology, and continuous innovation.
                </p>
              </div>
            </div>
            <div class="content content-4">
              <div class="mobile-visual">
                <img
                  class="card-img"
                  src={D6}
                  alt="Agile warrior - Video game character"
                />
              </div>
              <div class="meta">
                <h2 class="headline">
                  Our Hospital Rises to <span class="text-highlight">Prominence Globally </span>
                </h2>
                <p class="desc">
                  Our hospital stands out as a global leader, delivering world-class healthcare services with cutting-edge technology, expert medical professionals, and a commitment to excellence in patient care.
                </p>
              </div>
            </div>
          </div>
          <div class="visual">
            <div class="card-wrapper">
              <div class="card card-1">
                <img
                  class="card-img"
                  src={D3}
                  alt="Fantasy warrior  - Video game character"
                />
              </div>
              <div class="card card-2">
                <img
                  class="card-img"
                  src={D4}
                  alt="Green haired ninja in armor - Video game character"
                />
              </div>
              <div class="card card-3">
                <img
                  class="card-img"
                  src={D5}
                  alt="Female warrior in armor - Video game character"
                />
              </div>
              <div class="card card-4">
                <img
                  class="card-img"
                  src={D6}
                  alt="Agile warrior - Video game character"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Anime