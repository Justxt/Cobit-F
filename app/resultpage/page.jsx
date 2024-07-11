import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';

const ResultPage = () => {
  const router = useRouter();
  const [results, setResults] = useState(null);

  useEffect(() => {
    // Obtenemos los resultados desde el query params al cargar la página
    const { results } = router.query;
    if (results) {
      setResults(JSON.parse(results));
    }
  }, [router.query]);

  if (!results) {
    return <div>Cargando resultados...</div>;
  }

  return (
    <div>
      <h1>Resultados</h1>
      <pre>{JSON.stringify(results, null, 2)}</pre>
    </div>
  );
};

export default ResultPage;
