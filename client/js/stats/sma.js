var simpleMovingAverage = function(period) {
  var nums = [];
  return function(num) {
    nums.push(num);
    if(nums.length > period){
      nums.splice(0,1); // remove the first element of the array
    }
    var sum = 0;
    for(var i in nums){
      sum += nums[i];
    }
    var n = period;
    if(nums.length < period){
      n = nums.length;
    }
    return sum/n;
  };
};

// var sma3 = simpleMovingAverage(3);
// var sma5 = simpleMovingAverage(5);
// var data = [1,2,3,4,5,5,4,3,2,1];
// for (var i in data) {
//     var n = data[i];
//     // using WSH
//     console.log("Next number = " + n + ", SMA_3 = " + sma3(n) + ", SMA_5 = " + sma5(n));
// }