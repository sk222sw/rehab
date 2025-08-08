import { useEffect } from 'preact/hooks';
import { getExercises } from '../lib/exerciseService.js';
import { useSignal } from '@preact/signals';

export const useExercises = () => {
  const exercises = useSignal(null);
  const loading = useSignal(false);
  const error = useSignal(null);

  useEffect(() => {
    const fetchLog = async () => {
      loading.value = true;
      error.value = null;
      try {
        const exerciseList = await getExercises();
        exercises.value = exerciseList;
      } catch (err) {
        error.value = err;
        exercises.value = null;
      } finally {
        loading.value = false;
      }
    };

    fetchLog();
  }, []);

  return { exercises, loading, error };
};
