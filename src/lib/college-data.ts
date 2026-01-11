import { PlaceHolderImages } from './placeholder-images';

export interface College {
  id: number;
  name: string;
  location: string;
  type: 'Government' | 'Private';
  fees: number; // Annual fees
  avgPlacement: number; // in LPA
  logoUrl: string;
}

const getLogo = (id: string) => {
  return PlaceHolderImages.find(p => p.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/100/100`;
}

export const collegeData: College[] = [
  {
    id: 1,
    name: 'Indian Institute of Technology, Delhi',
    location: 'New Delhi, Delhi',
    type: 'Government',
    fees: 220000,
    avgPlacement: 25.82,
    logoUrl: getLogo('college-logo-1'),
  },
  {
    id: 2,
    name: 'Vellore Institute of Technology',
    location: 'Vellore, Tamil Nadu',
    type: 'Private',
    fees: 198000,
    avgPlacement: 9.23,
    logoUrl: getLogo('college-logo-2'),
  },
  {
    id: 3,
    name: 'National Institute of Technology, Tiruchirappalli',
    location: 'Tiruchirappalli, Tamil Nadu',
    type: 'Government',
    fees: 150000,
    avgPlacement: 12.0,
    logoUrl: getLogo('college-logo-3'),
  },
  {
    id: 4,
    name: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    type: 'Private',
    fees: 250000,
    avgPlacement: 7.58,
    logoUrl: getLogo('college-logo-4'),
  },
  {
    id: 5,
    name: 'Jadavpur University',
    location: 'Kolkata, West Bengal',
    type: 'Government',
    fees: 10000,
    avgPlacement: 10.2,
    logoUrl: getLogo('college-logo-1'),
  },
  {
    id: 6,
    name: 'Manipal Institute of Technology',
    location: 'Manipal, Karnataka',
    type: 'Private',
    fees: 335000,
    avgPlacement: 10.49,
    logoUrl: getLogo('college-logo-2'),
  },
  {
    id: 7,
    name: 'Indian Institute of Technology, Bombay',
    location: 'Mumbai, Maharashtra',
    type: 'Government',
    fees: 228000,
    avgPlacement: 21.8,
    logoUrl: getLogo('college-logo-3'),
  },
  {
    id: 8,
    name: 'Birla Institute of Technology and Science, Pilani',
    location: 'Pilani, Rajasthan',
    type: 'Private',
    fees: 423475,
    avgPlacement: 30.37,
    logoUrl: getLogo('college-logo-4'),
  },
];
