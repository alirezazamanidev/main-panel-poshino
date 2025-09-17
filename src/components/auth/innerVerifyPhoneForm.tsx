import { ErrorMessage, Field, Form, FormikProps } from 'formik';
import { ClipLoader } from 'react-spinners';
import OTPInput from 'react-otp-input';

export default function InnerVerifyPhoneForm({
  isSubmitting,
  values,
  handleChange
}: FormikProps<any>) {
  return (
    <Form>
      <div className="flex flex-col gap-y-1">
        <div className="mb-4 flex justify-center text-gray-900" dir="ltr">
          <OTPInput
            value={values.otpCode}
            onChange={(value) => handleChange({ target: { name: 'otpCode', value } })}
            numInputs={6}
            
            renderInput={(props) => (
              <input
                {...props}
                className="!w-10 !h-10 sm:!w-12 sm:!h-12 md:!w-14 md:!h-14 !text-base sm:!text-lg md:!text-xl !text-gray-900 dark:!text-white !text-center !mx-0.5 sm:!mx-1 !border-2 !border-gray-300 dark:!border-gray-600 !rounded-lg !bg-white dark:!bg-gray-700 !focus:!border-blue-400 !focus:!ring-1 !focus:!ring-blue-400 !outline-none !transition-colors"
                dir="ltr"
              />
            )}
            inputStyle="otp-input"
            shouldAutoFocus={true}
            containerStyle="direction: ltr; display: flex; justify-content: center;"
            inputType="tel"
            renderSeparator={<span></span>}
          />
        </div>
        <ErrorMessage
          name="otpCode"
          component="div"
          className="text-red-600 text-xs mr-1"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="mx-auto w-full px-2 py-3 sm:py-4 mt-6 sm:mt-8 text-sm sm:text-base cursor-pointer bg-blue-500 hover:bg-blue-400 disabled:bg-blue-300 disabled:cursor-not-allowed transition text-gray-100 rounded-lg flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <ClipLoader size={16} color="#ffffff" className="sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm md:text-base">در حال پردازش...</span>
          </>
        ) : (
          <span className="text-xs sm:text-sm md:text-base">تایید کد</span>
        )}
      </button>
    </Form>
  );
}
