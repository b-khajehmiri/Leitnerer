import * as Yup from "yup";

export const AddCardsValidationSchema = Yup.object().shape({
    front: Yup.string().required("Front side is empty!"),
    back: Yup.string().required("Back side is empty!")
});
