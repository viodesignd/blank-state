/*
  Conference schedule — edit talks here; the Agenda section reads from this file.

  Each day:  { id, label, talks: [...] }
  Each talk: { time, title, speaker? }   (speaker is optional, e.g. for breaks)

  Talks alternate between the top and bottom of the zigzag timeline automatically.
  Desktop fits up to ~5 talks per day; keep titles short (≈ 25 characters),
  except the last talk of the day, which has more room.
*/
export const AGENDA = [
  {
    id: '03apr',
    label: '03Apr',
    talks: [
      { time: '09:00', title: 'Opening Keynote', speaker: 'Alex Riviera' },
      { time: '10:30', title: 'Future of UX Panel', speaker: 'Nina Li + guests' },
      { time: '12:00', title: 'Lunch + Networking' },
      { time: '14:00', title: 'Workshop: Design & AI', speaker: 'Rina Patel' },
      { time: '16:00', title: 'Closing Talk: The New Frontier', speaker: 'Marcus Holt' },
    ],
  },
  {
    id: '04apr',
    label: '04Apr',
    talks: [
      { time: '09:30', title: 'Type in Motion', speaker: 'Jonas Weber' },
      { time: '11:00', title: 'Design Systems at Scale', speaker: 'Alma Castro' },
      { time: '13:00', title: 'Lunch + Portfolio Reviews' },
      { time: '14:30', title: 'AI Prototyping Lab', speaker: 'Rina Patel + Nina Li' },
      { time: '16:30', title: 'Fireside: Breaking the Grid', speaker: 'Alex Riviera & Marcus Holt' },
    ],
  },
  {
    id: '05apr',
    label: '05Apr',
    talks: [
      { time: '09:30', title: 'Brand Identity Teardown', speaker: 'Marcus Holt' },
      { time: '11:00', title: 'Variable Fonts, Live', speaker: 'Jonas Weber' },
      { time: '12:30', title: 'Lunch + Community Meetup' },
      { time: '14:00', title: 'Research That Ships', speaker: 'Alma Castro' },
      { time: '16:00', title: 'Closing Panel & Farewell', speaker: 'All speakers' },
    ],
  },
]
