import React from "react";
import './App.css';
import TypedKey from "./features/Events/TypedKey";
import TypedKeys from "./features/Events/TypedKeys";
import BasicForm from "./features/Form/BasicForm";

export default function App() {
  return (
    <div>
      <section>
        <TypedKey/>
        <TypedKeys/>
      </section>
      <section>
        <BasicForm/>
      </section>
    </div>
  );
}
