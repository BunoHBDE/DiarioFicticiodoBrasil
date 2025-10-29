import React, { useState, useEffect, useRef } from 'react';
import { Article } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import ArticleCard from './components/ArticleCard';
import AccessibilityButton from './components/AccessibilityButton';
import AccessibilityMenu from './components/AccessibilityMenu';
import VoiceIndicator from './components/VoiceIndicator';

// Fix: Add type declarations for the Web Speech API to resolve TypeScript errors.
// The browser-specific SpeechRecognition API is not part of the standard TypeScript DOM library.
interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const staticNewsData = {
  mainArticle: {
    headline: "BossaChip: A Revolução dos Semicondutores com DNA Brasileiro",
    category: "Tecnologia",
    summary: "Startup de Campinas anuncia o desenvolvimento do primeiro processador de 3nm totalmente projetado no Brasil, prometendo revolucionar a indústria de tecnologia nacional.",
    body: "Em um marco para a tecnologia brasileira, a BossaChip, uma startup sediada em Campinas, revelou hoje o 'Sabiá-1', o primeiro microprocessador de 3 nanômetros com design 100% nacional. O projeto, que durou cinco anos e envolveu parcerias com universidades federais, coloca o Brasil em um seleto grupo de países capazes de desenvolver semicondutores de ponta.\n\nO Sabiá-1 é focado em aplicações de inteligência artificial e processamento de dados em nuvem, com uma arquitetura que prioriza a eficiência energética. Segundo a CEO da BossaChip, a produção em larga escala deve começar em 2026, com o potencial de reduzir a dependência do país de componentes importados e impulsionar a soberania tecnológica.",
    imageUrl: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1920&auto=format&fit=crop",
  },
  otherArticles: [
    {
      headline: "Amazônia Azul: Expedição Mapeia Novos Recifes de Coral na Costa Nordestina",
      category: "Nacional",
      summary: "Cientistas a bordo do navio oceanográfico 'Vital Brazil' descobrem ecossistemas marinhos desconhecidos, com potencial para novas espécies.",
      body: "Uma expedição do Instituto Oceanográfico da USP revelou a existência de vastos recifes de coral em águas profundas na costa do Rio Grande do Norte. A área, apelidada de 'Recifes Potiguares', abriga uma biodiversidade surpreendente, incluindo possíveis novas espécies de peixes e crustáceos. O mapeamento é crucial para a proteção da chamada 'Amazônia Azul'.",
      imageUrl: "https://assets.brasildefato.com.br/2024/09/image_processing20230228-32601-zuz0gt.jpeg",
    },
    {
      headline: "Com Virada Histórica, Clube de Regatas Tietê Vence a Copa do Brasil",
      category: "Esportes",
      summary: "Após estar perdendo por dois gols, time paulistano reage no segundo tempo e conquista título inédito nos pênaltis.",
      body: "Em uma final emocionante no Maracanã, o Clube de Regatas Tietê sagrou-se campeão da Copa do Brasil pela primeira vez. A equipe, que perdia para o Grêmio por 2 a 0, buscou o empate nos minutos finais e garantiu a vitória nas cobranças de pênaltis, para a alegria de sua torcida.",
      imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=800&auto=format&fit=crop",
    },
    {
      headline: "Banco Central Lança Moeda Digital 'Real-D' em Fase de Testes",
      category: "Economia",
      summary: "Programa piloto do Real Digital começa a operar com grandes bancos para testar a nova plataforma de transações tokenizadas.",
      body: "O Banco Central do Brasil deu início à fase de testes do 'Real-D', a versão digital da moeda brasileira. Nesta etapa inicial, transações simuladas serão realizadas entre grandes instituições financeiras para avaliar a segurança e a escalabilidade da plataforma, que promete modernizar o sistema financeiro nacional.",
      imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=800&auto=format&fit=crop",
    },
    {
      headline: "Bienal do Livro de SP Bate Recorde de Público com Foco em Autores Independentes",
      category: "Cultura",
      summary: "Evento encerra com mais de 700 mil visitantes e destaca a força do mercado editorial independente no país.",
      body: "A 27ª Bienal Internacional do Livro de São Paulo fechou suas portas no último domingo com números recordes. O evento deste ano se destacou por dar um espaço inédito a autores e editoras independentes, refletindo uma mudança no mercado e o desejo do público por novas vozes na literatura.",
      imageUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop",
    },
    {
      headline: "Satélite Brasileiro CBERS-5 Entra em Órbita com Sucesso",
      category: "Internacional",
      summary: "Lançado da base de Alcântara, novo satélite sino-brasileiro irá monitorar desmatamento e expansão agrícola.",
      body: "O CBERS-5, mais novo fruto da parceria entre Brasil e China, foi lançado com sucesso nesta madrugada. O satélite de sensoriamento remoto fornecerá imagens de alta resolução que serão vitais para o monitoramento ambiental da Amazônia e para o planejamento da agricultura de precisão no país.",
      imageUrl: "https://s2-g1.glbimg.com/bkgk5FsY3mw-GL9mz26jAG4pYD4=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/j/a/ftwQM6QzSbVkjCzIDdmQ/009.jpg",
    },
    {
      headline: "Filme 'Sertão Veredas' é Premiado no Festival de Cinema de Berlim",
      category: "Cultura",
      summary: "Longa-metragem dirigido por Ana Jobim leva o Urso de Prata por sua fotografia inovadora.",
      body: "O cinema brasileiro foi mais uma vez aclamado internacionalmente. 'Sertão Veredas', uma adaptação moderna da obra de Guimarães Rosa, foi premiado no prestigiado Festival de Berlim. A diretora de fotografia, Lúcia Murat, recebeu o Urso de Prata, consolidando a força da produção audiovisual do país.",
      imageUrl: "https://s2-oglobo.glbimg.com/PLWPIxr8QfHkKfyXNIypgPOs5M0=/0x0:5120x3413/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_da025474c0c44edd99332dddb09cabe8/internal_photos/bs/2024/s/p/QvXO6OQhuKvlLPAmfzcw/creditos-helena-barreto-1-.jpg",
    },
  ]
};

const VOICE_COMMANDS = [
  "Subir página / Rolar para cima",
  "Descer página / Rolar para baixo",
  "Voltar página",
  "Avançar página",
  "Abrir menu de acessibilidade",
  "Fechar menu de acessibilidade",
  "Ativar leitura com som",
  "Desativar leitura com som",
  "Mostrar ajuste de fonte",
  "Esconder ajuste de fonte",
];

type VoiceStatus = 'idle' | 'listening' | 'processing' | 'error';

const App: React.FC = () => {
  const [mainArticle] = useState<Article | null>(staticNewsData.mainArticle);
  const [otherArticles] = useState<Article[]>(staticNewsData.otherArticles);
  const [isAccessibilityMenuOpen, setIsAccessibilityMenuOpen] = useState(false);
  
  const [fontSizeMultiplier, setFontSizeMultiplier] = useState(1);
  const [fontWeight, setFontWeight] = useState(400);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [isHighContrast, setIsHighContrast] = useState(false);

  const [isReadAloudActive, setIsReadAloudActive] = useState(false);
  const [focusedElementId, setFocusedElementId] = useState<string | null>(null);

  // States for Voice Navigation
  const [isVoiceNavigationActive, setIsVoiceNavigationActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const resetFontSettings = () => {
    setFontSizeMultiplier(1);
    setFontWeight(400);
    setLetterSpacing(0);
  };
  
  const fontStyle = {
    '--font-size-multiplier': fontSizeMultiplier,
    '--font-weight-base': fontWeight,
    '--letter-spacing-base': `${letterSpacing}em`,
  } as React.CSSProperties;

  const toggleHighContrast = () => setIsHighContrast(prev => !prev);

  useEffect(() => {
    if (!isReadAloudActive) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      const readableElements = Array.from(document.querySelectorAll('.readable-content')) as HTMLElement[];
      if (readableElements.length === 0) return;
      const currentIndex = readableElements.findIndex(el => el.id === focusedElementId);
      let nextIndex;
      if (event.key === 'ArrowDown') {
        nextIndex = currentIndex >= 0 ? (currentIndex + 1) % readableElements.length : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : readableElements.length - 1;
      }
      const nextElement = readableElements[nextIndex];
      if (nextElement) {
        nextElement.focus({ preventScroll: false });
        setFocusedElementId(nextElement.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReadAloudActive, focusedElementId]);


  useEffect(() => {
    if (!isReadAloudActive || !focusedElementId) {
        speechSynthesis.cancel();
        return;
    };
    const element = document.getElementById(focusedElementId);
    if (element) {
        const textToRead = element.innerText;
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.lang = 'pt-BR';
        speechSynthesis.cancel();
        speechSynthesis.speak(utterance);
    }
  }, [focusedElementId, isReadAloudActive]);

  const toggleReadAloud = () => {
    const shouldBeActive = !isReadAloudActive;
    setIsReadAloudActive(shouldBeActive);

    if (!shouldBeActive) {
      speechSynthesis.cancel();
      if (focusedElementId) {
        const currentElement = document.getElementById(focusedElementId);
        currentElement?.blur();
      }
      setFocusedElementId(null);
    }
  };

  // --- Voice Navigation Logic ---
  const handleVoiceCommand = (command: string) => {
    const normalizedCommand = command.toLowerCase().trim();
    console.log(`Comando recebido: "${normalizedCommand}"`);
    setVoiceStatus('processing');

    let commandRecognized = true;
    if (normalizedCommand.includes('subir página') || normalizedCommand.includes('rolar para cima')) {
        window.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
    } else if (normalizedCommand.includes('descer página') || normalizedCommand.includes('rolar para baixo')) {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    } else if (normalizedCommand.includes('voltar página')) {
        window.history.back();
    } else if (normalizedCommand.includes('avançar página')) {
        window.history.forward();
    } else if (normalizedCommand.includes('abrir menu de acessibilidade')) {
        setIsAccessibilityMenuOpen(true);
    } else if (normalizedCommand.includes('fechar menu de acessibilidade')) {
        setIsAccessibilityMenuOpen(false);
    } else if (normalizedCommand.includes('ativar leitura com som')) {
        if (!isReadAloudActive) toggleReadAloud();
    } else if (normalizedCommand.includes('desativar leitura com som')) {
        if (isReadAloudActive) toggleReadAloud();
    } else if (normalizedCommand.includes('mostrar ajuste de fonte')) {
        // This is handled inside AccessibilityMenu now
        document.getElementById('font-adjuster-toggle')?.click();
    } else if (normalizedCommand.includes('esconder ajuste de fonte')) {
        // This is handled inside AccessibilityMenu now
        document.getElementById('font-adjuster-toggle')?.click();
    }
    else {
        commandRecognized = false;
        setVoiceStatus('error');
    }

    if (commandRecognized) {
      setTimeout(() => {
        if(isVoiceNavigationActive) setVoiceStatus('listening');
      }, 1000);
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("API de Reconhecimento de Fala não é suportada neste navegador.");
      if (isVoiceNavigationActive) setVoiceStatus('error');
      return;
    }

    if (isVoiceNavigationActive) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'pt-BR';
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setVoiceStatus('listening');
      };

      recognitionRef.current.onresult = (event) => {
        const command = event.results[event.resultIndex][0].transcript;
        handleVoiceCommand(command);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Erro no reconhecimento de fala:', event.error);
        setVoiceStatus('error');
      };

      recognitionRef.current.onend = () => {
        // Automatically restart listening if still active
        if (isVoiceNavigationActive) {
          try {
            recognitionRef.current?.start();
          } catch(e) {
            // It might fail if it's already started, which is fine.
          }
        } else {
          setVoiceStatus('idle');
        }
      };

      recognitionRef.current.start();

    } else {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
      setVoiceStatus('idle');
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, [isVoiceNavigationActive]);


  const toggleVoiceNavigation = () => {
    setIsVoiceNavigationActive(prev => !prev);
  };


  return (
    <>
      <div
        className="fixed inset-0 bg-black transition-opacity duration-300 pointer-events-none z-[99]"
        style={{ opacity: (100 - brightness) / 100 }}
        aria-hidden="true"
      />
      <div className="min-h-screen bg-gray-200 font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        <div 
          className={`w-full max-w-7xl bg-paper shadow-2xl transition-all duration-300 ${isHighContrast ? 'high-contrast' : ''}`}
          style={fontStyle}
        >
          <Header />
          <div className="p-4 sm:p-6">
            <main>
              {mainArticle && (
                <div>
                  <ArticleCard article={mainArticle} isMain={true} baseId="main-article" />
                  <hr className="my-6 sm:my-8 border-t-2 border-gray-300"/>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {otherArticles.map((article, index) => (
                      <ArticleCard key={index} article={article} baseId={`article-${index}`} />
                    ))}
                  </div>
                </div>
              )}
            </main>
          </div>
          <Footer />
        </div>
        <AccessibilityButton onClick={() => setIsAccessibilityMenuOpen(true)} />
        <AccessibilityMenu 
          isOpen={isAccessibilityMenuOpen} 
          onClose={() => setIsAccessibilityMenuOpen(false)}
          fontSettings={{
            fontSizeMultiplier,
            fontWeight,
            letterSpacing,
          }}
          fontSetters={{
            setFontSizeMultiplier,
            setFontWeight,
            setLetterSpacing,
            resetFontSettings,
          }}
          brightness={brightness}
          setBrightness={setBrightness}
          isReadAloudActive={isReadAloudActive}
          toggleReadAloud={toggleReadAloud}
          isVoiceNavigationActive={isVoiceNavigationActive}
          toggleVoiceNavigation={toggleVoiceNavigation}
          voiceCommands={VOICE_COMMANDS}
          isHighContrast={isHighContrast}
          toggleHighContrast={toggleHighContrast}
        />
        <VoiceIndicator status={voiceStatus} />
      </div>
    </>
  );
};

export default App;