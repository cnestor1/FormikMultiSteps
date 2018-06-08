import React, { Component } from 'react';
import Wizard from "./Wizard";
import { Formik, Field } from 'formik';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const required = value => (value ? undefined : 'Required');

const Error = ({ name }) => (
    <Field
        name={name}
        render={({ form: { touched, errors } }) =>
            touched[name] && errors[name] ? <span>{errors[name]}</span> : null
        }
    />
);

const App = () => {
    return (
        <div className="App">
            <h1>Multistep / Form Wizard </h1>
            <Wizard
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    favoriteColor: '',
                }}
                onSubmit={(values, actions) => {
                    sleep(300).then(() => {
                        window.alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    });
                }}
            >
                <Wizard.Page>
                    <div>
                        <label>First Name</label>
                        <Field
                            name="firstName"
                            component="input"
                            type="text"
                            placeholder="First Name"
                            validate={required}
                        />
                        <Error name="firstName" />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <Field
                            name="lastName"
                            component="input"
                            type="text"
                            placeholder="Last Name"
                            validate={required}
                        />
                        <Error name="lastName" />
                    </div>
                </Wizard.Page>
                <Wizard.Page
                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        }
                        if (!values.favoriteColor) {
                            errors.favoriteColor = 'Required';
                        }
                        return errors;
                    }}
                >
                    <div>
                        <label>Email</label>
                        <Field
                            name="email"
                            component="input"
                            type="email"
                            placeholder="Email"
                        />
                        <Error name="email" />
                    </div>
                    <div>
                        <label>Favorite Color</label>
                        <Field name="favoriteColor" component="select">
                            <option />
                            <option value="#ff0000">❤️ Red</option>
                            <option value="#00ff00">💚 Green</option>
                            <option value="#0000ff">💙 Blue</option>
                        </Field>
                        <Error name="favoriteColor" />
                    </div>
                </Wizard.Page>
            </Wizard>
        </div>
    )
};

export default App;