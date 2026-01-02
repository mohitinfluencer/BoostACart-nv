"use client"

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  variant?: "default" | "success"
  ariaLabel?: string
  disabled?: boolean
}

export function Toggle({ checked, onChange, variant = "default", ariaLabel, disabled = false }: ToggleProps) {
  const baseClasses =
    "relative inline-flex h-[22px] w-[42px] flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900"

  const variantClasses = {
    default: checked ? "bg-blue-600 focus:ring-blue-500" : "bg-gray-600/80 focus:ring-gray-500",
    success: checked ? "bg-[#3DDC97] focus:ring-green-500" : "bg-[#2A2F3A] focus:ring-gray-500",
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${checked ? "shadow-sm" : ""}`}
      style={{
        minWidth: "42px",
        minHeight: "22px",
        width: "42px",
        height: "22px",
      }}
    >
      <span
        className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-sm transition-all duration-200 ease-in-out ${
          checked ? "translate-x-[23px] scale-110" : "translate-x-[3px] scale-100"
        }`}
        style={{
          minWidth: "16px",
          minHeight: "16px",
        }}
      />
    </button>
  )
}
