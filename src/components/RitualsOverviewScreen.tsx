import React from 'react';
import { NavTab } from '../types';
import { soundEngine } from '../utils/audio';

/**
 * 1:1 faisha-gallery/html/021_2e140795fa3e44be83d8df8735a5de82.html (SEQ 021 · Rituals Overview).
 * Struktur, copy, dan token dityalin literal dari html tsb (baris 262-412 + tailwind.config 12-226).
 * Spacing pakai arbitrary value ([32px] dst) — BUKAN token --spacing-* Tailwind v4, karena namespace
 * itu menimpa max-w-{xs..3xl} global (regresi strip 2026-09-03).
 * ponytail: CTA Home/Sleep/Soul sudah menunjuk halaman detailnya masing-masing (024/025/026,
 * simple perfected 2026-09-03). Hanya Focus yang masih inert — kanvas detailnya 'Segera Hadir'.
 */

interface RitualsOverviewScreenProps {
  onNavigate?: (tab: NavTab) => void;
  onStartAssessment?: () => void;
}

// URL gambar literal, disalin verbatim dari html/021 (tidak ada yang dikarang).
const IMG = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1vzpO-Xj0288JWqlLkHLjJBiuMBRd_9ybKCRfruV1UMWgH_kiZQDSCjQ83hDzeKq77aoZYpRYwcd9eTMXEqHMviC22P3zPiFCAHCggbhc7ugNb-jgF1aMvvvfGKzvbdejeZHEVAcwfYiPSgcC5rv4KyEG2343UrUOe0LGWop7aimMXJWD31DAq3AcRqU_wy7HWBeBk_jTqzZQD9haDEkNnKehiSjvVOpToL6HBirUBiCfFjjg2klgu37_nR71tHC_97ViOf3CePk',
  morning: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQzKWpoR3bu2E4apyg0DHGmurja7k3A8YtLTolxWWHYSMhQtUi7nRuEJR6BmRx8n3YDcZf2kjo5r1Bm3s-0hutVCPbHMtweaZnO2toNNT6DLmIXnVyQdFWR-2XRN9nOv7eSlJUQqWq7FZHkxJAOYEVTQXZGdWy-kM4Q0Hj0lpkynOKkBkbbWGItCKBxQ8LBwD7GiVjXt31TIuPDDiuxUXkqROu-vkFh1uasdCjQd7QAV7E-txv54I5UeB8ZlKOQkckIsJjs65qwJU',
  morningT1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9q2Gk-EK7SP_ByxhWSBLDFgOVZZCvoqhfJ5YCbxR0y5JEOeoFf7DuSZ7hgkSqxTkOx13P6CIV5hXVfXp5h3wtglRzdNZdTsJgsxt_-hbD_gcxVgiFBJy3AioU9sbocq9one2AmNC2Z0hTVtSdXxp86sgYrGFJqaCl3QhnEOL9HWBILi_v49XcHxhTlMrc03u_GSI2kCN5w-Es8yWvsBmPQI3NfK9xM5qN1Dl2PUYAMLAQ2T0CwBlRqLOrWbG4laBLnZPnNJQ4gac',
  morningT2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJod3B87_31pMSVtfS_j8qmu6N16Ni2c8BMW93dggsuOwEw8kBv2z5l2jZC8Z0aQ6xp1F-yOsvm0OGy2nkl8fqCG6emw6_bIRAxKISDnvJJpl-21NL5mbhQhLpdsyZ4sIwbUmdub3zTrWGeIxZFHbzHDhzMeGB5H5STIAJO7DK0HoUILZ4gFdgK2vof_f9BZ3C5ZMb8s7wX2Gc2vH6Lvnlga3Ua3bgyueuTDuxsCsDQ18zbtyWTwccTu0XWx-cxPkJ4hGOp0ki7VQ',
  focus: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDHDMSKggL0q0wuyPAcE5mQ_V1_JzC_R45Wca2ksmLjmekfy9wpknPVRbOA7t4EXR8VlC3xKpDQnlMmrBxC2BNUpqQk3OKLx4SSJ7rr02MRn_jZInpYCeJ0igdzs6pWcWDcVzUnuVct6HIShO9ZhnLu7mkUrsOi2dMhAt1htzsEQL5nYuGNcO2_0KCdPdo7oH0jlfb44nnm4FdpJkD54dsYJNJWcmSqtoOPZs095s7j-fjwRewVNfYbUNVuQRsWBquAMBi9MXaswFM',
  home: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnuNkwa2lVnpYjJOfnCeeXghqeoEUMT9H2QrNVE60HRgQ0RtoFP3GGUwGJv8okXaNf4JFh4gsamSPvswktj7cJVJbOGZXWqP1SIUDK7P_fpnAu0qS5bJfNf9BfeqPdIVyHZYVkka9KtKQEcLoLHsQXxPoAekE7gD5OYg3gNTYFRayjNJL_AxZvY5Bvyyn8flwDA_4nRPhUoJsQzKVrh09fVEuUAM6Mfolep8P_rNYjEFc1G_1wLP34l0VcrG2pGhIdLE4UV-4_Nbo',
  homeT1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwnnKYUHXdxfNH21K71PGiaaZv1kM1ORoFKEIWpmjWY7V2m8QiX9wFiGFWJBE-vymiSCv6gXsRhSbDV0GAxJ-EHtY1ZeKCqcv0zLzZIf4csmuk-y4ZIj0OdiTMn9346-QQiEQYpatXvuYLj0mbHEIzn8F9P-6PnJNQcVSIsgqho51v6e1XoX3C9TNoihXhH5TV14O5-63SOOp1ZXNn3qxw2AD7zqGZg_JbygkwSJZUmI4SXTAYUYwoyMBGLvxGHlFHkx4KdoQt6Vw',
  homeT2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjN7-88bSsTCAAG2hLHZzifJw9uQ0jU7iZsOfxEtrQsusshqeeoPkVGJPULupUwiQDSZO87HOHAR1RIfQ31tWpFo3Onm6BTSXQpj8q3s7RsqbjzFAVI12zxJv7JjH2S8B7stI9HpTts-QhWEDcLEjSs0PKtS9wt5Ldodxa6wGHbRr70QKOQbITQOAdJ_SYKK7lJE8gRUiFX3ma0kvHyWkfpNNUPo885syeKdRhJv1yoNnZY5egeycQ-SQxWv91BBYPXw_artie4Ts',
  sleep: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQWMefJU4kcQLqLnECheWe2Oq8o0rORC1dmKOGZmQAyYBQiUMBKvRtc0Bfx4XV_APq_8JvIxhv83uR-DcHWH0TDaijXduCsrL4poLze-MmIODxBRZGuWzgm0iL2xt1YzhMN81XTK5tbe4v3bc7roMljWArTEQAp1DzMCIipGjXm-ObXMMRXApKsr834usZ-KMIDrNCbsrYRF-ZqfzunUDa6G4RqpnldMj3WlUSVb0PYuczaNNMRfaaAn_gNwBJVYSy1wIljQFOyG4',
  sleepT1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYehqb1YOBWO2mv_RwqzHUOVWlJ_mSS6bPjEedcRCRfr6ud-6G22vlS6MUUqFajoO1QGiQgKyuWusYohQYtWOV8EaQ-ixjsKW0478JSvphy-lu8oeYKCUKomfC5o410ZmXMVrlBdi0ZuUZTcJ1wx0yvuNo5g1zJR1mahqkMD9YrADdKF_maFJeaJAxOBHlF9TWvjDPoo7Tcc0t3rhUsvKidIBumY2fyKMIsSjF13twCXBirlgmXehhOyQD_mRcBbhXso9eacAVljY',
  soul: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCco1ncwr8wtap0SMVjekcQRKR0gOaCbbrFfILUshL4SRWbYWsRy8kNbSdhmmFnXWhEceT4pYX8KaMWlAyYgmedh27QAySp3Lv3bFyNOowwrqPZ1hWrj-84hn3ulIENM--sl6pj-ROAALFOLplo5BQG8HIfCh9MXDOo7FPCyRs7aSsaI1WenEEHilynRMKNhRnUyjFP9T-NECmYgsxFuXSFUtoJJeyCVEobvoRbbxMrAHSvEC1OfMFtD3iq5tBbfGsLaIVYn2ySoGo',
  soulT1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXjpTtB1jF2dkWDWmZdzZKACVmzJtnrWqe_Z1N1WaR9EDWTOB6HTkkSJc8T3NXGZZmOwYi2o3AxVIpiEjSlyNDMZT-rWqKvwHQ2z5LGvLLxhe1-302wjjkUq0Kqa1MUfR8OzlR9ag228uJ2KaqdQKlzNF839AEOko2D87znkeEh_8cHWCIYSVM86mcoLkK4l5wERNNY3QrJ5w4TlImFGUS9ZdiZRpEM3NekqjnGN1HgIkEQkBAg5st4RqPfgSbZgWIY41JjhnLNMo',
  soulT2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAL_VzB5-IkqZfJxGbIwUKQpOKk-FNf3FnuwYrXfcFCrKP2jCy4fmompCsdF7uItpo0rC3-5CPjDt5vGcAvkE_1VyHOshGEeb0GSY8XSZ_LGMGz64fwQMppHFLY2wCH7I4jVDEBqefaRBkfXkCS_PQRJUDKSauXRX26nNhFhc_k75V6sDjPUwMu35flnkI-DfT8fm2BNq4smsVo3570sPtAd3ecNrNvufoxFDJHKK2kjGbHXALbQMe68-rWCH19PT22h13QXaVEOjU',
  soulT3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAz6Nxp6cow1429XBXsVa2-FFTghXHMwrtCNCpldeZgEPfLNkOmFHsrPTZVqvmGfVGIFyqvzi5R0Ux7gfu_1JHWgwgTklxUtZGvN3fmrms4gbrQvXhxWsZtvMTqzUP0KiVJIPJ1ANa9Vu11xRWAmtpSJzO5icxybXmlmuCcweUmNvZT8Rce74_-fS77UaFjacfpG6LRsr7dB3SFFU8TMaTBUA3J7w2iTThBdBWupsv1zk98zNCR5X4dl45En5ela8VdY_1D5El6VLI',
};

const CARD = 'group cursor-pointer relative overflow-hidden rounded-xl border border-[#d0c3c7]/30 hover:border-[#433139]/30 transition-all duration-500 bg-[#fff8f7] flex flex-col justify-between';
const CARD_STYLE: React.CSSProperties = { boxShadow: '0 4px 20px rgba(91, 71, 80, 0.04)' };
const EYEBROW = 'inline-block px-3 py-1 bg-[#F2E9E5] rounded-full text-[11px] leading-4 tracking-[0.04em] font-medium text-[#433139] mb-2';
const H2 = 'font-serif text-[32px] leading-[40px] tracking-[-0.01em] font-semibold text-[#433139]';
const SUB = 'text-[16px] leading-6 text-[#4d4448] mt-2';
const CTA_OUTLINE = 'mt-6 self-start px-6 py-3 rounded border-[1.5px] border-[#BDA494] text-[#443327] text-[14px] leading-5 tracking-[0.01em] font-semibold hover:border-[#433139] hover:text-[#433139] transition-colors duration-300';
const THUMB = 'w-12 h-12 rounded bg-[#F7F1EE] overflow-hidden border border-[#d0c3c7]/20';

export const RitualsOverviewScreen: React.FC<RitualsOverviewScreenProps> = ({ onNavigate, onStartAssessment }) => {
  const go = (tab: NavTab) => {
    soundEngine.playSoftClick();
    onNavigate?.(tab);
  };

  return (
    <div className="w-full">
      {/* Hero Section — html/021 L264-273 */}
      <section className="relative w-full h-[614px] md:h-[716px] flex items-center justify-center overflow-hidden bg-[#fff0ee]">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-60 mix-blend-multiply"
            alt="Latar botani lembut dengan bunga kering dalam cahaya pagi yang hangat."
            src={IMG.hero}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF3EE] via-[#FAF3EE]/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h1 className="font-serif text-[38px] leading-[44px] tracking-[-0.02em] font-semibold md:text-[48px] md:leading-[56px] text-[#433139]">
            Temukan Ritualmu
          </h1>
          <p className="text-[18px] leading-[28px] text-[#4d4448] max-w-2xl">
            Lima ritual harian yang dirancang untuk menemani setiap fase harimu - dari pagi hingga malam, dari fokus hingga pemulihan.
          </p>
        </div>
      </section>

      {/* Main Content - Ritual Grid — html/021 L275-402 */}
      <section className="py-[56px] md:py-[100px] px-6 max-w-[1200px] mx-auto">
        <div className="flex flex-col gap-16">
          {/* Row 1: 2 Cards (Asymmetric) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Morning Ritual (Large) */}
            <div className={`md:col-span-7 ${CARD}`} style={CARD_STYLE}>
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  alt="Pagi yang tenang dengan teh herbal di atas linen dan jurnal terbuka."
                  src={IMG.morning}
                />
                <div className="absolute inset-0 bg-[#433139]/10 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-8 flex flex-col gap-4">
                <div>
                  <span className={EYEBROW}>Pagi Hari</span>
                  <h2 className={H2}>Morning Ritual</h2>
                  <p className={SUB}>Awali dengan Kehangatan</p>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className={THUMB}>
                    <img className="w-full h-full object-cover" alt="Botol roller essential oil di atas kayu." src={IMG.morningT1} />
                  </div>
                  <div className={THUMB}>
                    <img className="w-full h-full object-cover" alt="Cawan keramik berisi herbal tea." src={IMG.morningT2} />
                  </div>
                </div>
                <button onClick={() => go('ritual-morning')} className={CTA_OUTLINE}>
                  Jelajahi Ritual
                </button>
              </div>
            </div>

            {/* Focus Ritual (Smaller) — badge Segera Hadir, CTA disabled */}
            <div className={`md:col-span-5 ${CARD}`} style={CARD_STYLE}>
              <div className="h-56 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  alt="Meja kerja minimalis dengan asap incense tipis."
                  src={IMG.focus}
                />
                <div className="absolute top-4 right-4 bg-[#FAF3EE]/90 backdrop-blur px-3 py-1 rounded-full border border-[#BDA494] text-[11px] leading-4 tracking-[0.04em] font-medium text-[#433139] z-10">
                  Segera Hadir
                </div>
              </div>
              <div className="p-8 flex flex-col gap-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <div>
                  <h2 className={H2}>Focus Ritual</h2>
                  <p className={SUB}>Kejernihan untuk Berkarya</p>
                </div>
                <button disabled className="mt-auto self-start px-6 py-3 rounded border-[1.5px] border-[#BDA494] text-[#443327] text-[14px] leading-5 tracking-[0.01em] font-semibold opacity-50 cursor-not-allowed">
                  Jelajahi Ritual
                </button>
              </div>
            </div>
          </div>

          {/* Row 2: Full Width */}
          <div className={`w-full ${CARD} md:flex-row flex-col`} style={CARD_STYLE}>
            <div className="md:w-1/2 h-64 md:h-auto overflow-hidden relative">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                alt="Sudut ruangan dengan lilin beeswax dan selimut bertekstur."
                src={IMG.home}
              />
            </div>
            <div className="md:w-1/2 p-12 flex flex-col justify-center gap-6">
              <div>
                <span className={EYEBROW}>Ruang Personal</span>
                <h2 className={`${H2} text-[38px] leading-[44px] md:text-[32px] md:leading-[40px]`}>Home Ritual</h2>
                <p className="text-[18px] leading-[28px] text-[#4d4448] mt-2">Rumah sebagai Sanctuary</p>
              </div>
              <p className="text-[16px] leading-6 text-[#4d4448] max-w-md">
                Ubah ruang hidup Anda menjadi tempat perlindungan yang tenang dengan wewangian dan elemen grounding.
              </p>
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded bg-[#F7F1EE] overflow-hidden border border-[#d0c3c7]/20">
                  <img className="w-full h-full object-cover" alt="Toples lilin kaca plum." src={IMG.homeT1} />
                </div>
                <div className="w-16 h-16 rounded bg-[#F7F1EE] overflow-hidden border border-[#d0c3c7]/20">
                  <img className="w-full h-full object-cover" alt="Ikatan sage dan lavender kering." src={IMG.homeT2} />
                </div>
              </div>
              <button onClick={() => go('ritual-home')} className="mt-2 self-start px-8 py-4 rounded bg-[#433139] text-white text-[14px] leading-5 tracking-[0.01em] font-semibold hover:bg-[#433139]/90 transition-colors duration-300">
                Jelajahi Ritual
              </button>
            </div>
          </div>

          {/* Row 3: 2 Cards (Asymmetric Reversed) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sleep Ritual (Smaller) */}
            <div className={`md:col-span-5 ${CARD}`} style={CARD_STYLE}>
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  alt="Lavender kering di atas sprei putih saat senja."
                  src={IMG.sleep}
                />
                <div className="absolute inset-0 bg-[#433139]/20 group-hover:bg-[#433139]/10 transition-colors duration-500" />
              </div>
              <div className="p-8 flex flex-col gap-4">
                <div>
                  <span className={EYEBROW}>Malam Hari</span>
                  <h2 className={H2}>Sleep Ritual</h2>
                  <p className={SUB}>Istirahat yang Memulihkan</p>
                </div>
                <div className="flex gap-4 mt-2">
                  <div className={THUMB}>
                    <img className="w-full h-full object-cover" alt="Botol kecil sleep mist." src={IMG.sleepT1} />
                  </div>
                </div>
                <button onClick={() => go('ritual-sleep')} className={CTA_OUTLINE}>
                  Jelajahi Ritual
                </button>
              </div>
            </div>

            {/* Soul Ritual (Large) */}
            <div className={`md:col-span-7 ${CARD}`} style={CARD_STYLE}>
              <div className="h-64 overflow-hidden relative">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  alt="Jurnal linen terbuka dengan pulpen, botol ritual oil, dan cangkir teh."
                  src={IMG.soul}
                />
              </div>
              <div className="p-8 flex flex-col gap-4">
                <div>
                  <span className={EYEBROW}>Kapan Saja</span>
                  <h2 className={H2}>Soul Ritual</h2>
                  <p className={SUB}>Ruang untuk Jiwamu</p>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className={THUMB}>
                    <img className="w-full h-full object-cover" alt="Jurnal gratitude bersampul linen." src={IMG.soulT1} />
                  </div>
                  <div className={THUMB}>
                    <img className="w-full h-full object-cover" alt="Botol dropper meneteskan minyak emas." src={IMG.soulT2} />
                  </div>
                  <div className={THUMB}>
                    <img className="w-full h-full object-cover" alt="Gumpalan kristal amethyst mentah." src={IMG.soulT3} />
                  </div>
                </div>
                <button onClick={() => go('ritual-soul')} className={CTA_OUTLINE}>
                  Jelajahi Ritual
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Band — html/021 L404-412 */}
      <section className="w-full py-12 bg-[#ffe2de] border-t border-[#d0c3c7]/30 flex justify-center px-6">
        <div className="max-w-2xl text-center flex flex-col items-center gap-6">
          <h3 className="font-serif text-[24px] leading-8 tracking-[-0.01em] font-semibold text-[#433139]">
            Belum yakin mulai dari mana?
          </h3>
          <p className="text-[16px] leading-6 text-[#4d4448]">
            Ikuti Assessment singkat kami untuk menemukan ritual yang paling sesuai dengan kebutuhan dan energi Anda saat ini.
          </p>
          <button
            onClick={() => { soundEngine.playSoftClick(); onStartAssessment?.(); }}
            className="mt-2 px-8 py-4 rounded bg-[#433139] text-white text-[14px] leading-5 tracking-[0.01em] font-semibold hover:bg-[#433139]/90 transition-colors duration-300 shadow-sm"
          >
            Mulai Assessment
          </button>
        </div>
      </section>
    </div>
  );
};
