import { useState, useEffect } from 'preact/hooks';
import { getExercises } from '../lib/exerciseService.js';

export const useExercises = () => {
  const [exercises, setExercises] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLog = async () => {
      setLoading(true);
      setError(null);
      try {
        const exercises = await getExercises();
        setExercises(exercises);
      } catch (err) {
        setError(err);
        setExercises(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLog();
  }, []);

  return { exercises, loading, error };
};
