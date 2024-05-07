import * as Yup from "yup";

export const bookSchema = Yup.object().shape({
    title: Yup.string(),
    desc: Yup.string(),
    price: Yup.number(),
    cover: Yup.mixed().required('required')
        .test('type', 'Invalid file format', (value) => {
            console.log("Uploaded file:", value);
            if (!value) return true;
            const supportedFormats = ['png', 'pdf', 'jpeg', 'jpg'];
            const fileName = value.name || '';

            const fileExtension = fileName.split('.').pop();
            return supportedFormats.includes(fileExtension);
        })
        .test('fileSize', 'File size must not be more than 5mb', (value) => {
            if (!value) return true;
            return value.size <= 5000000;
        })
});
