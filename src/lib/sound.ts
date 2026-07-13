// src/lib/sound.ts

let tickSound: HTMLAudioElement | null = null;

const createSound = (filename: string): HTMLAudioElement | null => {
    if (typeof window === 'undefined') return null;
    try {
        return new Audio(`/sounds/${filename}`);
    } catch {
        return null;
    }
};

export const playCorrect = () => {
    const sound = createSound('correct.mp3');
    sound?.play().catch(() => {});
};

export const playWrong = () => {
    const sound = createSound('wrong.mp3');
    sound?.play().catch(() => {});
};

export const playTick = () => {
    if (tickSound) {
        tickSound.pause();
        tickSound.currentTime = 0;
        tickSound = null;
    }

    try {
        tickSound = new Audio('/sounds/tick.mp3');
        tickSound.loop = true;
        tickSound.play().catch(() => {});
    } catch {
        tickSound = null;
    }
};

export const stopTick = () => {
    if (tickSound) {
        tickSound.pause();
        tickSound.currentTime = 0;
        tickSound = null;
    }
};
