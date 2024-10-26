import * as Yup from "yup";

export const contactSchema = Yup.object().shape({
  fullname: Yup.string().required("نام و نام خانوادگی الزامی است"),
  photo: Yup.string().url("آدرس تصویر اشتباه است").required("مشخص کردن تصویر الزامی است"),
  mobile: Yup.number().required("شماره موبایل اشتباه است"),
  email: Yup.string().email("آدرس ایمیل اشتباه می باشد").required("ایمیل الزامی است"),
  job: Yup.string().required("ثبت شغل الزامی است"),
  group: Yup.string().required("انتخاب گروه الزامی است"),
});
