import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  ShieldCheck,
  Sparkles,
  Dog,
  Droplets,
  Lock,
  Leaf,
  ShoppingBag,
  RotateCcw,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DemoVideoModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [viewMode, setViewMode] = useState('video'); // 'video' or 'steps'
  const [activeStep, setActiveStep] = useState(0);
  const [isPlayingStep, setIsPlayingStep] = useState(true);

  // Video playback states
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  const usageSteps = [
    {
      step: '01',
      title: 'WEAR',
      subtitle: 'Adjust Harness & Attach Pouch',
      desc: "Adjust ergonomic harness straps around dog's waist & position waterproof pouch comfortably under the tail.",
      icon: Dog,
      image: '/rear_view_harness.jpg'
    },
    {
      step: '02',
      title: 'CATCH',
      subtitle: 'Zero-Contact Automatic Capture',
      desc: 'Dog waste drops directly into the open TPU waterproof pouch & cornstarch biodegradable liner roll.',
      icon: Droplets,
      image: '/step2_catch.jpg'
    },
    {
      step: '03',
      title: 'CLOSE',
      subtitle: 'Instant Odor Lock & Drawstring Seal',
      desc: 'Pull high-tension drawstring cord to seal bag instantly & lock in 100% of odors & moisture.',
      icon: Lock,
      image: '/step3_close.jpg'
    },
    {
      step: '04',
      title: 'DISPOSE',
      subtitle: 'Quick Release Compostable Bag Disposal',
      desc: 'Extract 100% plant-based compostable bag from magnetic pouch & dispose in bin without touching waste.',
      icon: Leaf,
      image: '/step3_close.jpg'
    }
  ];

  // Auto-play timer for step slideshow view
  useEffect(() => {
    if (!isOpen || !isPlayingStep || viewMode !== 'steps') return;
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % usageSteps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isOpen, isPlayingStep, viewMode]);

  // Video playback initialization when modal opens or switches to video view mode
  useEffect(() => {
    if (!isOpen) return;

    if (viewMode === 'video') {
      setIsLoading(true);
      setHasError(false);
      setIsEnded(false);

      const timer = setTimeout(() => {
        if (videoRef.current) {
          // Play smoothly without resetting currentTime unless ended
          if (videoRef.current.ended) {
            videoRef.current.currentTime = 0;
          }
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                setIsLoading(false);
              })
              .catch((err) => {
                console.warn('Autoplay handled by browser policy:', err);
                setIsLoading(false);
              });
          }
        }
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [isOpen, viewMode]);

  // Video event handlers
  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleCanPlayThrough = () => {
    setIsLoading(false);
  };

  const handlePlaying = () => {
    setIsLoading(false);
    setHasError(false);
    setIsEnded(false);
  };

  const handleWaiting = () => {
    // Only show loader if actually waiting for buffer
    setIsLoading(true);
  };

  const handleEnded = () => {
    setIsLoading(false);
    setIsEnded(true);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setIsEnded(false);
      setIsLoading(true);
      videoRef.current.play().catch(() => setIsLoading(false));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-zinc-950 border border-amber-500/40 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-[0_0_60px_rgba(245,158,11,0.2)] flex flex-col font-sans">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-zinc-900 bg-zinc-900/60 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <span>OFFICIAL PRODUCT DEMO</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[9px]">1080P HD</span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-extrabold text-white tracking-tight">
                How To Use CleanWalk™ Waste Catcher
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle Buttons */}
            <div className="bg-zinc-900 border border-zinc-800 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setViewMode('video')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'video'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                🎥 Video Player
              </button>
              <button
                onClick={() => setViewMode('steps')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'steps'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                ✨ 4-Step Guide
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-amber-400 hover:text-black border border-zinc-800 text-zinc-400 transition-all cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          
          {/* VIEW MODE 1: MP4 VIDEO PLAYER */}
          {viewMode === 'video' ? (
            <div className="relative group rounded-2xl overflow-hidden border border-amber-500/40 bg-black shadow-2xl aspect-video">
              
              {/* HTML5 Video Element */}
              <video
                ref={videoRef}
                controls
                playsInline
                preload="auto"
                poster="/cleanwalk_dog_hero.jpg"
                onLoadStart={handleLoadStart}
                onCanPlay={handleCanPlay}
                onCanPlayThrough={handleCanPlayThrough}
                onPlaying={handlePlaying}
                onWaiting={handleWaiting}
                onEnded={handleEnded}
                onError={handleError}
                className="w-full h-full object-cover rounded-2xl"
              >
                <source src="/cleanwalk_demo_optimized.webm" type="video/webm" />
                <source src="/cleanwalk_demo_optimized.mp4" type="video/mp4" />
                <source src="/cleanwalk_demo.mp4" type="video/mp4" />
                Your browser does not support video playback.
              </video>

              {/* Video Badge Overlay */}
              <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded-full flex items-center gap-2 text-[10px] font-bold text-amber-300 pointer-events-none z-10 shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                <span>OFFICIAL CLEANWALK™ DEMO MP4</span>
              </div>

              {/* Loading Spinner Overlay */}
              {isLoading && !hasError && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3 z-20 pointer-events-none transition-opacity duration-300">
                  <Loader2 className="w-10 h-10 text-amber-400 animate-spin" />
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                    Loading Demo Video...
                  </span>
                </div>
              )}

              {/* End State Overlay */}
              {isEnded && (
                <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20 animate-in fade-in duration-300 p-6 text-center">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      DEMO COMPLETE
                    </div>
                    <h4 className="text-xl font-serif font-extrabold text-white">
                      CleanWalk™ Waste Catcher
                    </h4>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleReplay}
                      className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-2 cursor-pointer transition-all hover:scale-105"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>REPLAY DEMO</span>
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        navigate('/shop');
                      }}
                      className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <ShoppingBag className="w-4 h-4 text-amber-400" />
                      <span>SHOP CLEANWALK™</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Error State Overlay */}
              {hasError && (
                <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-3 z-20 p-6 text-center">
                  <AlertCircle className="w-10 h-10 text-amber-400" />
                  <div className="text-sm font-bold text-white">Video Playback Error</div>
                  <p className="text-xs text-zinc-400 max-w-md">
                    Could not load video playback. Please try again.
                  </p>
                  <button
                    onClick={handleReplay}
                    className="px-5 py-2.5 bg-amber-400 text-black text-xs font-bold rounded-xl hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    Retry Playback
                  </button>
                </div>
              )}

            </div>
          ) : (
            /* VIEW MODE 2: ANIMATED STEP-BY-STEP SHOWCASE */
            <div className="relative group rounded-2xl overflow-hidden border border-amber-500/40 bg-zinc-950 shadow-2xl">
              <div className="relative w-full h-[320px] sm:h-[380px] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={usageSteps[activeStep].image}
                  alt={usageSteps[activeStep].title}
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md border border-amber-500/40 px-3 py-1 rounded-full flex items-center gap-2 text-[10px] font-bold text-amber-300 z-10 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span>STEP {usageSteps[activeStep].step} DEMO: {usageSteps[activeStep].title}</span>
                </div>

                <button
                  onClick={() => setIsPlayingStep(!isPlayingStep)}
                  className="absolute top-4 right-4 bg-zinc-950/80 backdrop-blur-md border border-amber-500/40 hover:border-amber-400 p-2.5 rounded-full text-amber-400 hover:text-white transition-all z-10 cursor-pointer shadow-lg"
                  title={isPlayingStep ? 'Pause Auto-Play' : 'Start Auto-Play'}
                >
                  {isPlayingStep ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-amber-500/30 text-white space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <span>STEP {usageSteps[activeStep].step}</span>
                    <span>•</span>
                    <span>{usageSteps[activeStep].subtitle}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {usageSteps[activeStep].desc}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 border-t border-zinc-800 bg-zinc-900/80">
                {usageSteps.map((st, idx) => (
                  <button
                    key={st.step}
                    onClick={() => {
                      setActiveStep(idx);
                      setIsPlayingStep(false);
                    }}
                    className={`p-3 text-center border-r border-zinc-800 last:border-r-0 transition-all cursor-pointer relative ${
                      activeStep === idx
                        ? 'bg-amber-400/10 text-white font-bold'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className="text-[10px] font-extrabold tracking-widest uppercase">
                      STEP {st.step}
                    </div>
                    <div className="text-xs font-semibold truncate">{st.title}</div>

                    {activeStep === idx && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-300 animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4-Step Instructions Grid */}
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">FULL PROCESS BREAKDOWN</span>
              <h4 className="text-xl font-serif font-bold text-white">4 Easy Steps to Zero-Contact Dog Walks</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {usageSteps.map((st, idx) => (
                <button
                  key={st.step}
                  onClick={() => {
                    setActiveStep(idx);
                    setIsPlayingStep(false);
                  }}
                  className={`text-left rounded-2xl p-4 space-y-2 transition-all cursor-pointer ${
                    activeStep === idx
                      ? 'bg-amber-500/10 border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)]'
                      : 'bg-zinc-900/60 border border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-serif font-extrabold ${activeStep === idx ? 'text-amber-400' : 'text-zinc-500'}`}>
                      STEP {st.step}
                    </span>
                    <st.icon className={`w-4 h-4 ${activeStep === idx ? 'text-amber-400' : 'text-zinc-500'}`} />
                  </div>
                  <div className="text-sm font-bold text-white uppercase tracking-wider">{st.title}</div>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">{st.desc}</p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTAs */}
        <div className="p-6 border-t border-zinc-900 bg-zinc-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-400 font-light flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>Ready to upgrade your daily walks to a hands-free experience?</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              CLOSE DEMO
            </button>
            <button
              onClick={() => {
                onClose();
                navigate('/shop');
              }}
              className="flex-1 sm:flex-initial px-6 py-3 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-black font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>SHOP CLEANWALK™</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
