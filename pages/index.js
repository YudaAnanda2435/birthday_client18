import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
// import shutdownStyles from "../styles/Shutdown.module.css";
import { useRouter } from "next/router";

export default function BirthdayCard() {
  // State declarations
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState("card");
  const [minimizedWindows, setMinimizedWindows] = useState({
    card: false,
    notepad: false,
    music: false,
    photo: false,
    cake: false,
  });
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [isMusicPlayerOpen, setIsMusicPlayerOpen] = useState(false);
  const [isPhotoViewerOpen, setIsPhotoViewerOpen] = useState(false);
  const [isCakeOpen, setIsCakeOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShutdown, setIsShutdown] = useState(false);
  const [showLoveMessage, setShowLoveMessage] = useState(false);
  const [candleLit, setCandleLit] = useState(true);
  const [isBlowing, setIsBlowing] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideo, setIsVideo] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("/momen.mp4");
  const [volume, setVolume] = useState(80);

  // Gallery items
  const galleryItems = [
    {
      type: "image",
      src: "/gallery/foto1.jpg",
      caption: "Semoga",
      fallback: "🎈",
    },
    {
      type: "image",
      src: "/gallery/foto2.jpg",
      caption: "Bahagia",
      fallback: "😊",
    },
    {
      type: "image",
      src: "/gallery/foto3.jpg",
      caption: "Selalu",
      fallback: "🎁",
    },
    {
      type: "video",
      src: "/momen.mp4",
      caption: "Video Ucapan",
      fallback: "🎬",
    },
  ];

  const [currentTimeInSeconds, setCurrentTimeInSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  // Window positions
  const [windowPositions, setWindowPositions] = useState({
    card: {
      x: 100,
      y: 50,
    },
    notepad: {
      x: 350,
      y: 250,
    },
    music: {
      x: 150,
      y: 150,
    },
    photo: {
      x: 250,
      y: 200,
    },
    cake: {
      x: 200,
      y: 100,
    },
  });

  // Router and query parameters
  const router = useRouter();
  const recipientName =
    typeof router.query.untuk === "string" ? router.query.untuk : "adi";
  const senderName =
    typeof router.query.dari === "string" ? router.query.dari : "Selomita";

  const message = `Selamat ulang tahun, adi🤍🫰🏻

Semoga panjang umur, sehat selalu, dan semua yang diharapkan sama adi bisa tercapai. Semoga apa yang kita jalani sekarang bisa sesuai dengan harapan kita ya, semoga ada hal indah untuk kamu dan untuk kita di waktu yg akan datang. Semoga hal baik selalu beriringan sama kamu, semoga semesta senantiasa berpihak sama kamu, teruslah tumbuh 🙌🏻 dan semoga bisa tetap bahagia yaa, meskipun aku ga ada di samping kamu secara langsung, aku disini selalu berdoa yang terbaik buat kamu.

Bersyukur sekali bisa kenal sama kamu sayangku, dan meskipun kita ini bisa dibilang masih sama-sama bingung dengan hubungan, its oke, aku cuma mau bilang kalau kamu itu selalu punya tempat khusus di hati aku. kamu sangat berarti bagi aku, aku harap kamu selalu berusaha untuk jadi orang yang lebih baik lagi, jangan pernah bosan yaa.

Semoga di ulang tahunmu ini yang ke-20, bisa jadi pribadi yang lebih baik dan lebih bahagia. jangan kamu lalui semua hal sendiri yaa, aku disini ada buat kamu.

Semoga hal baik terus menyertai kamu yaaa. love u more bby, adi🩷`;

  // Age parameter
  typeof router.query.umur === "string" && router.query.umur;

  // Effects
  useEffect(() => {
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Handle window resizing
    const handleResize = () => {
      const container = document.querySelector(`.${styles.container}`);
      const containerWidth = container?.clientWidth || 800;
      const containerHeight = container?.clientHeight || 600;

      const cardX = Math.max(0, (containerWidth - 600) / 2);
      const cardY = Math.max(0, (containerHeight - 0.8 * containerHeight) / 4);
      const musicX = Math.max(0, (containerWidth - 320) / 2);
      const musicY = Math.max(0, (containerHeight - 250) / 2);
      const photoX = Math.max(0, (containerWidth - 480) / 2);
      const photoY = Math.max(0, (containerHeight - 400) / 2 - 20);
      const cakeX = Math.max(0, (containerWidth - 400) / 2);
      const cakeY = Math.max(0, (containerHeight - 300) / 2);

      setWindowPositions({
        card: {
          x: cardX,
          y: cardY,
        },
        notepad: {
          x: cardX + 50,
          y: cardY + 50,
        },
        music: {
          x: musicX,
          y: musicY,
        },
        photo: {
          x: photoX,
          y: photoY,
        },
        cake: {
          x: cakeX,
          y: cakeY,
        },
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Simulate loading
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setIsCardOpen(true), 500);
    }, 2000);

    return () => {
      clearInterval(timeInterval);
      clearTimeout(loadingTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle video state changes
  useEffect(() => {
    setIsVideo(galleryItems[currentSlide].type === "video");
    if (galleryItems[currentSlide].type === "video") {
      setTimeout(() => {
        setIsFullscreen(true);
      }, 500);
    } else {
      setIsFullscreen(false);
    }
  }, [currentSlide]);

  // Handle audio time updates
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => {
        setCurrentTimeInSeconds(audio.currentTime);
        setDuration(audio.duration || 0);
      };

      audio.addEventListener("timeupdate", updateTime);
      return () => {
        audio.removeEventListener("timeupdate", updateTime);
      };
    }
  }, []);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, isMusicPlayerOpen]);

  // Handle escape key for fullscreen video
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  // Navigation functions
  const goToPreviousSlide = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
      setTimeout(() => {
        const newIndex =
          currentSlide === 0 ? galleryItems.length - 1 : currentSlide - 1;
        setCurrentSlide(newIndex);
        setIsVideo(galleryItems[newIndex].type === "video");
      }, 300);
    } else {
      const newIndex =
        currentSlide === 0 ? galleryItems.length - 1 : currentSlide - 1;
      setCurrentSlide(newIndex);
      setIsVideo(galleryItems[newIndex].type === "video");
    }
  };

  const goToNextSlide = () => {
    if (isFullscreen) {
      setIsFullscreen(false);
      setTimeout(() => {
        const newIndex =
          currentSlide === galleryItems.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newIndex);
        setIsVideo(galleryItems[newIndex].type === "video");
      }, 300);
    } else {
      const newIndex =
        currentSlide === galleryItems.length - 1 ? 0 : currentSlide + 1;
      setCurrentSlide(newIndex);
      setIsVideo(galleryItems[newIndex].type === "video");
    }
  };

  // Window management functions
  const openWindow = (windowType) => {
    if (windowType === "present") {
      setIsCardOpen(true);
      setMinimizedWindows({
        ...minimizedWindows,
        card: false,
      });
      setActiveWindow("card");

      const container = document.querySelector(`.${styles.container}`);
      const containerWidth = container?.clientWidth || 800;
      const containerHeight = container?.clientHeight || 600;
      const cardX = Math.max(0, (containerWidth - 600) / 2);
      const cardY = Math.max(0, (containerHeight - 0.8 * containerHeight) / 4);

      setWindowPositions({
        ...windowPositions,
        card: {
          x: cardX,
          y: cardY,
        },
      });
    } else if (windowType === "cake") {
      setIsCakeOpen(true);
      setMinimizedWindows({
        ...minimizedWindows,
        cake: false,
      });
      setActiveWindow("cake");

      const container = document.querySelector(`.${styles.container}`);
      const containerWidth = container?.clientWidth || 800;
      const containerHeight = container?.clientHeight || 600;
      const cakeX = Math.max(0, (containerWidth - 400) / 2);
      const cakeY = Math.max(0, (containerHeight - 300) / 2);

      setWindowPositions({
        ...windowPositions,
        cake: {
          x: cakeX,
          y: cakeY,
        },
      });
    } else if (windowType === "music") {
      setIsMusicPlayerOpen(true);
      setMinimizedWindows({
        ...minimizedWindows,
        music: false,
      });
      setActiveWindow("music");

      const container = document.querySelector(`.${styles.container}`);
      const containerWidth = container?.clientWidth || 800;
      const containerHeight = container?.clientHeight || 600;
      const musicX = Math.max(0, (containerWidth - 320) / 2);
      const musicY = Math.max(0, (containerHeight - 250) / 2);

      setWindowPositions({
        ...windowPositions,
        music: {
          x: musicX,
          y: musicY,
        },
      });
    } else if (windowType === "photo") {
      setIsPhotoViewerOpen(true);
      setMinimizedWindows({
        ...minimizedWindows,
        photo: false,
      });
      setActiveWindow("photo");
      setIsVideo(galleryItems[currentSlide].type === "video");

      const container = document.querySelector(`.${styles.container}`);
      const containerWidth = container?.clientWidth || 800;
      const containerHeight = container?.clientHeight || 600;
      const photoX = Math.max(0, (containerWidth - 480) / 2);
      const photoY = Math.max(0, (containerHeight - 400) / 2 - 20);

      setWindowPositions({
        ...windowPositions,
        photo: {
          x: photoX,
          y: photoY,
        },
      });

      // Reload video when gallery opens
      if (galleryItems[currentSlide].type === "video") {
        setTimeout(() => {
          const videoElement = document.querySelector(`.${styles.slideVideo}`);
          if (videoElement) {
            videoElement.load();
            console.log("Video dimuat ulang saat gallery dibuka");
          }
        }, 500);
      }
    }
  };

  const handleWindowAction = (action, windowType) => {
    if (action === "minimize") {
      setMinimizedWindows({
        ...minimizedWindows,
        [windowType]: true,
      });
    } else if (action === "close") {
      if (windowType === "card") {
        setIsCardOpen(false);
      } else if (windowType === "notepad") {
        setIsNotepadOpen(false);
      } else if (windowType === "music") {
        setIsMusicPlayerOpen(false);
        setIsPlaying(false);
      } else if (windowType === "photo") {
        setIsPhotoViewerOpen(false);
      } else if (windowType === "cake") {
        setIsCakeOpen(false);
      }
    }
  };

  const handleSpecialAction = (actionType) => {
    if (actionType === "party") {
      document.body.classList.toggle("party-mode");
    } else if (actionType === "cake") {
      setMinimizedWindows({
        ...minimizedWindows,
        card: !minimizedWindows.card,
      });
      if (minimizedWindows.card) {
        setActiveWindow("card");
      }
    }
  };

  // Window dragging functionality
  const startDragging = (e, windowType) => {
    e.preventDefault();
    setActiveWindow(windowType);

    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = windowPositions[windowType].x;
    const startPosY = windowPositions[windowType].y;

    const desktop = document.querySelector(`.${styles.desktop}`);
    const desktopWidth = desktop?.clientWidth || 800;
    const desktopHeight = desktop?.clientHeight || 600;

    const windowWidth =
      windowType === "card"
        ? 600
        : windowType === "notepad"
        ? 400
        : windowType === "music"
        ? 320
        : windowType === "photo"
        ? 450
        : 350;

    const handleMouseMove = (e) => {
      const newX = Math.max(
        0,
        Math.min(
          desktopWidth - windowWidth / 2,
          startPosX + (e.clientX - startX)
        )
      );
      const newY = Math.max(
        0,
        Math.min(desktopHeight - 100, startPosY + (e.clientY - startY))
      );

      setWindowPositions({
        ...windowPositions,
        [windowType]: {
          x: newX,
          y: newY,
        },
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Audio player functions
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.log(
            "Pengguna harus berinteraksi dengan halaman terlebih dahulu untuk memainkan audio",
            error
          );
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTimeInSeconds(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  // Format time for display
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "00:00";

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle progress bar click
  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return;

    const progressBar = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - progressBar.left;
    const newTime = (clickPosition / progressBar.width) * duration;

    audioRef.current.currentTime = newTime;
    setCurrentTimeInSeconds(newTime);
  };

  // Render the component
  return (
    <React.Fragment>
      <Head>
        <title>Selamat Ulang Tahun {recipientName}!</title>
        <meta
          name="description"
          content={`this special card for ${recipientName}`}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
        <link rel="icon" href="/gallery/love.png" />
      </Head>

      <main className={styles.main}>
        <audio
          ref={audioRef}
          style={{ display: "none" }}
          src="/lany.mp3"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />

        {/* Loading screen */}
        {isLoading && (
          <div className={styles.loading}>
            <div className={styles.loadingText}>LOADING...</div>
            <div className={styles.progressBar}>
              <div className={styles.progress}></div>
            </div>
            <div className={styles.loadingSubtext}>WINDOWS 95</div>
          </div>
        )}

        {/* Shutdown screen */}
        {isShutdown && (
          <div className="shutdown">
            <div className="progressBar">
              <div className="progress"></div>
            </div>
            <div className="loveMessage">
              <span>❤️</span> I love you! <span>❤️</span>
            </div>
          </div>
        )}

        {/* Main desktop interface */}
        {!isLoading && !isShutdown && (
          <div className={styles.container}>
            <div className={styles.desktop}>
              {/* Desktop icons */}
              <div className={styles.icons}>
                <div
                  className={styles.icon}
                  onClick={() => openWindow("present")}
                >
                  <div className={styles.iconImage}>🎁</div>
                  <div className={styles.iconText}>Present.exe</div>
                </div>
                <div
                  className={styles.icon}
                  onClick={() => openWindow("music")}
                >
                  <div className={styles.iconImage}>🎵</div>
                  <div className={styles.iconText}>Music.mp3</div>
                </div>
                <div className={styles.icon} onClick={() => openWindow("cake")}>
                  <div className={styles.iconImage}>🎂</div>
                  <div className={styles.iconText}>Cake.exe</div>
                </div>
                <div
                  className={styles.icon}
                  onClick={() => openWindow("photo")}
                >
                  <div className={styles.iconImage}>📷</div>
                  <div className={styles.iconText}>Gallery.jpg</div>
                </div>
              </div>

              {/* Start Menu */}
              {isStartMenuOpen && (
                <div className={styles.startMenu}>
                  <div className={styles.startMenuHeader}>
                    <span className={styles.startMenuLogo}>W</span>
                    <span>Windows 95</span>
                  </div>
                  <div className={styles.startMenuItems}>
                    <div
                      className={styles.startMenuItem}
                      onClick={() => {
                        setIsStartMenuOpen(false);
                        setIsCardOpen(true);
                        setMinimizedWindows({
                          ...minimizedWindows,
                          card: false,
                        });
                        setActiveWindow("card");
                      }}
                    >
                      <span>🎁</span> Kartu Ucapan
                    </div>
                    <div
                      className={styles.startMenuItem}
                      onClick={() => {
                        setIsStartMenuOpen(false);
                        setIsCakeOpen(true);
                        setMinimizedWindows({
                          ...minimizedWindows,
                          cake: false,
                        });
                        setActiveWindow("cake");
                      }}
                    >
                      <span>🎂</span> Kue Ulang Tahun
                    </div>
                    <div
                      className={styles.startMenuItem}
                      onClick={() => {
                        setIsStartMenuOpen(false);
                        setIsNotepadOpen(true);
                        setMinimizedWindows({
                          ...minimizedWindows,
                          notepad: false,
                        });
                        setActiveWindow("notepad");
                      }}
                    >
                      <span>📝</span> Notepad
                    </div>
                    <div
                      className={styles.startMenuItem}
                      onClick={() => {
                        setIsStartMenuOpen(false);
                        window.location.reload();
                      }}
                    >
                      <span>🔄</span> Restart
                    </div>
                    <div className={styles.startMenuSeparator}></div>
                    <div
                      className={styles.startMenuItem}
                      onClick={() => {
                        setIsStartMenuOpen(false);
                        alert("Terima kasih telah menggunakan aplikasi ini!");
                      }}
                    >
                      <span>⭐</span> Tentang
                    </div>
                    <div className={styles.startMenuSeparator}></div>
                    <div
                      className={styles.startMenuItem}
                      onClick={() => {
                        if (audioRef.current) {
                          audioRef.current.pause();
                        }
                        setIsPlaying(false);
                        setIsStartMenuOpen(false);
                        setIsShutdown(true);
                        setTimeout(() => {
                          setShowLoveMessage(true);
                          setTimeout(() => {
                            window.location.reload();
                          }, 5000);
                        }, 1500);
                      }}
                    >
                      <span>⚡</span> Shutdown
                    </div>
                  </div>
                </div>
              )}

              {/* Cake Window */}
              {isCakeOpen && !minimizedWindows.cake && (
                <div
                  className={`${styles.cakeWindow} ${
                    activeWindow === "card" ? styles.activeWindow : ""
                  }`}
                  style={{
                    top: `${windowPositions.cake.y}px`,
                    left: `${windowPositions.cake.x}px`,
                  }}
                  onClick={() => setActiveWindow("cake")}
                >
                  <div
                    className={styles.cardHeader}
                    onMouseDown={(e) => startDragging(e, "cake")}
                  >
                    <div className={styles.cardTitle}>CAKE.EXE</div>
                    <div className={styles.cardControls}>
                      <span
                        className={styles.minimize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("minimize", "cake");
                        }}
                      >
                        _
                      </span>
                      <span
                        className={styles.maximize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("maximize", "cake");
                        }}
                      >
                        □
                      </span>
                      <span
                        className={styles.close}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("close", "cake");
                        }}
                      >
                        ✕
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardToolbar}>
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <span>Help</span>
                  </div>
                  <div className={styles.cakeContent}>
                    <div className={styles.cakeTitle}>
                      {candleLit ? "AYO TIUP DULU!" : "YEAY!"}
                    </div>
                    <div className={styles.cakeImage}>
                      {candleLit && <div className={styles.candleFlame}></div>}
                      {isBlowing && (
                        <div
                          className={`${styles.blowEffect} ${styles.active}`}
                        ></div>
                      )}
                    </div>
                    <div className={styles.cakeMessage}>
                      {candleLit ? (
                        <p>jangan lupa berdoa duluuu...</p>
                      ) : (
                        <p>
                          Happy Birthday!!✨
                          <br />
                          NEXT BUKA GALLERY NYA YAA!
                        </p>
                      )}
                    </div>
                    <div className={styles.cakeButtons}>
                      {candleLit ? (
                        <button
                          className={styles.blowButton}
                          onClick={() => {
                            setIsBlowing(true);
                            setTimeout(() => {
                              setCandleLit(false);
                              setIsBlowing(false);
                            }, 1000);
                          }}
                        >
                          <span>🕯️</span> Tiup Lilin
                        </button>
                      ) : (
                        <button
                          className={styles.relightButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWindowAction("close", "cake");
                          }}
                        >
                          <span>❌</span> Close
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Birthday Card Window */}
              {isCardOpen && !minimizedWindows.card && (
                <div
                  className={`${styles.birthdayCard} ${
                    activeWindow === "card" ? styles.activeWindow : ""
                  }`}
                  style={{
                    top: `${windowPositions.card.y}px`,
                    left: `${windowPositions.card.x}px`,
                  }}
                  onClick={() => setActiveWindow("card")}
                >
                  <div
                    className={styles.cardHeader}
                    onMouseDown={(e) => startDragging(e, "card")}
                  >
                    <div className={styles.cardTitle}>HAPPY_BIRTHDAY.TXT</div>
                    <div className={styles.cardControls}>
                      <span
                        className={styles.minimize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("minimize", "card");
                        }}
                      >
                        _
                      </span>
                      <span
                        className={styles.maximize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("maximize", "card");
                        }}
                      >
                        □
                      </span>
                      <span
                        className={styles.close}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("close", "card");
                        }}
                      >
                        ✕
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardToolbar}>
                    <span>File</span>
                    <span>Edit</span>
                    <span>View</span>
                    <span>Help</span>
                  </div>
                  <div className={styles.cardContent}>
                    <div className={styles.birthdayTitle}>
                      <div className={styles.retroBanner}>
                        <span>❤️</span> HAPPY BIRTHDAY <span>❤️</span>
                      </div>
                      <h1 className={styles.birthdayHeading}>
                        SELAMAT ULANG TAHUN KE-20
                      </h1>
                    </div>
                    <div className={styles.messageBox}>
                      <div className={styles.messageBoxHeader}>
                        <span>MESSAGE.TXT</span>
                      </div>
                      <div className={styles.messageBoxContent}>
                        <p>{message}</p>
                        <div className={styles.retroNote}>
                          <p>╔═══════════════════════════════════════╗</p>
                          <p>
                            ║ next, kamu play lagu sama tiup lilin duluuu! ║
                          </p>
                          <p>╚═══════════════════════════════════════╝</p>
                        </div>
                      </div>
                      <div className={styles.messageBoxSender}>
                        <p>Dari aku: {senderName}</p>
                        <div className={styles.messageBoxImage}>
                          <Image
                            src="/gallery/roro.gif"
                            width={100}
                            height={100}
                            alt=""
                          />
                          <Image
                            src="/gallery/roro2.gif"
                            width={100}
                            height={100}
                            alt=""
                          />
                          <Image
                            src="/gallery/roro3.gif"
                            width={100}
                            height={100}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.pixelArt}>
                      <div className={styles.cake}></div>
                      <div className={styles.balloon1}></div>
                      <div className={styles.balloon2}></div>
                      <div className={styles.gift}></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Music Player Window */}
              {isMusicPlayerOpen && !minimizedWindows.music && (
                <div
                  className={`${styles.musicPlayer} ${
                    activeWindow === "music" ? styles.activeWindow : ""
                  }`}
                  style={{
                    top: `${windowPositions.music.y}px`,
                    left: `${windowPositions.music.x}px`,
                  }}
                  onClick={() => setActiveWindow("music")}
                >
                  <div
                    className={styles.cardHeader}
                    onMouseDown={(e) => startDragging(e, "music")}
                  >
                    <div className={styles.cardTitle}>MUSIC_PLAYER.EXE</div>
                    <div className={styles.cardControls}>
                      <span
                        className={styles.minimize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("minimize", "music");
                        }}
                      >
                        _
                      </span>
                      <span
                        className={styles.maximize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("maximize", "music");
                        }}
                      >
                        □
                      </span>
                      <span
                        className={styles.close}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("close", "music");
                        }}
                      >
                        ✕
                      </span>
                    </div>
                  </div>
                  <div className={styles.playerContent}>
                    <div className={styles.trackInfo}>
                      <div className={styles.trackTitle}>Play ini yaa.mp3</div>
                      <div className={styles.trackArtist}>Classic Hits</div>
                    </div>
                    <div className={styles.playerWrapper}>
                      <div className={styles.playerControls}>
                        <button
                          className={styles.playerButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePlay();
                          }}
                        >
                          {isPlaying ? "⏸️" : "▶️"}
                        </button>
                      </div>
                      <div className={styles.timeInfo}>
                        <span>{formatTime(currentTimeInSeconds)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                      <div
                        className={styles.progressBar}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleProgressClick(e);
                        }}
                      >
                        <div
                          className={styles.progress}
                          style={{
                            width:
                              duration > 0
                                ? `${(currentTimeInSeconds / duration) * 100}%`
                                : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className={styles.volumeControl}>
                      <span>🔊</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => {
                          const newVolume = parseInt(e.target.value);
                          setVolume(newVolume);
                          if (audioRef.current) {
                            audioRef.current.volume = newVolume / 100;
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Photo Viewer Window */}
              {isPhotoViewerOpen && !minimizedWindows.photo && (
                <div
                  className={`${styles.photoViewer} ${
                    activeWindow === "photo" ? styles.activeWindow : ""
                  }`}
                  style={{
                    top: `${windowPositions.photo.y}px`,
                    left: `${windowPositions.photo.x}px`,
                    width: "480px",
                    height: "auto",
                  }}
                  onClick={() => setActiveWindow("photo")}
                >
                  <div
                    className={styles.cardHeader}
                    onMouseDown={(e) => startDragging(e, "photo")}
                  >
                    <div className={styles.cardTitle}>GALLERY VIEWER</div>
                    <div className={styles.cardControls}>
                      <span
                        className={styles.minimize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("minimize", "photo");
                        }}
                      >
                        _
                      </span>
                      <span
                        className={styles.maximize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("maximize", "photo");
                        }}
                      >
                        □
                      </span>
                      <span
                        className={styles.close}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("close", "photo");
                        }}
                      >
                        ✕
                      </span>
                    </div>
                  </div>
                  <div className={styles.photoContent}>
                    <div className={styles.photo}>
                      <div
                        className={styles.gallerySlideshow}
                        style={{ paddingTop: "25px" }}
                      >
                        <div className={styles.slideCounter}>
                          {currentSlide + 1}/{galleryItems.length}
                        </div>

                        {isVideo ? (
                          <div
                            className={`${styles.videoContainer} ${
                              isFullscreen ? styles.fullscreen : ""
                            }`}
                          >
                            <button
                              className={styles.closeFullscreenBtn}
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsFullscreen(!isFullscreen);
                              }}
                            >
                              Tutup [X]
                            </button>
                            {isFullscreen && (
                              <div className={styles.keyboardHint}>
                                Tekan ESC atau klik tombol Tutup untuk keluar
                                dari mode fullscreen
                              </div>
                            )}
                            <div
                              className={styles.videoFallback}
                              style={{
                                fontSize: "24px",
                                color: "white",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "100%",
                                backgroundColor: "black",
                                padding: "0",
                                textAlign: "center",
                              }}
                            >
                              <iframe
                                src="/momen.mp4"
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  border: "none",
                                  backgroundColor: "#000",
                                }}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}
                              ></iframe>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.polaroid}>
                            <div
                              className={styles.slideImage}
                              style={{
                                backgroundImage: `url('${galleryItems[currentSlide].src}')`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                              onError={(e) => {
                                const target = e.target;
                                target.style.backgroundImage = "none";
                                target.innerText =
                                  galleryItems[currentSlide].fallback;
                                target.style.fontSize = "80px";
                                target.style.display = "flex";
                                target.style.justifyContent = "center";
                                target.style.alignItems = "center";
                              }}
                            ></div>
                            <p>{galleryItems[currentSlide].caption}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className={styles.photoToolbar}>
                      <button
                        className={styles.photoButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToPreviousSlide();
                        }}
                      >
                        &lt; Sebelumnya
                      </button>
                      <button
                        className={styles.photoButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          goToNextSlide();
                        }}
                      >
                        Berikutnya &gt;
                      </button>

                      {currentSlide === galleryItems.length - 1 && (
                        <React.Fragment>
                          <button
                            className={styles.photoButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentSlide(0);
                              setIsVideo(false);
                              setIsFullscreen(false);
                            }}
                          >
                            Lihat Foto
                          </button>
                          <button
                            className={styles.photoButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              const iframe = document.querySelector("iframe");
                              if (iframe) {
                                iframe.src =
                                  "/gallery/video1.mp4?t=" +
                                  new Date().getTime() +
                                  "&autoplay=1";
                              }
                            }}
                          >
                            Play Video
                          </button>
                        </React.Fragment>
                      )}

                      {currentSlide < galleryItems.length - 1 && (
                        <button
                          className={styles.photoButton}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentSlide(galleryItems.length - 1);
                            setIsVideo(true);
                            setTimeout(() => {
                              const videoElement = document.querySelector(
                                `.${styles.slideVideo}`
                              );
                              if (videoElement) {
                                videoElement.load();
                                videoElement.play().catch((error) => {
                                  console.error("Gagal memutar video:", error);
                                });
                              }
                            }, 300);
                          }}
                        >
                          Lihat Video
                        </button>
                      )}

                      <button
                        className={styles.photoButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Fitur cetak tidak tersedia");
                        }}
                      >
                        Cetak
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notepad Window */}
              {isNotepadOpen && !minimizedWindows.notepad && (
                <div
                  className={`${styles.notepad} ${
                    activeWindow === "notepad" ? styles.activeWindow : ""
                  }`}
                  style={{
                    top: `${windowPositions.notepad.y}px`,
                    left: `${windowPositions.notepad.x}px`,
                  }}
                  onClick={() => setActiveWindow("notepad")}
                >
                  <div
                    className={styles.cardHeader}
                    onMouseDown={(e) => startDragging(e, "notepad")}
                  >
                    <div className={styles.cardTitle}>NOTEPAD.EXE</div>
                    <div className={styles.cardControls}>
                      <span
                        className={styles.minimize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("minimize", "notepad");
                        }}
                      >
                        _
                      </span>
                      <span
                        className={styles.maximize}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("maximize", "notepad");
                        }}
                      >
                        □
                      </span>
                      <span
                        className={styles.close}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWindowAction("close", "notepad");
                        }}
                      >
                        ✕
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardToolbar}>
                    <span>File</span>
                    <span>Edit</span>
                    <span>Format</span>
                    <span>View</span>
                    <span>Help</span>
                  </div>
                  <div className={styles.notepadContent}>
                    <textarea
                      className={styles.notepadTextarea}
                      defaultValue={`1. Bersyukur setiap hari
2. lebih banyak tersenyum
3. mencapai target yang kamu inginkan
4. jaga kesehatan dengan baik 
5. terakhir, harus selalu ingat aku`}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Taskbar */}
            <div className={styles.taskbar}>
              <div
                className={`${styles.startButton} ${
                  isStartMenuOpen ? styles.startActive : ""
                }`}
                onClick={() => {
                  setIsStartMenuOpen(!isStartMenuOpen);
                }}
              >
                <span className={styles.windowsIcon}>W</span>
                <span>Start</span>
              </div>
              <div className={styles.taskbarPrograms}>
                {isCardOpen && (
                  <div
                    className={`${styles.program} ${
                      minimizedWindows.card || activeWindow !== "card"
                        ? ""
                        : styles.activeProgram
                    }`}
                    onClick={() => {
                      setMinimizedWindows({
                        ...minimizedWindows,
                        card: !minimizedWindows.card,
                      });
                      if (minimizedWindows.card) {
                        setActiveWindow("card");
                      }
                    }}
                  >
                    🎂 Kartu Ucapan
                  </div>
                )}
                {isCakeOpen && (
                  <div
                    className={`${styles.program} ${
                      minimizedWindows.cake || activeWindow !== "cake"
                        ? ""
                        : styles.activeProgram
                    }`}
                    onClick={() => {
                      setMinimizedWindows({
                        ...minimizedWindows,
                        cake: !minimizedWindows.cake,
                      });
                      if (minimizedWindows.cake) {
                        setActiveWindow("cake");
                      }
                    }}
                  >
                    🎂 Kue Ulang Tahun
                  </div>
                )}
                {isNotepadOpen && (
                  <div
                    className={`${styles.program} ${
                      minimizedWindows.notepad || activeWindow !== "notepad"
                        ? ""
                        : styles.activeProgram
                    }`}
                    onClick={() => {
                      setMinimizedWindows({
                        ...minimizedWindows,
                        notepad: !minimizedWindows.notepad,
                      });
                      if (minimizedWindows.notepad) {
                        setActiveWindow("notepad");
                      }
                    }}
                  >
                    📝 Notepad
                  </div>
                )}
                {isMusicPlayerOpen && (
                  <div
                    className={`${styles.program} ${
                      minimizedWindows.music || activeWindow !== "music"
                        ? ""
                        : styles.activeProgram
                    }`}
                    onClick={() => {
                      setMinimizedWindows({
                        ...minimizedWindows,
                        music: !minimizedWindows.music,
                      });
                      if (minimizedWindows.music) {
                        setActiveWindow("music");
                      }
                    }}
                  >
                    🎵 Music Player
                  </div>
                )}
                {isPhotoViewerOpen && (
                  <div
                    className={`${styles.program} ${
                      minimizedWindows.photo || activeWindow !== "photo"
                        ? ""
                        : styles.activeProgram
                    }`}
                    onClick={() => {
                      setMinimizedWindows({
                        ...minimizedWindows,
                        photo: !minimizedWindows.photo,
                      });
                      if (minimizedWindows.photo) {
                        setActiveWindow("photo");
                      }
                    }}
                  >
                    📷 Gallery Viewer
                  </div>
                )}
                <div
                  className={styles.program}
                  onClick={() => handleSpecialAction("party")}
                >
                  🎉 Party.exe
                </div>
              </div>
              <div className={styles.taskbarTime}>
                <div className={styles.digitalClock}>
                  {currentTime.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                  })}
                </div>
                <div className={styles.digitalDate}>
                  {currentTime.toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </React.Fragment>
  );
}
