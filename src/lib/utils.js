import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isValid, parseISO } from "date-fns";
import { DateTime } from "luxon";

export function getStockStatus(product) {
  let status;
  if (product.stock_limit === 0) status = "none";
  else if (product.tmp_stock === 0) status = "out";
  else if (product.tmp_stock <= product.stock_limit / 2) status = "vlow";
  else if (product.tmp_stock <= product.stock_limit) status = "low";
  else if (product.tmp_stock <= product.stock_limit * 2) status = "medium";
  else status = "high";

  return status;
}

export function formatPhone(phone) {
  const digits = phone.toString().replace(/\D/g, "");
  const trimmed = digits.slice(0, 10);
  return trimmed.replace(/(\d{4})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
}

export function getRelativeTime(date) {
  return DateTime.fromJSDate(date).toRelative({ locale: "fr" });
}

export function formatDate(date) {
  const d = parseDate(date);
  return format(d, "dd/MM/yyyy");
}

export function formatDateTime(date) {
  const d = parseDate(date);
  return format(d, "dd/MM/yyyy HH:mm");
}

export function formatDateTimeForInput(date, isDateOnly = false) {
  if (date === undefined) return date;
  const d = parseDate(date);
  if (isDateOnly) return format(d, "yyyy-MM-dd");
  return format(d, "yyyy-MM-dd'T'HH:mm");
}

function parseDate(date) {
  let d;

  if (typeof date === "string") d = parseISO(date);
  else if (typeof date === "object" && date instanceof Date) d = date;
  else throw new Error(`Invalid date format. Received : ${date}`);

  if (!isValid(d)) throw new Error(`Invalid date. Received : ${date}`);
  return d;
}

export function concatenateMonths(data, defaults = {}) {
  const { months } = require("@/constants");
  const dataMap = new Map(data.map((item) => [item.month_num, item]));
  return months.map((month, index) => {
    const monthNumber = index + 1;
    const dataItem = dataMap.get(monthNumber) || {};
    return {
      month,
      ...defaults,
      ...dataItem,
    };
  });
}

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price, locale = "fr", decimals = true, isSpecial) {
  if (typeof price !== "number") price = parseFloat(price);
  if (isNaN(price)) return `Invalid price: "${price}"`;

  return price
    .toLocaleString(locale, {
      style: "currency",
      currency: "DZD",
      notation: isSpecial ? "compact" : "standard",
      maximumFractionDigits: decimals === true ? 2 : 0,
    })
    .replace("DZD", "DA");
}

export function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function generateColor() {
  const randomHue = Math.floor(Math.random() * 360); // 0 to 360 degrees
  const randomSaturation = Math.floor(Math.random() * 30) + 80; // 30% to 80%
  const randomLightness = Math.floor(Math.random() * 25) + 60; //25% to 60%
  const hslColor = `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`;
  return hslColor;
}

export function getFirstLetters(str) {
  const words = str.split("-");
  let letters = "";
  for (const word of words) {
    letters += word.charAt(0).toUpperCase();
  }
  return letters;
}
export function round(number, digits = 2) {
  const factor = Math.pow(10, digits);
  return Math.round(number * factor) / factor;
}

export function getInitials(str) {
  return str
    .split(/\s+/) // Utilise une expression régulière pour séparer par espaces
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function getMonthInLetters(monthNumber, lang = "fr") {
  if (monthNumber < 0 || monthNumber > 12)
    throw new Error("Invalid month number. It must be between 1 and 12.");

  const monthNames = {
    fr: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    eng: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };

  const months = monthNames[lang];
  if (!months) {
    throw new Error(`Unsupported language: ${lang}`);
  }

  return months[monthNumber];
}
