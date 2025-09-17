import { ErrorMessage, Field, Form, FormikProps } from 'formik';
import { ClipLoader } from 'react-spinners';

export default function InnerLoginComponent({
  isSubmitting,
}: FormikProps<any>) {
  return (
    <Form>
      <div className="flex flex-col gap-y-1">
        <Field
          name="phone"
          type='text'
          placeholder="شماره موبایل خود را وارد نمایید"
          className="placeholder:text-right text-sm sm:text-base block w-full rounded-md border mb-4 border-gray-300 px-3 py-3 sm:px-4 sm:py-4 font-normal text-gray-900 dark:text-white outline-none transition-all focus:outline-none"
        />
        <ErrorMessage
          name="phone"
          component="div"
          className="text-red-600 text-xs mr-1"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto  w-full px-2 py-3 sm:py-4 mt-6 sm:mt-8 text-sm sm:text-base cursor-pointer bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed transition text-gray-100 rounded-lg flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <ClipLoader size={16} color="#ffffff" className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm md:text-base">در حال پردازش...</span>
          </>
        ) : (
          <span className="text-xs sm:text-sm md:text-base">ارسال کد تایید</span>
        )}
      </button>
    </Form>
  );
}
