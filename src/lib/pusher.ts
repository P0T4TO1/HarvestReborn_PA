import PusherServer from "pusher";
import PusherClient from "pusher-js";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID! as string,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY! as string,
  secret: process.env.PUSHER_APP_SECRET! as string,
  cluster: "us2",
  useTLS: true,
});

export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY! as string,
  {
    cluster: "us2",
  }
);
