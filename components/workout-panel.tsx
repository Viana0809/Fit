import { useMemo, useState } from "react";
import {
  Check,
  Dumbbell,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  DAYS,
  MUSCLE_GROUPS,
  createId,
  type DayName,
  type Exercise,
  type FitnessData,
} from "@/lib/fitness-data";
import { cn } from "@/lib/utils";

type WorkoutPanelProps = {
  data: FitnessData;
  selectedDay: DayName;
  onSelectDay: (day: DayName) => void;
  onFocusChange: (day: DayName, focus: string) => void;
  onSaveExercise: (day: DayName, exercise: Exercise) => void;
  onDeleteExercise: (day: DayName, exerciseId: string) => void;
};

type ExerciseDraft = Omit<Exercise, "id"> & {
  id?: string;
};

const emptyDraft: ExerciseDraft = {
  name: "",
  muscleGroup: "Peito",
  sets: 3,
  reps: "10-12",
  load: "",
  rest: "60 s",
  notes: "",
};

export function WorkoutPanel({
  data,
  selectedDay,
  onDeleteExercise,
  onFocusChange,
  onSaveExercise,
  onSelectDay,
}: WorkoutPanelProps) {
  const [draft, setDraft] = useState<ExerciseDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);

  const workout = useMemo(
    () => data.workouts.find((item) => item.day === selectedDay) ?? data.workouts[0],
    [data.workouts, selectedDay],
  );

  function updateDraft<K extends keyof ExerciseDraft>(
    key: K,
    value: ExerciseDraft[K],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleEdit(exercise: Exercise) {
    setDraft(exercise);
    setEditingId(exercise.id);
  }

  function handleReset() {
    setDraft(emptyDraft);
    setEditingId(null);
  }

  function handleSelectDay(day: DayName) {
    handleReset();
    onSelectDay(day);
  }

  function handleSave() {
    if (!draft.name.trim()) return;

    onSaveExercise(selectedDay, {
      id: editingId ?? createId("exercise"),
      name: draft.name.trim(),
      muscleGroup: draft.muscleGroup,
      sets: Number(draft.sets) || 1,
      reps: draft.reps.trim() || "10",
      load: draft.load.trim() || "A definir",
      rest: draft.rest.trim() || "60 s",
      notes: draft.notes.trim(),
    });
    handleReset();
  }

  return (
    <div className="animate-enter space-y-4">
      <Card>
        <CardHeader>
          <Badge>Área de treinos</Badge>
          <CardTitle className="text-2xl">Treinos por dia da semana</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
            {DAYS.map((day) => (
              <Button
                className={cn(
                  "min-w-fit",
                  selectedDay === day &&
                    "border-fit-green/70 bg-fit-green/14 text-fit-green",
                )}
                key={day}
                onClick={() => handleSelectDay(day)}
                variant="outline"
              >
                {day}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{editingId ? "Editar exercício" : "Novo exercício"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">
                Foco do dia
              </span>
              <Input
                onChange={(event) => onFocusChange(selectedDay, event.target.value)}
                value={workout.focus}
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-slate-300">
                  Nome do exercício
                </span>
                <Input
                  onChange={(event) => updateDraft("name", event.target.value)}
                  placeholder="Ex.: Supino reto"
                  value={draft.name}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">
                  Grupo muscular
                </span>
                <Select
                  onChange={(event) =>
                    updateDraft("muscleGroup", event.target.value)
                  }
                  value={draft.muscleGroup}
                >
                  {MUSCLE_GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </Select>
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">Séries</span>
                <Input
                  min="1"
                  onChange={(event) =>
                    updateDraft("sets", Number(event.target.value))
                  }
                  type="number"
                  value={draft.sets || ""}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">
                  Repetições
                </span>
                <Input
                  onChange={(event) => updateDraft("reps", event.target.value)}
                  placeholder="8-10"
                  value={draft.reps}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">
                  Carga usada
                </span>
                <Input
                  onChange={(event) => updateDraft("load", event.target.value)}
                  placeholder="70 kg"
                  value={draft.load}
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-300">
                  Tempo de descanso
                </span>
                <Input
                  onChange={(event) => updateDraft("rest", event.target.value)}
                  placeholder="90 s"
                  value={draft.rest}
                />
              </label>
              <label className="space-y-2 sm:col-span-2">
                <span className="text-sm font-medium text-slate-300">
                  Observações
                </span>
                <Textarea
                  onChange={(event) => updateDraft("notes", event.target.value)}
                  placeholder="Técnica, progressão, ajustes..."
                  value={draft.notes}
                />
              </label>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button className="flex-1" disabled={!draft.name.trim()} onClick={handleSave}>
                {editingId ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {editingId ? "Salvar edição" : "Adicionar"}
              </Button>
              <Button onClick={handleReset} variant="secondary">
                <RotateCcw className="h-4 w-4" />
                Limpar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle>{workout.day}</CardTitle>
              <p className="mt-1 text-sm text-slate-400">{workout.focus}</p>
            </div>
            <Badge className="border-fit-cyan/30 bg-fit-cyan/10 text-fit-cyan">
              {workout.exercises.length} exercícios
            </Badge>
          </CardHeader>
          <CardContent className="space-y-3">
            {workout.exercises.length ? (
              workout.exercises.map((exercise) => (
                <div
                  className="rounded-lg border border-white/10 bg-white/[0.035] p-4 transition-all hover:border-fit-green/35"
                  key={exercise.id}
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-white">
                          {exercise.name}
                        </h3>
                        <Badge>{exercise.muscleGroup}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-slate-400">
                        {exercise.notes || "Sem observações"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleEdit(exercise)}
                        size="icon"
                        title="Editar exercício"
                        variant="secondary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => onDeleteExercise(selectedDay, exercise.id)}
                        size="icon"
                        title="Excluir exercício"
                        variant="danger"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm sm:grid-cols-4">
                    <WorkoutStat label="Séries" value={`${exercise.sets}`} />
                    <WorkoutStat label="Repetições" value={exercise.reps} />
                    <WorkoutStat label="Carga" value={exercise.load} />
                    <WorkoutStat label="Descanso" value={exercise.rest} />
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-white/15 bg-slate-950/45 p-10 text-center text-slate-400">
                <Dumbbell className="mx-auto mb-3 h-8 w-8 text-fit-green" />
                Nenhum exercício neste dia
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function WorkoutStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 px-3 py-2">
      <p className="text-[11px] uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-100">{value}</p>
    </div>
  );
}
