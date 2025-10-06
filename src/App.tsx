import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CopilotKit } from "@copilotkit/react-core";
import "@copilotkit/react-ui/styles.css";
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import LiveMonitor from './pages/LiveMonitor';
import AuditLogs from './pages/AuditLogs';
import Violations from './pages/Violations';
import Agents from './pages/Agents';
import Settings from './pages/Settings';
import Health from './pages/Health';
import { API_URLS } from './config/api';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get active tab from URL path
  const getActiveTabFromPath = (pathname: string) => {
    const path = pathname.slice(1); // Remove leading slash
    return path || 'dashboard';
  };

  const activeTab = getActiveTabFromPath(location.pathname);

  const handleTabChange = (tab: string) => {
    navigate(`/${tab === 'dashboard' ? '' : tab}`);
  };

  return (
    <CopilotKit
      runtimeUrl={API_URLS.copilotkit}
      publicApiKey={import.meta.env.VITE_COPILOTKIT_PUBLIC_API_KEY || "ck_pub_a21c9b4bd5dbd3edd0c9e4edbded8100"}
      showDevConsole={import.meta.env.VITE_APP_ENV === 'development'}
    >
      <div className="flex flex-col h-screen bg-white">
        
        <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
        
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/monitor" element={<LiveMonitor />} />
                <Route path="/audit" element={<AuditLogs />} />
                <Route path="/logs" element={<AuditLogs />} />
                <Route path="/violations" element={<Violations />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/health" element={<Health />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
        </div>
      </div>
    </CopilotKit>
  );
}

export default App;