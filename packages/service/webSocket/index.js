export class MyWebSocket {
  constructor(url) {
    this.url = url;
    this.socket = null;
    this.listeners = null;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const host = import.meta.env.VITE_WSS + window.location.host;
      const url = import.meta.env.DEV
        ? host + this.url
        : host + import.meta.env.VITE_BASEURL + this.url;

      this.socket = new WebSocket(url);

      this.socket.addEventListener('open', () => {
        resolve();
      });

      this.socket.addEventListener('error', (error) => {
        reject(error);
      });

      this.socket.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        this.listeners(message);
      });
    });
  }

  disconnect() {
    this.socket.close();
  }

  /**
   * @param data {Object} start:从第几条开始访问,subscribe：runid
   */
  send(data) {
    const message = JSON.stringify(data);
    this.socket.send(message);
  }

  addListener(listeners) {
    this.listeners = listeners;
  }

  removeListener() {
    this.listeners = null;
  }
}

export function eventsSocket(data, handle) {
  const webSocket = new MyWebSocket('/websocket/events');
  const disconnect = webSocket.disconnect.bind(webSocket);
  webSocket.listeners = (data) => {
    handle(data.events, disconnect);
  };
  webSocket.connect().then(() => {
    webSocket.send(data);
  });

  return webSocket;
}
