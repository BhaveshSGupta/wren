var crossCoefficient = function(seriesA, seriesB, maxDelay) {

  // Variable declaration
  var i;
  var j;
  var meanA = 0;
  var meanB = 0;
  var sumA = 0;
  var sumB = 0;
  var sumAB;
  var denom = 0;
  var delay = 0;

  // Calculate the mean of the two series
  var n = Math.min(seriesA.length, seriesB.length);
  for(i = 0; i < n; i++){
    meanA += seriesA[i];
    meanB += seriesB[i];
  }

  meanA /= n;
  meanB /= n;

  // Calculate the denominator
  for(i = 0; i < n; i++){
    sumA += (seriesA[i] - meanA) * (seriesA[i] - meanA);
    sumB += (seriesB[i] - meanB) * (seriesB[i] - meanB);
  }
  denom = Math.sqrt(sumA * sumB);

  // Calculate the correlation series
  for(delay = -maxDelay; delay < maxDelay; delay++){
    sumAB = 0;
    for(i = 0; i < n; i++){
      j = i + delay;
      if(j < 0 || j >= n){
        continue;
      }else {
        sumAB += (seriesA[i] - meanA) * (seriesB[j] - meanB);
      }
    }
    r = sumAB / denom;
    console.log('delay: ', delay + ' days', 'r: ', r);
  }
};