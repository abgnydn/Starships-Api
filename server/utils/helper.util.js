const dayjs = require("dayjs");
const duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

function convertConsumablesToHours(consumables) {
  const consumableParts = consumables.split(" ");
  const amount = consumableParts[0];
  const unit = consumableParts[1];

  const hourFactor = (() => {
    switch (unit) {
      case "year":
      case "years":
        return 24 * 365;
      case "month":
      case "months":
        return 24 * 30;
      case "week":
      case "weeks":
        return 24 * 7;
      case "day":
      case "days":
        return 24;
      default:
        throw new Error(`Invalid unit: ${unit}`);
    }
  })();

  const hours = dayjs.duration(amount * hourFactor, "hours").asHours();
  return hours;
}

function parseCrew(crew) {
  if (!crew) {
    return null;
  }

  const match = crew.match(/^(\d+)(?:-(\d+))?$/);
  if (!match) {
    return null;
  }

  const [, min, max] = match;
  if (!max) {
    return parseInt(min);
  }

  return (parseInt(min) + parseInt(max)) / 2;
}

module.exports = { convertConsumablesToHours, parseCrew };
