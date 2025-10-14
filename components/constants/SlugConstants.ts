  // Condition display mapping
  export const conditionMap: Record<
    string,
    { label: string; color: string; bgColor: string }
  > = {
    "kao-nova": {
      label: "Kao nova",
      color: "text-emerald-700 dark:text-emerald-400",
      bgColor: "bg-emerald-100 dark:bg-emerald-900/30",
    },
    dobro: {
      label: "Dobro stanje",
      color: "text-green-700 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    "zadovoljavajuće": {
      label: "Zadovoljavajuće",
      color: "text-yellow-700 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    },
    losije: {
      label: "Lošije stanje",
      color: "text-orange-700 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
  };