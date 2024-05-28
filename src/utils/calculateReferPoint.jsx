export const calculateReferralPoints = (
  referralCount,
  perReferPoint,
  maxRefer,
  pointMultiply
) => {
  let points = 0;
  if (referralCount === 0) {
    points = perReferPoint; // Initial perReferPoint points for the first referral
  } else if (referralCount < maxRefer) {
    points = Math.pow(pointMultiply, referralCount) * perReferPoint; // Points multiplied by pointMultiply for each referral until 10
  } else {
    points = perReferPoint; // After 10 referrals, perReferPoint points for each referral
  }
  return points;
};

//Find Settings value By Key
export const findValueByKey = (items, key) => {
  const item = items.find((item) => item.key === key);
  return item ? item.value : null;
};
