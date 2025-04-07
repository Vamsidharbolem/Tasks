import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";

const RecipeFormSchema = Yup.object().shape({
  title: Yup.string().min(3, "Title must be at least 3 characters").required("Title is required"),
  image: Yup.string().url("Must be a valid URL").required("Image URL is required"),
  ingredients: Yup.array()
    .of(Yup.string().min(2, "Ingredient must be at least 2 characters").required("Ingredient is required"))
    .min(1, "At least one ingredient is required"),
  instructions: Yup.string().min(10, "Instructions must be at least 10 characters").required("Instructions are required"),
});

interface RecipeFormProps {
  initialData?: { id?: string; title: string; image: string; ingredients: string[]; instructions: string };
  onSubmit: (recipe: any) => void;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ initialData, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        title: initialData?.title || "",
        image: initialData?.image || "",
        ingredients: initialData?.ingredients || [""],
        instructions: initialData?.instructions || "",
      }}
      validationSchema={RecipeFormSchema}
      onSubmit={(values) => onSubmit({ ...values, id: initialData?.id || String(Date.now()) })}
    >
      {({ values }) => (
        <Form>
          <div>
            <label>Title:</label>
            <Field name="title" type="text" />
            <ErrorMessage name="title" component="div" className="error-message" />
          </div>

          <div>
            <label>Image URL:</label>
            <Field name="image" type="text" />
            <ErrorMessage name="image" component="div" className="error-message" />
          </div>

          <div>
            <label>Ingredients:</label>
            <FieldArray name="ingredients">
              {({ push, remove }) => (
                <div>
                  {values.ingredients.map((_, index) => (
                    <div key={index}>
                      <Field name={`ingredients.${index}`} type="text" />
                      <button type="button" onClick={() => remove(index)}>Remove</button>
                      <ErrorMessage name={`ingredients.${index}`} component="div" className="error-message" />
                    </div>
                  ))}
                  <button type="button" onClick={() => push("")}>Add Ingredient</button>
                </div>
              )}
            </FieldArray>
          </div>

          <div>
            <label>Instructions:</label>
            <Field name="instructions" as="textarea" />
            <ErrorMessage name="instructions" component="div" className="error-message" />
          </div>

          <button type="submit">Save Recipe</button>
        </Form>
      )}
    </Formik>
  );
};

export default RecipeForm;
