'use client';

import { useEffect } from 'react';
import OneSignal from 'react-onesignal';
import { useSession } from 'next-auth/react';
import { sendSubscriptionToServer } from './utils/sendSubscriptionToServer.ts';

export default function OneSignalInitializer() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log(process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID);
    const initOneSignal = async () => {
      try {
        await OneSignal.init({
          appId: process.env.NEXT_PUBLIC_ONESIGNAL_APP_ID || '',
          notifyButton: { enable: true },
          serviceWorkerPath: '/push/onesignal/OneSignalSDKWorker.js',
          serviceWorkerParam: { scope: '/push/onesignal/' },
        });

        const permission = await OneSignal.Notifications.permissionNative;

        console.log('permission', permission);
        if (permission !== 'granted') {
          console.log('푸시 알림 권한 요청 중...');
          await OneSignal.Slidedown.promptPush();
        }

        console.log('OneSignal.User', OneSignal.User);
        const userId = await OneSignal.User.PushSubscription.id;

        console.log(
          'OneSignal.User.PushSubscription',
          OneSignal.User.PushSubscription,
        );

        console.log(
          'OneSignal.User.PushSubscription.id',
          OneSignal.User.PushSubscription.id,
        );
        if (userId && session) {
          console.log('유저 아이디');
          console.log(userId);
          console.log('세션');
          console.log(session.accessToken);
          await sendSubscriptionToServer(userId, session.accessToken);
        } else {
          console.log('사용자 ID를 가져올 수 없습니다.');
        }
      } catch (error) {
        console.error(
          'OneSignal 초기화 또는 푸시 알림 처리 중 오류 발생:',
          error,
        );
      }
    };

    initOneSignal();
  }, []);

  return null;
}
