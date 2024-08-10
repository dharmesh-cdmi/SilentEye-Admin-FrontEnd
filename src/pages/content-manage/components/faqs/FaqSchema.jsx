import * as Yup from 'yup';

const FAQSchema = Yup.object().shape({
    question: Yup.string()
      .required('Question is required')
      .min(5, 'Question must be at least 5 characters long'),
    answer: Yup.string()
      .required('Answer is required')
      .min(5, 'Answer must be at least 10 characters long'),
  });

export default FAQSchema; 