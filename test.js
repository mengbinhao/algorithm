var lemonadeChange = function(bills) {
  let five = 0, ten = 0
  for (let bill of bills) {
    if (bill === 5) {
      five += 1
    } else if (bill === 10) {
      if (five > 0) {
        five -= 1
        ten += 1
      } else {
        return false
      }
    } else if (bill === 20) {
      if (five > 0 && ten > 0) {
        five -= 1
        ten -= 1
      } else if (five >= 3){
        five -= 3
      } else {
        return false
      }
    }
  }
  return true
};

lemonadeChange([5,5,5,10,5,5,10,20,20,20])
