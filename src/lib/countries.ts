export type Country = {
  code: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  units: "metric" | "imperial";
  dateFormat: string;
  timeFormat: "12h" | "24h";
};

export const COUNTRIES: Country[] = [
  { code: "PT", name: "Portugal", flag: "🇵🇹", currency: "EUR", currencySymbol: "€", units: "metric", dateFormat: "DD/MM/YYYY", timeFormat: "24h" },
  { code: "BR", name: "Brazil", flag: "🇧🇷", currency: "BRL", currencySymbol: "R$", units: "metric", dateFormat: "DD/MM/YYYY", timeFormat: "24h" },
  { code: "AU", name: "Australia", flag: "🇦🇺", currency: "AUD", currencySymbol: "A$", units: "metric", dateFormat: "DD/MM/YYYY", timeFormat: "12h" },
  { code: "US", name: "United States", flag: "🇺🇸", currency: "USD", currencySymbol: "$", units: "imperial", dateFormat: "MM/DD/YYYY", timeFormat: "12h" },
  { code: "PH", name: "Philippines", flag: "🇵🇭", currency: "PHP", currencySymbol: "₱", units: "metric", dateFormat: "MM/DD/YYYY", timeFormat: "12h" },
  { code: "CA", name: "Canada", flag: "🇨🇦", currency: "CAD", currencySymbol: "C$", units: "metric", dateFormat: "YYYY-MM-DD", timeFormat: "12h" },
  { code: "ES", name: "Spain", flag: "🇪🇸", currency: "EUR", currencySymbol: "€", units: "metric", dateFormat: "DD/MM/YYYY", timeFormat: "24h" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", currency: "GBP", currencySymbol: "£", units: "metric", dateFormat: "DD/MM/YYYY", timeFormat: "24h" },
  { code: "DE", name: "Germany", flag: "🇩🇪", currency: "EUR", currencySymbol: "€", units: "metric", dateFormat: "DD.MM.YYYY", timeFormat: "24h" },
  { code: "FR", name: "France", flag: "🇫🇷", currency: "EUR", currencySymbol: "€", units: "metric", dateFormat: "DD/MM/YYYY", timeFormat: "24h" },
  { code: "IT", name: "Italy", flag: "🇮🇹", currency: "EUR", currencySymbol: "€", units: "metric", dateFormat: "DD/MM/YYYY", timeFormat: "24h" },
];

export const LANGUAGES = [
  { code: "en", name: "English", native: "English", flag: "🇬🇧" },
  { code: "pt-PT", name: "Portuguese (Portugal)", native: "Português (Portugal)", flag: "🇵🇹" },
  { code: "pt-BR", name: "Portuguese (Brazil)", native: "Português (Brasil)", flag: "🇧🇷" },
  { code: "es", name: "Spanish", native: "Español", flag: "🇪🇸" },
  { code: "fil", name: "Filipino", native: "Filipino", flag: "🇵🇭" },
  { code: "fr", name: "French", native: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italian", native: "Italiano", flag: "🇮🇹" },
  { code: "de", name: "German", native: "Deutsch", flag: "🇩🇪" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];