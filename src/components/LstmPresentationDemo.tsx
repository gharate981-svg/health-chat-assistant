import { useState } from "react";
import { ArrowLeft, ArrowRight, Brain, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const examples = [
  {
    id: "nutrition",
    label: "Nutrition",
    sentence: "I want easy healthy meal ideas",
    signals: ["healthy", "meal"],
    memory: "healthy meal ideas",
  },
  {
    id: "sleep",
    label: "Sleep",
    sentence: "I have trouble sleeping at night",
    signals: ["sleeping", "night"],
    memory: "sleeping at night",
  },
  {
    id: "exercise",
    label: "Exercise",
    sentence: "How do I start working out?",
    signals: ["working", "out"],
    memory: "starting a workout",
  },
  {
    id: "stress",
    label: "Stress",
    sentence: "I feel stressed before exams",
    signals: ["stressed", "exams"],
    memory: "stress before exams",
  },
] as const;

const stages = [
  {
    title: "Word sequence",
    shortTitle: "Input",
    description: "The sentence is read one word at a time, in order.",
  },
  {
    title: "Forget gate",
    shortTitle: "Forget",
    description: "A gate decides what information from earlier words is still useful.",
  },
  {
    title: "Input gate",
    shortTitle: "Add",
    description: "Another gate selects useful information from the current words.",
  },
  {
    title: "Cell state",
    shortTitle: "Memory",
    description: "The cell state carries the selected context forward through the sequence.",
  },
  {
    title: "Output gate",
    shortTitle: "Output",
    description: "The final context is used to produce an example topic label.",
  },
] as const;

const LstmPresentationDemo = () => {
  const [selectedId, setSelectedId] = useState<(typeof examples)[number]["id"]>("sleep");
  const [activeStage, setActiveStage] = useState(0);
  const example = examples.find((item) => item.id === selectedId);

  if (!example) return null;

  const tokens = example.sentence.match(/\S+/g) ?? [];
  const isSignal = (token: string) =>
    example.signals.includes(token.toLowerCase().replace(/[.,!?]/g, "") as (typeof example.signals)[number]);

  const goToExample = (id: (typeof examples)[number]["id"]) => {
    setSelectedId(id);
    setActiveStage(0);
  };

  const nextStage = () => setActiveStage((stage) => Math.min(stage + 1, stages.length - 1));
  const previousStage = () => setActiveStage((stage) => Math.max(stage - 1, 0));

  return (
    <section aria-labelledby="lstm-demo-title" className="mx-auto max-w-5xl py-14 md:py-20">
      <div className="mb-8 flex flex-col gap-4 border-b pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 text-sm font-semibold text-primary">Model demonstration</p>
          <h2 id="lstm-demo-title" className="font-display text-2xl font-semibold text-foreground md:text-3xl">
            How an LSTM reads a health question
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            A Long Short-Term Memory network reads words in order, carries useful context forward, and then produces a topic output.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 border border-border px-3 py-2 text-xs font-medium text-muted-foreground">
          <Brain className="h-4 w-4 text-primary" aria-hidden="true" />
          Presentation demo
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-foreground">Choose an example</h3>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1" aria-label="Sample health topics">
            {examples.map((item) => (
              <Button
                key={item.id}
                type="button"
                variant={item.id === selectedId ? "secondary" : "outline"}
                onClick={() => goToExample(item.id)}
                className="h-10 justify-start"
                aria-pressed={item.id === selectedId}
              >
                {item.label}
              </Button>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Sample input: <span className="text-foreground">“{example.sentence}”</span>
          </p>
        </div>

        <div className="min-w-0">
          <div className="mb-5 grid grid-cols-2 gap-2 md:grid-cols-5" aria-label="LSTM walkthrough steps">
            {stages.map((stage, index) => (
              <Button
                key={stage.shortTitle}
                type="button"
                variant={index === activeStage ? "secondary" : "ghost"}
                onClick={() => setActiveStage(index)}
                className="h-auto min-h-14 justify-start px-3 py-2 text-left"
                aria-current={index === activeStage ? "step" : undefined}
              >
                <span className="mr-2 flex h-6 w-6 shrink-0 items-center justify-center border border-current text-xs">
                  {index + 1}
                </span>
                <span className="whitespace-normal text-xs sm:text-sm">{stage.shortTitle}</span>
              </Button>
            ))}
          </div>

          <div className="border border-border bg-card p-5 md:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-muted-foreground">
                  Step {activeStage + 1} of {stages.length}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{stages[activeStage].title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {stages[activeStage].description}
                </p>
              </div>
              {activeStage === stages.length - 1 && (
                <div className="min-w-36 border-l-2 border-primary pl-4">
                  <p className="text-xs font-medium text-muted-foreground">Illustrative topic output</p>
                  <p className="mt-1 text-xl font-semibold text-foreground">{example.label}</p>
                </div>
              )}
            </div>

            {activeStage === 0 && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Input token sequence</p>
                <div className="flex flex-wrap gap-2" aria-label="Sentence split into words">
                  {tokens.map((token, index) => (
                    <span
                      key={`${token}-${index}`}
                      className={`border px-3 py-2 text-sm ${
                        isSignal(token)
                          ? "border-primary bg-accent text-accent-foreground"
                          : "border-border bg-background text-foreground"
                      }`}
                    >
                      <span className="mr-2 text-xs text-muted-foreground">{index + 1}</span>
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeStage === 1 && (
              <div className="mt-6 border-l-2 border-muted pl-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground">Context carried forward</p>
                <p className="mt-2 text-sm text-foreground">
                  The gate can reduce less useful earlier information while preserving context for the next word.
                </p>
              </div>
            )}

            {activeStage === 2 && (
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase text-muted-foreground">Useful cues in this sample</p>
                <div className="flex flex-wrap gap-2">
                  {tokens.filter(isSignal).map((token, index) => (
                    <span key={`${token}-${index}`} className="border border-primary bg-accent px-3 py-2 text-sm text-accent-foreground">
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activeStage === 3 && (
              <div className="mt-6 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center">
                <span className="border border-primary bg-accent px-4 py-3 font-mono text-sm text-accent-foreground">
                  Cₜ = fₜ · Cₜ₋₁ + iₜ · C̃ₜ
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The cell state combines retained memory with selected new information. Example context: <span className="font-medium text-foreground">{example.memory}</span>.
                </p>
              </div>
            )}

            {activeStage === 4 && (
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  The output gate exposes useful context to the next step or a topic classifier. For this sample, the illustrative topic is <span className="font-semibold text-foreground">{example.label}</span>.
                </p>
              </div>
            )}

            <div className="mt-7 flex items-center justify-between gap-3 border-t border-border pt-4">
              <Button type="button" variant="outline" onClick={previousStage} disabled={activeStage === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
                Previous
              </Button>
              {activeStage < stages.length - 1 ? (
                <Button type="button" onClick={nextStage}>
                  Next step
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              ) : (
                <Button type="button" variant="outline" onClick={() => setActiveStage(0)}>
                  <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
                  Replay
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Educational illustration only: sample cues and topic outputs are scripted to explain the LSTM flow. No trained model runs here, and this is not medical advice or diagnosis.
      </p>
    </section>
  );
};

export default LstmPresentationDemo;