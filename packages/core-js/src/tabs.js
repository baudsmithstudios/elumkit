(function () {
  "use strict"

  const initTabs = (tablist) => {
    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'))
    const panels = tabs.map(tab => document.getElementById(tab.getAttribute("aria-controls")))

    const setRoving = (focusedTab) => {
      tabs.forEach(tab => tab.tabIndex = tab === focusedTab ? 0 : -1)
    }

    const activate = (selectTab) => {
      setRoving(selectTab)
      tabs.forEach((tab, index) => {
        const isSelected = tab === selectTab
        tab.setAttribute("aria-selected", String(isSelected))
        panels[index].hidden = !isSelected
      })
    }

    tabs.forEach((tab, index) => {
      const panel = panels[index]
      panel.setAttribute("role", "tabpanel")
      panel.setAttribute("aria-labelledby", tab.id)
      panel.tabIndex = 0
    })
    tablist.hidden = false

    const initial = tabs.find(tab => tab.getAttribute("aria-selected") === "true") || tabs[0]
    activate(initial)

    tabs.forEach((tab, index) => {
      tab.addEventListener("click", () => activate(tab))
      tab.addEventListener("keydown", (event) => {
        const last = tabs.length - 1
        let next
        switch (event.key) {
          case "ArrowRight":
          case "ArrowDown":
            next = index === last ? 0 : index + 1
            break
          case "ArrowLeft":
          case "ArrowUp":
            next = index === 0 ? last : index - 1
            break
          case "Home":
            next = 0
            break
          case "End":
            next = last
            break
          default:
            return
        }
        event.preventDefault()
        setRoving(tabs[next])
        tabs[next].focus()
      })
    })
  }

  const init = () => {
    document.querySelectorAll('.elum-tabs[role="tablist"]').forEach(initTabs)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init)
  } else {
    init()
  }
})()
