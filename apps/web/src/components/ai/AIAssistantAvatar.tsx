import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type AvatarMode = "idle" | "thinking";

export function AIAssistantAvatar({
  mode,
  sequence,
  className
}: {
  mode: AvatarMode;
  sequence?: number;
  className?: string;
}) {
  const [phase, setPhase] = useState<"idle" | "start" | "loop">("idle");

  useEffect(() => {
    if (mode === "thinking") {
      setPhase("start");
      return;
    }

    setPhase("idle");
  }, [mode, sequence]);

  const source = useMemo(() => {
    if (phase === "idle") {
      return "/avatar/normalstate.mp4";
    }

    if (phase === "start") {
      return "/avatar/startthinking.mp4";
    }

    return "/avatar/thinking.mp4";
  }, [phase]);

  return (
    <div className={cn("overflow-hidden rounded-[28px] border border-white/10 bg-black/20", className)}>
      <video
        key={source}
        src={source}
        autoPlay
        muted
        playsInline
        loop={phase !== "start"}
        onEnded={() => {
          if (phase === "start") {
            setPhase("loop");
          }
        }}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
