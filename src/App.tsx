import { CareerSummary } from './components/CareerSummary';
import { CharacterCreation } from './components/CharacterCreation';
import { Dashboard } from './components/Dashboard';
import { SeasonBanner } from './components/SeasonBanner';
import { useGame } from './game/useGame';

function App() {
  const { state, start, act, dismissBanner, restart } = useGame();

  if (!state) {
    return <CharacterCreation onStart={start} />;
  }

  if (state.retired) {
    return <CareerSummary state={state} onRestart={restart} />;
  }

  return (
    <>
      <Dashboard state={state} onAct={act} />
      {state.seasonBanner && (
        <SeasonBanner result={state.seasonBanner} onClose={dismissBanner} />
      )}
    </>
  );
}

export default App;
