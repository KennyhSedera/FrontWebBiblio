import React, { } from 'react';
import './FlipCard.css'; // Remplacez avec le chemin de votre fichier CSS
import Background from '../layout/Background';

function FlipCard() {
  const setIndex = () => {
    const pages = document.querySelectorAll(".page");
    for (let i = 0; i < pages.length; i++) {
      pages[i].style.zIndex = pages.length - i;
    }
  };

  function previous() {
    let active = document.querySelector(".active");
    if (active) {
      let prevSib = active.previousElementSibling;
      if (prevSib) {
        active.className = "page";
        prevSib.className = "page active";
        setIndex();
        prevSib.style.transform = "rotateY(0deg)";
        let prevSib2 = prevSib.previousElementSibling;
        if (prevSib2 && prevSib2.className === "page") {
          prevSib2.style.zIndex = "9998";
        }
      }
    }
  }

  function next() {
    let active = document.querySelector(".active");
    if (active) {
      let nextSib = active.nextElementSibling;
      if (nextSib) {
        active.style.transform = "rotateY(180deg)";
        active.className = "page";
        setIndex();
        active.style.zIndex = "9998";
        if (nextSib) {
          nextSib.className = "page active";
        }
      }
    }
  }

  return (
    <Background>
      <div className="center">
        <div className="book">
          <div className="pages">
            {/* <div className="beads">
              <div className="bead"></div>
              <div className="bead"></div>
              <div className="bead"></div>
              <div className="bead"></div>
            </div> */}

            {/* Page 1 */}
            <div className="page active">
              <div className="page-side front">
                <div className="page-head">
                  <div className="page-title">
                    Sports
                    <span className="material-icons-outlined">sports_soccer</span>
                  </div>
                  <div className="page-subtitle">Client Name</div>
                </div>
                <div className="page-content">
                  Content for Page 1
                </div>
                <div className="page-footer">
                  {/* <span>May 2023</span> */}
                  <button type="button" className="btn" onClick={next}>
                    <span className="material-icons-outlined">next</span>
                  </button>
                  <span className="pg-no">1</span>
                </div>
              </div>

              <div className="page-side back">
                <div className="page-head">
                  <div className="page-title">
                    Back of Page 1
                  </div>
                  <div className="page-subtitle">Client Name</div>
                </div>
                <div className="page-content">
                  Back Content for Page 1
                </div>
                <div className="page-footer">
                  {/* <span>May 2023</span> */}
                  <button type="button" className="btn" onClick={previous}>
                    <span className="material-icons-outlined">prev</span>
                  </button>
                  <span className="pg-no">2</span>
                </div>
              </div>
            </div>

            {/* Page 2 */}
            <div className="page">
              <div className="page-side front">
                <div className="page-head">
                  <div className="page-title">
                    New Page 2
                    <span className="material-icons-outlined">add</span>
                  </div>
                  <div className="page-subtitle">Client Name</div>
                </div>
                <div className="page-content">
                  Content for New Page 2
                </div>
                <div className="page-footer">
                  <button type="button" className="btn" onClick={next}>
                    <span className="material-icons-outlined">next</span>
                  </button>
                  {/* <span>May 2023</span> */}
                  <span className="pg-no">3</span>
                </div>
              </div>

              <div className="page-side back">
                <div className="page-head">
                  <div className="page-title">
                    Back of New Page 2
                  </div>
                  <div className="page-subtitle">Client Name</div>
                </div>
                <div className="page-content">
                  Back Content for New Page 2
                </div>
                <div className="page-footer">
                  <button type="button" className="btn" onClick={previous}>
                    <span className="material-icons-outlined">prev</span>
                  </button>
                  {/* <span>May 2023</span> */}
                  <span className="pg-no">4</span>
                </div>
              </div>
            </div>

            {/* Page 3 */}
            <div className="page">
              <div className="page-side front">
                <div className="page-head">
                  <div className="page-title">
                    New Page 3
                    <span className="material-icons-outlined">add</span>
                  </div>
                  <div className="page-subtitle">Client Name</div>
                </div>
                <div className="page-content">
                  Content for New Page 3
                </div>
                <div className="page-footer">
                  <button type="button" className="btn" onClick={next}>
                    <span className="material-icons-outlined">next</span>
                  </button>
                  <span className="pg-no">5</span>
                </div>
              </div>

              <div className="page-side back">
                <div className="page-head">
                  <div className="page-title">
                    Back of New Page 3
                  </div>
                  <div className="page-subtitle">Client Name</div>
                </div>
                <div className="page-content">
                  Back Content for New Page 3
                </div>
                <div className="page-footer">
                  <button type="button" className="btn" onClick={previous}>
                    <span className="material-icons-outlined">prev</span>
                  </button>
                  <span className="pg-no">6</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="controls">
          <button type="button" className="btn" onClick={previous}>
            <span className="material-icons-outlined">arrow_back</span>
          </button>
          <button type="button" className="btn" onClick={next}>
            <span className="material-icons-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </Background>
  );
}

export default FlipCard;
