import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "user_input") {
    console.log(action);
    console.log("emailreducer");
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "input_blur") {
    console.log(state);
    console.log("stateforemail");
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "user_input") {
    console.log(action);
    console.log("passwordinput");
    console.log(action.val.trim());
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if ((action.type = "input_blur")) {
    console.log(state);
    console.log("stateforpassword");

    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  // useEffect(() => {
  //   const interTime = setTimeout(() => {
  //     console.log("check validity");
  //     setFormIsValid(
  //       enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //     );
  //   }, 500);
  //   return () => {
  //     console.log("Clean up");
  //     clearTimeout(interTime);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "user_input", val: event.target.value });
    // setEnteredEmail(emailState.value);
  };

  const passwordChangeHandler = (event) => {
    console.log(event.target.value);
    dispatchPassword({ type: "user_input", val: event.target.value });
    // setEnteredPassword(event.target.value);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "input_blur" });
    // setEmailIsValid(emailState.value.includes("@"));
  };
  const validatePassword = () => {
    dispatchPassword({ type: "input_blur" });
    // setEmailIsValid(emailState.value.includes("@"));
  };

  // const validatePasswordHandler = () => {
  //   dispatchPassword({ type: "input_blur" });

  //   // setPasswordIsValid(enteredPassword.trim().length > 6);
  // };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(emailState);
    console.log(passwordState);
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            isValid={emailIsValid}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            isValid={passwordIsValid}
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePassword}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!emailIsValid || !passwordIsValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
