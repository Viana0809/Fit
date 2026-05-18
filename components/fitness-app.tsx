"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BarChart3,
  Dumbbell,
  LayoutDashboard,
  Save,
  UserRound,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardPanel } from "@/components/dashboard-panel";
import { ProfilePanel } from "@/components/profile-panel";
import { ProgressPanel } from "@/components/progress-panel";
import { WorkoutPanel } from "@/components/workout-panel";
import {
  DEFAULT_DATA,
  STORAGE_KEY,
  calculateAge,
  calculateBmi,
  formatWeight,
  getGoalLabel,
  getTodayName,
  normalizeFitnessData,
  type DayName,
  type Exercise,
  type FitnessData,
  type Profile,
  type WeightEntry,
} from "@/lib/fitness-data";
import { cn } from "@/lib/utils";

type View = "dashboard" | "profile" | "workouts" | "progress";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "Perfil", icon: UserRound },
  { id: "workouts", label: "Treinos", icon: Dumbbell },
  { id: "progress", label: "Evolução", icon: BarChart3 },
] satisfies Array<{ id: View; label: string; icon: React.ElementType }>;

export function FitnessApp() {
  const [data, setData] = useState<FitnessData>(DEFAULT_DATA);
  const [hydrated, setHydrated] = useState(false);
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [selectedDay, setSelectedDay] = useState<DayName>(() => getTodayName());
  const [todayName] = useState<DayName>(() => getTodayName());

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setData(normalizeFitnessData(JSON.parse(saved)));
      }
    } catch {
      setData(DEFAULT_DATA);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data, hydrated]);

  const age = useMemo(() => calculateAge(data.profile.birthDate), [data.profile]);
  const bmi = useMemo(
    () => calculateBmi(data.profile.weight, data.profile.height),
    [data.profile.height, data.profile.weight],
  );
  const totalExercises = useMemo(
    () =>
      data.workouts.reduce(
        (total, workout) => total + workout.exercises.length,
        0,
      ),
    [data.workouts],
  );
  const todayWorkout =
    data.workouts.find((workout) => workout.day === todayName) ?? data.workouts[0];

  function updateProfile(profile: Profile) {
    setData((current) => {
      const today = new Date().toISOString().slice(0, 10);
      const currentWeight = current.profile.weight;
      const changedWeight = profile.weight && profile.weight !== currentWeight;
      const weightHistory = changedWeight
        ? upsertWeightEntry(current.weightHistory, {
            id: current.weightHistory.find((entry) => entry.date === today)?.id ?? today,
            date: today,
            weight: profile.weight,
          })
        : current.weightHistory;

      return {
        ...current,
        profile,
        weightHistory,
      };
    });
  }

  function updateWorkoutFocus(day: DayName, focus: string) {
    setData((current) => ({
      ...current,
      workouts: current.workouts.map((workout) =>
        workout.day === day ? { ...workout, focus } : workout,
      ),
    }));
  }

  function saveExercise(day: DayName, exercise: Exercise) {
    setData((current) => ({
      ...current,
      workouts: current.workouts.map((workout) => {
        if (workout.day !== day) return workout;

        const exists = workout.exercises.some((item) => item.id === exercise.id);
        return {
          ...workout,
          exercises: exists
            ? workout.exercises.map((item) =>
                item.id === exercise.id ? exercise : item,
              )
            : [...workout.exercises, exercise],
        };
      }),
    }));
  }

  function deleteExercise(day: DayName, exerciseId: string) {
    setData((current) => ({
      ...current,
      workouts: current.workouts.map((workout) =>
        workout.day === day
          ? {
              ...workout,
              exercises: workout.exercises.filter((item) => item.id !== exerciseId),
            }
          : workout,
      ),
    }));
  }

  function addWeightEntry(entry: WeightEntry) {
    setData((current) => ({
      ...current,
      profile: {
        ...current.profile,
        weight: entry.weight,
      },
      weightHistory: upsertWeightEntry(current.weightHistory, entry),
    }));
  }

  function deleteWeightEntry(id: string) {
    setData((current) => ({
      ...current,
      weightHistory: current.weightHistory.filter((entry) => entry.id !== id),
    }));
  }

  function openWorkout(day: DayName) {
    setSelectedDay(day);
    setActiveView("workouts");
  }

  return (
    <main className="relative min-h-screen">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 sm:py-6 lg:grid lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8 lg:py-8">
        <aside className="glass-panel rounded-lg border border-white/10 p-4 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-md border border-fit-green/40 bg-fit-green/12 text-fit-green shadow-[0_0_24px_rgba(61,255,145,0.2)]">
              <Dumbbell className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-fit-green">PulseFit</p>
              <h1 className="text-xl font-semibold tracking-normal text-white">
                Personal
              </h1>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-white/10 bg-slate-950/45 p-4">
            <p className="text-sm text-slate-400">Atleta</p>
            <p className="mt-1 text-lg font-semibold text-white">
              {data.profile.fullName}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{getGoalLabel(data.profile.goal)}</Badge>
              <Badge className="border-fit-cyan/30 bg-fit-cyan/10 text-fit-cyan">
                {formatWeight(data.profile.weight)}
              </Badge>
            </div>
          </div>

          <nav className="mt-6 hidden gap-2 lg:grid">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Button
                  className={cn(
                    "justify-start",
                    activeView === item.id &&
                      "border-fit-green/60 bg-fit-green/12 text-fit-green",
                  )}
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  variant="ghost"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          <div className="mt-6 hidden rounded-lg border border-white/10 bg-black/20 p-3 text-sm text-slate-400 lg:flex lg:items-center lg:gap-2">
            <Save className="h-4 w-4 text-fit-green" />
            {hydrated ? "Salvo no navegador" : "Carregando dados"}
          </div>
        </aside>

        <section className="min-w-0 space-y-4">
          <div className="glass-panel rounded-lg border border-white/10 p-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Badge className="mb-3 border-fit-cyan/30 bg-fit-cyan/10 text-fit-cyan">
                  Fitness premium
                </Badge>
                <h2 className="text-2xl font-semibold tracking-normal text-white sm:text-3xl">
                  Plataforma pessoal de treinos
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/55 px-3 py-2 text-sm text-slate-300">
                <Activity className="h-4 w-4 text-fit-green" />
                {totalExercises} exercícios ativos
              </div>
            </div>
          </div>

          <nav className="no-scrollbar flex gap-2 overflow-x-auto lg:hidden">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Button
                  className={cn(
                    "min-w-fit",
                    activeView === item.id &&
                      "border-fit-green/60 bg-fit-green/12 text-fit-green",
                  )}
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  variant="outline"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {activeView === "dashboard" ? (
            <DashboardPanel
              age={age}
              bmi={bmi}
              data={data}
              onOpenWorkout={openWorkout}
              todayWorkout={todayWorkout}
              totalExercises={totalExercises}
            />
          ) : null}

          {activeView === "profile" ? (
            <ProfilePanel
              age={age}
              bmi={bmi}
              onChange={updateProfile}
              profile={data.profile}
            />
          ) : null}

          {activeView === "workouts" ? (
            <WorkoutPanel
              data={data}
              onDeleteExercise={deleteExercise}
              onFocusChange={updateWorkoutFocus}
              onSaveExercise={saveExercise}
              onSelectDay={setSelectedDay}
              selectedDay={selectedDay}
            />
          ) : null}

          {activeView === "progress" ? (
            <ProgressPanel
              currentWeight={data.profile.weight}
              entries={data.weightHistory}
              onAddEntry={addWeightEntry}
              onDeleteEntry={deleteWeightEntry}
            />
          ) : null}
        </section>
      </div>
    </main>
  );
}

function upsertWeightEntry(entries: WeightEntry[], entry: WeightEntry) {
  const existingByDate = entries.find((item) => item.date === entry.date);
  const nextEntry = {
    ...entry,
    id: existingByDate?.id ?? entry.id,
  };
  const nextEntries = existingByDate
    ? entries.map((item) => (item.date === entry.date ? nextEntry : item))
    : [...entries, nextEntry];

  return nextEntries.sort((a, b) => a.date.localeCompare(b.date));
}
