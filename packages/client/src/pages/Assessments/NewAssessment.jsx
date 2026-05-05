import React from "react";
import { Button, Form } from "react-bootstrap";
import { AssessmentService } from "../../services/AssessmentService";
import { useForm } from "react-hook-form";

export const NewAssessment = () => {
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    await AssessmentService.submit(data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Cat Behavioral Instrument</h1>

      <div>
        <label>Cat's Name</label>
        <input type="text" {...register("catName")} />
      </div>

      <div>
        <label>Cat's Date of Birth</label>
        <input type="date" {...register("catDOB")} />
      </div>

      <div>
        <label>
          <p>Previous contact with the Cat Judicial System</p>
          <input type="radio" value="0" {...register("prevContact")} />
          No
        </label>
        <label>
          <input type="radio" value="1" {...register("prevContact")} />
          Yes
        </label>
      </div>

      <div>
        <label>
          <p>Physical altercations with other cats</p>
          <input type="radio" value="0" {...register("catAltercations")} />
          0–3 altercations
        </label>
        <label>
          <input type="radio" value="1" {...register("catAltercations")} />
          3+ altercations
        </label>
      </div>

      {/* Owner altercations */}
      <div>
        <label>
          <p>Physical altercations with owner</p>
          <input type="radio" value="0" {...register("ownerAltercations")} />
          0–10 altercations
        </label>
        <label>
          <input type="radio" value="1" {...register("ownerAltercations")} />
          10+ altercations
        </label>
      </div>

      <div>
        <label>
          <p>Play well with dogs</p>
          <input type="radio" value="1" {...register("dogsBehavior")} />
          No
        </label>
        <label>
          <input type="radio" value="0" {...register("dogsBehavior")} />
          Yes
        </label>
      </div>

      <div>
        <label>
          <p>Hisses at strangers</p>
          <input type="radio" value="0" {...register("strangerHisses")} />
          No
        </label>
        <label>
          <input type="radio" value="1" {...register("strangerHisses")} />
          Yes
        </label>
      </div>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};
