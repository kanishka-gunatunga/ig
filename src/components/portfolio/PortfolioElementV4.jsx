import { useEffect, useState, useRef } from "react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import animationCharCome from "@/lib/utils/animationCharCome";
import { client, urlFor } from "@/sanity";

const PortfolioElementV4 = () => {
  const [projects, setProjects] = useState([]);
  const charAnim = useRef();

  useEffect(() => {
    animationCharCome(charAnim.current);

    client
      .fetch(
        `*[_type == "project"]{
        title,
        year,
        image,
        link,
        _updatedAt
      } | order(_updatedAt desc)`
      ) // Removed limit, added sorting
      .then((data) => setProjects(data))
      .catch(console.error);
  }, []);

  return (
    <section className="portfolio__area-3 portfolio-v4">
      <div className="container pt-100 pb-150">
        <div className="row pb-150">
          <div className="col-xxl-8 col-xl-7 col-lg-6 col-md-6">
            <div className="sec-title-wrapper">
              <h2 className="sec-title-2 animation__char_come" ref={charAnim}>
                Awesome <br /> Projects
              </h2>
            </div>
          </div>
          <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-6">
            <div className="blog__text">
              <p>
                Crafting new bright brands, unique visual systems and digital
                experience focused on a wide range of original collabs.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xxl-12">
            <div className="sec-title-wrapper">
              <h2 className="sec-sub-title title-anim">
                Featured <br /> Work
              </h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xxl-12 portfolio__slider-3">
            <Swiper
              modules={[Navigation, Pagination, Autoplay, EffectFade]}
              effect="fade" // Changed from effectfade="true" to correct syntax
              loop={true}
              speed={1500}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".pp-prev",
                nextEl: ".pp-next",
              }}
              pagination={{ el: ".swiper-pagination", type: "fraction" }}
            >
              <div className="swiper-wrapper">
                {projects.map((project, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="portfolio__slide-3">
                      <Link href={project.link || "/portfolio-details"}>
                        <h3 className="portfolio__title-3">
                          {project.title || "Project"} <span>Website</span>{" "}
                          {project.year || "2023"}
                        </h3>
                        {project.image ? (
                          <Image
                            priority
                            width={550}
                            height={350}
                            style={{ height: "auto" }}
                            src={urlFor(project.image).url()}
                            alt={project.title || "Project image"}
                          />
                        ) : (
                          <div
                            style={{
                              width: 550,
                              height: 350,
                              background: "#f0f0f0",
                            }}
                          />
                        )}
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </div>

              <div className="swiper-pagination"></div>

              <div className="swiper-btn">
                <div style={{ cursor: "pointer" }} className="pp-prev">
                  <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div style={{ cursor: "pointer" }} className="pp-next">
                  <FontAwesomeIcon icon={faArrowRight} />
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioElementV4;
