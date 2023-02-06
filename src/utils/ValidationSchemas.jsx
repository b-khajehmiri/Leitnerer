import * as Yup from "yup";

export const AddCardsValidationSchema = Yup.object().shape({
    front: Yup.string().required("Front side is empty!"),
    back: Yup.string().required("Back side is empty!")
});

export const EditCardsValidationSchema = Yup.object().shape({
    front: Yup.string().required("Front side is empty!"),
    back: Yup.string().required("Back side is empty!"),
    deck: Yup.number().required("Deck number is empty!"),
    
});
