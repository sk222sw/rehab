import { render } from 'preact';

import './style.css';
import { useExerciseLog } from './hooks/useExerciseLog';
import { today, todayFormatted } from './lib/dates';
import { createLogForToday } from './lib/exerciseLogService.js';
import { useExercises } from './hooks/useExercises';
import { createExercise, toggleExercise } from './lib/exerciseService';
import { useState } from 'preact/hooks';

export function App() {
  const { exerciseLog } = useExerciseLog(today())
  console.log('log', exerciseLog)
  const { exercises } = useExercises()
  console.log('exercises', exercises)
  return (
    <div>
      <h1>Rehab</h1>
      <>
        {todayFormatted()}
      </>
      {exerciseLog && <section>
        <div class="exercise-list">
          {exercises?.map(e => <Exercise exercise={e} log={exerciseLog} key={e.id} />)}
        </div>
      </section>}
      <section>
        <ExerciseForm log={exerciseLog} />
      </section>
    </div >
  );
}

function Exercise({ exercise, log }) {
  const isChecked = log?.exercises.find(x => x === exercise.id)
  const [checked, setChecked] = useState(isChecked != null)
  const onSubmit = e => {
    e.preventDefault();

    toggleExercise(exercise)

    setChecked(x => !x)
  };

  return <div class="exercise-wrapper" key={exercise.id}>
    <p>
      {exercise.name}
    </p>
    <p>
      {checked ? <span>y</span> : <span></span>}
    </p>
    <form onSubmit={onSubmit}>
      <button >
        Check
      </button>
    </form>
  </div>
}

function ExerciseForm({ log }) {
  const onSubmit = e => {
    e.preventDefault();

    if (log == null) {
      createLogForToday()
    }

    const formData = new FormData(e.currentTarget);
    const name = formData.get("exercise")

    createExercise(name)

    e.currentTarget.reset();
  };

  return (
    <div class="form-example">
      <form onSubmit={onSubmit}>
        <label>
          Övning: <input name="exercise" />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}



render(<App />, document.getElementById('app'));
