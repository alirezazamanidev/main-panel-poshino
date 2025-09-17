'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LoginForm from '@/libs/forms/loginForm';
import { useAuthStore } from '@/libs/stores/auth';

export default function LoginPage() {
  const setPhone = useAuthStore((state) => state.setPhone);

  const router = useRouter();
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
              ورود :
            </div>
            <LoginForm router={router} setPhone={setPhone} />

            <div className="mt-6 sm:mt-8 text-xs sm:text-sm flex items-center justify-center text-center text-gray-900 dark:text-gray-100 font-Dana leading-relaxed">
              ثبت نام شما به معنای پذیرش {''}
              <div className="text-blue-500 hover:text-blue-700 transition px-0.5">
                قوانین و مقررات
              </div>
              پوشینو میباشد.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
