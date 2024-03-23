export default defineAppConfig({
  ui: {
    icons: {
      dynamic: true,
    },
    primary: "amber",
    gray: "stone",

    buttonGroup: {
      wrapper: {
        horizontal: 'inline-flex border-2 border-t-[#bea96a] border-r-[#795026] border-b-[#9d7a44] border-l-[#aa8b52] space-x-0',
        vertical: 'inline-flex flex-col space-y-1',
      },
      rounded: '',
      shadow: '',
      orientation: {
        'rounded-none': {
          horizontal: {
            start: 'rounded-s-none',
            end: 'rounded-e-none',
          },
          vertical: {
            start: 'rounded-t-none',
            end: 'rounded-b-none',
          },
        },
        'rounded-sm': {
          horizontal: {
            start: 'rounded-s-sm',
            end: 'rounded-e-sm',
          },
          vertical: {
            start: 'rounded-t-sm',
            end: 'rounded-b-sm',
          },
        },
        rounded: {
          horizontal: {
            start: 'rounded-s',
            end: 'rounded-e',
          },
          vertical: {
            start: 'rounded-t',
            end: 'rounded-b',
          },
        },
        'rounded-md': {
          horizontal: {
            start: 'rounded-s-md',
            end: 'rounded-e-md',
          },
          vertical: {
            start: 'rounded-t-md',
            end: 'rounded-b-md',
          },
        },
        'rounded-lg': {
          horizontal: {
            start: 'rounded-s-lg',
            end: 'rounded-e-lg',
          },
          vertical: {
            start: 'rounded-t-lg',
            end: 'rounded-b-lg',
          },
        },
        'rounded-xl': {
          horizontal: {
            start: 'rounded-s-xl',
            end: 'rounded-e-xl',
          },
          vertical: {
            start: 'rounded-t-xl',
            end: 'rounded-b-xl',
          },
        },
        'rounded-2xl': {
          horizontal: {
            start: 'rounded-s-2xl',
            end: 'rounded-e-2xl',
          },
          vertical: {
            start: 'rounded-t-2xl',
            end: 'rounded-b-2xl',
          },
        },
        'rounded-3xl': {
          horizontal: {
            start: 'rounded-s-3xl',
            end: 'rounded-e-3xl',
          },
          vertical: {
            start: 'rounded-t-3xl',
            end: 'rounded-b-3xl',
          },
        },
        'rounded-full': {
          horizontal: {
            start: 'rounded-s-full',
            end: 'rounded-e-full',
          },
          vertical: {
            start: 'rounded-t-full',
            end: 'rounded-b-full',
          },
        },
      },
    },

    button: {
      base: 'focus:outline-none focus-visible:outline-0 disabled:cursor-not-allowed disabled:opacity-75 flex-shrink-0 border-2 border-t-[#b42519] border-l-[#6f130b] border-r-[#150101] border-b-[#1f0201]',
      font: 'font-bold font-serif',
      rounded: '',
      truncate: 'text-left break-all line-clamp-1',
      block: 'w-full flex justify-center items-center',
      inline: 'inline-flex items-center',
      size: {
        '2xs': 'text-xs',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-base',
      },
      gap: {
        '2xs': 'gap-x-1',
        xs: 'gap-x-1.5',
        sm: 'gap-x-1.5',
        md: 'gap-x-2',
        lg: 'gap-x-2.5',
        xl: 'gap-x-2.5',
      },
      padding: {
        '2xs': 'px-2 py-1',
        xs: 'px-2.5 py-1.5',
        sm: 'px-2.5 py-1.5',
        md: 'px-3 py-2',
        lg: 'px-3.5 py-2.5',
        xl: 'px-3.5 py-2.5',
      },
      square: {
        '2xs': 'p-1',
        xs: 'p-1.5',
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-2.5',
        xl: 'p-2.5',
      },
      color: {
        white: {
          solid: 'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-900 dark:text-white bg-white hover:bg-gray-50 disabled:bg-white dark:bg-gray-900 dark:hover:bg-gray-800/50 dark:disabled:bg-gray-900 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
          ghost: 'text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-900 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        },
        gray: {
          solid: 'shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 text-gray-700 dark:text-gray-200 bg-gray-50 hover:bg-gray-100 disabled:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700/50 dark:disabled:bg-gray-800 focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
          ghost: 'text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
          link: 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        },
        black: {
          solid: 'shadow-sm text-white dark:text-gray-900 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 dark:disabled:bg-white focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
          link: 'text-gray-900 dark:text-white underline-offset-4 hover:underline focus-visible:ring-inset focus-visible:ring-2 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        },
      },
      variant: {
        solid: 'shadow-sm text-white dark:text-gray-900 bg-{color}-500 hover:bg-{color}-600 disabled:bg-{color}-500 dark:bg-{color}-400 dark:hover:bg-{color}-500 dark:disabled:bg-{color}-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-{color}-500 dark:focus-visible:outline-{color}-400',
        outline: 'ring-1 ring-inset ring-current text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
        soft: 'text-{color}-500 dark:text-{color}-400 bg-{color}-50 hover:bg-{color}-100 disabled:bg-{color}-50 dark:bg-{color}-950 dark:hover:bg-{color}-900 dark:disabled:bg-{color}-950 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
        ghost: 'text-{color}-500 dark:text-{color}-400 hover:bg-{color}-50 disabled:bg-transparent dark:hover:bg-{color}-950 dark:disabled:bg-transparent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
        link: 'text-{color}-500 hover:text-{color}-600 disabled:text-{color}-500 dark:text-{color}-400 dark:hover:text-{color}-500 dark:disabled:text-{color}-400 underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-{color}-500 dark:focus-visible:ring-{color}-400',
      },
      icon: {
        base: 'flex-shrink-0',
        loading: 'animate-spin',
        size: {
          '2xs': 'h-4 w-4',
          xs: 'h-4 w-4',
          sm: 'h-5 w-5',
          md: 'h-5 w-5',
          lg: 'h-5 w-5',
          xl: 'h-6 w-6',
        },
      },
      default: {
        size: 'sm',
        variant: 'solid',
        color: 'primary',
        loadingIcon: 'i-heroicons-arrow-path-20-solid',
      },
    },

    table: {
      divide: "divide-y divide-gray-700",
      tbody: "divide-y divide-gray-700",
      tr: {
        selected: "bg-gray-50 dark:bg-gray-800/50",
        active: "hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer",
      },
      th: {
        color: "text-gray-500",
      },
      td: {
        base: "whitespace-nowrap",
        padding: "px-4 py-4",
        color: "text-gray-300",
        font: "",
        size: "text-md",
      },
    },

    breadcrumb: {
      wrapper: "relative",
      ol: "flex items-center gap-x-1.5",
      li: "flex items-center gap-x-1.5 text-gray-500 dark:text-gray-400 text-sm leading-6 min-w-0",
      base: "flex items-center gap-x-1.5 group font-semibold min-w-0",
      label: "block truncate",
      icon: {
        base: "flex-shrink-0 w-5 h-5",
        active: "",
        inactive: "",
      },
      divider: {
        base: "text-primary-200/60 flex-shrink-0 w-5 h-5",
      },
      active: "text-primary-200/60",
      inactive: "text-primary-200/60 hover:text-primary-200",
      default: {
        divider:
          "i-heroicons-chevron-right-20-solid rtl:i-heroicons-chevron-left-20-solid",
      },
    },
  },
});
