import React, { useState } from "react";
import { Header, Softkey } from "./components";
import { useNavigation } from "./hooks";

export default function App() {
  const [state, setState] = useState({form: 0, firstname:"", lastname:"", address:"", mobile:""});
  const [current, setNavigation] = useNavigation();

  const onKeyCenter = () => {
    let inputs = document.querySelectorAll('[nav-selectable]')
      setState(prevState => {
        let state = { ...prevState };
        if(state.form == 0) {
          state.firstname = inputs[0].value;
          state.lastname = inputs[1].value;
          state.form = 1;
        } else if(state.form == 1) {
          state.address = inputs[0].value;
          state.mobile = inputs[1].value;
          state.form = 2;
        } else {
          state.firstname = "";
          state.lastname = "";
          state.address = "";
          state.mobile = "";
          state.form=0;
        }
        return state;
      }); 
  };

  const onKeyRight = () => {
    const currentIndex = parseInt(
      document.querySelector("[nav-selected=true]").getAttribute("nav-index"),
      10
    );
    if (currentIndex > 0) {
     
    }
  };
  let { form } = state;
  return (
    <>
      <Header title="User Detail" />
      {
        form === 0 ? <Form1/> : form === 1 ? <Form2/> : <Detail state={state} />
      }
      <Softkey
        center={form === 2 ? "New User" : "Insert"}
        onKeyCenter={onKeyCenter}
        right={current.type === "SPAN" ? "Delete" : ""}
        onKeyRight={onKeyRight}
      />
    </>
  );
}

const Form1 = () => {
  return <React.Fragment>
    <div>
    <label>First Name</label>
    <input type="text" nav-selectable="true"  />
  </div>
  <div>
    <label>LastName</label>
    <input type="text" nav-selectable="true" />
  </div>
  </React.Fragment>
}

const Form2 = () => {
  return <React.Fragment>
  <div>
  <label>Address</label>
  <input type="text" nav-selectable="true" />
</div>
<div>
  <label>mobile</label>
  <input type="text" nav-selectable="true" />
</div>
</React.Fragment>
}

const Detail = ({state}) => {
  return (
    <div>
      <div>First Name: <span>{state.firstname}</span></div>
      <div>Last Name: <span>{state.lastname}</span></div>
      <div>Address: <span>{state.address}</span></div>
      <div>Mobile: <span>{state.mobile}</span></div>
    </div>
  )
}


