import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, Sparkles, BookOpen, Globe } from 'lucide-react';
import { HERO_AUDIO_HISTORIES, speakHeroHistory, stopHeroHistory } from '../utils/heroAudio';

interface HeroAudioNarratorProps {
  heroId: string;
  defaultLanguage?: 'AM' | 'EN';
  onClose?: () => void;
  variant?: 'banner' | 'card' | 'inline';
}

export const HeroAudioNarrator: React.FC<HeroAudioNarratorProps> = ({
  heroId,
  defaultLanguage = 'AM',
  onClose,
  variant = 'banner'
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [audioLang, setAudioLang] = useState<'AM' | 'EN'>(defaultLanguage);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const track = HERO_AUDIO_HISTORIES[heroId] || HERO_AUDIO_HISTORIES['abebe-bikila'];

  // Start speech when mounted or when audioLang changes
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    const cancelFn = speakHeroHistory(
      heroId,
      audioLang,
      () => {
        setIsPlaying(true);
        setElapsedSeconds(0);
      },
      () => {
        setIsPlaying(false);
      }
    );

    timer = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      cancelFn();
      stopHeroHistory();
      clearInterval(timer);
    };
  }, [heroId, audioLang]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopHeroHistory();
      setIsPlaying(false);
    } else {
      speakHeroHistory(
        heroId,
        audioLang,
        () => setIsPlaying(true),
        () => setIsPlaying(false)
      );
    }
  };

  const handleLanguageToggle = (lang: 'AM' | 'EN') => {
    stopHeroHistory();
    setAudioLang(lang);
  };

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `${mins}:${remaining < 10 ? '0' : ''}${remaining}`;
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-[#180903] via-[#241206] to-[#140802] border-2 border-amber-400 p-4 sm:p-5 shadow-2xl space-y-3.5 animate-fade-in relative overflow-hidden">
      {/* Decorative Golden Ambient Glow */}
      <div className="absolute top-0 right-0 w-64 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10 border-b border-amber-500/30 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-300 shadow">
            {isPlaying ? (
              <Volume2 className="animate-bounce" size={22} />
            ) : (
              <VolumeX size={20} className="text-slate-400" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                ታሪካዊ የድምፅ ትረካ • HISTORICAL SOUND DOCUMENTARY
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {formatTime(elapsedSeconds)}
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-serif font-black text-white mt-0.5">
              የ{track.heroNameAmharic} ታሪክ በድምፅ (Spoken History of {track.heroName})
            </h4>
          </div>
        </div>

        {/* Audio Language Switcher & Controls */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-amber-500/40 text-xs font-bold">
            <button
              onClick={() => handleLanguageToggle('AM')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                audioLang === 'AM'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-amber-200/70 hover:text-white'
              }`}
            >
              🇪🇹 አማርኛ
            </button>
            <button
              onClick={() => handleLanguageToggle('EN')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                audioLang === 'EN'
                  ? 'bg-amber-500 text-slate-950 font-black shadow'
                  : 'text-amber-200/70 hover:text-white'
              }`}
            >
              🇺🇸 English
            </button>
          </div>

          <button
            onClick={handleTogglePlay}
            className={`p-2 rounded-xl border transition-all flex items-center justify-center font-bold text-xs shadow-md ${
              isPlaying
                ? 'bg-amber-500 border-amber-300 text-slate-950'
                : 'bg-slate-900 border-amber-500/50 text-amber-300 hover:bg-slate-800'
            }`}
            title={isPlaying ? 'ድምፅን አቁም' : 'ድምፅን አስጀምር'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white text-xs"
              title="ዝጋ"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Audio Wave Visualizer Animation */}
      <div className="flex items-center gap-1.5 h-6 px-1">
        {[20, 45, 80, 55, 95, 30, 70, 90, 40, 60, 85, 35, 75, 100, 50, 65, 80, 45, 90, 60, 30, 85, 40, 70].map(
          (height, idx) => (
            <div
              key={idx}
              className="flex-1 bg-gradient-to-t from-amber-500 to-amber-300 rounded-full transition-all duration-150"
              style={{
                height: isPlaying ? `${Math.max(15, (height * (0.4 + (idx % 3) * 0.3)))}%` : '15%',
                opacity: isPlaying ? 0.9 : 0.3
              }}
            />
          )
        )}
      </div>

      {/* Full Spoken Historical Story Text */}
      <div className="p-4 rounded-xl bg-black/60 border border-amber-500/30 text-xs sm:text-sm text-slate-100 leading-relaxed font-sans space-y-2 shadow-inner">
        <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-serif uppercase tracking-wider">
          <BookOpen size={14} />
          <span>የሚደመጠው ታሪካዊ ጽሑፍ (Narrated Biography Transcript):</span>
        </div>
        <p className="font-normal text-slate-200 leading-relaxed">
          {audioLang === 'AM' ? track.amharicHistoryText : track.englishHistoryText}
        </p>

        {/* Famous Quote Highlight */}
        <div className="mt-2 pt-2 border-t border-amber-500/20 text-xs italic font-serif text-amber-300 flex items-start gap-1.5">
          <Sparkles size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <span>
            {audioLang === 'AM' ? track.famousQuoteAmharic : track.famousQuoteEnglish}
          </span>
        </div>
      </div>
    </div>
  );
};
