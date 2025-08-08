import { render } from 'preact';

import './style.css';
import { useExerciseLog } from './hooks/useExerciseLog';
import { today, todayFormatted } from './lib/dates';
import { createLogForToday } from './lib/exerciseLogService.js';
import { useExercises } from './hooks/useExercises';
import { createExercise, toggleExercise } from './lib/exerciseService';
import { computed, useSignal } from '@preact/signals';

export function App() {

  return (
    <div>
      <h1>Rehab</h1>
      <>
        {todayFormatted()}
      </>
      <ExerciseLog />
    </div >
  );
}

function ExerciseLog() {
  const { exerciseLog, loading: loadingLog, notFound } = useExerciseLog(today())

  const loading = loadingLog.value

  return <div>
    {notFound && <NoLog />}
    {loading ? <div>loading</div> : <>
      {exerciseLog.value && <section>
        <ExerciseList log={exerciseLog.value} />
      </section>}
      <section>
        <ExerciseForm log={exerciseLog.value} />
      </section>
    </>}
  </div>
}

function ExerciseList({ log }) {
  const { exercises } = useExercises()

  return <div class="exercise-list">
    {exercises.value?.map(e => <Exercise exercise={e} log={log} key={e.id} />)}
  </div>
}

function NoLog() {
  const onSubmit = e => {
    e.preventDefault();
    createLogForToday()
  };

  return <div>
    <form onSubmit={onSubmit}>
      <button>
        Create log
      </button>
    </form>
  </div>
}

function Exercise({ exercise, log }) {
  const isChecked = computed(() => log?.exercises?.find(x => x === exercise.id))
  const checked = useSignal(isChecked.value != null)
  const onSubmit = e => {
    e.preventDefault();

    console.log("HEJ", exercise)
    toggleExercise(exercise)

    checked.value = !checked.value
  };

  return <div class="exercise-wrapper" key={exercise.id}>
    <p>
      {exercise.name}
    </p>
    {checked.value}
    <p>
      {checked.value ? <span>y</span> : <span></span>}
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
