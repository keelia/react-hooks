import React from "react";
import './App.css';
import Articles from "./features/Articles/Articles";
import TypedKey from "./features/Events/TypedKey";
import TypedKeys from "./features/Events/TypedKeys";
import Users from "./features/Users/Users";

export default function App() {
  return (
    <div>
      <section>
        <Articles/>
      </section>
      <section>
        <Users/>
      </section>
      <section>
        <TypedKey/>
      </section>
      <section>
        <TypedKeys/>
      </section>
    </div>
  );
}
