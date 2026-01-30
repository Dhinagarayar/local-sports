import React, { useState, useEffect } from 'react';
import { UserCircle2, Bell, ShieldCheck, LogOut, Settings } from 'lucide-react';
import { Game, GameStatus, UserRole, Notification, UserProfile, District, AuthStep } from './types';
import { INITIAL_GAMES, INITIAL_NOTIFICATIONS, INITIAL_STATES, INITIAL_DISTRICTS } from './constants';
import { Button } from './components/Button';
import { GameCard } from './components/GameCard';
import { CreateGameModal } from './components/CreateGameModal';
import { JoinLeagueModal } from './components/JoinLeagueModal';
import { UserProfileModal } from './components/UserProfileModal';
import { BottomNav, Screen } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { OrganizerDashboard } from './components/OrganizerDashboard';
import { SplashScreen, LoginScreen, RegisterScreen, OTPScreen, LocationSelectScreen, PendingApprovalScreen } from './components/AuthScreens';

// --- Header Component ---
interface HeaderProps {
  role: UserRole;
  setRole: (r: UserRole) => void;
  notifications: Notification[];
  onOpenProfile: () => void;
  glass?: boolean;
  onLogout: () => void;
}

const Header = ({ role, setRole, notifications, onOpenProfile, glass = false, onLogout }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${glass ? 'bg-slate-900/40 backdrop-blur-md border-b border-white/10 text-white' : 'bg-white/90 backdrop-blur-md border-b border-slate-200 text-slate-900'}`}>
      <div className="max-w-xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
           {/* Logo / Brand */}
           <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black italic shadow-lg ${glass ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'}`}>
             LH
           </div>
           <h1 className="font-bold text-xl tracking-tight">LeagueHub</h1>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Role Toggle (Demo - Disabled in Auth flow, kept for easy testing if needed, but logic handles it via profile) */}
           {/* Notifications */}
           <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative p-2 rounded-full transition-colors ${glass ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'}`}
              >
                <Bell size={22} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 text-slate-900">
                     <div className="px-4 py-3 border-b border-slate-50 bg-slate-50/50">
                       <h3 className="font-semibold text-sm text-slate-800">Notifications</h3>
                     </div>
                     <div className="max-h-64 overflow-y-auto">
                       {notifications.length === 0 ? (
                          <div className="p-4 text-center text-sm text-slate-500">No new notifications</div>
                       ) : (
                         notifications.map(n => (
                           <div key={n.id} className={`px-4 py-3 border-b border-slate-50 hover:bg-slate-50 ${!n.read ? 'bg-blue-50/30' : ''}`}>
                             <div className="flex items-start gap-2">
                                <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.type === 'success' ? 'bg-green-500' : n.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                                <div>
                                  <p className="text-sm font-medium text-slate-900">{n.title}</p>
                                  <p className="text-xs text-slate-500 mt-0.5">{n.message}</p>
                                </div>
                             </div>
                           </div>
                         ))
                       )}
                     </div>
                  </div>
                </>
              )}
           </div>

           {/* Profile */}
           <button onClick={onOpenProfile} className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden border-2 ${glass ? 'bg-white/10 border-white/30 text-white' : 'bg-slate-200 border-white text-slate-600'}`}>
              <UserCircle2 size={24} />
           </button>
        </div>
      </div>
    </header>
  );
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('HOME');
  
  // Auth State
  const [authStep, setAuthStep] = useState<AuthStep>('SPLASH');
  const [tempData, setTempData] = useState<any>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Data State
  const [games, setGames] = useState<Game[]>(() => {
    const saved = localStorage.getItem('leaguehub_games');
    return saved ? JSON.parse(saved) : INITIAL_GAMES;
  });
  const [districts, setDistricts] = useState<District[]>(INITIAL_DISTRICTS);
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);

  // Persistence for games
  useEffect(() => {
    localStorage.setItem('leaguehub_games', JSON.stringify(games));
  }, [games]);

  // Auth: Check local storage on mount
  useEffect(() => {
      const storedUser = localStorage.getItem('leaguehub_user');
      if (storedUser) {
          setUserProfile(JSON.parse(storedUser));
          setAuthStep('APP');
      }
  }, []);

  const handleLogout = () => {
      localStorage.removeItem('leaguehub_user');
      setUserProfile(null);
      setAuthStep('SPLASH');
      setTempData({});
      // Close profile modal if open
      setIsProfileModalOpen(false);
  };

  // --- Auth Flow Handlers ---
  const handleLoginSuccess = () => {
      // Mock Login
      const user: UserProfile = {
          id: 'u1',
          name: 'Demo User',
          email: 'user@leaguehub.in',
          role: 'VIEWER', // Default to Viewer for demo login
          status: 'APPROVED'
      };
      setUserProfile(user);
      localStorage.setItem('leaguehub_user', JSON.stringify(user));
      setAuthStep('APP');
  };

  const handleRegisterNext = (data: { name: string, role: UserRole }) => {
      setTempData({ ...tempData, ...data });
      setAuthStep('LOCATION'); // Flow: Register Info -> Location -> OTP -> App
  };

  const handleLocationComplete = (locData: any) => {
      setTempData({ ...tempData, ...locData });
      setAuthStep('OTP');
  };

  const handleVerifyOTP = () => {
      // Create final user profile
      const newUser: UserProfile = {
          id: crypto.randomUUID(),
          name: tempData.name,
          email: 'user@example.com', // mock
          role: tempData.role,
          status: tempData.role === 'ORGANIZER' ? 'PENDING' : 'APPROVED',
          districtId: tempData.district,
          villageId: tempData.village,
          area: tempData.area
      };
      setUserProfile(newUser);
      localStorage.setItem('leaguehub_user', JSON.stringify(newUser));
      setAuthStep('APP');
  };


  // --- App Logic ---
  const role = userProfile?.role || 'VIEWER';

  const handleStatusChange = (gameId: string, status: GameStatus) => {
    if (role !== 'ORGANIZER') return;
    setGames(prev => prev.map(g => g.id === gameId ? { ...g, status } : g));
    
    // Add notification
    const game = games.find(g => g.id === gameId);
    if (game && status === GameStatus.LIVE) {
      addNotification(`Game Started`, `${game.homeTeam.name} vs ${game.awayTeam.name} is now live!`, 'info');
    }
  };

  const handleScoreUpdate = (gameId: string, team: 'home' | 'away', delta: number) => {
    if (role !== 'ORGANIZER') return;
    setGames(prev => prev.map(g => {
      if (g.id !== gameId) return g;
      const key = team === 'home' ? 'homeScore' : 'awayScore';
      const newScore = Math.max(0, g[key] + delta);
      return { ...g, [key]: newScore };
    }));
  };

  const handleCreateGame = (gameData: Partial<Game>) => {
    if (role !== 'ORGANIZER') return;
    const newGame: Game = {
      id: crypto.randomUUID(),
      homeScore: 0,
      awayScore: 0,
      status: GameStatus.UPCOMING,
      imageUrl: '', 
      venue: 'TBD',
      ...gameData as any
    };
    setGames(prev => [...prev, newGame]);
    setActiveScreen('LEAGUES');
    addNotification('New Game Scheduled', 'A new game has been added to the schedule.', 'info');
  };

  const handleJoinLeague = (data: { name: string, email: string, team: string }) => {
      // Just update local name for now
      if (userProfile) {
          const updated = { ...userProfile, name: data.name };
          setUserProfile(updated);
          localStorage.setItem('leaguehub_user', JSON.stringify(updated));
      }
      addNotification('Registration Pending', `Request to join ${data.team} sent to organizer.`, 'success');
  };

  const addNotification = (title: string, message: string, type: 'info' | 'success' | 'warning') => {
    const newNotif: Notification = {
      id: crypto.randomUUID(),
      title,
      message,
      type,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const locationProps = {
    role, districts
  };

  // --- Background & Layout Logic ---
  const getBackgroundClass = () => {
    switch(activeScreen) {
      case 'HOME': return 'bg-slate-900'; 
      case 'LIVE': return 'bg-slate-900';
      case 'PROFILE': return 'bg-slate-900';
      case 'DASHBOARD': return 'bg-gradient-to-br from-slate-50 to-blue-50';
      default: return 'bg-slate-50';
    }
  };

  const getBackgroundImage = () => {
    switch(activeScreen) {
      case 'HOME': return 'url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop")';
      case 'LIVE': return 'url("https://images.unsplash.com/photo-1487466365202-1afdb86c764e?q=80&w=2070&auto=format&fit=crop")';
      case 'PROFILE': return 'url("https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070&auto=format&fit=crop")';
      default: return 'none';
    }
  };

  const isGlassScreen = ['HOME', 'LIVE', 'PROFILE'].includes(activeScreen);

  // --- Render Auth Screens ---
  if (authStep === 'SPLASH') return <SplashScreen onLogin={() => setAuthStep('LOGIN')} onRegister={() => setAuthStep('REGISTER')} />;
  if (authStep === 'LOGIN') return <LoginScreen onLoginSuccess={handleLoginSuccess} onBack={() => setAuthStep('SPLASH')} />;
  if (authStep === 'REGISTER') return <RegisterScreen onNext={handleRegisterNext} onBack={() => setAuthStep('SPLASH')} />;
  if (authStep === 'LOCATION') return <LocationSelectScreen onComplete={handleLocationComplete} />;
  if (authStep === 'OTP') return <OTPScreen onVerify={handleVerifyOTP} />;

  // --- Render Approval Pending ---
  if (userProfile?.role === 'ORGANIZER' && userProfile?.status === 'PENDING') {
      return <PendingApprovalScreen onLogout={handleLogout} />;
  }

  // --- Render Main App ---
  const renderScreen = () => {
    switch (activeScreen) {
      case 'HOME':
        return <HomeView 
          games={games} 
          {...locationProps}
          onNavigate={setActiveScreen}
          onJoinClick={() => setIsJoinModalOpen(true)}
        />;
      
      case 'DASHBOARD':
        return <OrganizerDashboard 
          games={games} 
          locationProps={locationProps} 
          onCreateGame={() => setIsCreateModalOpen(true)} 
        />;

      case 'LEAGUES':
        return (
          <div className="space-y-6 pb-20 pt-4">
             <div className="flex justify-between items-center px-1">
                <h2 className="text-2xl font-bold text-slate-900">Leagues & Matches</h2>
                {role === 'ORGANIZER' && (
                  <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>Create Match</Button>
                )}
             </div>
             
             {/* Filter Chips (Visual only) */}
             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button className="px-4 py-1.5 bg-blue-600 text-white rounded-full text-xs font-bold shadow-sm whitespace-nowrap">All Matches</button>
                <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold whitespace-nowrap">Today</button>
                <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold whitespace-nowrap">Upcoming</button>
                <button className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold whitespace-nowrap">My Teams</button>
             </div>

             {games.sort((a,b) => new Date(a.scheduledTime).getTime() - new Date(b.scheduledTime).getTime()).map(game => (
               <GameCard key={game.id} game={game} role={role} onStatusChange={handleStatusChange} onUpdateScore={handleScoreUpdate} />
             ))}
          </div>
        );

      case 'LIVE':
        const liveGames = games.filter(g => g.status === GameStatus.LIVE);
        return (
          <div className="space-y-6 pb-20 pt-4">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                <h2 className="text-2xl font-black text-white tracking-wide uppercase drop-shadow-md">Live Action</h2>
             </div>
             
             {liveGames.length === 0 ? (
               <div className="text-center py-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                 <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4 text-white/50">
                    <Activity size={32} />
                 </div>
                 <p className="text-white font-medium text-lg">No live games currently.</p>
                 <p className="text-white/60 text-sm mt-1">Check back later for match updates.</p>
               </div>
             ) : (
               liveGames.map(game => (
                 <GameCard key={game.id} game={game} role={role} onStatusChange={handleStatusChange} onUpdateScore={handleScoreUpdate} />
               ))
             )}
          </div>
        );

      case 'PROFILE':
        if (!userProfile) return null;
        return (
          <div className="pb-20 pt-8 flex flex-col items-center">
             <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                
                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-28 h-28 p-1 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-full mb-4 shadow-lg">
                        <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-slate-900/50">
                            {userProfile.name.charAt(0)}
                        </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-1">{userProfile.name}</h2>
                    <p className="text-blue-200 text-sm mb-6">{userProfile.email}</p>
                    
                    <div className="flex items-center gap-2 mb-8">
                       <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white uppercase tracking-wider border border-white/10">
                          {userProfile.role}
                       </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full mb-8">
                        <div className="bg-slate-900/40 p-3 rounded-xl border border-white/10">
                            <div className="text-xl font-bold text-white">0</div>
                            <div className="text-[10px] text-white/60 uppercase font-bold">Matches</div>
                        </div>
                         <div className="bg-slate-900/40 p-3 rounded-xl border border-white/10">
                            <div className="text-xl font-bold text-emerald-400">0</div>
                            <div className="text-[10px] text-white/60 uppercase font-bold">Wins</div>
                        </div>
                    </div>

                    <div className="space-y-3 w-full">
                        <Button className="w-full bg-blue-600 hover:bg-blue-500 border-none text-white shadow-lg shadow-blue-900/20" onClick={() => setIsProfileModalOpen(true)}>
                            <Settings size={16} className="mr-2" /> Edit Profile
                        </Button>
                        <Button variant="secondary" className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20" onClick={handleLogout}>
                            <LogOut size={16} className="mr-2" /> Logout
                        </Button>
                    </div>
                </div>
             </div>
          </div>
        );
        
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ease-in-out ${getBackgroundClass()}`}>
       {/* Background Image Layer */}
       <div 
         className="fixed inset-0 z-0 transition-opacity duration-700 ease-in-out"
         style={{
            backgroundImage: getBackgroundImage(),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: isGlassScreen ? 1 : 0
         }}
       />
       {/* Overlay Layer for readability */}
       <div className={`fixed inset-0 z-0 transition-opacity duration-500 pointer-events-none ${isGlassScreen ? 'bg-slate-900/70 backdrop-blur-[2px]' : 'opacity-0'}`} />

      <Header 
        role={role} 
        setRole={(r) => { 
           if(userProfile) {
               const updated = {...userProfile, role: r};
               setUserProfile(updated);
               localStorage.setItem('leaguehub_user', JSON.stringify(updated));
           }
        }} 
        notifications={notifications} 
        onOpenProfile={() => setIsProfileModalOpen(true)}
        glass={isGlassScreen}
        onLogout={handleLogout}
      />
      
      <main className="relative z-10 max-w-xl mx-auto px-4 py-6 mt-16">
        {renderScreen()}
      </main>

      <BottomNav 
        activeScreen={activeScreen} 
        onNavigate={setActiveScreen} 
        role={role} 
        glass={isGlassScreen}
      />

      {/* Modals */}
      <CreateGameModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onCreate={handleCreateGame} 
      />
      
      <JoinLeagueModal 
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoin={handleJoinLeague}
        states={INITIAL_STATES} 
        districts={districts} 
      />

      {userProfile && (
        <UserProfileModal 
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            profile={userProfile}
            onUpdate={(data) => {
                const updated = { ...userProfile, ...data };
                setUserProfile(updated);
                localStorage.setItem('leaguehub_user', JSON.stringify(updated));
            }}
            onLogout={handleLogout}
        />
      )}
    </div>
  );
}

// Helper icon component for inline usage
function Activity({ size }: { size: number }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>;
}