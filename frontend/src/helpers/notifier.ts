type Observer = () => void;

interface Events {
  [key: string]: Set<Observer>;
}

class Notifier {
  private events: Events = {};

  notify(event: string) {
    const observers = this.events[event];

    if (observers) {
      observers.forEach((observer) => {
        observer();
      });
    }
  }

  on(event: string, callback: Observer) {
    const eventExists = !!this.events[event];

    if (!eventExists) {
      this.events[event] = new Set();
    }

    this.events[event].add(callback);
  }

  off(event: string, callback: Observer) {
    const eventExists = !!this.events[event];

    if (eventExists) {
      this.events[event].delete(callback);
    }
  }
}

export default new Notifier();
