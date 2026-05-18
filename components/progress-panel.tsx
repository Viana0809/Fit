import { useMemo, useState } from "react";
import { CalendarPlus, Plus, Scale, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WeightChart } from "@/components/weight-chart";
import {
  createId,
  formatDateLabel,
  formatWeight,
  type WeightEntry,
} from "@/lib/fitness-data";

type ProgressPanelProps = {
  currentWeight: number;
  entries: WeightEntry[];
  onAddEntry: (entry: WeightEntry) => void;
  onDeleteEntry: (id: string) => void;
};

export function ProgressPanel({
  currentWeight,
  entries,
  onAddEntry,
  onDeleteEntry,
}: ProgressPanelProps) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [weight, setWeight] = useState(currentWeight);
  const sortedEntries = useMemo(
    () => [...entries].sort((a, b) => b.date.localeCompare(a.date)),
    [entries],
  );
  const firstWeight = [...entries].sort((a, b) => a.date.localeCompare(b.date))[0]
    ?.weight;
  const latestWeight = sortedEntries[0]?.weight;
  const delta =
    typeof firstWeight === "number" && typeof latestWeight === "number"
      ? latestWeight - firstWeight
      : 0;

  function handleAdd() {
    if (!date || !weight) return;

    onAddEntry({
      id: createId("weight"),
      date,
      weight: Number(weight),
    });
  }

  return (
    <div className="animate-enter grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Evolução de peso corporal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <WeightChart entries={entries} />
          <div className="grid gap-3 sm:grid-cols-3">
            <ProgressStat
              icon={<Scale className="h-5 w-5" />}
              label="Peso atual"
              value={latestWeight ? formatWeight(latestWeight) : "--"}
            />
            <ProgressStat
              icon={
                delta <= 0 ? (
                  <TrendingDown className="h-5 w-5" />
                ) : (
                  <TrendingUp className="h-5 w-5" />
                )
              }
              label="Variação"
              value={`${delta >= 0 ? "+" : ""}${delta.toFixed(1)} kg`}
            />
            <ProgressStat
              icon={<CalendarPlus className="h-5 w-5" />}
              label="Registros"
              value={String(entries.length)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Novo registro</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">Data</span>
              <Input
                onChange={(event) => setDate(event.target.value)}
                type="date"
                value={date}
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-300">Peso</span>
              <Input
                min="0"
                onChange={(event) => setWeight(Number(event.target.value))}
                step="0.1"
                type="number"
                value={weight || ""}
              />
            </label>
            <Button className="w-full" disabled={!date || !weight} onClick={handleAdd}>
              <Plus className="h-4 w-4" />
              Registrar peso
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {sortedEntries.map((entry) => (
              <div
                className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.035] px-3 py-2"
                key={entry.id}
              >
                <div>
                  <p className="font-semibold text-white">
                    {formatWeight(entry.weight)}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDateLabel(entry.date)}
                  </p>
                </div>
                <Button
                  onClick={() => onDeleteEntry(entry.id)}
                  size="icon"
                  title="Excluir registro"
                  variant="danger"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ProgressStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <div className="mb-3 inline-flex rounded-md border border-fit-cyan/30 bg-fit-cyan/10 p-2 text-fit-cyan">
        {icon}
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}
