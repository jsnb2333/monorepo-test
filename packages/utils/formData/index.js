import FormData from 'form-data';

export function createFormData(data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((value) => {
        formData.append(key, value);
      });
    } else {
      formData.append(key, data[key]);
    }
  });

  return formData;
}
