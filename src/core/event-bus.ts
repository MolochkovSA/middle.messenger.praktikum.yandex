type EventCallback<T = unknown> = (...args: T[]) => void

export class EventBus<T = unknown> {
  private _listeners: Record<string, EventCallback<T>[]> = {}

  on(event: string, callback: EventCallback<T>) {
    if (!this._listeners[event]) {
      this._listeners[event] = []
    }

    this._listeners[event].push(callback)
  }

  off(event: string, callback: EventCallback<T>) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this._listeners[event] = this._listeners[event].filter((listener) => listener !== callback)
  }

  emit(event: string, ...args: T[]) {
    if (!this._listeners[event]) {
      throw new Error(`Нет события: ${event}`)
    }

    this._listeners[event].forEach(function (listener) {
      listener(...args)
    })
  }
}
