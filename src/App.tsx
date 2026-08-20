import { useState } from 'react';
import { I18nProvider } from './i18n';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { MainMenu } from './components/MainMenu';
import { MyPlayers } from './components/MyPlayers';
import { Shop } from './components/Shop';
import { CreationWizard } from './components/creation/CreationWizard';
import { loadCareers, saveCareer } from './lib/storage';
import type { CareerRecord } from './types';

type Screen = 'menu' | 'players' | 'shop' | 'create';

function AppContent() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [careers, setCareers] = useState<CareerRecord[]>(() => loadCareers());

  return (
    <>
      <LanguageSwitcher />

      {screen === 'menu' && <MainMenu onNavigate={setScreen} />}

      {screen === 'players' && (
        <MyPlayers careers={careers} onBack={() => setScreen('menu')} onCreate={() => setScreen('create')} />
      )}

      {screen === 'shop' && <Shop onBack={() => setScreen('menu')} />}

      {screen === 'create' && (
        <CreationWizard
          onCancel={() => setScreen('menu')}
          onComplete={(record) => setCareers(saveCareer(record))}
          onDone={(target) => setScreen(target)}
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
