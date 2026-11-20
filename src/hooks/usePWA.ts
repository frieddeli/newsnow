import { useToast } from "./useToast"

export function usePWA() {
  const toaster = useToast()

  useEffect(() => {
    const update = () => {
      applyPwaUpdate().catch((error) => {
        console.warn("service worker update failed", error)
      })
    }
    return subscribePwaUpdateState((state) => {
      if (state === "ready") {
        toaster("Update available. Updating in 5 seconds", {
          action: {
            label: "Update now",
            onClick: update,
          },
          onDismiss: update,
        })
      } else if (state === "successful") {
        toaster("Updated successfully", {
          action: {
            label: "View changes",
            onClick: () => {
              window.open(`${Homepage}/releases/tag/v${Version}`)
            },
          },
        })
      }
    })
  }, [toaster])
}
