export const isTrajectoryOutOfBounds = (trajectory) => {
  const MIN_DIFF_VALUE = 1;
  const MAX_DIFF_VALUE = 3;

  const speed = Math.abs(trajectory);
  return speed > MAX_DIFF_VALUE || speed < MIN_DIFF_VALUE;
}

export const isTrajectorySafe = (values: number[], ignoreSingleError = false) => {
  const getFailureValue = (index) => {
    if (ignoreSingleError) {
      if (index === 1 && isTrajectorySafe(values.toSpliced(0,1))) {
        return true;
      }
      return isTrajectorySafe(values.toSpliced(index, 1)) || isTrajectorySafe(values.toSpliced(index + 1, 1));
    }
  };
  let trajectory;
  let IS_TRAJECTORY_INCREASING;
  let IS_TRAJECTORY_DECREASING;

  for (let i = 0; i + 1 < values.length; i++) {
    trajectory = values[i + 1] - values[i];
    if (trajectory > 0) {
      IS_TRAJECTORY_INCREASING = true;
    }
    else if (trajectory < 0) {
      IS_TRAJECTORY_DECREASING = true;
    }
    if (isTrajectoryOutOfBounds(trajectory) || (IS_TRAJECTORY_DECREASING && IS_TRAJECTORY_INCREASING)) {
      return getFailureValue(i);
    }
  }
  return true;
};
