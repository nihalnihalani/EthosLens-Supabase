import { useEffect, useState } from 'react';
import { Database, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { getSupabaseStatus } from '../config/supabase';

interface StatusInfo {
  connected: boolean;
  url?: string;
  timestamp: string;
  checking: boolean;
}

export default function SupabaseStatus() {
  const [status, setStatus] = useState<StatusInfo>({
    connected: false,
    timestamp: new Date().toISOString(),
    checking: true
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const statusInfo = await getSupabaseStatus();
        setStatus({
          ...statusInfo,
          checking: false
        });
      } catch (error) {
        setStatus({
          connected: false,
          timestamp: new Date().toISOString(),
          checking: false
        });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (status.checking) return 'text-yellow-500';
    return status.connected ? 'text-green-500' : 'text-red-500';
  };

  const getStatusIcon = () => {
    if (status.checking) return <AlertCircle className="w-4 h-4" />;
    return status.connected ? (
      <CheckCircle className="w-4 h-4" />
    ) : (
      <XCircle className="w-4 h-4" />
    );
  };

  const getStatusText = () => {
    if (status.checking) return 'Checking...';
    return status.connected ? 'Connected' : 'Disconnected';
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-slate-800 rounded-lg border border-slate-700">
      <Database className="w-4 h-4 text-slate-400" />
      <span className="text-sm text-slate-300">Supabase:</span>
      <div className={`flex items-center gap-1 ${getStatusColor()}`}>
        {getStatusIcon()}
        <span className="text-xs font-medium">{getStatusText()}</span>
      </div>
      {!status.checking && !status.connected && (
        <div className="text-xs text-red-400 ml-2">
          Check your configuration
        </div>
      )}
    </div>
  );
}
