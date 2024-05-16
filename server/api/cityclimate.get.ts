// server/api/cityclimate.get.ts
export default defineEventHandler((event) => {
  //get Unix Timestamp
  const date = new Date();
  const unixTimestamp = date.getTime() / 1000;
  const unixTimeStampRoundedToHour = Math.floor(unixTimestamp / 3600) * 3600;

  const response = $fetch(
    `https://www.meteoblue.com/de/products/cityclimate/getData?locationId=2657896&type=temperature&units=m&time=${unixTimeStampRoundedToHour}&apikey=6MX8Tjra7uGLn2y9`
  );

  return response;
});
