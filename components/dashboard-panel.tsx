import {
  Activity,
  CalendarDays,
  Dumbbell,
  Pencil,
  Scale,
  Target,
  Timer,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeightChart } from "@/components/weight-chart";
import {
  formatWeight,
  getBmiLabel,
  getGoalLabel,
  type DayName,
  type FitnessData,
  type WorkoutDay,
} from "@/lib/fitness-data";

type DashboardPanelProps = {
  data: FitnessData;
  age: number | null;
  bmi: number | null;
  totalExercises: number;
  todayWorkout: WorkoutDay;
  onOpenWorkout: (day: DayName) => void;
};

export function DashboardPanel({
  data,
  age,
  bmi,
  totalExercises,
  todayWorkout,
  onOpenWorkout,
}: DashboardPanelProps) {
  const latestWeight = data.weightHistory.at(-1)?.weight ?? data.profile.weight;
  const firstWeight = data.weightHistory[0]?.weight ?? latestWeight;
  const weightDelta = latestWeight - firstWeight;

  return (
    <div className="animate-enter space-y-4">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          accent="green"
          icon={<Scale className="h-5 w-5" />}
          label="Peso atual"
          value={formatWeight(data.profile.weight)}
        />
        <MetricCard
          accent="cyan"
          icon={<Activity className="h-5 w-5" />}
          label="IMC"
          value={bmi ? bmi.toFixed(1) : "--"}
          detail={getBmiLabel(bmi)}
        />
        <MetricCard
          accent="amber"
          icon={<CalendarDays className="h-5 w-5" />}
          label="Idade"
          value={age ? `${age} anos` : "--"}
        />
        <MetricCard
          accent="rose"
          icon={<Dumbbell className="h-5 w-5" />}
          label="Exercícios"
          value={String(totalExercises)}
          detail="cadastrados"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <Card className="overflow-hidden">
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge className="mb-3">Dashboard</Badge>
              <CardTitle className="text-2xl">Treino de hoje</CardTitle>
              <p className="mt-1 text-sm text-slate-400">
                {todayWorkout.day} · {todayWorkout.focus}
              </p>
            </div>
            <Button
              onClick={() => onOpenWorkout(todayWorkout.day)}
              size="sm"
              variant="secondary"
            >
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {todayWorkout.exercises.length ? (
                todayWorkout.exercises.map((exercise) => (
                  <div
                    className="group grid gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-4 transition-all hover:border-fit-green/35 hover:bg-white/[0.055] md:grid-cols-[1fr_auto]"
                    key={exercise.id}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-white">
                          {exercise.name}
                        </h3>
                        <Badge className="border-fit-cyan/30 bg-fit-cyan/10 text-fit-cyan">
                          {exercise.muscleGroup}
                        </Badge>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">
                        {exercise.notes || "Sem observações"}
                      </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-sm sm:min-w-64">
                      <MiniStat label="Séries" value={`${exercise.sets}x`} />
                      <MiniStat label="Reps" value={exercise.reps} />
                      <MiniStat label="Descanso" value={exercise.rest} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-dashed border-white/15 bg-slate-950/45 p-8 text-center text-slate-400">
                  <Dumbbell className="mx-auto mb-3 h-8 w-8 text-fit-green" />
                  Nenhum exercício cadastrado para hoje
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Dados do usuário</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-slate-950/45 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-400">Nome</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {data.profile.fullName}
                  </p>
                </div>
                <div className="rounded-md border border-fit-green/25 bg-fit-green/10 p-2 text-fit-green">
                  <Target className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <ProfileLine label="Altura" value={`${data.profile.height} cm`} />
                <ProfileLine
                  label="Objetivo"
                  value={getGoalLabel(data.profile.goal)}
                />
                <ProfileLine
                  label="IMC"
                  value={bmi ? `${bmi.toFixed(1)} · ${getBmiLabel(bmi)}` : "--"}
                />
                <ProfileLine
                  label="Peso desde o início"
                  value={`${weightDelta >= 0 ? "+" : ""}${weightDelta.toFixed(1)} kg`}
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <Trophy className="mb-3 h-5 w-5 text-fit-amber" />
                <p className="text-sm text-slate-400">Objetivo ativo</p>
                <p className="mt-1 font-semibold text-white">
                  {getGoalLabel(data.profile.goal)}
                </p>
              </div>
              <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
                <Timer className="mb-3 h-5 w-5 text-fit-cyan" />
                <p className="text-sm text-slate-400">Hoje</p>
                <p className="mt-1 font-semibold text-white">
                  {todayWorkout.exercises.length} exercícios
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução de peso corporal</CardTitle>
        </CardHeader>
        <CardContent>
          <WeightChart entries={data.weightHistory} />
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  detail,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail?: string;
  accent: "green" | "cyan" | "amber" | "rose";
}) {
  const accentClass = {
    green: "text-fit-green border-fit-green/30 bg-fit-green/10",
    cyan: "text-fit-cyan border-fit-cyan/30 bg-fit-cyan/10",
    amber: "text-fit-amber border-fit-amber/30 bg-fit-amber/10",
    rose: "text-fit-rose border-fit-rose/30 bg-fit-rose/10",
  }[accent];

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          {detail ? <p className="mt-1 text-xs text-slate-500">{detail}</p> : null}
        </div>
        <div className={`rounded-md border p-3 ${accentClass}`}>{icon}</div>
      </div>
    </Card>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
      <p className="text-[11px] uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function ProfileLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-100">{value}</p>
    </div>
  );
}
