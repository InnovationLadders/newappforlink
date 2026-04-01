import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface AppConfig {
  appName: string;
  targetUrl: string;
  logoPath: string;
  splashDuration: number;
  loadingText: string;
}

function App() {
  const [config, setConfig] = useState<AppConfig | null>(null);

  useEffect(() => {
    fetch('/config.json')
      .then(res => res.json())
      .then((data: AppConfig) => {
        setConfig(data);

        setTimeout(() => {
          window.location.href = data.targetUrl;
        }, data.splashDuration);
      })
      .catch(err => {
        console.error('Failed to load config:', err);
      });
  }, []);

  if (!config) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="text-center">
        <div className="mb-8 flex justify-center">
          <img
            src={config.logoPath}
            alt={config.appName}
            className="w-48 h-48 object-contain drop-shadow-lg"
          />
        </div>

        <div className="flex justify-center mb-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        </div>

        <p className="text-xl font-semibold text-gray-700">
          {config.loadingText}
        </p>
      </div>
    </div>
  );
}

export default App;
