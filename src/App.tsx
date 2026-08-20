import { useState } from 'react';
import { I18nProvider } from './i18n';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { MainMenu } from './components/MainMenu';
import { MyPlayers } from './components/MyPlayers';
import { Shop } from './components/Shop';
import { PlayScreen } from './components/PlayScreen';
import { CreationWizard } from './components/creation/CreationWizard';
import { loadCareers, saveCareer, updateCareer } from './lib/storage';
import type { CareerRecord } from './types';

type Screen = 'menu' | 'players' | 'shop' | 'create' | 'play';

function AppContent() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [careers, setCareers] = useState<CareerRecord[]>(() => loadCareers());
  const [activeCareerId, setActiveCareerId] = useState<string | null>(null);

  const activeCareer = careers.find((c) => c.id === activeCareerId) ?? null;

  return (
    <>
      <LanguageSwitcher />

      {screen === 'menu' && <MainMenu onNavigate={setScreen} />}

      {screen === 'players' && (
        <MyPlayers
          careers={careers}
          onBack={() => setScreen('menu')}
          onCreate={() => setScreen('create')}
          onSelect={(id) => {
            setActiveCareerId(id);
            setScreen('play');
          }}
        />
      )}

      {screen === 'shop' && <Shop onBack={() => setScreen('menu')} />}

      {screen === 'create' && (
        <CreationWizard
          onCancel={() => setScreen('menu')}
          onComplete={(record) => {
            setCareers(saveCareer(record));
            setActiveCareerId(record.id);
          }}
          onDone={(target) => setScreen(target)}
        />
      )}

      {screen === 'play' && activeCareer && (
        <PlayScreen
          career={activeCareer}
          onUpdate={(record) => setCareers(updateCareer(record))}
          onBack={() => setScreen('menu')}
        />
      )}
    </>
  );
}

function App() {
  return (
    <I18nProvider>
      <AppContent />
    </I18nProvider>
  );
}

export default App;
