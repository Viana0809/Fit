import { Activity, Calendar, Ruler, Save, Scale, Target, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  GOALS,
  getBmiLabel,
  type Profile,
  type TrainingGoal,
} from "@/lib/fitness-data";
import { cn } from "@/lib/utils";

type ProfilePanelProps = {
  profile: Profile;
  age: number | null;
  bmi: number | null;
  onChange: (profile: Profile) => void;
};

export function ProfilePanel({ profile, age, bmi, onChange }: ProfilePanelProps) {
  function update<K extends keyof Profile>(key: K, value: Profile[K]) {
    onChange({ ...profile, [key]: value });
  }

  return (
    <div className="animate-enter grid gap-4 xl:grid-cols-[0.92fr_1.08fr]">
      <Card className="overflow-hidden">
        <CardHeader>
          <Badge>Perfil</Badge>
          <CardTitle className="text-2xl">Cadastro pessoal</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Field label="Nome completo" icon={<User className="h-4 w-4" />}>
            <Input
              onChange={(event) => update("fullName", event.target.value)}
              placeholder="Seu nome completo"
              value={profile.fullName}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Peso" icon={<Scale className="h-4 w-4" />}>
              <Input
                min="0"
                onChange={(event) => update("weight", Number(event.target.value))}
                step="0.1"
                type="number"
                value={profile.weight || ""}
              />
            </Field>
            <Field label="Altura" icon={<Ruler className="h-4 w-4" />}>
              <Input
                min="0"
                onChange={(event) => update("height", Number(event.target.value))}
                step="1"
                type="number"
                value={profile.height || ""}
              />
            </Field>
          </div>

          <Field label="Data de nascimento" icon={<Calendar className="h-4 w-4" />}>
            <Input
              onChange={(event) => update("birthDate", event.target.value)}
              type="date"
              value={profile.birthDate}
            />
          </Field>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
              <Target className="h-4 w-4 text-fit-green" />
              Objetivo do treino
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {GOALS.map((goal) => (
                <Button
                  className={cn(
                    "justify-start",
                    profile.goal === goal.value &&
                      "border-fit-green/60 bg-fit-green/14 text-fit-green",
                  )}
                  key={goal.value}
                  onClick={() => update("goal", goal.value as TrainingGoal)}
                  variant="outline"
                >
                  {goal.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Indicadores automáticos</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Indicator
              icon={<Calendar className="h-5 w-5" />}
              label="Idade"
              tone="green"
              value={age ? `${age} anos` : "--"}
            />
            <Indicator
              icon={<Activity className="h-5 w-5" />}
              label="IMC"
              tone="cyan"
              value={bmi ? bmi.toFixed(1) : "--"}
              helper={getBmiLabel(bmi)}
            />
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-fit-green/20">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-1 text-lg font-semibold text-white">
                Perfil editável
              </p>
            </div>
            <Button className="animate-soft-pulse" disabled>
              <Save className="h-4 w-4" />
              Salvo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({
  children,
  icon,
  label,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <label className="space-y-2">
      <span className="flex items-center gap-2 text-sm font-medium text-slate-300">
        <span className="text-fit-cyan">{icon}</span>
        {label}
      </span>
      {children}
    </label>
  );
}

function Indicator({
  helper,
  icon,
  label,
  tone,
  value,
}: {
  helper?: string;
  icon: React.ReactNode;
  label: string;
  tone: "green" | "cyan";
  value: string;
}) {
  const toneClass =
    tone === "green"
      ? "border-fit-green/30 bg-fit-green/10 text-fit-green"
      : "border-fit-cyan/30 bg-fit-cyan/10 text-fit-cyan";

  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.035] p-4">
      <div className={`mb-4 inline-flex rounded-md border p-2 ${toneClass}`}>
        {icon}
      </div>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-white">{value}</p>
      {helper ? <p className="mt-1 text-sm text-slate-500">{helper}</p> : null}
    </div>
  );
}
