'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuthStore } from '@/libs/stores/auth';
import VerifyOtpForm from '@/libs/forms/verifyotpForm';
import { useEffect } from 'react';

export default function VerifyOtpPage() {
  const phone = useAuthStore((state) => state.phone);
  const router = useRouter();

  useEffect(() => {
    if(!phone) {
      router.push('/login');
    }
  }, [phone, router]);
  return (
    <div className="h-full w-full z-50 login-linear">
      <div>
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-[#00000035] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto py-6 px-6 sm:py-8 sm:px-8 font-Dana">
            <Image
              className="w-32 sm:w-40 md:w-44 mx-auto rounded-xl"
              src="/images/logo.jpg"
              width={100}
              height={100}
              alt="logo"
            />
            <div className="mt-6 mb-4 text-base sm:text-lg font-Dana-Demibold text-gray-900 dark:text-gray-300">
              تایید کد :
            </div>
            
            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
              کد تایید به شماره {phone} ارسال شد
            </div>
            <VerifyOtpForm router={router} phone={phone || undefined} />
            <div className="mt-6 sm:mt-8 text-xs sm:text-sm flex items-center justify-center text-center text-gray-900 dark:text-gray-100 font-Dana leading-relaxed">
              کد را دریافت نکردید؟ {''}
              <button className="text-blue-500 hover:text-blue-700 transition px-0.5">
                ارسال مجدد
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}