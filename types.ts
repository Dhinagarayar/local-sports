export enum GameStatus {
  UPCOMING = 'UPCOMING',
  LIVE = 'LIVE',
  FINAL = 'FINAL'
}

export interface Team {
  id: string;
  name: string;
  color: string; // Tailwind color class or hex
}

export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: GameStatus;
  scheduledTime: string; // ISO string
  sport: string;
  imageUrl?: string;
  venue?: string;
}

export type UserRole = 'ORGANIZER' | 'VIEWER';

export interface TabOption {
  id: GameStatus | 'STATS' | 'LOCATIONS';
  label: string;
}

export interface Player {
  id: string;
  name: string;
  email: string;
  teamPreference?: string;
  status: 'PENDING' | 'APPROVED';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  time: string;
  read: boolean;
}

export type AccountStatus = 'PENDING' | 'APPROVED';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: AccountStatus;
  avatarUrl?: string;
  // Location info
  districtId?: string;
  villageId?: string;
  area?: string;
}

// Location Types
export interface State {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
  stateId: string;
}

export interface Village {
  id: string;
  name: string;
  districtId: string;
}

export type AuthStep = 'SPLASH' | 'LOGIN' | 'REGISTER' | 'OTP' | 'LOCATION' | 'APP';