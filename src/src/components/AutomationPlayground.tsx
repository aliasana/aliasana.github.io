// export default AutomationPlayground;
import { useState } from "react";
import {
  ShieldCheck,
  UserCheck,
  Timer,
  AlertTriangle,
  Zap,
  Workflow,
} from "lucide-react";

type Role = "Requester" | "Manager" | "Governance";
type ScenarioKey = "manual" | "governed";

type Phase = {
  role: Role;
  title: string;
  detail: string;
};

const SCENARIOS: Record<
  ScenarioKey,
  {
    label: string;
    subtitle: string;
    tone: "danger" | "success";
    phases: Phase[];
    risk: "High" | "Medium" | "Low";
    speed: "Slow" | "Balanced" | "Fast";
    controlStrength: "Ad-hoc" | "Standardized" | "Automated";
  }
> = {
  manual: {
    label: "Email + Spreadsheet Chaos",
    subtitle: "Unstructured requests, inbox chasing, and manual checks.",
    tone: "danger",
    phases: [
      {
        role: "Requester",
        title: "Sends vague email",
        detail: "“Hey, can I get access to the analytics tool?”",
      },
      {
        role: "Manager",
        title: "Digs through inbox",
        detail: "Request gets buried under 47 other emails.",
      },
      {
        role: "Manager",
        title: "Manual context check",
        detail: "Tries to remember which access level is appropriate.",
      },
      {
        role: "Governance",
        title: "Spreadsheets & screenshots",
        detail: "Control checks happen in Excel and SharePoint folders.",
      },
      {
        role: "Governance",
        title: "Risk?… hopefully fine",
        detail: "Separation-of-duties conflicts are hard to spot.",
      },
      {
        role: "Requester",
        title: "Finally gets access",
        detail: "No clear audit trail of who approved what and when.",
      },
    ],
    risk: "High",
    speed: "Slow",
    controlStrength: "Ad-hoc",
  },
  governed: {
    label: "Policy-Driven Access Flow",
    subtitle:
      "Structured forms, automated checks, and clear approvals by design.",
    tone: "success",
    phases: [
      {
        role: "Requester",
        title: "Submits access form",
        detail: "Chooses system, role, and justification in a guided form.",
      },
      {
        role: "Governance",
        title: "Policy engine evaluates",
        detail: "Identity, department, and entitlement rules enforced.",
      },
      {
        role: "Governance",
        title: "SoD & risk checks",
        detail: "Automated rules flag potential conflicts immediately.",
      },
      {
        role: "Manager",
        title: "Approves with context",
        detail: "Manager sees risk, usage, and exact access being requested.",
      },
      {
        role: "Governance",
        title: "Provision & log",
        detail: "Access is granted and audit trail is written to a log.",
      },
      {
        role: "Requester",
        title: "Ready to go",
        detail: "User gets the right access — nothing more, nothing less.",
      },
    ],
    risk: "Low",
    speed: "Fast",
    controlStrength: "Automated",
  },
};

const ROLES: Role[] = ["Requester", "Manager", "Governance"];

const GovernanceSimulator = () => {
  const [scenario, setScenario] = useState<ScenarioKey>("governed");
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState<number | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const active = SCENARIOS[scenario];
  const totalPhases = active.phases.length;

  const playScenario = (key: ScenarioKey) => {
    if (isPlaying) return;

    setScenario(key);
    setCurrentPhaseIndex(0);
    setIsPlaying(true);

    const phases = SCENARIOS[key].phases;

    phases.forEach((_, i) => {
      setTimeout(() => {
        setCurrentPhaseIndex(i);
      }, i * 800);
    });

    setTimeout(() => {
      setIsPlaying(false);
      setCurrentPhaseIndex(null);
    }, phases.length * 800 + 400);
  };

  const progressPercent =
    currentPhaseIndex === null
      ? 0
      : Math.round(((currentPhaseIndex + 1) / totalPhases) * 100);

  const toneClasses =
    active.tone === "danger"
      ? "border-red-400/60 text-red-200 bg-red-500/10"
      : "border-emerald-400/60 text-emerald-200 bg-emerald-500/10";

  return (
    <section id="governance" className="py-20 bg-secondary/25">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
  Automated Access Flow Demo
</h2>

            <p className="text-muted-foreground text-base md:text-lg">
              Visualizing how access moves through an organization — from chaos
              to controlled, automated governance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              Scenario
            </span>
            <div className="flex rounded-full bg-black/50 border border-border/70 p-1.5 text-sm shadow-lg">
  <button
    type="button"
    onClick={() => !isPlaying && setScenario("manual")}
    className={`
      px-4 py-2 rounded-full font-medium transition-all
      ${scenario === "manual"
        ? "bg-neutral-800 text-white shadow-[0_0_10px_rgba(255,255,255,0.25)] scale-[1.05]"
        : "text-muted-foreground hover:text-white hover:bg-neutral-700/40"}
    `}
  >
    Manual chaos
  </button>

  <button
    type="button"
    onClick={() => !isPlaying && setScenario("governed")}
    className={`
      px-4 py-2 rounded-full font-medium transition-all
      ${scenario === "governed"
        ? "bg-neutral-800 text-white shadow-[0_0_10px_rgba(255,255,255,0.25)] scale-[1.05]"
        : "text-muted-foreground hover:text-white hover:bg-neutral-700/40"}
    `}
  >
    Governed flow
  </button>
</div>

          </div>
        </div>

        {/* Scenario summary */}
        <div
          className={`mb-8 rounded-2xl border px-4 py-3 md:px-5 md:py-4 flex items-start gap-3 ${toneClasses}`}
        >
          {active.tone === "danger" ? (
            <AlertTriangle className="w-5 h-5 mt-0.5" />
          ) : (
            <ShieldCheck className="w-5 h-5 mt-0.5" />
          )}
          <div>
            <p className="text-sm font-semibold">{active.label}</p>
            <p className="text-xs md:text-sm text-white/80">
              {active.subtitle}
            </p>
          </div>
        </div>

        {/* Main layout */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] items-start">
          {/* Swimlane board */}
          <div className="rounded-2xl border border-border/60 bg-background/80 p-4 md:p-5 shadow-lg">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Workflow className="w-4 h-4" />
                <span>Access journey</span>
              </div>
              <button
                type="button"
                onClick={() => playScenario(scenario)}
                disabled={isPlaying}
                className="
                  px-3 py-1.5 rounded-lg text-xs font-medium
                  bg-[#e7c79a] text-[#2b2b2b]
                  hover:bg-[#d8b789]
                  hover:shadow-[0_0_10px_rgba(231,199,154,0.45)]
                  transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                  flex items-center gap-1.5
                "
              >
                <Zap className="w-3 h-3" />
                {isPlaying ? "Running…" : "Play scenario"}
              </button>
            </div>

            {/* Swimlanes */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mt-3">
              {ROLES.map((role) => (
                <div
                  key={role}
                  className="rounded-xl border border-border/50 bg-black/30 p-3 md:p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-[0.7rem]">
                      {role === "Requester" && "RQ"}
                      {role === "Manager" && "MG"}
                      {role === "Governance" && "GV"}
                    </div>
                    <p className="text-xs font-semibold uppercase tracking-wide">
                      {role}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {active.phases
                      .map((phase, idx) => ({ ...phase, idx }))
                      .filter((p) => p.role === role)
                      .map((phase) => {
                        const isActive = currentPhaseIndex === phase.idx;
                        return (
                          <div
                            key={phase.idx}
                            className={`rounded-lg border px-3 py-2 text-xs md:text-[0.8rem] transition-all
                              ${
                                isActive
                                  ? "border-[#e7c79a] bg-[#1f1a13] shadow-[0_0_10px_rgba(231,199,154,0.5)] scale-[1.02]"
                                  : "border-border/50 bg-background/50 opacity-80"
                              }`}
                          >
                            <p className="font-medium mb-0.5">
                              {phase.title}
                            </p>
                            <p className="text-[0.7rem] text-muted-foreground">
                              {phase.detail}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[0.7rem] text-muted-foreground mb-1.5">
                <span>Journey progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-[#e7c79a] transition-[width] duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 bg-black/40 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Timer className="w-4 h-4" />
                <span>SLA / Speed</span>
              </div>
              <p className="text-lg font-semibold mt-1">{active.speed}</p>
              <p className="text-[0.75rem] text-muted-foreground">
                {scenario === "manual"
                  ? "Work waits in inboxes and depends on who remembers to follow up."
                  : "Requests move predictably through a structured flow."}
              </p>
            </div>

            <div className="rounded-xl border border-border/50 bg-black/40 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="w-4 h-4" />
                <span>Risk level</span>
              </div>
              <p className="text-lg font-semibold mt-1">{active.risk}</p>
              <p className="text-[0.75rem] text-muted-foreground">
                {scenario === "manual"
                  ? "Hard to prove who approved access or why it was granted."
                  : "Controls enforce identity, SoD checks, and logs automatically."}
              </p>
            </div>

            <div className="rounded-xl border border-border/50 bg-black/40 p-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <UserCheck className="w-4 h-4" />
                <span>Control maturity</span>
              </div>
              <p className="text-lg font-semibold mt-1">
                {active.controlStrength}
              </p>
              <p className="text-[0.75rem] text-muted-foreground">
  {scenario === "manual"
    ? "Controls rely on inboxes, spreadsheets, and informal approvals."
    : "This is the kind of evolution I work on: mapping reality, designing a better target state, and using automation to close the gap."}
</p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceSimulator;
