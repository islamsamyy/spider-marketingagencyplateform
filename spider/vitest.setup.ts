import '@testing-library/jest-dom/vitest';

// Suppress benign teardown abort errors from happy-dom
const origConsoleError = console.error;
console.error = (...args: any[]) => {
  const msg = typeof args[0] === 'string' ? args[0] : '';
  if (msg.includes('The operation was aborted') || msg.includes('AbortError')) return;
  origConsoleError(...args);
};

// Polyfill BroadcastChannel if not available
if (typeof global.BroadcastChannel === 'undefined') {
  class MockBroadcastChannel {
    name: string;
    onmessage: ((event: any) => void) | null = null;
    static channels = new Map<string, Set<MockBroadcastChannel>>();

    constructor(name: string) {
      this.name = name;
      if (!MockBroadcastChannel.channels.has(name)) {
        MockBroadcastChannel.channels.set(name, new Set());
      }
      MockBroadcastChannel.channels.get(name)!.add(this);
    }

    postMessage(data: any) {
      const set = MockBroadcastChannel.channels.get(this.name);
      if (set) {
        set.forEach((ch) => {
          if (ch !== this && ch.onmessage) {
            ch.onmessage({ data });
          }
        });
      }
    }

    close() {
      const set = MockBroadcastChannel.channels.get(this.name);
      if (set) {
        set.delete(this);
      }
    }
  }
  global.BroadcastChannel = MockBroadcastChannel as any;
}
