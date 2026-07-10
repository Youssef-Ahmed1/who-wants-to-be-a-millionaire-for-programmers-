"use client";

import { ladderSteps } from "@/lib/ladderData";

interface ProgressLadderProps {
  currentIndex: number; // 0-based
  totalQuestions: number;
}

export default function ProgressLadder({ currentIndex, totalQuestions }: ProgressLadderProps) {
  const stepsToShow = ladderSteps.slice(-totalQuestions);
  const currentStep = stepsToShow[currentIndex] || stepsToShow[0];
  const currentStepNumber = currentIndex + 1;

  return (
    <>
      {/* DESKTOP: Full vertical ladder */}
      <div className="hidden md:block w-48 bg-slate-900/50 border border-slate-800 rounded-xl p-4 shadow-xl">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 text-center border-b border-slate-800 pb-2">
          Career Ladder
        </h3>
        <div className="space-y-1">
          {stepsToShow.map((step, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div
                key={step.id}
                className={`
                  flex justify-between items-center px-3 py-2 rounded-lg transition-all duration-300 relative
                  ${isCurrent ? 'bg-amber-500/20 border border-amber-500/50 shadow-lg shadow-amber-500/10' : ''}
                  ${isCompleted ? 'text-emerald-400' : 'text-slate-600'}
                  ${(!isCompleted && !isCurrent) ? 'opacity-40' : ''}
                `}
              >
                <span className={`text-sm font-medium ${isCurrent ? 'text-amber-400' : ''}`}>
                  {step.title}
                </span>
                <span className={`text-xs font-mono ${isCurrent ? 'text-amber-400' : ''}`}>
                  {step.salary}
                </span>
                {isCurrent && (
                  <span className="absolute -right-1 text-amber-400">▶</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MOBILE: Compact progress card */}
      <div className="md:hidden w-full bg-slate-900/50 border border-slate-800 rounded-xl p-4 shadow-xl mb-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-sm text-slate-400">Question</span>
            <span className="text-lg font-bold text-white ml-2">
              {currentStepNumber}/{totalQuestions}
            </span>
          </div>
          <div className="text-right">
            <span className="text-sm text-slate-400">Current Role</span>
            <span className="text-lg font-bold text-amber-400 block">
              {currentStep.title}
            </span>
          </div>
        </div>
        {/* Mini progress bar */}
        <div className="w-full h-1.5 bg-slate-700 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-amber-500 transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
}
