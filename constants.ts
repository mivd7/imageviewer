export const INITIAL_MAX_SCALE = 6;
export const MAX_SCALE = 20;
export const scaleSteps = [6, 8, 10, 12, 14, 16, 18, 20];

const isBetween = (x: number, min: number, max: number) => {
    return ((x - min) * (x - max) <= 0);
};

export const getNextScaleStep = (currentScale: number) => {
    return scaleSteps.reduce((acc, curr, index) => {
        if (index + 1 === scaleSteps.length && curr - acc >= 2) {
            return curr - acc >= 2 ? scaleSteps[scaleSteps.indexOf(acc) + 1] : curr;
        }

        const isCurrentStep = isBetween(currentScale, acc, curr);
        if (acc > 0 && isCurrentStep) {
            return acc;
        }
        if (acc > 0 && curr - acc > 2) {
            return acc;
        }
        return curr;
    }, 0);
};

export const getCurrentScaleStepIndex = (currentScale: number) => {
    const lastStep = scaleSteps[scaleSteps.length - 1];
    if (currentScale <= scaleSteps[0]) {
        return 0;
    }
    if (isBetween(currentScale, lastStep - 2, lastStep) || currentScale > lastStep) {
        return scaleSteps.indexOf(lastStep);
    }
    return scaleSteps.findIndex((step, i) => isBetween(currentScale, scaleSteps[i - 1], step)) + 1;
};
