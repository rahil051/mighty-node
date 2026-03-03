# Building Applications for Production

While building node.js applications for the production, you need make sure to do the following in order to save hours of debugging and loads of cost.

### 1. Not treating graceful shutdown as a day-1 requirement
If your node.js http server is dockerized and orchestrated by K8 or ECS then it the node process will get the SIGTERM and SIGKILL signals to allow you to execute graceful shutdown. Graceful shutdown means, a controlled shutdown sequence of the server, which means
- stop accepting new traffic
- complete in-flight request
- drain connections, like closing DB pools, NAT/Kafka consumers, etc

The main Gotachs experienced teams hit;
- **Keep-alive prevents shutdown**: active sockets can keep the event loop alive. Track sockets and force close them after a deadline (_timer_)
- **Background tasks**: timers, queue consumers, cron jobs, MQ Workers must be drained or stopped quickly
- **Partial side-effects**: if you kill mid-flight, then you can double-process work on restart. Favor idempotency + exactly one sementic where possible.
- **Don't reply on `process.on('exit')` for async-cleanup**: `exit` listener can't not async-cleanup. `Signals` listeners where you will do those cleanup.
- **Avoid blind `process.on('exit')`**: it can cut off logs and in-flight requests. Prefer 'drain then exit`
- **`SIGTERM` isn't the only path**: handle `SIGINT` for local/dev, and consider crash paths (uncaught exceptions) separately

When graceful shutdowns are more than HTTP (queues, schedulers, websockets):
- **Queue Consumers**: stop pulling new messages first; finish/acknowledge in-flight; commit offsets; then disconnect
- **Web Sockets**: decide whether to close immediately, or send a "server restarting" event and close after a short grace
- **Cron/Scheduled Jobs**: stop scheduling new jobs once shutdown begins
- **Multi-process (cluster/pm2)**: each worker should drain; the master/superviosr orchestrates the timing