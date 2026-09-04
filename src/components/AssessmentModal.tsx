import React, { useState } from 'react';
import { soundEngine } from '../utils/audio';
import { useModalA11y } from '../utils/useModalA11y';
import { PRODUCTS, CRYSTALS } from '../data/mockData';
import { ScentAssessmentResult, Language } from '../types';
import { X, Sparkles, ArrowLeft, Check, Compass } from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (result: ScentAssessmentResult) => void;
  lang?: Language;
}

interface Question {
  id: number;
  layer: 'Behavior' | 'Energy' | 'Mindset' | 'Emotion' | 'Need' | 'Vision' | 'Identity';
  promptEn: string;
  promptId: string;
  taglineEn: string;
  taglineId: string;
  options: {
    labelEn: string;
    labelId: string;
    descriptionEn: string;
    descriptionId: string;
    weight: { layer: 'Identity' | 'Vision' | 'Need' | 'Emotion' | 'Mindset' | 'Energy' | 'Behavior'; points: number };
  }[];
}

const QUESTIONS: Question[] = [
  // 1. Somatic Environment & Foundation (Layer 1: Behavior)
  {
    id: 1,
    layer: 'Behavior',
    promptEn: "When creating your physical sanctuary at home, which tactile element immediately eases somatic tension in your body?",
    promptId: "Saat Anda menata ruang hening pribadi di rumah, elemen fisik mana yang seketika meredakan ketegangan tubuh Anda?",
    taglineEn: "Question 1 of 12 • Layer 1: Somatic Foundation",
    taglineId: "Pertanyaan 1 dari 12 • Lapisan 1: Fondasi Somatik & Ruang Hening",
    options: [
      {
        labelEn: "The warm golden flicker of an amber flame & dark resin",
        labelId: "Pijar hangat nyala lilin amber & getah kayu damar kuno",
        descriptionEn: "Visual warmth, grounding resin aromas, and sovereign stillness.",
        descriptionId: "Kehangatan visual, aroma damar yang membumi, dan ketenangan berwibawa.",
        weight: { layer: 'Identity', points: 25 }
      },
      {
        labelEn: "A cool, crisp botanical mist of wild bergamot & tea",
        labelId: "Embun botani segar dari bergamot liar & seduhan teh putih",
        descriptionEn: "Invigorating hydration, airy terpenes, and morning renewal.",
        descriptionId: "Hidrasi yang menyegarkan, molekul udara segar, dan pembaruan pagi.",
        weight: { layer: 'Energy', points: 25 }
      },
      {
        labelEn: "Tactile linen stationery & quiet cedarwood desk tools",
        labelId: "Buku jurnal bersampul linen alami & aroma kayu cedar",
        descriptionEn: "Mental clarity, structured reflection, and quiet spaciousness.",
        descriptionId: "Kejernihan pikiran, refleksi tertata, dan ruang luas yang tenang.",
        weight: { layer: 'Mindset', points: 25 }
      }
    ]
  },

  // 2. Daily Transition & Habit Demarcation (Layer 1: Behavior)
  {
    id: 2,
    layer: 'Behavior',
    promptEn: "How do you consciously demarcate the sacred boundary between daytime exertion and evening stillness?",
    promptId: "Bagaimana cara Anda menandai batas sakral antara kesibukan siang hari dan keheningan malam?",
    taglineEn: "Question 2 of 12 • Layer 1: Habit Anchoring & Transitions",
    taglineId: "Pertanyaan 2 dari 12 • Lapisan 1: Penjangkaran Kebiasaan & Transisi Hari",
    options: [
      {
        labelEn: "Kindling a ritual flame and setting digital devices aside",
        labelId: "Menyalakan lilin ritual dan meletakkan gawai jauh dari jangkauan",
        descriptionEn: "A tangible physical cue that work is sealed and sanctuary has begun.",
        descriptionId: "Isyarat fisik nyata bahwa kerja telah selesai dan ruang hening dimulai.",
        weight: { layer: 'Behavior', points: 25 }
      },
      {
        labelEn: "Anointing temples and pulse points with grounding woody oils",
        labelId: "Mengoleskan minyak anointing aromatik di pelipis dan pergelangan tangan",
        descriptionEn: "Using olfactory receptors to trigger rapid parasympathetic calm.",
        descriptionId: "Menggunakan reseptor olfaktori untuk memicu ketenangan sistem parasimpatis.",
        weight: { layer: 'Mindset', points: 25 }
      },
      {
        labelEn: "Shedding social masks to rest in soft, cozy cashmere comfort",
        labelId: "Melepaskan peran sosial dan berselimut dalam kenyamanan lembut",
        descriptionEn: "Granting oneself permission to be unproductive without guilt.",
        descriptionId: "Mengizinkan diri beristirahat tanpa rasa bersalah atau tuntutan performa.",
        weight: { layer: 'Need', points: 25 }
      }
    ]
  },

  // 3. Nervous System & Somatic Regulation (Layer 2: Energy)
  {
    id: 3,
    layer: 'Energy',
    promptEn: "When your nervous system experiences sensory overload, what brings you back to center fastest?",
    promptId: "Ketika sistem saraf Anda mengalami beban stimulasi berlebih, apa yang paling cepat memulihkan keseimbangan Anda?",
    taglineEn: "Question 3 of 12 • Layer 2: Nervous System Regulation",
    taglineId: "Pertanyaan 3 dari 12 • Lapisan 2: Regulasi Sistem Saraf & Energi",
    options: [
      {
        labelEn: "Complete silence in an unhurried, protected personal sanctuary",
        labelId: "Keheningan total dalam suaka pribadi yang bebas dari interupsi",
        descriptionEn: "Depolarizing from outside demands and re-anchoring inner sovereignty.",
        descriptionId: "Melepaskan ekspektasi luar dan memulihkan kedaulatan diri terdalam.",
        weight: { layer: 'Identity', points: 25 }
      },
      {
        labelEn: "Rhythmic box breathwork (4-4-4-4) with ozonic botanical hydration",
        labelId: "Latihan pernapasan ritmis kotak (4-4-4-4) dengan embun botani segar",
        descriptionEn: "Direct somatic down-regulation of the vagus nerve and solar plexus.",
        descriptionId: "Regulasi langsung saraf vagus dan pelepasan sesak di rongga dada.",
        weight: { layer: 'Energy', points: 25 }
      },
      {
        labelEn: "Tender, nurturing warmth that melts emotional holding patterns",
        labelId: "Kehangatan yang menenangkan dan meredakan ketegangan emosional",
        descriptionEn: "Gentle acceptance and emotional safety without self-judgment.",
        descriptionId: "Penerimaan yang lembut dan rasa aman tanpa penghakiman diri.",
        weight: { layer: 'Emotion', points: 25 }
      }
    ]
  },

  // 4. Circadian Rhythm & Awakening Vitality (Layer 2: Energy)
  {
    id: 4,
    layer: 'Energy',
    promptEn: "What ideal rhythm do you wish to inhabit during the first 30 minutes of waking each morning?",
    promptId: "Ritme ideal seperti apa yang ingin Anda rasakan di 30 menit pertama saat bangun pagi?",
    taglineEn: "Question 4 of 12 • Layer 2: Circadian Awakening & Vitality",
    taglineId: "Pertanyaan 4 dari 12 • Lapisan 2: Irama Sirkadian & Vitalitas Pagi",
    options: [
      {
        labelEn: "Natural sunlight, crisp botanical mist, and vibrant vitality",
        labelId: "Cahaya mentari pagi, semprotan embun botani, dan vitalitas segar",
        descriptionEn: "Awakening cellular energy with clean herbal notes and fresh air.",
        descriptionId: "Membangunkan energi seluler dengan aroma herbal bersih dan udara segar.",
        weight: { layer: 'Energy', points: 25 }
      },
      {
        labelEn: "Slow contemplation, quiet tea sipping, and undisturbed presence",
        labelId: "Kontemplasi perlahan, menyeruput teh hangat, dan kehadiran hening",
        descriptionEn: "Protecting the fragile alpha brainwave state from digital hurry.",
        descriptionId: "Melindungi gelombang otak alfa dari ketergesaan dunia digital.",
        weight: { layer: 'Behavior', points: 25 }
      },
      {
        labelEn: "Sacred prayer, intention alignment, and sovereign visioning",
        labelId: "Doa yang khidmat, penyelarasan intensi, dan visualisasi berdaulat",
        descriptionEn: "Setting the trajectory of the day from deep core purpose.",
        descriptionId: "Menentukan arah jalannya hari dari tujuan hidup yang paling dalam.",
        weight: { layer: 'Vision', points: 25 }
      }
    ]
  },

  // 5. Internal Dialogue & Cognitive Freedom (Layer 3: Mindset)
  {
    id: 5,
    layer: 'Mindset',
    promptEn: "Which internal thought loop most frequently drains your cognitive headspace?",
    promptId: "Pola pikiran atau dialog batin apa yang paling sering menguras ruang hening di kepala Anda?",
    taglineEn: "Question 5 of 12 • Layer 3: Cognitive Clarity & Dialogue",
    taglineId: "Pertanyaan 5 dari 12 • Lapisan 3: Kejernihan Pikiran & Dialog Batin",
    options: [
      {
        labelEn: "The compulsive urge to respond immediately to every external request",
        labelId: "Dorongan gelisah untuk merespons seketika setiap pesan dan ekspektasi",
        descriptionEn: "Mistaking external urgency for personal importance and worth.",
        descriptionId: "Menyamakan urgensi orang lain dengan nilai dan integritas diri sendiri.",
        weight: { layer: 'Mindset', points: 25 }
      },
      {
        labelEn: "Subtle guilt when carving out sacred time solely for your own rest",
        labelId: "Rasa bersalah halus saat menyisihkan waktu khusus untuk diri sendiri",
        descriptionEn: "Difficulty feeling safe when resting or taking pause from productivity.",
        descriptionId: "Kesulitan merasa aman saat berhenti sejenak dari tuntutan produktivitas.",
        weight: { layer: 'Need', points: 25 }
      },
      {
        labelEn: "Worrying whether your authentic work and voice will be truly understood",
        labelId: "Kekhawatiran apakah karya dan suara autentik Anda akan dihargai",
        descriptionEn: "Hesitation to fully step into sovereign creative authority.",
        descriptionId: "Keraguan untuk melangkah penuh ke dalam otoritas kreasi berdaulat.",
        weight: { layer: 'Identity', points: 25 }
      }
    ]
  },

  // 6. Olfactory Discernment & Subconscious Focus (Layer 3: Mindset)
  {
    id: 6,
    layer: 'Mindset',
    promptEn: "Which olfactory profile stirs the sharpest clarity and mental spaciousness in you?",
    promptId: "Karakter wewangian alami mana yang paling efektif memantik kejernihan dan ruang lapang di pikiran Anda?",
    taglineEn: "Question 6 of 12 • Layer 3: Olfactory Perception",
    taglineId: "Pertanyaan 6 dari 12 • Lapisan 3: Persepsi Olfaktori & Fokus Batin",
    options: [
      {
        labelEn: "French Cypress, Meditative Hinoki Wood & Smoky Javanese Vetiver",
        labelId: "Pohon Siprus Prancis, Kayu Hinoki Meditatif & Gaharu Vetiver Jawa",
        descriptionEn: "Clear, contemplative, grounding, and intellectually expansive.",
        descriptionId: "Jernih, kontemplatif, membumi, dan memperluas perspektif pikiran.",
        weight: { layer: 'Mindset', points: 25 }
      },
      {
        labelEn: "Smoked Oud, Dark Mirabelle Plum & Resinous Golden Amber",
        labelId: "Gaharu Asap, Buah Plum Mirabelle Gelap & Damar Amber Emas",
        descriptionEn: "Deep, regal, magnetic, anchoring unshakeable authority.",
        descriptionId: "Mendalam, agung, magnetis, dan mengokohkan otoritas diri sejati.",
        weight: { layer: 'Identity', points: 25 }
      },
      {
        labelEn: "Sunlit Sea Salt, Driftwood, Coastal Sage & Crisp Bergamot",
        labelId: "Kristal Garam Laut Surya, Kayu Hanyut, Sage Pantai & Bergamot",
        descriptionEn: "Airy, purifying, expansive, and energetically cleansing.",
        descriptionId: "Lapang, memurnikan, menyegarkan, dan membersihkan energi lelah.",
        weight: { layer: 'Energy', points: 25 }
      }
    ]
  },

  // 7. Emotional Vulnerability & Self-Compassion (Layer 4: Emotion)
  {
    id: 7,
    layer: 'Emotion',
    promptEn: "Where does your heart most crave tenderness and compassionate acceptance right now?",
    promptId: "Di area mana hati Anda paling mendambakan kelembutan dan penerimaan penuh kasih saat ini?",
    taglineEn: "Question 7 of 12 • Layer 4: Heart Equilibrium",
    taglineId: "Pertanyaan 7 dari 12 • Lapisan 4: Keseimbangan Emosi & Kelembutan Hati",
    options: [
      {
        labelEn: "Releasing the exhausting pursuit of perfectionism and self-criticism",
        labelId: "Melepaskan jeratan perfeksionisme dan kritik diri yang melelahkan",
        descriptionEn: "Allowing yourself to be wonderfully human, imperfect, and worthy as is.",
        descriptionId: "Mengizinkan diri menjadi manusia yang utuh, belajar, dan berharga apa adanya.",
        weight: { layer: 'Emotion', points: 25 }
      },
      {
        labelEn: "Honoring periods of low stamina without self-blame or shame",
        labelId: "Menghormati fase tubuh yang letih tanpa menyalahkan diri sendiri",
        descriptionEn: "Acknowledging that fallow seasons are essential for future blooming.",
        descriptionId: "Memahami bahwa masa istirahat adalah syarat mutlak untuk mekar kembali.",
        weight: { layer: 'Need', points: 25 }
      },
      {
        labelEn: "Expressing genuine emotional vulnerability without fear of rejection",
        labelId: "Mengungkapkan perasaan tulus tanpa rasa takut akan penolakan",
        descriptionEn: "Opening the heart to deeper intimacy and authentic connection.",
        descriptionId: "Membuka hati pada keintiman sejati dan hubungan yang bermakna.",
        weight: { layer: 'Vision', points: 25 }
      }
    ]
  },

  // 8. Emotional Resilience & Life Transitions (Layer 4: Emotion)
  {
    id: 8,
    layer: 'Emotion',
    promptEn: "When navigating sudden changes or relational transitions, what sustains your emotional center?",
    promptId: "Saat menghadapi perubahan tak terduga atau dinamika hubungan, apa yang menopang stabilitas emosi Anda?",
    taglineEn: "Question 8 of 12 • Layer 4: Emotional Resilience",
    taglineId: "Pertanyaan 8 dari 12 • Lapisan 4: Resiliensi Emosional & Stabilitas Jiwa",
    options: [
      {
        labelEn: "A comforting veil of bourbon vanilla, tonka & soft cashmere musk",
        labelId: "Aroma lembut bourbon vanilla, biji tonka & cashmere musk yang menenangkan",
        descriptionEn: "Wrapping the somatic spirit in tender, reassuring sensory safety.",
        descriptionId: "Membungkus raga dalam rasa aman sensoris yang hangat dan menentramkan.",
        weight: { layer: 'Emotion', points: 25 }
      },
      {
        labelEn: "Unshakable faith that every transition carries an evolutionary gift",
        labelId: "Keyakinan teguh bahwa setiap transisi membawa hikmah pendewasaan jiwa",
        descriptionEn: "Trusting the deeper unseen architecture of your life journey.",
        descriptionId: "Mempercayai rancangan luhur dan arah bermakna dalam perjalanan hidup.",
        weight: { layer: 'Vision', points: 25 }
      },
      {
        labelEn: "Steadfast daily somatic routines that keep both feet on the ground",
        labelId: "Rutinitas harian yang konsisten untuk menjaga pijakan tetap tegak",
        descriptionEn: "Using physical habits as an unmovable ballast in turbulent seas.",
        descriptionId: "Menjadikan kebiasaan nyata sebagai jangkar penyeimbang di tengah ombak.",
        weight: { layer: 'Behavior', points: 25 }
      }
    ]
  },

  // 9. Sacred Boundaries & Energetic Sanctuary (Layer 5: Need)
  {
    id: 9,
    layer: 'Need',
    promptEn: "How is your relationship with setting firm, impenetrable boundaries around your peace?",
    promptId: "Bagaimana hubungan Anda saat ini dengan seni menetapkan batasan (boundaries) demi melindungi kedamaian batin?",
    taglineEn: "Question 9 of 12 • Layer 5: Sacred Boundaries",
    taglineId: "Pertanyaan 9 dari 12 • Lapisan 5: Perlindungan Diri & Batasan Suci",
    options: [
      {
        labelEn: "I comfortably say 'no' without over-explaining or apologizing",
        labelId: "Saya nyaman berkata 'tidak' tanpa perlu menjelaskan panjang lebar atau meminta maaf",
        descriptionEn: "Recognizing that your peace is a non-negotiable temple of sovereignty.",
        descriptionId: "Menyadari bahwa kedamaian batin adalah suaka otonom yang tidak dapat ditawar.",
        weight: { layer: 'Need', points: 25 }
      },
      {
        labelEn: "I still absorb others' emotional stress and finish days depleted",
        labelId: "Saya masih kerap menyerap emosi orang lain dan merasa terkuras di akhir hari",
        descriptionEn: "Actively learning how to insulate your empathic field with cashmere stillness.",
        descriptionId: "Sedang belajar melindungi medan empati dengan keheningan yang kokoh.",
        weight: { layer: 'Emotion', points: 25 }
      },
      {
        labelEn: "I guard my calendar and focus hours as sacred, inviolable space",
        labelId: "Saya menjaga jadwal waktu hening dan fokus kerja sebagai ruang sakral",
        descriptionEn: "Strategic preservation of mental energy for high-leverage creation.",
        descriptionId: "Konservasi energi mental secara strategis demi karya bernilai tinggi.",
        weight: { layer: 'Mindset', points: 25 }
      }
    ]
  },

  // 10. Fundamental Somatic Nourishment (Layer 5: Need)
  {
    id: 10,
    layer: 'Need',
    promptEn: "If your body spoke with unfiltered truth, what fundamental nourishment would it demand right now?",
    promptId: "Jika tubuh Anda berbicara dengan kejujuran mutlak, nutrisi somatik mendasar apa yang paling ia minta?",
    taglineEn: "Question 10 of 12 • Layer 5: Unspoken Somatic Needs",
    taglineId: "Pertanyaan 10 dari 12 • Lapisan 5: Kebutuhan Somatik Terdalam",
    options: [
      {
        labelEn: "Unapologetic solitude where nothing is asked or expected of you",
        labelId: "Kesendirian hening di mana tiada tuntutan atau ekspektasi dari siapa pun",
        descriptionEn: "Pure freedom to exist without performing, managing, or pleasing.",
        descriptionId: "Kebebasan murni untuk bernapas tanpa perlu menyenangkan orang lain.",
        weight: { layer: 'Need', points: 25 }
      },
      {
        labelEn: "Deep, restorative sleep enveloped in grounding earthen scents",
        labelId: "Tidur lelap memulihkan yang diselimuti aroma tanah dan lumut alami",
        descriptionEn: "Allowing the cellular matrix to rebuild in profound delta stillness.",
        descriptionId: "Memberikan ruang pemulihan seluler dalam ketenangan gelombang delta.",
        weight: { layer: 'Behavior', points: 25 }
      },
      {
        labelEn: "Creative play and spacious exploration without commercial pressure",
        labelId: "Eksplorasi kreatif yang bebas tanpa beban target materi atau angka",
        descriptionEn: "Reconnecting with the sheer, unhurried delight of raw creation.",
        descriptionId: "Menghidupkan kembali kegembiraan murni dalam mencipta dari hati.",
        weight: { layer: 'Vision', points: 25 }
      }
    ]
  },

  // 11. Higher Purpose & Soul Expansion (Layer 6: Vision)
  {
    id: 11,
    layer: 'Vision',
    promptEn: "What higher creative calling or horizon is gently urging you to expand with courage?",
    promptId: "Panggilan kreatif luhur atau cakrawala apa yang sedang mengetuk hati Anda untuk melangkah lebih berani?",
    taglineEn: "Question 11 of 12 • Layer 6: Higher Purpose & Vision",
    taglineId: "Pertanyaan 11 dari 12 • Lapisan 6: Visi Luhur & Arah Perjalanan Jiwa",
    options: [
      {
        labelEn: "Creating authentic work that leaves a lasting, peaceful imprint on others",
        labelId: "Melahirkan karya autentik yang menebarkan kedamaian mendalam bagi sesama",
        descriptionEn: "Translating inner spiritual clarity into meaningful physical manifestation.",
        descriptionId: "Mewujudkan kejernihan batin menjadi karya nyata yang berdaya ubah.",
        weight: { layer: 'Vision', points: 30 }
      },
      {
        labelEn: "Living in complete harmony with your inner truth regardless of opinions",
        labelId: "Hidup selaras penuh dengan kebenaran batin tanpa goyah oleh opini luar",
        descriptionEn: "Uncompromising self-sovereignty as your highest artistic masterpiece.",
        descriptionId: "Kedaulatan diri tanpa kompromi sebagai mahakarya hidup Anda yang tertinggi.",
        weight: { layer: 'Identity', points: 30 }
      },
      {
        labelEn: "Building a grounded, regenerative lifestyle in deep rhythm with nature",
        labelId: "Membangun gaya hidup membumi yang selaras dengan irama alam semesta",
        descriptionEn: "Living sustainably, honorably, and peacefully in sacred reciprocity.",
        descriptionId: "Hidup bersahaja, berkesadaran, dan penuh rasa syukur atas setiap napas.",
        weight: { layer: 'Behavior', points: 30 }
      }
    ]
  },

  // 12. Sovereign Core Identity (Layer 7: Identity)
  {
    id: 12,
    layer: 'Identity',
    promptEn: "Ultimately, what timeless truth do you choose as the unwavering compass of your life?",
    promptId: "Pada akhirnya, kebenaran abadi apa yang Anda pilih sebagai kompas penuntun hidup Anda setiap hari?",
    taglineEn: "Question 12 of 12 • Layer 7: Sovereign Identity Pinnacle",
    taglineId: "Pertanyaan 12 dari 12 • Lapisan 7: Puncak Kedaulatan & Inti Identitas Jiwa",
    options: [
      {
        labelEn: "I am the sovereign author of my peace; I act from stillness, never urgency",
        labelId: "Saya adalah pencipta kedaulatan damai saya; saya bertindak dari hening, bukan ketergesaan",
        descriptionEn: "Your internal temple remains untouched by the turbulence of the world.",
        descriptionId: "Suaka batin Anda tetap teguh, utuh, dan tak tergoyahkan oleh hiruk-pikuk dunia.",
        weight: { layer: 'Identity', points: 35 }
      },
      {
        labelEn: "I honor the seasonal cycles of life and nurture my energy with reverence",
        labelId: "Saya menghormati musim kehidupan dan merawat energi hidup saya dengan cinta",
        descriptionEn: "Surrendering resistance and flowing with radiant, effortless vitality.",
        descriptionId: "Melepaskan penolakan dan mengalir dalam vitalitas alami yang anggun.",
        weight: { layer: 'Energy', points: 35 }
      },
      {
        labelEn: "My mind is a clear, quiet horizon discerning what is true from what is noise",
        labelId: "Pikiran saya adalah cakrawala jernih yang membedakan apa yang sejati dari kebisingan",
        descriptionEn: "Lucid perception, quiet wisdom, and deep cognitive sanctuary.",
        descriptionId: "Persepsi jernih, kearifan hening, dan suaka pikiran yang lapang.",
        weight: { layer: 'Mindset', points: 35 }
      }
    ]
  }
];

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  lang = 'id',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  // KRIT-3 fix 2026-09-04: init 0 semua layer (bukan seed 30/25) + clamp 0-100 saat akumulasi.
  const [scores, setScores] = useState<Record<string, number>>({
    Identity: 0,
    Vision: 0,
    Need: 0,
    Emotion: 0,
    Mindset: 0,
    Energy: 0,
    Behavior: 0
  });

  // KRIT-6/7 fix 2026-09-04: Escape → close + body scroll lock.
  useModalA11y(isOpen, onClose);

  if (!isOpen) return null;

  const currentQ = QUESTIONS[currentStep];
  const totalSteps = QUESTIONS.length;
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  const handleSelectOption = (index: number) => {
    soundEngine.playSoftClick();
    const newAnswers = [...selectedAnswers];
    newAnswers[currentStep] = index;
    setSelectedAnswers(newAnswers);

    const chosenOption = currentQ.options[index];
    const newScores = { ...scores };
    // KRIT-3 fix: clamp 0-100
    newScores[chosenOption.weight.layer] = Math.min(100, Math.max(0, (newScores[chosenOption.weight.layer] || 0) + chosenOption.weight.points));
    setScores(newScores);

    // Advance or complete
    setTimeout(() => {
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        soundEngine.playSingingBowl(528);
        
        // Deterministic Archetype matching across all 7 layers
        const dominant = (Object.keys(newScores) as (keyof typeof newScores)[]).reduce((a, b) =>
          newScores[a] > newScores[b] ? a : b
        ) as 'Identity' | 'Vision' | 'Need' | 'Emotion' | 'Mindset' | 'Energy' | 'Behavior';

        let resultProduct = PRODUCTS.find(p => p.alignmentLayer === dominant);
        if (!resultProduct) {
          resultProduct = PRODUCTS[0];
        }

        // Layer-specific profiles
        const profiles: Record<string, {
          titleEn: string;
          titleId: string;
          archetypeEn: string;
          archetypeId: string;
          descEn: string;
          descId: string;
          guidanceEn: string;
          guidanceId: string;
          crystals: typeof CRYSTALS;
          reasonCodes: string[];
        }> = {
          Identity: {
            titleEn: 'The Sovereign Visionary',
            titleId: 'Sang Visioner Berdaulat',
            archetypeEn: 'Intuitive Architect of Sovereign Calm',
            archetypeId: 'Arsitek Kedaulatan & Keheningan Batin',
            descEn: 'Your soul resonates with the pinnacle 7th tier: Sovereign Identity. You are in a profound cycle of authentic self-actualization, acting from quiet inner authority without needing external validation or hurried compromise.',
            descId: 'Jiwa Anda beresonansi kuat pada tingkatan ke-7: Kedaulatan Jiwa. Anda sedang berada dalam siklus aktualisasi diri yang mendalam, bertindak dari otoritas batin yang tenang dan kokoh tanpa lagi membutuhkan validasi eksternal.',
            guidanceEn: `Kindle ${resultProduct.name} each morning for 3 deep diaphragmatic breath cycles. Anoint pulse points and seal 3 non-negotiable soul intentions before engaging with digital screens.`,
            guidanceId: `Nyalakan lilin ${resultProduct.name} setiap pagi selama 3 siklus napas diafragma. Oleskan minyak anointing di nadi dan tuliskan 3 intensi kedaulatan sebelum menyentuh gawai.`,
            crystals: [CRYSTALS[2], CRYSTALS[1], CRYSTALS[0]], // Clear Quartz, Amethyst, Rose Quartz
            reasonCodes: ['L7_SOVEREIGNTY_SEEKER', 'RITUAL_STILLNESS_ANCHOR', 'SOMATIC_CLARITY', '12Q_HIGH_CONGRUENCE']
          },
          Vision: {
            titleEn: 'The Higher Purpose Architect',
            titleId: 'Sang Penjelajah Visi Luhur',
            archetypeEn: 'Luminous Creator of Destiny',
            archetypeId: 'Pencipta Visi & Ekspansi Jiwa',
            descEn: 'Your soul is illuminated by the 6th tier: Higher Purpose & Vision. You are called to translate deep inner wisdom into meaningful creative manifestations that inspire and elevate others.',
            descId: 'Jiwa Anda diterangi oleh tingkatan ke-6: Visi Luhur & Tujuan Jiwa. Anda dipanggil untuk menerjemahkan kebijaksanaan batin menjadi karya nyata yang memberi inspirasi dan kedamaian.',
            guidanceEn: `Anoint your brow and collarbones with ${resultProduct.name}. Spend 10 minutes at twilight visualizing your highest creative horizon in expansive stillness.`,
            guidanceId: `Oleskan ${resultProduct.name} di dahi dan tulang selangka. Luangkan 10 menit di senja hari untuk memvisualisasikan cakrawala kreasi luhur Anda dalam keheningan lapang.`,
            crystals: [CRYSTALS[2], CRYSTALS[3], CRYSTALS[5]], // Clear Quartz, Citrine, Moonstone
            reasonCodes: ['L6_VISION_EXPANSION', 'CREATIVE_DESTINY_PULL', 'PURPOSE_ALIGNMENT', '12Q_HIGH_CONGRUENCE']
          },
          Need: {
            titleEn: 'The Sacred Boundary Guardian',
            titleId: 'Penjaga Suaka Batasan Diri',
            archetypeEn: 'Protector of Somatic Sanctuary',
            archetypeId: 'Pelindung Ruang Kedamaian Batin',
            descEn: 'Your soul calls for the 5th tier: Sacred Need & Somatic Boundaries. You are learning to fiercely protect your energy, embrace quiet vulnerability, and honor rest without guilt or over-explaining.',
            descId: 'Jiwa Anda memanggil tingkatan ke-5: Kebutuhan Hakiki & Batasan Somatik. Anda sedang belajar melindungi energi Anda secara teguh, memeluk kerapuhan dengan kasih, dan beristirahat tanpa rasa bersalah.',
            guidanceEn: `Drape yourself in ${resultProduct.name} whenever feeling overextended. Practice saying compassionate 'no' to non-essential demands to preserve your energetic sanctuary.`,
            guidanceId: `Balut diri Anda dengan ${resultProduct.name} setiap kali merasa lelah. Praktikkan berkata 'tidak' dengan santun pada hal-hal yang menguras energi demi menjaga suaka batin Anda.`,
            crystals: [CRYSTALS[5], CRYSTALS[0], CRYSTALS[4]], // Moonstone, Rose Quartz, Smoky Quartz
            reasonCodes: ['L5_BOUNDARY_PROTECTION', 'SOMATIC_SAFETY_NEED', 'SELF_COMPASSION_KEY', '12Q_HIGH_CONGRUENCE']
          },
          Emotion: {
            titleEn: 'The Sacred Heart Nurturer',
            titleId: 'Sang Pemelihara Kelembutan Hati',
            archetypeEn: 'Radiant Empath of Tender Equilibrium',
            archetypeId: 'Penenang Hati & Harmoni Relasional',
            descEn: 'Your soul moves through the 4th tier: Emotional Heart & Resilience. You process life through deep feeling and relational nuance, requiring soft, nurturing aromatic comfort to soothe accumulated holding patterns.',
            descId: 'Jiwa Anda bergerak dalam tingkatan ke-4: Keseimbangan Emosi & Kelembutan Hati. Anda memproses hidup melalui kedalaman rasa, membutuhkan kehangatan aroma lembut yang membalut kerapuhan dengan kasih sayang.',
            guidanceEn: `Incorporate ${resultProduct.name} during evening tea. Place a warm hand over your heart space, take 4 slow breaths, and release the weight of emotional expectations.`,
            guidanceId: `Gunakan ${resultProduct.name} saat menikmati teh sore. Letakkan tangan hangat di dada, tarik 4 napas perlahan, dan lepaskan seluruh beban ekspektasi emosional.`,
            crystals: [CRYSTALS[0], CRYSTALS[5], CRYSTALS[1]], // Rose Quartz, Moonstone, Amethyst
            reasonCodes: ['L4_HEART_EQUILIBRIUM', 'TENDER_EMOTION_BALANCE', 'RELATIONAL_NURTURE', '12Q_HIGH_CONGRUENCE']
          },
          Mindset: {
            titleEn: 'The Clear Horizon Disciple',
            titleId: 'Sang Penjernih Cakrawala Pikiran',
            archetypeEn: 'Master of Cognitive Stillness & Discernment',
            archetypeId: 'Pengurai Beban Pikiran & Penemu Keheningan',
            descEn: 'Your soul seeks the 3rd tier: Mindset Clarity & Narrative Freedom. You value quiet cognitive space, deep mental focus, and crisp woody notes that disperse internal noise and overthinking.',
            descId: 'Jiwa Anda mencari tingkatan ke-3: Kejernihan Pola Pikir & Dialog Batin. Anda menjunjung tinggi ruang hening pikiran, fokus mental mendalam, dan wewangian kayu jernih yang mengurai overthinking.',
            guidanceEn: `Apply ${resultProduct.name} to wrists before deep focus sessions. Engage in 5 minutes of digital-free stream-of-consciousness journaling every morning.`,
            guidanceId: `Oleskan ${resultProduct.name} di pergelangan tangan sebelum bekerja fokus. Tuliskan 5 menit refleksi bebas tanpa gawai di pagi hari untuk menjernihkan ruang pikiran.`,
            crystals: [CRYSTALS[1], CRYSTALS[2], CRYSTALS[4]], // Amethyst, Clear Quartz, Smoky Quartz
            reasonCodes: ['L3_MINDSET_DISCERNMENT', 'COGNITIVE_CALM_FOCUS', 'OVERTHINKING_RELEASE', '12Q_HIGH_CONGRUENCE']
          },
          Energy: {
            titleEn: 'The Vital Alchemist',
            titleId: 'Sang Penyelaras Vitalitas Hidup',
            archetypeEn: 'Awakened Morning Catalyst & Restorer',
            archetypeId: 'Pembangkit Energi Alami & Irama Sirkadian',
            descEn: 'Your soul thrives in the 2nd tier: Energetic Vitality & Circadian Harmony. You are revitalized by fresh botanicals, crisp ozonic mists, and rhythmic breathwork that balances physical stamina.',
            descId: 'Jiwa Anda bertumbuh dalam tingkatan ke-2: Vitalitas Energi & Irama Sirkadian. Anda dipulihkan oleh botani segar, embun aromatik ozonik, dan latihan pernapasan ritmis yang menjaga stamina alami.',
            guidanceEn: `Mist ${resultProduct.name} across your face and collarbones upon waking. Pair with 4 rounds of box breathing (4s inhale, 4s hold, 4s exhale, 4s hold) in natural sunlight.`,
            guidanceId: `Semprotkan ${resultProduct.name} ke wajah dan tulang selangka saat bangun tidur. Padukan dengan 4 putaran napas kotak (4d tarik, 4d tahan, 4d hembus, 4d tahan) di bawah sinar matahari pagi.`,
            crystals: [CRYSTALS[3], CRYSTALS[2], CRYSTALS[4]], // Citrine, Clear Quartz, Smoky Quartz
            reasonCodes: ['L2_CIRCADIAN_VITALITY', 'NERVOUS_SYSTEM_RESET', 'BREATH_OXYGENATION', '12Q_HIGH_CONGRUENCE']
          },
          Behavior: {
            titleEn: 'The Grounded Foundation Master',
            titleId: 'Sang Pembangun Fondasi Suci',
            archetypeEn: 'Architect of Sacred Daily Presence',
            archetypeId: 'Penegak Ritual Nyata & Penjangkar Bumi',
            descEn: 'Your soul is anchored in the 1st tier: Somatic Behavior & Environmental Foundation. You find profound transformation through tangible daily rituals, clean space curation, and consistent grounding habits.',
            descId: 'Jiwa Anda berakar pada tingkatan ke-1: Fondasi Somatik & Perilaku Nyata. Anda menemukan transformasi melalui kebiasaan kecil yang berkesadaran, penataan ruang suci, dan konsistensi hening.',
            guidanceEn: `Establish an unbroken evening sanctuary habit with ${resultProduct.name}. Cleanse your physical space, dim harsh lights, and signal your body into restorative stillness.`,
            guidanceId: `Bangun rutinitas malam yang tak terputus bersama ${resultProduct.name}. Rapikan ruang hening Anda, redupkan lampu, dan beri isyarat pada tubuh untuk masuk ke istirahat restoratif.`,
            crystals: [CRYSTALS[4], CRYSTALS[2], CRYSTALS[3]], // Smoky Quartz, Clear Quartz, Citrine
            reasonCodes: ['L1_HABIT_FOUNDATION', 'SOMATIC_BEDROCK_STABILITY', 'ENVIRONMENT_HARMONY', '12Q_HIGH_CONGRUENCE']
          }
        };

        const activeProfile = profiles[dominant] || profiles.Identity;

        const customResult: ScentAssessmentResult = {
          dominantLayer: dominant,
          title: lang === 'id' ? activeProfile.titleId : activeProfile.titleEn,
          titleId: activeProfile.titleId,
          archetype: lang === 'id' ? activeProfile.archetypeId : activeProfile.archetypeEn,
          essenceDescription: activeProfile.descEn,
          essenceDescriptionId: activeProfile.descId,
          recommendedFragrance: resultProduct,
          crystalTrinity: activeProfile.crystals,
          reasonCodes: activeProfile.reasonCodes,
          ritualGuidance: lang === 'id' ? activeProfile.guidanceId : activeProfile.guidanceEn,
          layerScores: newScores
        };

        onComplete(customResult);
      }
    }, 320);
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      soundEngine.playSoftClick();
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#291714]/65 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FAF3EE] border border-[#BDA494]/40 rounded-3xl max-w-2xl w-full p-6 md:p-10 shadow-2xl space-y-7 animate-fadeIn relative max-h-[92vh] overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5B4750] animate-ping" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#78555d]">
              {lang === 'id' ? `Analisis Jiwa 7-Lapisan • Pertanyaan ${currentStep + 1} dari ${totalSteps}` : `7-Layer Soul Assessment • Question ${currentStep + 1} of ${totalSteps}`}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7f7478] hover:text-[#433139] hover:bg-[#F2E9E5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Minimalist Progress Line with Step Counter */}
        <div className="space-y-1.5">
          <div className="w-full h-1.5 bg-[#F2E9E5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5B4750] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-[#78555d]">
            <span>{Math.round(progressPercent)}% {lang === 'id' ? 'Terselesaikan' : 'Completed'}</span>
            <span>{totalSteps - (currentStep + 1)} {lang === 'id' ? 'pertanyaan tersisa' : 'remaining'}</span>
          </div>
        </div>

        {/* Question Header & Prompt */}
        <div className="space-y-2.5">
          <div className="inline-block px-3 py-1 rounded-full bg-[#F2E9E5] border border-[#BDA494]/30 text-[11px] font-bold text-[#5B4750] uppercase tracking-wider">
            {lang === 'id' ? currentQ.taglineId : currentQ.taglineEn}
          </div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-[26px] text-[#433139] leading-snug font-semibold">
            {lang === 'id' ? currentQ.promptId : currentQ.promptEn}
          </h2>
        </div>

        {/* Choice Cards (12 High-Quality Questions) */}
        <div className="space-y-3">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentStep] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex items-start justify-between gap-4 group ${
                  isSelected
                    ? 'bg-[#F2E9E5] border-[#5B4750] shadow-xs scale-[1.01]'
                    : 'bg-[#ffffff] border-[#BDA494]/40 hover:border-[#5B4750]/60 hover:bg-[#F7F1EE]'
                }`}
              >
                <div className="space-y-1">
                  <p className="font-serif text-sm sm:text-base md:text-lg font-semibold text-[#433139] group-hover:text-[#5B4750]">
                    {lang === 'id' ? option.labelId : option.labelEn}
                  </p>
                  <p className="text-xs text-[#7f7478] leading-relaxed">
                    {lang === 'id' ? option.descriptionId : option.descriptionEn}
                  </p>
                </div>
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                  isSelected ? 'bg-[#5B4750] border-[#5B4750] text-[#FAF3EE]' : 'border-[#BDA494]/60 bg-transparent'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Quick Stepper Bar */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap pt-2">
          {Array.from({ length: totalSteps }).map((_, stepIdx) => (
            <button
              key={stepIdx}
              onClick={() => {
                if (stepIdx <= selectedAnswers.length) {
                  soundEngine.playSoftClick();
                  setCurrentStep(stepIdx);
                }
              }}
              className={`h-1.5 rounded-full transition-all ${
                stepIdx === currentStep 
                  ? 'w-6 bg-[#5B4750]' 
                  : stepIdx < selectedAnswers.length 
                  ? 'w-3 bg-[#3D6852]/70 hover:w-4' 
                  : 'w-2 bg-[#BDA494]/40'
              }`}
              title={`Question ${stepIdx + 1}`}
            />
          ))}
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#BDA494]/20">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${
              currentStep === 0 ? 'text-[#BDA494] cursor-not-allowed' : 'text-[#5B4750] hover:underline'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'id' ? 'Pertanyaan Sebelumnya' : 'Previous Question'}</span>
          </button>

          <span className="text-xs text-[#7f7478]">
            {lang === 'id' ? 'Estimasi: ~90 detik refleksi' : 'Estimated: ~90s reflection'}
          </span>
        </div>

      </div>
    </div>
  );
};
