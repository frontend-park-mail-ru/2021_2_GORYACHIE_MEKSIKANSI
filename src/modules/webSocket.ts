import {apiPaths} from '@/modules/consts';

/**
 * Socket is class implementing webSocket connection
 *
 */
class Socket {
  private messageHandlers: Set<any>;
  private socket: any;
  private id: any;
  /**
     * Constructor is setting new Set variable to contain sockets
     *
     */
  constructor() {
    this.messageHandlers = new Set();
  }

  /**
     * Subscribe is handling new socket handler
     * @param {function} handler that should be handled
     *
     */
  subscribe(handler) {
    this.messageHandlers.add(handler);
  }

  /**
   * Unsubscribe is deleting handler from socket set
   * @param {function} handler that should be handled
   *
   */
  unsubscribe(handler) {
    this.messageHandlers.delete(handler);
  }

  /**
     * Sending info from socket
     * @param {object} data object that should be sent to socket on server
     *
     */
  send(data) {
    this.socket.send(JSON.stringify(data));
  }

  /**
     * Creating new socket connection
     * @param {int} id id to connect
     *
     */
  connect(id) {
    this.id = id;
    const connectionState = this.socket?.readyState;
    if (connectionState && connectionState === WebSocket.OPEN || connectionState === WebSocket.CONNECTING) {
      // console.log('Socked already connected');
      return;
    }

    this.socket = new WebSocket(apiPaths.wsConnect + `?key=${this.id}`);
    this.socket.onopen = () => {
      console.log('Socked connected');
    };
    this.socket.onmessage = (event) => {
      // console.log('Socked message -> ', event);
      this.messageHandlers.forEach((handler) => {
        handler(JSON.parse(event.data));
      });
    };
    this.socket.onclose = () => {
      console.log('Socked close');
    };
  }

  /**
     * Disconnection for socket
     *
     */
  disconnect() {
    const connectionState = this.socket?.readyState;
    if (connectionState && connectionState !== WebSocket.CLOSED && connectionState !== WebSocket.CLOSING) {
      this.socket.close();
    }
  }
}

export default new Socket();
