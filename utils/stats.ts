import ttest2 from "@stdlib/stats-ttest2";
import chi2test from "@stdlib/stats-chi2test";
import jStat from "jstat";

// indipendent t-test
function calculateIndTTest(sample1, sample2) {
  const { pValue, statistic } = ttest2(sample1, sample2);

  return `t=${statistic}, p=${pValue}`;
}

// one way anova
function calculateOneWayAnova(groups) {
  const mean = calculateMean(groups.flat());

  const groupMeans = groups.map(
    (group) => group.reduce((acc, val) => acc + val, 0) / group.length
  );
  const ssb =
    groupMeans.reduce((acc, val) => acc + (val - mean) ** 2, 0) *
    groupMeans.length;

  const ssw = groups.reduce(
    (acc, group) =>
      acc +
      group.reduce(
        (acc2, val) => acc2 + (val - groupMeans[groups.indexOf(group)]) ** 2,
        0
      ),
    0
  );

  const dfb = groups.length - 1;
  const dfw = groups.flat().length - groups.length;

  const msb = ssb / dfb;
  const msw = ssw / dfw;

  const f = msb / msw;

  const p = 1 - jStat.centralF.cdf(f, dfb, dfw);

  return `f:${f}, p:${p}`;
}

// chi square significance test
function calculateChiSquare(contingencyTable) {
  const result = chi2test(contingencyTable);
  const { pValue, statistic } = result;

  return { statistic, pValue };
}

// fisher exact test
function calculateFisherExactTest(contingencyTable) {
  const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

  const [a, b, c, d] = contingencyTable.flat();

  const numerator =
    factorial(a + b) * factorial(c + d) * factorial(a + c) * factorial(b + d);
  const denominator =
    factorial(a) *
    factorial(b) *
    factorial(c) *
    factorial(d) *
    factorial(a + b + c + d);

  return numerator / denominator;
}

// cohens d
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

// calculateBestMatch
function calculateBestMatch(sample, solution) {
  const occurences = sample.reduce((occurences, value) => {
    return occurences + (`${value}` === `${solution}`? 1 : 0)
  }, 0);

  console.log(sample);
  
  return occurences;
}

export default {
  calculateIndTTest,
  calculateMedian,
  calculateMean,
  calculateStd,
  calculateChiSquare,
  calculateCohensD,
  calculateFisherExactTest,
  calculateOneWayAnova,
  calculateBestMatch,
};
