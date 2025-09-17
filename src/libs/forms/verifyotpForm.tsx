'use client';

import { withFormik, FormikHelpers } from 'formik';
import { z } from 'zod';
import { toast } from 'react-hot-toast';

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import InnerVerifyPhoneForm from '@/components/auth/innerVerifyPhoneForm';
import { CallApi } from '../helpers/callApi';
import { handleApiError } from '../helpers/errorHandler';
`   `;
// Interface definitions
interface VerifyOtpFormProps {
  router: AppRouterInstance;
  phone?: string;
}

interface VerifyOtpFormValues {
  otpCode: string;
  phone?: string;
}

// Validation schema with zod
const verifyOtpValidationSchema = z.object({
  otpCode: z
    .string()
    .trim()
    .min(1, 'وارد کردن کد تایید الزامیست')
    .length(6, 'کد تایید باید 6 رقم باشد'),
});

// Form configuration
const VerifyOtpForm = withFormik<VerifyOtpFormProps, VerifyOtpFormValues>({
  // Initialize form values
  mapPropsToValues: (props) => ({
    otpCode: '',
    phone: props.phone,
  }),

  // Validation schema - convert zod schema to formik validation
  validate: (values) => {
    try {
      verifyOtpValidationSchema.parse(values);
      return {};
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((issue) => {
          const key = issue.path[0];
          if (key !== undefined) {
            errors[String(key)] = issue.message;
          }
        });
        return errors;
      }
    }
  },
  // Form submission handler
  handleSubmit: async (
    values: VerifyOtpFormValues,
    {
      setSubmitting,
      props,
    }: FormikHelpers<VerifyOtpFormValues> & { props: VerifyOtpFormProps },
  ) => {
    try {
      const response = await CallApi().post('/auth/verify-otp', {
        otpCode: values.otpCode,
        phone: values.phone,
      });

      if (response?.status === 200) {
        console.log(response.data);
        props.router.push('/');
        // Show success message
        toast.success(response.data.message);
      }
    } catch (error) {
      handleApiError(error);
    } finally {
      setSubmitting(false);
    }
  },
})(InnerVerifyPhoneForm);

export default VerifyOtpForm;
