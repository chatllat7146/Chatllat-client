import React from "react";
import Aside from "../components/Aside";

const Home = () => {
  return (
    <>
      <div className="wrapper">
        <main className="main">
          <Aside />
          <section className="main__heading heading">
            <div className="container">
              <h1 className="heading__title">
                <span>Join</span>&nbsp; the Decentralized Revolution&nbsp;
                <span>of&nbsp;</span>
                Freelancing
              </h1>
            </div>
          </section>
          <section className="main__count count">
            <div className="container">
              <div class="count__inner">
                <a class="count__item count-item" href="members.html">
                  <div class="count-item__icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <p class="count-item__text">
                    <span>Post a Job</span>
                  </p>
                  <p class="count-item__subtext">
                    Find the Right Talent, <br />
                    Fast and Hassle-Free.
                  </p>
                </a>
                <a class="count__item count-item" href="groups.html">
                  <div class="count-item__icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <p class="count-item__text">
                    <span>Find a Job</span>
                  </p>
                  <p class="count-item__subtext">
                    Launch Your Career, <br />
                    One Project at a Time.
                  </p>
                </a>
                <a class="count__item count-item" href="/agreements">
                  <div class="count-item__icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <p class="count-item__text">
                    <span>Direct Agreement</span>
                  </p>
                  <p class="count-item__subtext">
                    Connect. Agree. Deliver
                    <br />
                    On-Chain.
                  </p>
                </a>
                {/* <a class="count__item count-item" href="#">
                  <div class="count-item__icon">
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g id="icons">
                        <path id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
                      </g>
                    </svg>
                  </div>
                  <p class="count-item__text">
                    <span>
                      4.9
                    </span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g id="icons" clip-path="url(#clip0_114_9488)">
                        <path id="Vector"
                          d="M11.9687 4.60317C11.8902 4.36018 11.6746 4.1876 11.4197 4.16462L7.95614 3.85013L6.58656 0.644511C6.48558 0.40958 6.25559 0.257507 6.00006 0.257507C5.74453 0.257507 5.51454 0.40958 5.41356 0.64506L4.04399 3.85013L0.579908 4.16462C0.325385 4.18815 0.110414 4.36018 0.0314019 4.60317C-0.0476102 4.84616 0.0253592 5.11267 0.2179 5.28068L2.83592 7.5767L2.06392 10.9773C2.00744 11.2274 2.10448 11.4858 2.31195 11.6358C2.42346 11.7164 2.55393 11.7574 2.68549 11.7574C2.79893 11.7574 2.91145 11.7268 3.01244 11.6664L6.00006 9.88077L8.98659 11.6664C9.20513 11.7978 9.48062 11.7858 9.68762 11.6358C9.89518 11.4854 9.99214 11.2268 9.93565 10.9773L9.16366 7.5767L11.7817 5.28113C11.9742 5.11267 12.0477 4.84661 11.9687 4.60317Z"
                          fill="#F9D442" />
                      </g>
                      <defs>
                        <clipPath id="clip0_114_9488">
                          <rect width="12" height="12" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </p>
                  <p class="count-item__subtext">
                    320+ ratings
                  </p>
                </a> */}
              </div>
            </div>
          </section>
          <section className="main__groups-section groups-section">
            <div className="container">
              <div className="groups-section__top groups-section-top">
                <h2 className="groups-section-top__title">Popular Groups</h2>
                <div className="groups-section__buttons swiper-buttons">
                  <div className="groups-section__buttons-prev swiper-buttons-prev-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="groups-section__buttons-next swiper-buttons-next-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="groups-section__swiper groups-section-swiper swiper">
                <div className="swiper-wrapper">
                  <div className="groups-section-swiper__slide groups-section-slide swiper-slide">
                    <div className="groups-section__card card">
                      <div className="card__inner">
                        <p className="card__suptext card__suptext--green">
                          private Group
                        </p>
                        <div className="card__options card-options">
                          <div className="card-options__btn">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <div className="card-options__inner">
                            <a
                              className="card-options__link"
                              href="group-profile.html"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.66659 13.3333H13.3333C13.6869 13.3333 14.026 13.1929 14.2761 12.9428C14.5261 12.6928 14.6666 12.3536 14.6666 12V5.33333C14.6666 4.97971 14.5261 4.64057 14.2761 4.39052C14.026 4.14048 13.6869 4 13.3333 4H8.04659C7.82698 3.99886 7.61105 3.9435 7.41798 3.83883C7.22492 3.73415 7.0607 3.58341 6.93992 3.4L6.39325 2.6C6.27247 2.41659 6.10825 2.26585 5.91519 2.16117C5.72212 2.0565 5.50619 2.00114 5.28659 2H2.66659C2.31296 2 1.97382 2.14048 1.72378 2.39052C1.47373 2.64057 1.33325 2.97971 1.33325 3.33333V12C1.33325 12.7333 1.93325 13.3333 2.66659 13.3333Z"
                                  stroke="#0E1218"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 8.66669H10"
                                  stroke="#0E1218"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Leave Group</span>
                            </a>
                            <a
                              className="card-options__link"
                              href="group-profile.html"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5927 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82668 2 9.00001 2.33333 8.00001 3.33333C7.00001 2.33333 6.17334 2 5.00001 2C4.02755 2 3.09492 2.38631 2.40729 3.07394C1.71965 3.76158 1.33334 4.69421 1.33334 5.66667C1.33334 7.2 2.33334 8.36667 3.33334 9.33333L8.00001 14L12.6667 9.33333Z"
                                  stroke="#0E1218"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Subscribe</span>
                            </a>
                          </div>
                        </div>
                        <a className="card__title" href="group-profile.html">
                          Mobile Apps
                        </a>
                        <ul className="card__list card-list">
                          <li className="card-list__item">
                            <p className="card-list__text">Active 2 days ago</p>
                          </li>
                          <li className="card-list__item">
                            <p className="card-list__text">10k Members</p>
                          </li>
                        </ul>
                        <a
                          className="card-box__poster"
                          href="group-profile.html"
                        >
                          <img
                            className="card-box__poster-img"
                            src="images/new/1-1.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="groups-section-swiper__slide groups-section-slide swiper-slide">
                    <div className="groups-section__card card">
                      <div className="card__inner">
                        <p className="card__suptext card__suptext--green">
                          private Group
                        </p>
                        <div className="card__options card-options">
                          <div className="card-options__btn">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <div className="card-options__inner">
                            <a
                              className="card-options__link"
                              href="group-profile.html"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.66659 13.3333H13.3333C13.6869 13.3333 14.026 13.1929 14.2761 12.9428C14.5261 12.6928 14.6666 12.3536 14.6666 12V5.33333C14.6666 4.97971 14.5261 4.64057 14.2761 4.39052C14.026 4.14048 13.6869 4 13.3333 4H8.04659C7.82698 3.99886 7.61105 3.9435 7.41798 3.83883C7.22492 3.73415 7.0607 3.58341 6.93992 3.4L6.39325 2.6C6.27247 2.41659 6.10825 2.26585 5.91519 2.16117C5.72212 2.0565 5.50619 2.00114 5.28659 2H2.66659C2.31296 2 1.97382 2.14048 1.72378 2.39052C1.47373 2.64057 1.33325 2.97971 1.33325 3.33333V12C1.33325 12.7333 1.93325 13.3333 2.66659 13.3333Z"
                                  stroke="#0E1218"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 8.66669H10"
                                  stroke="#0E1218"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>

                              <span>Leave Group</span>
                            </a>
                            <a
                              className="card-options__link"
                              href="group-profile.html"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5927 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82668 2 9.00001 2.33333 8.00001 3.33333C7.00001 2.33333 6.17334 2 5.00001 2C4.02755 2 3.09492 2.38631 2.40729 3.07394C1.71965 3.76158 1.33334 4.69421 1.33334 5.66667C1.33334 7.2 2.33334 8.36667 3.33334 9.33333L8.00001 14L12.6667 9.33333Z"
                                  stroke="#0E1218"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Subscribe</span>
                            </a>
                          </div>
                        </div>
                        <a className="card__title" href="group-profile.html">
                          Readymag
                        </a>
                        <ul className="card__list card-list">
                          <li className="card-list__item">
                            <p className="card-list__text">
                              Active 19 days ago
                            </p>
                          </li>
                          <li className="card-list__item">
                            <p className="card-list__text">872 Members</p>
                          </li>
                        </ul>
                        <a
                          className="card-box__poster"
                          href="group-profile.html"
                        >
                          <img
                            className="card-box__poster-img"
                            src="images/new/1-2.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="groups-section-swiper__slide groups-section-slide swiper-slide">
                    <div className="groups-section__card card">
                      <div className="card__inner">
                        <p className="card__suptext card__suptext--pink">
                          Public Group
                        </p>
                        <div className="card__options card-options">
                          <div className="card-options__btn">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                          <div className="card-options__inner">
                            <a
                              className="card-options__link"
                              href="group-profile.html"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2.66659 13.3333H13.3333C13.6869 13.3333 14.026 13.1929 14.2761 12.9428C14.5261 12.6928 14.6666 12.3536 14.6666 12V5.33333C14.6666 4.97971 14.5261 4.64057 14.2761 4.39052C14.026 4.14048 13.6869 4 13.3333 4H8.04659C7.82698 3.99886 7.61105 3.9435 7.41798 3.83883C7.22492 3.73415 7.0607 3.58341 6.93992 3.4L6.39325 2.6C6.27247 2.41659 6.10825 2.26585 5.91519 2.16117C5.72212 2.0565 5.50619 2.00114 5.28659 2H2.66659C2.31296 2 1.97382 2.14048 1.72378 2.39052C1.47373 2.64057 1.33325 2.97971 1.33325 3.33333V12C1.33325 12.7333 1.93325 13.3333 2.66659 13.3333Z"
                                  stroke="#0E1218"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 8.66669H10"
                                  stroke="#0E1218"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>

                              <span>Leave Group</span>
                            </a>
                            <a
                              className="card-options__link"
                              href="group-profile.html"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12.6667 9.33333C13.66 8.36 14.6667 7.19333 14.6667 5.66667C14.6667 4.69421 14.2804 3.76158 13.5927 3.07394C12.9051 2.38631 11.9725 2 11 2C9.82668 2 9.00001 2.33333 8.00001 3.33333C7.00001 2.33333 6.17334 2 5.00001 2C4.02755 2 3.09492 2.38631 2.40729 3.07394C1.71965 3.76158 1.33334 4.69421 1.33334 5.66667C1.33334 7.2 2.33334 8.36667 3.33334 9.33333L8.00001 14L12.6667 9.33333Z"
                                  stroke="#0E1218"
                                  stroke-width="1.5"
                                  stroke-linecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span>Subscribe</span>
                            </a>
                          </div>
                        </div>
                        <a className="card__title" href="group-profile.html">
                          UX-research
                        </a>
                        <ul className="card__list card-list">
                          <li className="card-list__item">
                            <p className="card-list__text">
                              Active 1 month ago
                            </p>
                          </li>
                          <li className="card-list__item">
                            <p className="card-list__text">300 Members</p>
                          </li>
                        </ul>
                        <a
                          className="card-box__poster"
                          href="group-profile.html"
                        >
                          <img
                            className="card-box__poster-img"
                            src="images/new/1-3.jpg"
                            alt="img"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="main__elevate elevate">
            <div className="container">
              <div className="elevate__inner">
                <div className="elevate__content elevate-content">
                  <h2 className="elevate-content__title">
                    Elevate Your Design Game <br />
                    and
                    <span>
                      Connect <br />
                      with Like-Minded <br />
                      Professionals <br />
                    </span>
                    at Design Lab
                  </h2>
                  <a
                    className="elevate-content__link"
                    data-fancybox=""
                    href="#login-popup"
                  >
                    Search Freelancers
                  </a>
                </div>
                <div className="elevate__view elevate-view">
                  <div className="elevate-view__box">
                    <p className="elevate-view__box-text">17K+</p>
                    <p className="elevate-view__box-subtext">professionals</p>
                  </div>
                  <img
                    className="elevate-view__img"
                    src="images/member-icon-2.png"
                    alt="img"
                  />
                  <img
                    className="elevate-view__img"
                    src="images/member-icon-16.png"
                    alt="img"
                  />
                  <img
                    className="elevate-view__img"
                    src="images/member-icon-8.png"
                    alt="img"
                  />
                  <img
                    className="elevate-view__img"
                    src="images/member-icon-3.png"
                    alt="img"
                  />
                  <img
                    className="elevate-view__img"
                    src="images/member-icon-25.png"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </section>
          {/* Additional sections go here */}

          <section className="main__new-courses new-courses">
            <div className="container">
              <div className="new-courses__top new-courses-top">
                <h2 className="new-courses-top__title">New Courses</h2>
                <div className="new-courses__buttons swiper-buttons">
                  <div className="new-courses__buttons-prev swiper-buttons-prev-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="new-courses__buttons-next swiper-buttons-next-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="new-courses__swiper new-courses-swiper swiper">
                <div className="swiper-wrapper">
                  <div className="new-courses-swiper__slide new-courses-slide swiper-slide">
                    <div className="courses__card card">
                      <div className="card__inner">
                        <p className="card__suptext card__suptext--pink">
                          UX/UI
                        </p>
                        <a className="card__title" href="courses-page.html">
                          Designing a Low Prototype in Figma
                        </a>
                        <ul className="card__list card-list">
                          <li className="card-list__item">
                            <p className="card-list__rait">
                              <span>4.5</span>
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="icons" clip-path="url(#clip0_114_9488)">
                                  <path
                                    id="Vector"
                                    d="M11.9687 4.60317C11.8902 4.36018 11.6746 4.1876 11.4197 4.16462L7.95614 3.85013L6.58656 0.644511C6.48558 0.40958 6.25559 0.257507 6.00006 0.257507C5.74453 0.257507 5.51454 0.40958 5.41356 0.64506L4.04399 3.85013L0.579908 4.16462C0.325385 4.18815 0.110414 4.36018 0.0314019 4.60317C-0.0476102 4.84616 0.0253592 5.11267 0.2179 5.28068L2.83592 7.5767L2.06392 10.9773C2.00744 11.2274 2.10448 11.4858 2.31195 11.6358C2.42346 11.7164 2.55393 11.7574 2.68549 11.7574C2.79893 11.7574 2.91145 11.7268 3.01244 11.6664L6.00006 9.88077L8.98659 11.6664C9.20513 11.7978 9.48062 11.7858 9.68762 11.6358C9.89518 11.4854 9.99214 11.2268 9.93565 10.9773L9.16366 7.5767L11.7817 5.28113C11.9742 5.11267 12.0477 4.84661 11.9687 4.60317Z"
                                    fill="#F9D442"
                                  />
                                </g>
                                <defs>
                                  <clip-path id="clip0_114_9488">
                                    <rect width="12" height="12" fill="white" />
                                  </clip-path>
                                </defs>
                              </svg>
                            </p>
                          </li>
                          <li className="card-list__item">
                            <p className="card-list__text">6 Lessons</p>
                          </li>
                          <li className="card-list__item">
                            <p className="card-list__text">21 Students</p>
                          </li>
                          <li className="card-list__item">
                            <a
                              className="card-list__link"
                              href="courses-page.html"
                            >
                              by Anthony Clark
                              <img
                                className="card-list__link-img"
                                src="images/member-icon-6.png"
                                alt="img"
                              />
                            </a>
                          </li>
                        </ul>
                        <a
                          className="card-box__poster"
                          href="courses-page.html"
                        >
                          <img
                            className="card-box__poster-img"
                            src="images/course-img-2.jpg"
                            alt="img"
                          />
                          <p className="card-box__poster-text">$65</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="new-courses-swiper__slide new-courses-slide swiper-slide">
                    <div className="courses__card card">
                      <div className="card__inner">
                        <p className="card__suptext card__suptext--pink">
                          illustration
                        </p>
                        <a className="card__title" href="courses-page.html">
                          Creative Thinking: Techniques and Tools
                        </a>
                        <ul className="card__list card-list">
                          <li className="card-list__item">
                            <p className="card-list__rait">
                              <span>4.5</span>
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g id="icons" clip-path="url(#clip0_114_9488)">
                                  <path
                                    id="Vector"
                                    d="M11.9687 4.60317C11.8902 4.36018 11.6746 4.1876 11.4197 4.16462L7.95614 3.85013L6.58656 0.644511C6.48558 0.40958 6.25559 0.257507 6.00006 0.257507C5.74453 0.257507 5.51454 0.40958 5.41356 0.64506L4.04399 3.85013L0.579908 4.16462C0.325385 4.18815 0.110414 4.36018 0.0314019 4.60317C-0.0476102 4.84616 0.0253592 5.11267 0.2179 5.28068L2.83592 7.5767L2.06392 10.9773C2.00744 11.2274 2.10448 11.4858 2.31195 11.6358C2.42346 11.7164 2.55393 11.7574 2.68549 11.7574C2.79893 11.7574 2.91145 11.7268 3.01244 11.6664L6.00006 9.88077L8.98659 11.6664C9.20513 11.7978 9.48062 11.7858 9.68762 11.6358C9.89518 11.4854 9.99214 11.2268 9.93565 10.9773L9.16366 7.5767L11.7817 5.28113C11.9742 5.11267 12.0477 4.84661 11.9687 4.60317Z"
                                    fill="#F9D442"
                                  />
                                </g>
                                <defs>
                                  <clip-path id="clip0_114_9488">
                                    <rect width="12" height="12" fill="white" />
                                  </clip-path>
                                </defs>
                              </svg>
                            </p>
                          </li>
                          <li className="card-list__item">
                            <p className="card-list__text">6 Lessons</p>
                          </li>
                          <li className="card-list__item">
                            <p className="card-list__text">21 Students</p>
                          </li>
                          <li className="card-list__item">
                            <a
                              className="card-list__link"
                              href="courses-page.html"
                            >
                              by Philippa Bush
                              <img
                                className="card-list__link-img"
                                src="images/member-icon-3.png"
                                alt="img"
                              />
                            </a>
                          </li>
                        </ul>
                        <a
                          className="card-box__poster"
                          href="courses-page.html"
                        >
                          <img
                            className="card-box__poster-img"
                            src="images/course-img-3.jpg"
                            alt="img"
                          />
                          <p className="card-box__poster-text">$20</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="main__new-courses new-courses">
            <div className="container">
              <div className="new-courses__top new-courses-top">
                <h2 className="new-courses-top__title">New Works</h2>
              </div>

              <div className="portfolio_main">
                <div className="works_list works_list_col3 ">
                  <div className="work__shout">
                    <a
                      className="work__link-img"
                      href="members-portfolio-single.html"
                    >
                      <img src="images/new/ga1.jpg" alt="img" />
                      <div className="work__link-image-caption">
                        Wallet App design
                      </div>
                    </a>
                    <div className="work__link-image-user">
                      <div className="work__link-image-avatar">
                        <img
                          className="members-section-top__img-image"
                          src="images/member-icon-16.png"
                          alt="img"
                        />
                      </div>
                      <a href="members-portfolio-single.html"> Elodie Hardin</a>
                    </div>
                  </div>

                  <div className="work__shout">
                    <a
                      className="work__link-img"
                      href="members-portfolio-single.html"
                    >
                      <img src="images/new/ga2.jpg" alt="img" />
                      <div className="work__link-image-caption">
                        Wallet App design
                      </div>
                    </a>
                    <div className="work__link-image-user">
                      <div className="work__link-image-avatar">
                        <img
                          className="members-section-top__img-image"
                          src="images/member-icon-16.png"
                          alt="img"
                        />
                      </div>
                      <a href="members-portfolio-single.html"> Elodie Hardin</a>
                    </div>
                  </div>

                  <div className="work__shout">
                    <a
                      className="work__link-img"
                      href="members-portfolio-single.html"
                    >
                      <img src="images/new/ga3.jpg" alt="img" />
                      <div className="work__link-image-caption">
                        Wallet App design
                      </div>
                    </a>
                    <div className="work__link-image-user">
                      <div className="work__link-image-avatar">
                        <img
                          className="members-section-top__img-image"
                          src="images/member-icon-16.png"
                          alt="img"
                        />
                      </div>
                      <a href="members-portfolio-single.html"> Elodie Hardin</a>
                    </div>
                  </div>

                  <div className="work__shout">
                    <a
                      className="work__link-img"
                      href="members-portfolio-single.html"
                    >
                      <img src="images/new/ga4.jpg" alt="img" />
                      <div className="work__link-image-caption">
                        Wallet App design
                      </div>
                    </a>
                    <div className="work__link-image-user">
                      <div className="work__link-image-avatar">
                        <img
                          className="members-section-top__img-image"
                          src="images/member-icon-16.png"
                          alt="img"
                        />
                      </div>
                      <a href="members-portfolio-single.html"> Elodie Hardin</a>
                    </div>
                  </div>

                  <div className="work__shout">
                    <a
                      className="work__link-img"
                      href="members-portfolio-single.html"
                    >
                      <img src="images/new/ga1.jpg" alt="img" />
                      <div className="work__link-image-caption">
                        Wallet App design
                      </div>
                    </a>
                    <div className="work__link-image-user">
                      <div className="work__link-image-avatar">
                        <img
                          className="members-section-top__img-image"
                          src="images/member-icon-16.png"
                          alt="img"
                        />
                      </div>
                      <a href="members-portfolio-single.html"> Elodie Hardin</a>
                    </div>
                  </div>

                  <div className="work__shout">
                    <a
                      className="work__link-img"
                      href="members-portfolio-single.html"
                    >
                      <img src="images/new/ga2.jpg" alt="img" />
                      <div className="work__link-image-caption">
                        Wallet App design
                      </div>
                    </a>
                    <div className="work__link-image-user">
                      <div className="work__link-image-avatar">
                        <img
                          className="members-section-top__img-image"
                          src="images/member-icon-16.png"
                          alt="img"
                        />
                      </div>
                      <a href="members-portfolio-single.html"> Elodie Hardin</a>
                    </div>
                  </div>

                  <div className="work__shout">
                    <a
                      className="work__link-img"
                      href="members-portfolio-single.html"
                    >
                      <img src="images/new/ga3.jpg" alt="img" />
                      <div className="work__link-image-caption">
                        Wallet App design
                      </div>
                    </a>
                    <div className="work__link-image-user">
                      <div className="work__link-image-avatar">
                        <img
                          className="members-section-top__img-image"
                          src="images/member-icon-16.png"
                          alt="img"
                        />
                      </div>
                      <a href="members-portfolio-single.html"> Elodie Hardin</a>
                    </div>
                  </div>

                  <div className="work__shout">
                    <a
                      className="work__link-img"
                      href="members-portfolio-single.html"
                    >
                      <img src="images/new/ga4.jpg" alt="img" />
                      <div className="work__link-image-caption">
                        Wallet App design
                      </div>
                    </a>
                    <div className="work__link-image-user">
                      <div className="work__link-image-avatar">
                        <img
                          className="members-section-top__img-image"
                          src="images/member-icon-16.png"
                          alt="img"
                        />
                      </div>
                      <a href="members-portfolio-single.html"> Elodie Hardin</a>
                    </div>
                  </div>

                  <div className="work__shout">
                    <a
                      className="work__link-img"
                      href="members-portfolio-single.html"
                    >
                      <img src="images/new/ga2.jpg" alt="img" />
                      <div className="work__link-image-caption">
                        Wallet App design
                      </div>
                    </a>
                    <div className="work__link-image-user">
                      <div className="work__link-image-avatar">
                        <img
                          className="members-section-top__img-image"
                          src="images/member-icon-16.png"
                          alt="img"
                        />
                      </div>
                      <a href="members-portfolio-single.html"> Elodie Hardin</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="main__section-top section-top section-top--main">
            <div className="container">
              <div className="section-top__inner">
                <div className="section-top__content section-top-content">
                  <p className="section-top-content__date">
                    Feb 27 – Mar 2, 2023
                  </p>
                  <h1 className="section-top-content__title title">
                    Big Global <br />
                    E-Commerce Conference ‘23
                  </h1>
                  <ul className="section-top-content__list card-list">
                    <li className="card-list__item">
                      <p className="card-list__text">
                        New York, NY, United States
                      </p>
                    </li>
                    <li className="card-list__item">
                      <p className="card-list__text">IT Education Centre</p>
                    </li>
                  </ul>
                  <div className="section-top-content__buttons">
                    <a
                      className="section-top-content__buttons-link section-top-content__buttons-link--green"
                      href="#"
                    >
                      Buy a Ticket
                    </a>
                  </div>
                </div>
                <div className="section-top__img">
                  <img
                    className="section-top__img-image"
                    src="images/new/image8885.jpg"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
          <section className="main__shop-section shop-section">
            <div className="container">
              <div className="shop-section__top shop-section-top">
                <h2 className="shop-section-top__title">Our Shop</h2>
                <div className="shop-section__buttons swiper-buttons">
                  <div className="shop-section__buttons-prev swiper-buttons-prev-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="shop-section__buttons-next swiper-buttons-next-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="shop-section__swiper shop-section-swiper swiper">
                <div className="swiper-wrapper">
                  <div className="shop-section-swiper__slide shop-section-slide swiper-slide">
                    <div className="shop__card card">
                      <div className="card__inner">
                        <a className="card-box__poster" href="shop.html">
                          <img
                            className="card-box__poster-img"
                            src="images/shop-img-4.jpg"
                            alt="img"
                          />
                          <p className="card-box__poster-suptext">sale</p>
                        </a>
                        <p className="card__subtext">Decor</p>
                        <a className="card__title" href="shop.html">
                          Coffee Cup
                        </a>
                        <div className="card__price card-price">
                          <del className="card-price__past">$30</del>
                          <ins className="card-price__current">$25</ins>
                        </div>
                        <a className="card__link" href="shop.html">
                          Add to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="shop-section-swiper__slide shop-section-slide swiper-slide">
                    <div className="shop__card card">
                      <div className="card__inner">
                        <a className="card-box__poster" href="shop.html">
                          <img
                            className="card-box__poster-img"
                            src="images/shop-img-5.jpg"
                            alt="img"
                          />
                          <p className="card-box__poster-suptext card-box__poster-suptext--pink">
                            new
                          </p>
                        </a>
                        <p className="card__subtext">Clothes</p>
                        <a className="card__title" href="shop.html">
                          T-Shirt
                        </a>
                        <div className="card__price card-price">
                          <del className="card-price__past"></del>
                          <ins className="card-price__current">$153</ins>
                        </div>
                        <a className="card__link" href="shop.html">
                          Add to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="shop-section-swiper__slide shop-section-slide swiper-slide">
                    <div className="shop__card card">
                      <div className="card__inner">
                        <a className="card-box__poster" href="shop.html">
                          <img
                            className="card-box__poster-img"
                            src="images/shop-img-6.jpg"
                            alt="img"
                          />
                        </a>
                        <p className="card__subtext">Accessories</p>
                        <a className="card__title" href="shop.html">
                          Fashion Bag
                        </a>
                        <div className="card__price card-price">
                          <del className="card-price__past"></del>
                          <ins className="card-price__current">$45 – $55</ins>
                        </div>
                        <a className="card__link" href="shop.html">
                          Add to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="main__news-section news-section">
            <div className="container">
              <div className="news-section__top news-section-top">
                <h2 className="news-section-top__title">Latest News</h2>
                <div className="news-section__buttons swiper-buttons">
                  <div className="news-section__buttons-prev swiper-buttons-prev-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="news-section__buttons-next swiper-buttons-next-btn">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons">
                        <path
                          id="Icon"
                          d="M2.5 6H9M6.5 3L9.14645 5.64645C9.34171 5.84171 9.34171 6.15829 9.14645 6.35355L6.5 9"
                          stroke="#fff"
                          stroke-width="1.5"
                          stroke-linecap="round"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="news-section__swiper news-section-swiper swiper">
                <div className="swiper-wrapper">
                  <div className="news-section-swiper__slide news-section-slide swiper-slide">
                    <div className="news-section-slide__card card">
                      <div className="card__inner">
                        <a className="card-box__poster" href="blog-page.html">
                          <img
                            className="card-box__poster-img"
                            src="images/group-img-5.jpg"
                            alt="img"
                          />
                        </a>
                        <p className="card__suptext card__suptext--purple">
                          technology
                        </p>
                        <a className="card__title" href="#">
                          The Ultimate Guide to the Best WordPress LMS Plugin
                        </a>
                        <p className="card__description">
                          Investing in a professional website is a must if you
                          want to build trust with your customers—and developing
                          that trust is a must if you want your ecommerce store
                          to succeed.
                        </p>
                        <ul className="card__list card-list">
                          <li className="card-list__item">
                            <p className="card-list__text">April 27, 2022</p>
                          </li>
                          <li className="card-list__item">
                            <p className="card-list__text">18 Comments</p>
                          </li>
                          <li className="card-list__item">
                            <a
                              className="card-list__link"
                              href="blog-page.html"
                            >
                              by Timothy Stuart
                              <img
                                className="card-list__link-img"
                                src="images/member-icon-15.png"
                                alt="img"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="news-section-swiper__slide news-section-slide swiper-slide">
                    <div className="news-section-slide__card card">
                      <div className="card__inner">
                        <a className="card-box__poster" href="blog-page.html">
                          <img
                            className="card-box__poster-img"
                            src="images/group-img-18.jpg"
                            alt="img"
                          />
                        </a>
                        <p className="card__suptext card__suptext--purple">
                          marketing
                        </p>
                        <a className="card__title" href="#">
                          Making an Online Portfolio to Impress Clients
                        </a>
                        <p className="card__description">
                          The point is, if you want your customers to take you
                          seriously, you need to show them you take yourself
                          seriously—and the only way to do that is with a
                          professional web design.
                        </p>
                        <ul className="card__list card-list">
                          <li className="card-list__item">
                            <p className="card-list__text">January 13, 2022</p>
                          </li>
                          <li className="card-list__item">
                            <p className="card-list__text">5 Comments</p>
                          </li>
                          <li className="card-list__item">
                            <a
                              className="card-list__link"
                              href="blog-page.html"
                            >
                              by Anthony Clark
                              <img
                                className="card-list__link-img"
                                src="images/member-icon-4.png"
                                alt="img"
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="main__login login" id="login-popup">
            <div className="login__inner">
              <h2 className="login__title">Log In</h2>
              <div className="login__info login-info">
                <div className="login-info__box">
                  <p className="login-info__box-text">Username:</p>
                  <div className="login-info__box-input">
                    <p>demo</p>
                    <input type="text" />
                  </div>
                  <button
                    className="login-info__box-btn"
                    onClick="copyToClipboard1()"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons" clip-path="url(#clip0_215_18476)">
                        <path
                          id="Vector"
                          d="M13.3333 5.33325H6.66659C5.93021 5.33325 5.33325 5.93021 5.33325 6.66659V13.3333C5.33325 14.0696 5.93021 14.6666 6.66659 14.6666H13.3333C14.0696 14.6666 14.6666 14.0696 14.6666 13.3333V6.66659C14.6666 5.93021 14.0696 5.33325 13.3333 5.33325Z"
                          stroke="#6D9985"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M2.66659 10.6666C1.93325 10.6666 1.33325 10.0666 1.33325 9.33325V2.66659C1.33325 1.93325 1.93325 1.33325 2.66659 1.33325H9.33325C10.0666 1.33325 10.6666 1.93325 10.6666 2.66659"
                          stroke="#6D9985"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clip-path id="clip0_215_18476">
                          <rect width="16" height="16" fill="white" />
                        </clip-path>
                      </defs>
                    </svg>
                  </button>
                </div>
                <div className="login-info__box">
                  <p className="login-info__box-text">Password:</p>
                  <div className="login-info__box-input">
                    <p>designlab_demo</p>
                    <input type="text" value="designlab_demo" id="myvalue2" />
                  </div>
                  <button
                    className="login-info__box-btn"
                    onClick="copyToClipboard2()"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="icons" clip-path="url(#clip0_215_18476)">
                        <path
                          id="Vector"
                          d="M13.3333 5.33325H6.66659C5.93021 5.33325 5.33325 5.93021 5.33325 6.66659V13.3333C5.33325 14.0696 5.93021 14.6666 6.66659 14.6666H13.3333C14.0696 14.6666 14.6666 14.0696 14.6666 13.3333V6.66659C14.6666 5.93021 14.0696 5.33325 13.3333 5.33325Z"
                          stroke="#6D9985"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          id="Vector_2"
                          d="M2.66659 10.6666C1.93325 10.6666 1.33325 10.0666 1.33325 9.33325V2.66659C1.33325 1.93325 1.93325 1.33325 2.66659 1.33325H9.33325C10.0666 1.33325 10.6666 1.93325 10.6666 2.66659"
                          stroke="#6D9985"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clip-path id="clip0_215_18476">
                          <rect width="16" height="16" fill="white" />
                        </clip-path>
                      </defs>
                    </svg>
                  </button>
                </div>
              </div>
              <htmlForm className="login__htmlForm login-htmlForm" action="#">
                <div className="login-htmlForm__box login-htmlForm-box">
                  <label className="login-htmlForm-box__label">
                    Username or Email
                  </label>
                  <div className="login-htmlForm-box__row">
                    <input
                      className="login-htmlForm-box__row-input"
                      type="text"
                    />
                  </div>
                </div>
                <div className="login-htmlForm__box login-htmlForm-box">
                  <label className="login-htmlForm-box__label" htmlFor="">
                    Password
                  </label>
                  <div className="login-htmlForm-box__row">
                    <input
                      className="login-htmlForm-box__row-input"
                      type="password"
                    />
                    <button className="login-htmlForm-box__row-btn">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="icons" clip-path="url(#clip0_215_18379)">
                          <path
                            id="Vector"
                            d="M6.58675 6.58667C6.39025 6.76977 6.23265 6.99057 6.12334 7.2359C6.01402 7.48123 5.95524 7.74607 5.95051 8.01461C5.94577 8.28315 5.99517 8.54989 6.09576 8.79893C6.19635 9.04796 6.34607 9.27419 6.53598 9.46411C6.7259 9.65402 6.95212 9.80374 7.20116 9.90433C7.45019 10.0049 7.71694 10.0543 7.98548 10.0496C8.25402 10.0448 8.51885 9.98606 8.76419 9.87675C9.00952 9.76744 9.23032 9.60983 9.41342 9.41334"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            id="Vector_2"
                            d="M7.15332 3.38659C7.43419 3.35159 7.71694 3.33378 7.99999 3.33325C12.6667 3.33325 14.6667 7.99992 14.6667 7.99992C14.3686 8.638 13.9948 9.23787 13.5533 9.78659"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            id="Vector_3"
                            d="M4.40659 4.40674C3.08075 5.30982 2.01983 6.55024 1.33325 8.00007C1.33325 8.00007 3.33325 12.6667 7.99992 12.6667C9.27719 12.6702 10.5271 12.2968 11.5933 11.5934"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            id="Vector_4"
                            d="M1.33325 1.33325L14.6666 14.6666"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                        <defs>
                          <clip-path id="clip0_215_18379">
                            <rect width="16" height="16" fill="white" />
                          </clip-path>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="login-htmlForm__bottom">
                  <label className="login-htmlForm__bottom-checkbox container">
                    Remember Me
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                  <a className="login-htmlForm__bottom-link" href="#">
                    htmlForgot Password?
                  </a>
                </div>
                <button className="login-htmlForm__button" type="submit">
                  Log In
                </button>
                <div className="login-htmlForm__socials login-htmlForm-socials">
                  <p className="login-htmlForm-socials__or">
                    <span></span>
                    or
                    <span></span>
                  </p>
                  <ul className="login-htmlForm-socials__list socials">
                    <li className="socials__item">
                      <a className="socials__link" href="#">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="social_icons">
                            <g id="Layer_x0020_1">
                              <path
                                id="Vector"
                                fill-rule="evenodd"
                                clipRule="evenodd"
                                d="M5.92126 15.7984C5.92126 15.9097 6.01157 16 6.12282 16H8.99563C9.10688 16 9.19688 15.9097 9.19688 15.7984V7.93687H11.2797C11.3841 7.93687 11.4713 7.85656 11.4803 7.7525L11.6806 5.38375C11.6903 5.26625 11.5978 5.16531 11.4797 5.16531H9.19688V3.485C9.19688 3.09094 9.51626 2.77156 9.91001 2.77156H11.515C11.6266 2.77156 11.7166 2.68125 11.7166 2.57V0.201562C11.7166 0.0903125 11.6266 0 11.515 0H8.80313C7.21157 0 5.92126 1.29 5.92126 2.88156V5.16531H4.48501C4.37376 5.16531 4.28345 5.25563 4.28345 5.36688V7.73531C4.28345 7.84688 4.37376 7.93687 4.48501 7.93687H5.92126V15.7984Z"
                                fill="white"
                              />
                            </g>
                          </g>
                        </svg>
                      </a>
                    </li>
                    <li className="socials__item">
                      <a className="socials__link" href="#">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="social_icons" clip-path="url(#clip0_187_9402)">
                            <g id="Layer_x0020_1">
                              <path
                                id="Vector"
                                fill-rule="evenodd"
                                clipRule="evenodd"
                                d="M15.94 2.91286C15.4315 3.14286 14.8722 3.28224 14.3237 3.37443C14.8062 3.29349 15.5215 2.14068 15.6597 1.68849C15.7009 1.60568 15.6412 1.5763 15.5706 1.61161C14.9584 1.93974 14.325 2.17755 13.6509 2.34599C13.5243 2.37755 13.4484 2.22036 13.3506 2.13943C10.9584 0.103801 7.39841 2.14505 7.8631 5.29818C7.87341 5.37536 7.86685 5.38568 7.79716 5.37536C5.16028 4.98255 2.97466 4.03943 1.20028 2.01724C1.12341 1.92943 1.08153 1.92974 1.01841 2.02411C0.0843455 3.42411 0.758408 5.37005 1.99403 6.33318C1.94153 6.3438 1.29622 6.2738 0.720908 5.97661C0.644033 5.92786 0.605283 5.95599 0.59872 6.04318C0.520595 7.41318 1.76903 9.0138 3.12716 9.24693C2.87216 9.30286 2.60966 9.34286 1.87872 9.28568C1.78778 9.26818 1.75278 9.31349 1.78778 9.40099C2.33716 10.8982 3.52278 11.3438 4.41091 11.5976C4.52966 11.6185 4.64872 11.6185 4.7681 11.6463C4.11903 12.611 1.31403 13.0713 0.234658 12.9651C0.15997 12.9541 -0.121592 12.9147 0.0599705 13.0629C6.46966 17.2885 14.4522 12.7663 14.4522 4.72818C14.4522 4.62443 14.5743 4.56755 14.6472 4.51286C14.9809 4.26193 16 3.34255 16 2.91286C16 2.87036 16.005 2.88349 15.94 2.91286Z"
                                fill="white"
                              />
                            </g>
                          </g>
                          <defs>
                            <clip-path id="clip0_187_9402">
                              <rect width="16" height="16" fill="white" />
                            </clip-path>
                          </defs>
                        </svg>
                      </a>
                    </li>
                    <li className="socials__item">
                      <a className="socials__link" href="#">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="social_icons" clip-path="url(#clip0_187_9379)">
                            <path
                              id="Vector"
                              d="M0 8C0 3.5888 3.5888 0 8 0C9.78156 0 11.4678 0.573181 12.8765 1.6576L11.0174 4.07253C10.1464 3.40206 9.10301 3.04762 8 3.04762C5.26926 3.04762 3.04762 5.26926 3.04762 8C3.04762 10.7307 5.26926 12.9524 8 12.9524C10.1994 12.9524 12.0684 11.5114 12.7125 9.52381H8V6.47619H16V8C16 12.4112 12.4112 16 8 16C3.5888 16 0 12.4112 0 8Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clip-path id="clip0_187_9379">
                              <rect width="16" height="16" fill="white" />
                            </clip-path>
                          </defs>
                        </svg>
                      </a>
                    </li>
                    <li className="socials__item">
                      <a className="socials__link" href="#">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="social_icons" clip-path="url(#clip0_187_9414)">
                            <g id="Layer_x0020_1">
                              <path
                                id="Vector"
                                fill-rule="evenodd"
                                clipRule="evenodd"
                                d="M0.32085 16H3.62241V5.33313H0.32085V16ZM8.90054 10.4006C8.90054 8.90125 9.59085 8.0075 10.9124 8.0075C12.1265 8.0075 12.7096 8.86531 12.7096 10.4006V16H15.9962C15.9962 16 15.9962 12.1038 15.9962 9.24656C15.9962 6.38938 14.3765 5.00781 12.1149 5.00781C9.85241 5.0075 8.90054 6.77 8.90054 6.77V5.33313H5.73335V16H8.90054C8.90054 16 8.90054 12.0441 8.90054 10.4006ZM1.95616 3.93688C3.03429 3.93688 3.90866 3.05469 3.90866 1.96812C3.90866 0.88125 3.03429 0 1.95616 0C0.877412 0 0.00366211 0.88125 0.00366211 1.96812C0.00366211 3.05469 0.877412 3.93688 1.95616 3.93688Z"
                                fill="white"
                              />
                            </g>
                          </g>
                          <defs>
                            <clip-path id="clip0_187_9414">
                              <rect width="16" height="16" fill="white" />
                            </clip-path>
                          </defs>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </htmlForm>
            </div>
          </section>

          <section className="main__popup " id="faq-popup">
            <div className="popup__inner">
              <h2 className="popup__title">Popular Questions</h2>

              <div className="popup-content">
                <ul>
                  <li>
                    <i className="icon-book-open"></i>
                    <a href="index.html">How to Upload Your Portfolio </a>
                  </li>
                  <li>
                    <i className="icon-book-open"></i>
                    <a href="index.html">How to Start To Work</a>
                  </li>
                  <li>
                    <i className="icon-book-open"></i>
                    <a href="index.html">
                      Get in touch with the Creator Support Team
                    </a>
                  </li>
                </ul>
                <div className="htmlForm-help-links">
                  <a className="fl-btn btn_first" href="index.html">
                    Browse all articles
                  </a>
                  <a
                    className="fl-btn btn_second"
                    data-fancybox=""
                    href="#report-popup"
                  >
                    Send Feedback
                  </a>
                </div>

                <div className="login-htmlForm__socials login-htmlForm-socials">
                  <p className="login-htmlForm-socials__or">
                    <span></span>
                    or
                    <span></span>
                  </p>
                  <ul className="login-htmlForm-socials__list socials">
                    <li className="socials__item">
                      <a className="socials__link" href="#" tabindex="0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="social_icons">
                            <g id="Layer_x0020_1">
                              <path
                                id="Vector"
                                fill-rule="evenodd"
                                clipRule="evenodd"
                                d="M5.92126 15.7984C5.92126 15.9097 6.01157 16 6.12282 16H8.99563C9.10688 16 9.19688 15.9097 9.19688 15.7984V7.93687H11.2797C11.3841 7.93687 11.4713 7.85656 11.4803 7.7525L11.6806 5.38375C11.6903 5.26625 11.5978 5.16531 11.4797 5.16531H9.19688V3.485C9.19688 3.09094 9.51626 2.77156 9.91001 2.77156H11.515C11.6266 2.77156 11.7166 2.68125 11.7166 2.57V0.201562C11.7166 0.0903125 11.6266 0 11.515 0H8.80313C7.21157 0 5.92126 1.29 5.92126 2.88156V5.16531H4.48501C4.37376 5.16531 4.28345 5.25563 4.28345 5.36688V7.73531C4.28345 7.84688 4.37376 7.93687 4.48501 7.93687H5.92126V15.7984Z"
                                fill="white"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </a>
                    </li>
                    <li className="socials__item">
                      <a className="socials__link" href="#" tabindex="0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="social_icons" clip-path="url(#clip0_187_9402)">
                            <g id="Layer_x0020_1">
                              <path
                                id="Vector"
                                fill-rule="evenodd"
                                clipRule="evenodd"
                                d="M15.94 2.91286C15.4315 3.14286 14.8722 3.28224 14.3237 3.37443C14.8062 3.29349 15.5215 2.14068 15.6597 1.68849C15.7009 1.60568 15.6412 1.5763 15.5706 1.61161C14.9584 1.93974 14.325 2.17755 13.6509 2.34599C13.5243 2.37755 13.4484 2.22036 13.3506 2.13943C10.9584 0.103801 7.39841 2.14505 7.8631 5.29818C7.87341 5.37536 7.86685 5.38568 7.79716 5.37536C5.16028 4.98255 2.97466 4.03943 1.20028 2.01724C1.12341 1.92943 1.08153 1.92974 1.01841 2.02411C0.0843455 3.42411 0.758408 5.37005 1.99403 6.33318C1.94153 6.3438 1.29622 6.2738 0.720908 5.97661C0.644033 5.92786 0.605283 5.95599 0.59872 6.04318C0.520595 7.41318 1.76903 9.0138 3.12716 9.24693C2.87216 9.30286 2.60966 9.34286 1.87872 9.28568C1.78778 9.26818 1.75278 9.31349 1.78778 9.40099C2.33716 10.8982 3.52278 11.3438 4.41091 11.5976C4.52966 11.6185 4.64872 11.6185 4.7681 11.6463C4.11903 12.611 1.31403 13.0713 0.234658 12.9651C0.15997 12.9541 -0.121592 12.9147 0.0599705 13.0629C6.46966 17.2885 14.4522 12.7663 14.4522 4.72818C14.4522 4.62443 14.5743 4.56755 14.6472 4.51286C14.9809 4.26193 16 3.34255 16 2.91286C16 2.87036 16.005 2.88349 15.94 2.91286Z"
                                fill="white"
                              ></path>
                            </g>
                          </g>
                          <defs>
                            <clip-path id="clip0_187_9402">
                              <rect width="16" height="16" fill="white"></rect>
                            </clip-path>
                          </defs>
                        </svg>
                      </a>
                    </li>
                    <li className="socials__item">
                      <a className="socials__link" href="#" tabindex="0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="social_icons" clip-path="url(#clip0_187_9379)">
                            <path
                              id="Vector"
                              d="M0 8C0 3.5888 3.5888 0 8 0C9.78156 0 11.4678 0.573181 12.8765 1.6576L11.0174 4.07253C10.1464 3.40206 9.10301 3.04762 8 3.04762C5.26926 3.04762 3.04762 5.26926 3.04762 8C3.04762 10.7307 5.26926 12.9524 8 12.9524C10.1994 12.9524 12.0684 11.5114 12.7125 9.52381H8V6.47619H16V8C16 12.4112 12.4112 16 8 16C3.5888 16 0 12.4112 0 8Z"
                              fill="white"
                            ></path>
                          </g>
                          <defs>
                            <clip-path id="clip0_187_9379">
                              <rect width="16" height="16" fill="white"></rect>
                            </clip-path>
                          </defs>
                        </svg>
                      </a>
                    </li>
                    <li className="socials__item">
                      <a className="socials__link" href="#" tabindex="0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="social_icons" clip-path="url(#clip0_187_9414)">
                            <g id="Layer_x0020_1">
                              <path
                                id="Vector"
                                fill-rule="evenodd"
                                clipRule="evenodd"
                                d="M0.32085 16H3.62241V5.33313H0.32085V16ZM8.90054 10.4006C8.90054 8.90125 9.59085 8.0075 10.9124 8.0075C12.1265 8.0075 12.7096 8.86531 12.7096 10.4006V16H15.9962C15.9962 16 15.9962 12.1038 15.9962 9.24656C15.9962 6.38938 14.3765 5.00781 12.1149 5.00781C9.85241 5.0075 8.90054 6.77 8.90054 6.77V5.33313H5.73335V16H8.90054C8.90054 16 8.90054 12.0441 8.90054 10.4006ZM1.95616 3.93688C3.03429 3.93688 3.90866 3.05469 3.90866 1.96812C3.90866 0.88125 3.03429 0 1.95616 0C0.877412 0 0.00366211 0.88125 0.00366211 1.96812C0.00366211 3.05469 0.877412 3.93688 1.95616 3.93688Z"
                                fill="white"
                              ></path>
                            </g>
                          </g>
                          <defs>
                            <clip-path id="clip0_187_9414">
                              <rect width="16" height="16" fill="white"></rect>
                            </clip-path>
                          </defs>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="main__popup " id="report-popup">
            <div className="popup__inner">
              <h2 className="popup__title">Report</h2>

              <div className="popup-content">
                <div id="send-feedback">
                  <input
                    className="fl-input"
                    type="text"
                    placeholder="Your Name"
                  />
                  <input
                    className="input"
                    type="text"
                    placeholder="Your Email"
                  />
                  <textarea
                    className="fl-textarea"
                    placeholder="Your Comment"
                    rows="3"
                  ></textarea>
                  <button className="comment__htmlForm-btn" type="button">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Home;
