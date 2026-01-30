import { Game, GameStatus, Notification, State, District, Village } from './types';

export const INITIAL_GAMES: Game[] = [
  {
    id: 'g1',
    homeTeam: { id: 't1', name: 'Thunderbolts', color: 'blue' },
    awayTeam: { id: 't2', name: 'Crimson Tide', color: 'red' },
    homeScore: 0,
    awayScore: 0,
    status: GameStatus.UPCOMING,
    scheduledTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    sport: 'Basketball',
    venue: 'Nehru Stadium, Chennai',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ee3?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'g2',
    homeTeam: { id: 't3', name: 'Emerald Eagles', color: 'green' },
    awayTeam: { id: 't4', name: 'Golden Hawks', color: 'yellow' },
    homeScore: 12,
    awayScore: 8,
    status: GameStatus.LIVE,
    scheduledTime: new Date(Date.now() - 1800000).toISOString(), // 30 mins ago
    sport: 'Soccer',
    venue: 'District Sports Complex, Salem',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'g3',
    homeTeam: { id: 't5', name: 'Silver Sharks', color: 'gray' },
    awayTeam: { id: 't6', name: 'Iron Giants', color: 'orange' },
    homeScore: 24,
    awayScore: 21,
    status: GameStatus.FINAL,
    scheduledTime: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    sport: 'Football',
    venue: 'Anna Stadium, Trichy',
    imageUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'g4',
    homeTeam: { id: 't1', name: 'Thunderbolts', color: 'blue' },
    awayTeam: { id: 't3', name: 'Emerald Eagles', color: 'green' },
    homeScore: 45,
    awayScore: 42,
    status: GameStatus.FINAL,
    scheduledTime: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    sport: 'Basketball',
    venue: 'Race Course Ground, Madurai',
    imageUrl: 'https://images.unsplash.com/photo-1519861531473-920026393112?auto=format&fit=crop&q=80&w=1000'
  }
];

export const TEAM_COLORS = [
  { name: 'Red', value: 'red' },
  { name: 'Blue', value: 'blue' },
  { name: 'Green', value: 'green' },
  { name: 'Yellow', value: 'yellow' },
  { name: 'Purple', value: 'purple' },
  { name: 'Orange', value: 'orange' },
  { name: 'Gray', value: 'gray' },
  { name: 'Black', value: 'black' },
];

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Game Started',
    message: 'Emerald Eagles vs Golden Hawks is now LIVE!',
    type: 'info',
    time: '30 mins ago',
    read: false,
  },
  {
    id: 'n2',
    title: 'Registration Approved',
    message: 'Your request to join the Summer League has been approved.',
    type: 'success',
    time: '2 hours ago',
    read: true,
  }
];

export const TN_STATE_ID = 'tn_state';

export const INITIAL_STATES: State[] = [
  { id: TN_STATE_ID, name: 'Tamil Nadu' },
];

const districtNames = [
  "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
  "Dindigul", "Erode", "Kallakurichi", "Kancheepuram", "Karur", "Krishnagiri", 
  "Madurai", "Mayiladuthurai", "Nagapattinam", "Kanyakumari", "Namakkal", 
  "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", 
  "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", 
  "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", 
  "Viluppuram", "Virudhunagar", "The Nilgiris"
];

export const INITIAL_DISTRICTS: District[] = districtNames.map(name => ({
  id: name.toLowerCase().replace(/\s+/g, '-'),
  name,
  stateId: TN_STATE_ID
}));

// Sample Villages for Auth Demo with Search Examples
export const INITIAL_VILLAGES: Village[] = [
  { id: 'v_yercaud', name: 'Yercaud', districtId: 'salem' },
  { id: 'v_yerimalai', name: 'Yerimalai', districtId: 'salem' },
  { id: 'v_yercaud_hills', name: 'Yercaud Hills', districtId: 'salem' },
  { id: 'v_attur', name: 'Attur', districtId: 'salem' },
  { id: 'v_omular', name: 'Omalur', districtId: 'salem' },
  { id: 'v_mettur', name: 'Mettur', districtId: 'salem' },
  { id: 'v_adyar', name: 'Adyar', districtId: 'chennai' },
  { id: 'v_mylapore', name: 'Mylapore', districtId: 'chennai' },
  { id: 'v_guindy', name: 'Guindy', districtId: 'chennai' },
  { id: 'v_coonoor', name: 'Coonoor', districtId: 'the-nilgiris' },
  { id: 'v_ooty', name: 'Ooty', districtId: 'the-nilgiris' },
  { id: 'v_pollachi', name: 'Pollachi', districtId: 'coimbatore' },
  { id: 'v_mettupalayam', name: 'Mettupalayam', districtId: 'coimbatore' },
];