export const STORAGE_KEY = "pulsefit-personal-data-v1";

export const DAYS = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
] as const;

export type DayName = (typeof DAYS)[number];

export const GOALS = [
  { value: "hipertrofia", label: "Hipertrofia" },
  { value: "emagrecimento", label: "Emagrecimento" },
  { value: "forca", label: "Força" },
  { value: "condicionamento", label: "Condicionamento" },
] as const;

export type TrainingGoal = (typeof GOALS)[number]["value"];

export const MUSCLE_GROUPS = [
  "Peito",
  "Costas",
  "Pernas",
  "Ombros",
  "Bíceps",
  "Tríceps",
  "Glúteos",
  "Core",
  "Cardio",
] as const;

export type MuscleGroup = (typeof MUSCLE_GROUPS)[number];

export type Profile = {
  fullName: string;
  weight: number;
  height: number;
  birthDate: string;
  goal: TrainingGoal;
};

export type Exercise = {
  id: string;
  name: string;
  muscleGroup: string;
  sets: number;
  reps: string;
  load: string;
  rest: string;
  notes: string;
};

export type WorkoutDay = {
  day: DayName;
  focus: string;
  exercises: Exercise[];
};

export type WeightEntry = {
  id: string;
  date: string;
  weight: number;
};

export type FitnessData = {
  profile: Profile;
  workouts: WorkoutDay[];
  weightHistory: WeightEntry[];
};

export const DEFAULT_DATA: FitnessData = {
  profile: {
    fullName: "Atleta PulseFit",
    weight: 82.4,
    height: 178,
    birthDate: "1995-09-20",
    goal: "hipertrofia",
  },
  workouts: [
    {
      day: "Domingo",
      focus: "Mobilidade e recuperação",
      exercises: [
        {
          id: "sun-1",
          name: "Bike leve",
          muscleGroup: "Cardio",
          sets: 1,
          reps: "25 min",
          load: "Leve",
          rest: "Livre",
          notes: "Manter respiração confortável.",
        },
      ],
    },
    {
      day: "Segunda",
      focus: "Peito e tríceps",
      exercises: [
        {
          id: "mon-1",
          name: "Supino reto",
          muscleGroup: "Peito",
          sets: 4,
          reps: "8-10",
          load: "70 kg",
          rest: "90 s",
          notes: "Controlar a descida e manter escápulas firmes.",
        },
        {
          id: "mon-2",
          name: "Crucifixo inclinado",
          muscleGroup: "Peito",
          sets: 3,
          reps: "10-12",
          load: "18 kg",
          rest: "75 s",
          notes: "Amplitude confortável.",
        },
        {
          id: "mon-3",
          name: "Tríceps corda",
          muscleGroup: "Tríceps",
          sets: 3,
          reps: "12-15",
          load: "35 kg",
          rest: "60 s",
          notes: "Pausa curta no final do movimento.",
        },
      ],
    },
    {
      day: "Terça",
      focus: "Costas e bíceps",
      exercises: [
        {
          id: "tue-1",
          name: "Puxada aberta",
          muscleGroup: "Costas",
          sets: 4,
          reps: "8-12",
          load: "65 kg",
          rest: "90 s",
          notes: "Evitar puxar com o pescoço.",
        },
        {
          id: "tue-2",
          name: "Rosca direta",
          muscleGroup: "Bíceps",
          sets: 3,
          reps: "10",
          load: "28 kg",
          rest: "75 s",
          notes: "Cotovelos próximos ao corpo.",
        },
      ],
    },
    {
      day: "Quarta",
      focus: "Pernas",
      exercises: [
        {
          id: "wed-1",
          name: "Agachamento livre",
          muscleGroup: "Pernas",
          sets: 4,
          reps: "6-8",
          load: "90 kg",
          rest: "120 s",
          notes: "Priorizar técnica antes de subir carga.",
        },
        {
          id: "wed-2",
          name: "Leg press",
          muscleGroup: "Pernas",
          sets: 4,
          reps: "10-12",
          load: "180 kg",
          rest: "90 s",
          notes: "Não travar joelhos.",
        },
      ],
    },
    {
      day: "Quinta",
      focus: "Ombros e core",
      exercises: [
        {
          id: "thu-1",
          name: "Desenvolvimento halteres",
          muscleGroup: "Ombros",
          sets: 4,
          reps: "8-10",
          load: "22 kg",
          rest: "90 s",
          notes: "Subir sem perder estabilidade lombar.",
        },
        {
          id: "thu-2",
          name: "Prancha",
          muscleGroup: "Core",
          sets: 3,
          reps: "45 s",
          load: "Peso corporal",
          rest: "45 s",
          notes: "Quadril alinhado.",
        },
      ],
    },
    {
      day: "Sexta",
      focus: "Full body metabólico",
      exercises: [
        {
          id: "fri-1",
          name: "Levantamento terra",
          muscleGroup: "Costas",
          sets: 4,
          reps: "5",
          load: "110 kg",
          rest: "150 s",
          notes: "Manter barra próxima ao corpo.",
        },
        {
          id: "fri-2",
          name: "Remada baixa",
          muscleGroup: "Costas",
          sets: 3,
          reps: "10-12",
          load: "60 kg",
          rest: "75 s",
          notes: "Puxada limpa, sem balanço.",
        },
      ],
    },
    {
      day: "Sábado",
      focus: "Condicionamento",
      exercises: [
        {
          id: "sat-1",
          name: "Esteira intervalada",
          muscleGroup: "Cardio",
          sets: 8,
          reps: "40 s forte / 80 s leve",
          load: "Vel. 12 km/h",
          rest: "80 s",
          notes: "Encerrar com 5 min leves.",
        },
      ],
    },
  ],
  weightHistory: [
    { id: "w-1", date: "2026-04-06", weight: 84.1 },
    { id: "w-2", date: "2026-04-13", weight: 83.7 },
    { id: "w-3", date: "2026-04-20", weight: 83.3 },
    { id: "w-4", date: "2026-04-27", weight: 82.9 },
    { id: "w-5", date: "2026-05-04", weight: 82.7 },
    { id: "w-6", date: "2026-05-11", weight: 82.5 },
    { id: "w-7", date: "2026-05-18", weight: 82.4 },
  ],
};

export function createId(prefix = "id") {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getTodayName(date = new Date()): DayName {
  return DAYS[date.getDay()];
}

export function calculateAge(birthDate: string) {
  if (!birthDate) return null;

  const birth = new Date(`${birthDate}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age >= 0 ? age : null;
}

export function calculateBmi(weight: number, height: number) {
  if (!weight || !height) return null;

  const meters = height / 100;
  const bmi = weight / (meters * meters);

  return Number.isFinite(bmi) ? bmi : null;
}

export function getBmiLabel(bmi: number | null) {
  if (!bmi) return "Aguardando dados";
  if (bmi < 18.5) return "Abaixo do peso";
  if (bmi < 25) return "Peso adequado";
  if (bmi < 30) return "Sobrepeso";
  return "Obesidade";
}

export function getGoalLabel(goal: TrainingGoal) {
  return GOALS.find((item) => item.value === goal)?.label ?? "Objetivo";
}

export function formatWeight(weight: number) {
  return `${weight.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })} kg`;
}

export function formatDateLabel(date: string) {
  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) return date;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
  }).format(parsed);
}

export function normalizeFitnessData(value: unknown): FitnessData {
  if (!value || typeof value !== "object") {
    return DEFAULT_DATA;
  }

  const incoming = value as Partial<FitnessData>;
  const incomingWorkouts = Array.isArray(incoming.workouts)
    ? incoming.workouts
    : DEFAULT_DATA.workouts;

  return {
    profile: {
      ...DEFAULT_DATA.profile,
      ...(incoming.profile ?? {}),
    },
    workouts: DAYS.map((day) => {
      const savedDay = incomingWorkouts.find((item) => item.day === day);
      const defaultDay = DEFAULT_DATA.workouts.find((item) => item.day === day);

      return {
        day,
        focus: savedDay?.focus ?? defaultDay?.focus ?? "",
        exercises: Array.isArray(savedDay?.exercises)
          ? savedDay.exercises
          : defaultDay?.exercises ?? [],
      };
    }),
    weightHistory: Array.isArray(incoming.weightHistory)
      ? incoming.weightHistory
          .filter(
            (entry) =>
              typeof entry.date === "string" &&
              typeof entry.weight === "number" &&
              Number.isFinite(entry.weight),
          )
          .map((entry) => ({
            id: entry.id || createId("weight"),
            date: entry.date,
            weight: entry.weight,
          }))
      : DEFAULT_DATA.weightHistory,
  };
}
