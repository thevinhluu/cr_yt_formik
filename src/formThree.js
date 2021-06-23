import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const myCustomComponent = ({
	field, // {name, value, onChange, onBlur}
	form  : { touched, errors },
	...props
}) => (
	<React.Fragment>
		<label htmlFor={field.name}>{props.labelName}</label>
		<input type='text' className='form-control' placeholder={props.placeholder} {...field} />
		{errors[field.name] && touched[field.name] ? <span>{errors[field.name]}</span> : null}
	</React.Fragment>
);

const FormThree = () => {
	const formikProps = {
		initialValues    : { firstname: '', color: '', lastname: '' },
		validationSchema : Yup.object({
			firstname : Yup.string().required('Sorry, this is required'),
			lastname  : Yup.string().required('Sorry, this is required 2'),
			age       : Yup.number().required('Sorry, you need an age')
		}),
		onSubmit         : (values) => {
			console.log(values);
		}
	};

	return (
		<div className='container'>
			<div className='col-md-12 mt-5'>
				<Formik {...formikProps}>
					{(formik) => (
						<Form>
							<label htmlFor='firstname'>First name</label>
							{/* <input className='form-control' type='text' name='firstname' /> */}
							<Field className='form-control' type='text' name='firstname' />
							<ErrorMessage name='firstname' />
							{/* {formik.errors.firstname && formik.touched.firstname ? <span>{formik.errors.firstname}</span> : null} */}

							<hr className='mb-4' />

							<Field as='select' name='color' className='custom-select'>
								<option value='red'>Red</option>
								<option value='green'>Green</option>
								<option value='blue'>Blue</option>
							</Field>

							<hr className='mb-4' />

							<Field
								name='lastname'
								placeholder='Add a Lastname'
								component={myCustomComponent}
								labelName='Enter your lastname'
							/>

							<hr className='mb-4' />

							<Field name='age' placeholder='Add a age' component={myCustomComponent} labelName='Enter your age' />

							<hr className='mb-4' />

							<button className='btn btn-primary btn-lg btn-block' type='submit'>
								Submit
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default FormThree;
