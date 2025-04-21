type TCallback = (...args: unknown[]) => unknown

export default class EventBus<Event extends string> {
  private readonly listeners: Record<Event, TCallback[]> = {} as Record<
    Event,
    TCallback[]
  >

  on(event: Event, callback: TCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }

    this.listeners[event].push(callback)
  }

  off(event: Event, callback: TCallback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    )
  }

  emit(event: Event, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this.listeners[event].forEach((listener) => {
      listener(...args)
    })
  }
}
