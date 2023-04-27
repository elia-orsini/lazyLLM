// import { normal, chiSquareTest, tTest, fTest } from "mathjs";
import ttest2 from "@stdlib/stats-ttest2";
import chi2test from "@stdlib/stats-chi2test";

// indipendent t-test
function calculateIndTTest(sample1, sample2) {
  const { pValue, statistic } = ttest2(sample1, sample2);

  return `t=${statistic}, p=${pValue}`;
}

// // paired t-test
// function calculatePairedTTest(sample1, sample2) {
//   const { pValue, statistic } = ttest2(sample1, sample2);

//   return [statistic, pValue];
// }

// // one way anova
// const calculateOneWayAnova = (samples) => {
//   const result = fTest(...samples);
//   const { p, statistic: fStat } = result;

//   return [fStat, p];
// };

// // chi square significance test
function calculateChiSquare(contingencyTable) {
  const result = chi2test(contingencyTable);
  const { pValue, statistic } = result;

  return { statistic, pValue };
}

// // fisher exact test
// const fisherExactTest = (table) => {
//   const result = chiSquareTest(table);
//   const { p } = result;

//   return p;
// };

// // cohens d
// const calculateCohenD = (x, y) => {
//   const nx = x.length;
//   const ny = y.length;
//   const dof = nx + ny - 2;
//   const d =
//     (math.mean(x) - math.mean(y)) /
//     math.sqrt(
//       ((nx - 1) * math.std(x, "uncorrected") ** 2 +
//         (ny - 1) * math.std(y, "uncorrected") ** 2) /
//         dof
//     );

//   return d;
// };

function calculateCohensD(sample1, sample2) {
  const mean1 = calculateMean(sample1);
  const mean2 = calculateMean(sample2);
  const pooledVariance =
    (calculateVariance(sample1) + calculateVariance(sample2)) / 2;
  const pooledStandardDeviation = Math.sqrt(pooledVariance);
  return (mean1 - mean2) / pooledStandardDeviation;
}

// median
function calculateMedian(sample) {
  sample.sort((a: number, b: number) => a - b);

  const medianIndex = Math.floor(sample.length / 2);

  if (sample.length % 2 === 0) {
    return (sample[medianIndex - 1] + sample[medianIndex]) / 2;
  } else {
    return sample[medianIndex];
  }
}

// mean
const calculateMean = (sample) => {
  const sum = sample.reduce((a: number, b: number) => a + b, 0);

  return sum / sample.length;
};

// st dev
function calculateStd(sample) {
  const variance = calculateVariance(sample);

  return Math.sqrt(variance);
}

// variance
function calculateVariance(sample) {
  const mean = calculateMean(sample);

  const sumOfSquaredDifferences = sample.reduce(
    (sum, value) => sum + (value - mean) ** 2,
    0
  );

  return sumOfSquaredDifferences / sample.length;
}

export default {
  calculateIndTTest,
  calculateMedian,
  calculateMean,
  calculateStd,
  calculateChiSquare,
  calculateCohensD,
};
